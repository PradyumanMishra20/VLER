"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { useAuthStore } from "@/store/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/motion/page-transition";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { signup, isAuthenticated } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectTo = searchParams.get("redirect") || "/account";

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const { name, email, password } = form;

      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      await signup(name.trim(), email.trim().toLowerCase(), password);

      router.replace(redirectTo);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        <div className="page-container relative flex min-h-screen items-center justify-center py-32">
          <div className="w-full max-w-xl border border-border/60 bg-background/70 p-8 backdrop-blur-2xl md:p-12">
            
            <header className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-foreground-subtle">
                Create account
              </p>

              <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.92] tracking-tight text-foreground">
                Join the VELR archive
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground-subtle">
                Access orders, wishlist, and exclusive drops.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-7">

                <div className="space-y-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <div className="border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-14 w-full border border-white/10 bg-white text-black hover:bg-white/90"
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-12 border-t border-border/50 pt-8 text-center">
              <p className="text-sm text-foreground-subtle">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-foreground hover:opacity-60"
                >
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}