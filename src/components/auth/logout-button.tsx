"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function LogoutButton({ children, className = "" }: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`${className} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      type="button"
    >
      {children || (loading ? "Signing out..." : "Sign Out")}
    </button>
  );
}
