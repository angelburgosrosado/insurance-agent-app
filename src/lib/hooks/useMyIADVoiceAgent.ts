"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { AssessmentScenario } from "@/lib/myiad-ai-copilot";

export type VoiceAgentStatus =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "error";

export interface VoiceMessage {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: string;
}

export function useMyIADVoiceAgent(scenarioContext?: AssessmentScenario) {
  const [status, setStatus] = useState<VoiceAgentStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [conversation, setConversation] = useState<VoiceMessage[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");
  const [audioVolume, setAudioVolume] = useState<number>(0);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentAudioElementRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasMedia =
        Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      setIsSupported(hasMedia);
    }

    return () => {
      stopSession();
    };
  }, []);

  // Barge-in: immediately stop any playing audio
  const interrupt = useCallback(() => {
    if (currentAudioElementRef.current) {
      currentAudioElementRef.current.pause();
      currentAudioElementRef.current.src = "";
      currentAudioElementRef.current = null;
    }
    if (status === "speaking") {
      setStatus("idle");
    }
  }, [status]);

  // Audio frequency analyzer for soundwave animation
  const startVolumeAnalysis = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioVolume(normalized);

        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (e) {
      console.warn("[Voice Agent] Volume analysis setup notice:", e);
    }
  };

  const stopVolumeAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setAudioVolume(0);
  };

  // Speaks text using Deepgram Aura TTS
  const speakText = useCallback(async (textToSpeak: string) => {
    interrupt();
    setStatus("speaking");

    try {
      const res = await fetch("/api/myiad/voice/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSpeak,
          voice: "aura-asteria-en",
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to synthesize speech with Deepgram Aura");
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioElementRef.current = audio;

      audio.onended = () => {
        setStatus("idle");
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setStatus("idle");
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err: unknown) {
      console.warn("[Voice Agent TTS] Fallback to browser SpeechSynthesis:", err);
      // Seamless browser Web Speech fallback if Deepgram TTS has temporary network barrier
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak.slice(0, 300));
        utterance.rate = 1.05;
        utterance.onend = () => setStatus("idle");
        utterance.onerror = () => setStatus("idle");
        window.speechSynthesis.speak(utterance);
      } else {
        setStatus("idle");
      }
    }
  }, [interrupt]);

  // Processes user speech: Copilot reasoning -> TTS playback
  const processUserTranscript = useCallback(
    async (transcriptText: string) => {
      const trimmed = transcriptText.trim();
      if (!trimmed) {
        setStatus("idle");
        return;
      }

      const userMessage: VoiceMessage = {
        id: `user_${Date.now()}`,
        role: "user",
        text: trimmed,
        timestamp: new Date().toISOString(),
      };

      setConversation((prev) => [...prev, userMessage]);
      setCurrentTranscript("");
      setStatus("thinking");

      try {
        const copilotRes = await fetch("/api/myiad/copilot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: trimmed,
            scenario: scenarioContext,
            lang: /seguro|póliza|anualidad|hola|vida/i.test(trimmed) ? "es" : "en",
          }),
        });

        const copilotData = await copilotRes.json();
        const answerText =
          copilotData?.answer ||
          "I understand your goal. Let's schedule a 15-minute consultation to review your custom blueprint.";

        const agentMessage: VoiceMessage = {
          id: `agent_${Date.now()}`,
          role: "agent",
          text: answerText,
          timestamp: new Date().toISOString(),
        };

        setConversation((prev) => [...prev, agentMessage]);

        // Speak the clean answer back to the user
        await speakText(answerText);
      } catch (err: unknown) {
        setErrorMessage("Error processing advisory intelligence response.");
        setStatus("idle");
      }
    },
    [scenarioContext, speakText]
  );

  // Starts microphone capture
  const startListening = useCallback(async () => {
    interrupt();
    setErrorMessage("");
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;
      startVolumeAnalysis(stream);

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stopVolumeAnalysis();
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        audioChunksRef.current = [];

        if (audioBlob.size < 1000) {
          setStatus("idle");
          return;
        }

        setStatus("thinking");

        try {
          const sttRes = await fetch("/api/myiad/voice/stt", {
            method: "POST",
            headers: { "Content-Type": mimeType },
            body: audioBlob,
          });

          const sttData = await sttRes.json();
          if (sttData?.transcript) {
            await processUserTranscript(sttData.transcript);
          } else {
            setStatus("idle");
          }
        } catch (sttErr) {
          console.warn("[Voice STT] Error:", sttErr);
          setStatus("idle");
        }
      };

      mediaRecorder.start();
      setStatus("listening");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Microphone permission required.";
      setErrorMessage(msg);
      setStatus("error");
    }
  }, [interrupt, processUserTranscript]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const stopSession = useCallback(() => {
    interrupt();
    stopListening();
    stopVolumeAnalysis();
    setStatus("idle");
  }, [interrupt, stopListening]);

  return {
    status,
    errorMessage,
    conversation,
    currentTranscript,
    audioVolume,
    isSupported,
    startListening,
    stopListening,
    interrupt,
    stopSession,
    speakText,
  };
}
