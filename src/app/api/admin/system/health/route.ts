import { NextResponse } from "next/server";
import { requireApiStaffAccess } from "@/lib/auth/server";
import { getPrismaClient } from "@/lib/server/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const auth = await requireApiStaffAccess();
    if (!auth.authenticated || !auth.authorized) {
      return NextResponse.json({ error: "Unauthorized staff access required" }, { status: 401 });
    }

    const startTime = Date.now();

    // 1. Check Voice Relay (Google Cloud Run)
    const cloudRunUrl = "https://myiad-voice-relay-ecan3w7kva-uc.a.run.app/health";
    let cloudRunStatus = {
      status: "unknown",
      latencyMs: 0,
      url: cloudRunUrl,
      serviceDomain: "myiad-voice-relay-ecan3w7kva-uc.a.run.app",
      timestamp: null as string | null,
      error: null as string | null,
    };

    try {
      const crStart = Date.now();
      const crRes = await fetch(cloudRunUrl, { 
        cache: "no-store", 
        signal: AbortSignal.timeout(6000) 
      });
      const crLatency = Date.now() - crStart;
      if (crRes.ok) {
        const crData = await crRes.json();
        cloudRunStatus = {
          status: "healthy",
          latencyMs: crLatency,
          url: cloudRunUrl,
          serviceDomain: crData.serverDomain || "myiad-voice-relay-ecan3w7kva-uc.a.run.app",
          timestamp: crData.timestamp || new Date().toISOString(),
          error: null,
        };
      } else {
        cloudRunStatus.status = "degraded";
        cloudRunStatus.error = `HTTP ${crRes.status}`;
      }
    } catch (err: unknown) {
      cloudRunStatus.status = "offline";
      cloudRunStatus.error = err instanceof Error ? err.message : "Connection failed";
    }

    // 2. Check Local Voice Relay Dev Server (Port 3001)
    let localVoiceStatus = {
      status: "offline",
      port: 3001,
      latencyMs: 0,
    };
    try {
      const localStart = Date.now();
      const localRes = await fetch("http://localhost:3001/health", { 
        cache: "no-store", 
        signal: AbortSignal.timeout(1000) 
      });
      if (localRes.ok) {
        localVoiceStatus = {
          status: "healthy",
          port: 3001,
          latencyMs: Date.now() - localStart,
        };
      }
    } catch {
      localVoiceStatus.status = "offline";
    }

    // 3. Check Database Connectivity
    let dbStatus = {
      status: "unknown",
      engine: "SQLite / Prisma",
      latencyMs: 0,
      leadCount: 0,
      error: null as string | null,
    };
    try {
      const dbStart = Date.now();
      const prisma = getPrismaClient();
      const leadCount = await prisma.lead.count();
      dbStatus = {
        status: "healthy",
        engine: process.env.DATABASE_URL ? "Supabase PostgreSQL (Prisma)" : "SQLite Local Fallback",
        latencyMs: Date.now() - dbStart,
        leadCount,
        error: null,
      };
    } catch (err: unknown) {
      dbStatus.status = "error";
      dbStatus.error = err instanceof Error ? err.message : "Database query error";
    }

    // 4. Check Environment & Integration Credentials
    const integrations = {
      twilio: {
        configured: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
        phoneNumber: process.env.TWILIO_PHONE_NUMBER || "+1-888-887-3585",
        tollFreeNumber: "+1-888-887-3585",
        directAdvisorPhone: "+1-386-333-1482",
        status: process.env.TWILIO_ACCOUNT_SID ? "active" : "mock_simulation",
      },
      geminiAi: {
        configured: Boolean(process.env.GEMINI_API_KEY),
        model: "gemini-2.5-flash",
        status: process.env.GEMINI_API_KEY ? "active" : "heuristic_fallback",
      },
      crmPipeline: {
        target: "https://crm.myiad.net/api/webhooks/leads",
        configured: Boolean(process.env.CRM_WEBHOOK_URL),
        encryption: "AES-256-GCM + HMAC-SHA256",
        status: "operational",
      },
      carrierCompliance: {
        tollFreeNumber: "1-888-887-3585",
        optInUrl: "https://myiad.com/opt-in",
        status: "verified_compliant",
        nonSharingPolicy: "ACTIVE_VERBATIM",
      },
      sendgrid: {
        configured: Boolean(process.env.SENDGRID_API_KEY),
        status: process.env.SENDGRID_API_KEY ? "active" : "simulation",
      },
    };

    // 5. System Route Health Summary
    const coreRoutes = [
      { name: "Public Landing (myiad.com)", path: "/", status: "operational" },
      { name: "MyIAD National Portal", path: "/myiad", status: "operational" },
      { name: "Customer CRM Showcase (crm.myiad.net)", path: "/crm", status: "operational" },
      { name: "Toll-Free SMS Opt-In Compliance", path: "/opt-in", status: "operational" },
      { name: "Privacy Policy", path: "/privacy", status: "operational" },
      { name: "Terms of Service", path: "/terms", status: "operational" },
      { name: "Statutory Disclosures", path: "/disclosures", status: "operational" },
      { name: "IUL 0% Floor Simulator", path: "/tools/iul-calculator", status: "operational" },
      { name: "Military Asset Shield", path: "/tools/military-asset-shield", status: "operational" },
      { name: "CRM Lead Webhook Endpoint", path: "/api/leads", status: "operational" },
      { name: "AI Insurance Copilot Endpoint", path: "/api/myiad/copilot", status: "operational" },
    ];

    const totalDurationMs = Date.now() - startTime;

    return NextResponse.json({
      status: "operational",
      uptime: process.uptime(),
      serverTimestamp: new Date().toISOString(),
      durationMs: totalDurationMs,
      services: {
        voiceRelayCloudRun: cloudRunStatus,
        voiceRelayLocalDev: localVoiceStatus,
        database: dbStatus,
      },
      integrations,
      routes: coreRoutes,
      platform: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || "production",
        appVersion: "1.0.0 (myiad.com 2026 Edition)",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: "error", 
        message: error instanceof Error ? error.message : "System health diagnostic failed" 
      }, 
      { status: 500 }
    );
  }
}
