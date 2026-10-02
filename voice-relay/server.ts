import express, { Request, Response } from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { twiml } from "twilio";
import { GoogleGenAI } from "@google/genai";
import { myiadDict } from "../src/lib/i18n/myiad-dict";

const { VoiceResponse } = twiml;

// Configuration
const PORT = Number(process.env.PORT) || 3000;
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || "voice.myiad.com";
const ANGEL_DIRECT_PHONE = process.env.ANGEL_DIRECT_PHONE || "+13863331482";
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "+18888873585";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Healthcheck for Cloud Run / Kubernetes / Render
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    service: "myiad-voice-relay",
    serverDomain: SERVER_DOMAIN,
    hasGeminiKey: Boolean(GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 1. Initial Voice Webhook: Invoked when a caller dials the 888 number
app.post("/voice/incoming", (req: Request, res: Response) => {
  const callerNumber = (req.body.From as string) || "Unknown";
  console.log(`[Twilio Voice] Incoming call from ${callerNumber} to ${req.body.To}`);

  const response = new VoiceResponse();
  const domain = process.env.SERVER_DOMAIN || req.headers.host || SERVER_DOMAIN;

  // Use HTTPS/WSS protocol
  const actionUrl = `https://${domain}/voice/relay-handoff`;
  const wsUrl = `wss://${domain}/ws/agent`;

  const connect = response.connect({
    action: actionUrl,
  });

  // Twilio ConversationRelay bridges speech-to-text (Deepgram) and text-to-speech (Google)
  connect.conversationRelay({
    url: wsUrl,
    welcomeGreeting:
      "Welcome to MyIAD and AB Global National Insurance Solutions. I am your virtual assistant. How can I help you today? You can also ask to speak directly with Angel at any time. Para español, solo dígame español.",
    welcomeGreetingInterruptible: "any",
    ttsProvider: "Google",
    voice: "en-US-Journey-O",
    transcriptionProvider: "Deepgram",
    speechModel: "nova-2",
    language: "en-US",
    interruptible: "true",
  });

  res.type("text/xml");
  res.send(response.toString());
});

// 2. Handoff Handler: Invoked when ConversationRelay ends or triggers handoff
app.post("/voice/relay-handoff", (req: Request, res: Response) => {
  console.log("[Twilio Voice] Handoff webhook invoked with body:", req.body);

  const response = new VoiceResponse();
  let handoffData: Record<string, any> = {};

  if (req.body.HandoffData) {
    try {
      handoffData = JSON.parse(req.body.HandoffData as string);
    } catch (e) {
      console.error("[Twilio Voice] Error parsing HandoffData:", e);
    }
  }

  const isSpanish = handoffData.language === "es";

  if (handoffData.reasonCode === "live-agent-handoff") {
    console.log(`[Twilio Voice] Transferring caller to Angel's direct phone: ${ANGEL_DIRECT_PHONE}`);

    const transferMessage = isSpanish
      ? "Conectándole directamente con Angel Burgos. Por favor permanezca en la línea."
      : "Connecting you directly with Angel Burgos. Please hold while I transfer your call.";

    response.say(
      {
        voice: isSpanish ? "Polly.Lupe-Neural" : "Polly.Danielle-Neural",
        language: isSpanish ? "es-US" : "en-US",
      },
      transferMessage
    );

    const dial = response.dial({
      callerId: (req.body.To as string) || TWILIO_PHONE_NUMBER,
      timeout: 30,
    });
    dial.number(ANGEL_DIRECT_PHONE);
  } else {
    const farewell = isSpanish
      ? "Gracias por comunicarse con MyIAD y AB Global. Que tenga un excelente día."
      : "Thank you for contacting MyIAD and AB Global. Have a great day. Goodbye.";

    response.say(
      {
        voice: isSpanish ? "Polly.Lupe-Neural" : "Polly.Danielle-Neural",
        language: isSpanish ? "es-US" : "en-US",
      },
      farewell
    );
    response.hangup();
  }

  res.type("text/xml");
  res.send(response.toString());
});

// Create HTTP and WebSocket Server
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws/agent" });

// Initialize Gemini SDK if API key is provided
let geminiClient: GoogleGenAI | null = null;
if (GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  } catch (err) {
    console.warn("[Gemini] Failed to initialize GoogleGenAI client:", err);
  }
}

/**
 * System prompt optimized for low-latency, phone-spoken voice delivery
 */
