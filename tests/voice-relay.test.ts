import test from "node:test";
import assert from "node:assert/strict";
import { twiml } from "twilio";

const { VoiceResponse } = twiml;

test("Twilio ConversationRelay - Generates valid incoming call TwiML with Deepgram & Google", () => {
  const response = new VoiceResponse();
  const domain = "voice.myiad.com";

  const connect = response.connect({
    action: `https://${domain}/voice/relay-handoff`,
  });

  connect.conversationRelay({
    url: `wss://${domain}/ws/agent`,
    welcomeGreeting:
      "Welcome to MyIAD and AB Global National Insurance Solutions. I am your virtual assistant. How can I help you today? You can also ask to speak directly with Angel at any time.",
    welcomeGreetingInterruptible: "any",
    ttsProvider: "Google",
    voice: "en-US-Journey-O",
    transcriptionProvider: "Deepgram",
    speechModel: "nova-2",
    language: "en-US",
    interruptible: "true",
  });

  const xml = response.toString();
  assert.ok(xml.includes("<Connect"), "Must contain <Connect> element");
  assert.ok(xml.includes("<ConversationRelay"), "Must contain <ConversationRelay> element");
  assert.ok(xml.includes('url="wss://voice.myiad.com/ws/agent"'), "Must specify correct WebSocket URL");
  assert.ok(xml.includes('transcriptionProvider="Deepgram"'), "Must use Deepgram STT provider");
  assert.ok(xml.includes('speechModel="nova-2"'), "Must use nova-2 speech model");
  assert.ok(xml.includes('ttsProvider="Google"'), "Must use Google TTS provider");
  assert.ok(xml.includes('action="https://voice.myiad.com/voice/relay-handoff"'), "Must include relay-handoff action URL");
});

test("Twilio ConversationRelay - Generates live advisor transfer TwiML to Angel's direct phone", () => {
  const response = new VoiceResponse();
  const angelPhone = "+13863331482";
  const twilioPhone = "+18888873585";

  response.say(
    {
      voice: "Polly.Danielle-Neural",
      language: "en-US",
    },
    "Connecting you directly with Angel Burgos. Please hold while I transfer your call."
  );

  const dial = response.dial({
    callerId: twilioPhone,
    timeout: 30,
  });
  dial.number(angelPhone);

  const xml = response.toString();
  assert.ok(xml.includes("<Dial"), "Must contain <Dial> tag");
  assert.ok(xml.includes(`<Number>${angelPhone}</Number>`), `Must dial Angel's direct number: ${angelPhone}`);
  assert.ok(xml.includes(`callerId="${twilioPhone}"`), "Must preserve caller ID");
});

test("Twilio ConversationRelay - Generates Spanish transfer TwiML when Spanish is detected", () => {
  const response = new VoiceResponse();
  const angelPhone = "+13863331482";

  response.say(
    {
      voice: "Polly.Lupe-Neural",
      language: "es-US",
    },
    "Conectándole directamente con Angel Burgos. Por favor permanezca en la línea."
  );

  const dial = response.dial({
    timeout: 30,
  });
  dial.number(angelPhone);

  const xml = response.toString();
  assert.ok(xml.includes("Conectándole directamente con Angel Burgos"), "Must speak Spanish transfer message");
  assert.ok(xml.includes('language="es-US"'), "Must configure Spanish language synthesis");
  assert.ok(xml.includes(`<Number>${angelPhone}</Number>`), "Must route to Angel's number");
});

test("Twilio ConversationRelay - Intent detection accurately flags human handoff triggers", () => {
  const transferKeywords = [
    "angel",
    "human",
    "advisor",
    "operator",
    "transfer",
    "representative",
    "agent",
    "person",
    "asesor",
    "humano",
    "persona",
    "representante",
    "transferir",
    "hablar con angel",
  ];

  const checkTransfer = (text: string) => {
    const lower = text.toLowerCase();
    return transferKeywords.some((kw) => lower.includes(kw));
  };

  assert.equal(checkTransfer("Can I speak to Angel directly?"), true);
  assert.equal(checkTransfer("I want to speak with a human advisor please"), true);
  assert.equal(checkTransfer("Quiero hablar con un asesor humano"), true);
  assert.equal(checkTransfer("Por favor comunícame con Angel"), true);
  assert.equal(checkTransfer("How does the 0% floor work in IUL?"), false);
  assert.equal(checkTransfer("¿Cómo funcionan las anualidades?"), false);
});
