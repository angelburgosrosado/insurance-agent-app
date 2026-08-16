import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/env";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const config = getSupabaseConfig();
    const cookieStore = await cookies();
    
    if (!config.configured) {
      return NextResponse.json({ error: "Configuration missing" }, { status: 500 });
    }

    const supabase = createServerClient(config.url, config.publishableKey, {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {}
      }
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Since we're using a standard HTML form POST on the frontend for simplicity right now:
    const formData = await request.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const consent = formData.get("consent") === "on";

    const prisma = getPrismaClient();

    // Check if lead exists based on auth email
    let lead = await prisma.lead.findFirst({
      where: { email: user.email }
    });

    const consentVersion = "v1.0-portal-update";
    const consentTimestamp = new Date();

    if (lead) {
      // Update existing lead
      // Only log consent change if it actually changed
      const consentChanged = lead.consent !== consent;
      
      lead = await prisma.lead.update({
        where: { id: lead.id },
        data: {
          firstName: firstName || lead.firstName,
          lastName: lastName || lead.lastName,
          phone: phone || lead.phone,
          consent: consent,
          ...(consentChanged ? { consentVersion, consentTimestamp } : {})
        }
      });

      if (consentChanged) {
        // Log Audit Event
        await prisma.auditEvent.create({
          data: {
            actor: user.email,
            action: "UPDATE_CONSENT",
            entity: "LEAD",
            entityId: lead.id,
            metadata: JSON.stringify({ consent, version: consentVersion })
          }
        });
      }
    } else {
      // Create a lead shell if they signed up but have no record yet
      lead = await prisma.lead.create({
        data: {
          firstName: firstName || "",
          lastName: lastName || "",
          email: user.email,
          phone: phone || null,
          service: "business-consulting", // default requirement for DB
          consent: consent,
          consentVersion,
          consentTimestamp,
          status: "new",
        }
      });

      await prisma.auditEvent.create({
        data: {
          actor: user.email,
          action: "CREATE_PORTAL_LEAD",
          entity: "LEAD",
          entityId: lead.id,
          metadata: JSON.stringify({ method: "portal_profile" })
        }
      });
    }

    // Redirect back to profile on success
    return NextResponse.redirect(new URL("/portal/profile", request.url));
  } catch (error) {
    console.error("[API_PORTAL_PROFILE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
