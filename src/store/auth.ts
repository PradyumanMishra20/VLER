"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  // 🔐 Sync auth state with Supabase session
  checkAuth: async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    const sessionUser = data.session?.user;

    if (!sessionUser) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    set({
      user: {
        id: sessionUser.id,
        name: sessionUser.user_metadata?.name || "User",
        email: sessionUser.email || "",
      },
      isAuthenticated: true,
    });
  },

  // 🔑 Login
  login: async (email, password) => {
    set({ loading: true });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    set({ loading: false });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) return;

    set({
      user: {
        id: data.user.id,
        name: data.user.user_metadata?.name || "User",
        email: data.user.email || "",
      },
      isAuthenticated: true,
    });
  },

  // 🧾 Signup
  signup: async (name, email, password) => {
    set({ loading: true });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    set({ loading: false });

    if (error) {
      throw new Error(error.message);
    }

    // ⚠️ Supabase may return null user if email confirmation is enabled
    const user = data.user;

    if (!user) return;

    set({
      user: {
        id: user.id,
        name,
        email,
      },
      isAuthenticated: true,
    });
  },

  // 🚪 Logout
  logout: async () => {
    await supabase.auth.signOut();

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));