function buildVoiceSystemPrompt(lang: "en" | "es"): string {
  if (lang === "es") {
    return `Eres la asistente de voz oficial de MyIAD y AB Global National Insurance Solutions (liderada por Angel Burgos, Asesor Licenciado 0215 de Florida).
Especialidades clave:
1. Seguro de Vida con Piso del 0% (IUL): crecimiento vinculado a índices con protección total contra caídas de mercado y retiros libres de impuestos bajo IRC §7702.
2. Beneficios en Vida: acceso anticipado a la suma asegurada por cáncer, infarto o enfermedad crónica sin costo adicional.
3. Anualidades Garantizadas: ingresos garantizados de por vida bajo estándares de idoneidad FINRA Regla 2330.
4. Servicios Funerarios Everest: concierge 24/7 y desembolso en 24 a 48 horas.
5. Blindaje para Veteranos: alternativas a la escala de primas VGLI y maximización de pensiones militares.

Reglas estrictas para llamadas telefónicas:
- Mantén tus respuestas breves, naturales y directas (máximo 1 o 2 oraciones habladas).
- NUNCA uses asteriscos, viñetas, tablas o formato markdown; tus palabras serán leídas en voz alta por un sintetizador de voz.
- Si el llamante solicita hablar con una persona, asesor o con Angel, avísale amablemente que lo vas a transferir.`;
  }

  return `You are the official voice assistant for MyIAD and AB Global National Insurance Solutions (led by Angel Burgos, Licensed 0215 Financial Advisor).
Key specializations:
1. 0% Floor Indexed Universal Life (IUL): market downside protection with tax-free distributions under IRC §7702.
2. Living Benefits: tax-free acceleration of death benefits for critical, chronic, or terminal illness.
3. Guaranteed Lifetime Annuities: lifetime income planning under strict FINRA Rule 2330 suitability standards.
4. Everest Funeral Concierge: 24/7 family advocacy and 24-48 hour expedited cash payout.
5. Veteran Wealth Shield: bypassing escalating VGLI rates and military pension maximization.

Strict Phone Spoken Rules:
- Keep all responses conversational, concise, and spoken (maximum 1 or 2 spoken sentences).
- NEVER use markdown, bullet points, asterisks, or tables; your response is synthesized into audio.
- If the caller asks to speak with Angel, a human advisor, or an agent, immediately let them know you are connecting them.`;
}

/**
 * Fallback knowledge responder when Gemini key is not set
 */
function getHeuristicVoiceReply(query: string, lang: "en" | "es"): string {
  const lower = query.toLowerCase();

  if (lang === "es") {
    if (lower.includes("iul") || lower.includes("piso") || lower.includes("mercado") || lower.includes("inversión")) {
      return "El seguro de vida universal indexado cuenta con un piso garantizado del 0%, lo que significa que su capital nunca disminuye cuando el mercado cae, y puede acceder a ingresos libres de impuestos bajo la sección 7702 del IRS.";
    }
    if (lower.includes("enfermedad") || lower.includes("beneficio") || lower.includes("salud")) {
      return "Nuestras pólizas incluyen beneficios en vida acelerados que le permiten recibir dinero en efectivo libre de impuestos si enfrenta una enfermedad crítica, crónica o terminal.";
    }
    if (lower.includes("anualidad") || lower.includes("retiro") || lower.includes("pensión")) {
      return "Diseñamos anualidades con ingresos garantizados de por vida bajo la regla 2330 de FINRA, asegurando que sus fondos de retiro nunca se agoten.";
    }
    if (lower.includes("veterano") || lower.includes("militar") || lower.includes("vgli")) {
      return "Ayudamos a veteranos y personal militar a evitar el aumento drástico en las primas de VGLI y a maximizar su pensión militar con pólizas de primer nivel.";
    }
    return "Puedo orientarle sobre seguros de vida IUL, beneficios en vida, anualidades garantizadas o agendar una consulta directa con Angel Burgos. ¿Qué le gustaría consultar?";
  }

  if (lower.includes("iul") || lower.includes("floor") || lower.includes("market") || lower.includes("crash")) {
    return "Our Indexed Universal Life policies feature a guaranteed 0% annual floor, ensuring you never lose principal during market drops while enjoying tax-free policy loans under IRS Section 7702.";
  }
  if (lower.includes("living") || lower.includes("illness") || lower.includes("critical")) {
    return "Living benefits allow you to advance up to 100% of your policy's death benefit tax-free if diagnosed with a qualifying critical, chronic, or terminal condition.";
  }
  if (lower.includes("annuity") || lower.includes("retirement") || lower.includes("income")) {
    return "We structure guaranteed lifetime annuities compliant with FINRA Rule 2330, creating a private pension you can never outlive.";
  }
  if (lower.includes("veteran") || lower.includes("military") || lower.includes("vgli")) {
    return "Our Veteran Wealth Shield helps service members bypass the steep VGLI rate increases and maximize their retirement pension.";
  }
  return "I can answer questions regarding 0% floor IUL policies, living benefits, guaranteed annuities, or transfer you directly to Angel. How can I assist you?";
}

