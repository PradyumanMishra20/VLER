"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    // 1. initial session sync
    checkAuth();

    // 2. live auth state sync (THIS IS WHAT YOU'RE MISSING)
    const { data } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    // cleanup
    return () => {
      data.subscription.unsubscribe();
    };
  }, [checkAuth]);

  return <>{children}</>;
}