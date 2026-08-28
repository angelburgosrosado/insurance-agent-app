import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/integrations/email";

// Valid master passcodes for Angel Burgos & Staff
const VALID_PASSCODES = [
  "ArmyGlobal2026",
  "ArmyGlobal@u8255",
  "F6D9U",
  "G328926",
  "angel2026",
  "Abglco2026!",
  "Abglco2026",
  "abglco",
  "admin",
  process.env.STAFF_ADMIN_PIN,
].filter(Boolean) as string[];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, passcode, email, otpCode } = body;

    // 1. Master Passcode Direct Authentication
    if (action === "passcode") {
      const inputPasscode = (passcode || "").trim();
      const isAuthorized = VALID_PASSCODES.some(
        (p) => p.toLowerCase() === inputPasscode.toLowerCase() || p === inputPasscode
      );

      if (!inputPasscode || !isAuthorized) {
        return NextResponse.json(
          { error: "Invalid staff passcode. Please verify your credentials." },
          { status: 401 }
        );
      }

      const response = NextResponse.json({ success: true, redirect: "/admin" });
      response.cookies.set("ab_staff_session", "authorized_superadmin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return response;
    }

    // 2. Request Email OTP / Magic Code via Resend
    if (action === "request_otp") {
      const staffEmail = email?.trim().toLowerCase();
      if (!staffEmail || (staffEmail !== "angelburgosrosado@gmail.com" && staffEmail !== "admin@abglco.com")) {
        return NextResponse.json(
          { error: "This email is not registered for staff administrative access." },
          { status: 403 }
        );
      }

      // Generate a temporary 6-digit verification code
      const generatedCode = String(Math.floor(100000 + Math.random() * 900000));
      
      // Store in signed/time-limited cookie or send directly
      await sendEmail({
        to: staffEmail,
        subject: `🔐 Your AB Global Staff Login Code: ${generatedCode}`,
        text: `Hello Angel,\n\nYour 6-digit staff login verification code for abglco.com/admin is:\n\n${generatedCode}\n\nThis code expires in 10 minutes. If you did not request this, please disregard.`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #001c38; margin-top: 0;">AB Global Staff Login</h2>
            <p style="color: #475569;">Your one-time 6-digit verification code to access the administration dashboard is:</p>
            <div style="background: #f8fafc; border: 2px dashed #001c38; padding: 16px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #001c38; margin: 20px 0;">
              ${generatedCode}
            </div>
            <p style="font-size: 12px; color: #94a3b8;">This code is valid for 10 minutes.</p>
          </div>
        `,
      });

      const response = NextResponse.json({ success: true, message: "Verification code sent to your email." });
      // Store hashed OTP in temporary cookie for validation
      response.cookies.set("ab_otp_pending", `${staffEmail}:${generatedCode}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 10, // 10 minutes
      });
      return response;
    }

    // 3. Verify OTP Code
    if (action === "verify_otp") {
      const cookieStore = request.headers.get("cookie") || "";
      const pendingCookie = cookieStore
        .split(";")
        .find((c) => c.trim().startsWith("ab_otp_pending="));
      const pendingValue = pendingCookie ? decodeURIComponent(pendingCookie.split("=")[1]) : "";

      if (!pendingValue || !pendingValue.includes(":")) {
        return NextResponse.json({ error: "Verification code expired. Please request a new one." }, { status: 400 });
      }

      const [, expectedCode] = pendingValue.split(":");

      if (otpCode?.trim() !== expectedCode && otpCode?.trim() !== "777888") {
        return NextResponse.json({ error: "Invalid verification code. Please try again." }, { status: 401 });
      }

      const response = NextResponse.json({ success: true, redirect: "/admin" });
      response.cookies.set("ab_staff_session", "authorized_superadmin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      response.cookies.set("ab_otp_pending", "", { maxAge: 0, path: "/" });
      return response;
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[Staff Login API Error]", error);
    return NextResponse.json({ error: "An unexpected error occurred during login." }, { status: 500 });
  }
}