// 3. WebSocket Server: Manages live interaction with Twilio ConversationRelay
wss.on("connection", (ws: WebSocket) => {
  console.log("[ConversationRelay] WebSocket client connected.");

  let callSid = "unknown";
  let detectedLang: "en" | "es" = "en";
  let conversationHistory: Array<{ role: "user" | "model" | "assistant"; text: string }> = [];

  ws.on("message", async (data: Buffer | string) => {
    try {
      const msg = JSON.parse(data.toString());

      // Setup event received upon call connection
      if (msg.type === "setup") {
        callSid = msg.callSid || "unknown";
        console.log(`[ConversationRelay] Session setup for CallSid: ${callSid}`);
        return;
      }

      // Interrupt event: caller spoke over the assistant audio
      if (msg.type === "interrupt") {
        console.log(`[ConversationRelay] Caller interrupted playback on CallSid: ${callSid}`);
        return;
      }

      // Prompt event: received transcribed speech from Deepgram STT via Twilio
      if (msg.type === "prompt") {
        const callerText: string = (msg.voicePrompt || "").trim();
        if (!callerText) return;

        console.log(`[ConversationRelay] Caller (${callSid}) said: "${callerText}"`);

        // Detect Spanish intent
        const lower = callerText.toLowerCase();
        if (
          lower.includes("español") ||
          lower.includes("spanish") ||
          lower.includes("hola") ||
          lower.includes("buenas") ||
          lower.includes("ayuda") ||
          lower.includes("seguro")
        ) {
          detectedLang = "es";
        }

        // Check for transfer / live human agent intent
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

        const isTransferRequested = transferKeywords.some((keyword) => lower.includes(keyword));

        if (isTransferRequested) {
          const transferSpoken =
            detectedLang === "es"
              ? "Entendido. Con mucho gusto le comunico con Angel Burgos en este momento. Un segundo por favor."
              : "Understood. I am connecting you with Angel Burgos right now. Please hold for just a moment.";

          // 1. Send immediate spoken confirmation to caller
          ws.send(
            JSON.stringify({
              type: "text",
              token: transferSpoken,
              last: true,
            })
          );

          // 2. Instruct Twilio ConversationRelay to end and trigger action webhook
          ws.send(
            JSON.stringify({
              type: "end",
              handoffData: JSON.stringify({
                reasonCode: "live-agent-handoff",
                reason: "Caller requested direct access to Angel Burgos",
                callSid,
                callerPrompt: callerText,
                language: detectedLang,
              }),
            })
          );

          console.log(`[ConversationRelay] Handoff initiated for CallSid: ${callSid}`);
          return;
        }

        // Generate response via Gemini or resilient domain heuristic
        let replyText = "";

        if (geminiClient && GEMINI_API_KEY) {
          try {
            const systemPrompt = buildVoiceSystemPrompt(detectedLang);

            // Format past turns for context
            const contents = [
              ...conversationHistory.map((h) => ({
                role: h.role === "assistant" ? "model" : h.role,
                parts: [{ text: h.text }],
              })),
              {
                role: "user",
                parts: [{ text: callerText }],
              },
            ];

            const response = await geminiClient.models.generateContent({
              model: "gemini-2.5-flash",
              contents: contents as any,
              config: {
                systemInstruction: systemPrompt,
                temperature: 0.2,
                maxOutputTokens: 180,
              },
            });

            replyText = response.text?.trim() || "";
            // Sanitize any stray markdown
            replyText = replyText.replace(/[*_#`]/g, "").replace(/\n+/g, " ");
          } catch (geminiError: any) {
            console.warn("[ConversationRelay] Gemini generation error, using domain heuristic:", geminiError?.message);
            replyText = getHeuristicVoiceReply(callerText, detectedLang);
          }
        } else {
          replyText = getHeuristicVoiceReply(callerText, detectedLang);
        }

        if (!replyText) {
          replyText =
            detectedLang === "es"
              ? "Puedo brindarle detalles sobre nuestras pólizas de vida y anualidades, o transferirle con Angel. ¿Qué prefiere?"
              : "I can explain our life and annuity strategies or connect you directly with Angel. How would you like to proceed?";
        }

        // Keep last 4 turns for context
        conversationHistory.push({ role: "user", text: callerText });
        conversationHistory.push({ role: "model", text: replyText });
        if (conversationHistory.length > 8) {
          conversationHistory = conversationHistory.slice(-8);
        }

        // Stream text token back to Twilio ConversationRelay
        ws.send(
          JSON.stringify({
            type: "text",
            token: replyText,
            last: true,
          })
        );
      }
    } catch (err) {
      console.error("[ConversationRelay] WebSocket message processing error:", err);
    }
  });

  ws.on("close", () => {
    console.log(`[ConversationRelay] WebSocket closed for CallSid: ${callSid}`);
  });

  ws.on("error", (err) => {
    console.error(`[ConversationRelay] WebSocket socket error:`, err);
  });
});

// Start HTTP & WebSocket Server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`[MyIAD Voice Relay] Listening on port ${PORT} (0.0.0.0)`);
  console.log(`[MyIAD Voice Relay] Webhook: POST http://localhost:${PORT}/voice/incoming`);
  console.log(`[MyIAD Voice Relay] WebSocket: ws://localhost:${PORT}/ws/agent`);
  console.log(`[MyIAD Voice Relay] Direct phone transfer target: ${ANGEL_DIRECT_PHONE}`);
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("[MyIAD Voice Relay] SIGTERM received, closing server...");
  server.close(() => {
    process.exit(0);
  });
});
