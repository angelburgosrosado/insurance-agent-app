"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

export async function saveEnvironmentVariables(formData: FormData) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Cannot modify environment variables in production.");
  }

  const keys = [
    "DATABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SENDGRID_API_KEY",
    "CRM_WEBHOOK_URL",
  ];

  const envPath = path.join(process.cwd(), ".env.local");
  
  let currentEnv = "";
  try {
    currentEnv = await fs.readFile(envPath, "utf-8");
  } catch (err: any) {
    // File doesn't exist, start fresh
    if (err.code !== "ENOENT") throw err;
  }

  // Parse existing into a map
  const envMap = new Map<string, string>();
  currentEnv.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      envMap.set(match[1].trim(), match[2].trim());
    }
  });

  // Update with new values
  for (const key of keys) {
    const val = formData.get(key);
    if (typeof val === "string" && val.trim() !== "") {
      envMap.set(key, val.trim());
    }
  }

  // Write back
  const newEnvContent = Array.from(envMap.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("\n") + "\n";

  await fs.writeFile(envPath, newEnvContent, "utf-8");
  
  // Revalidate to reflect changes if necessary
  revalidatePath("/");
  
  return { success: true };
}
