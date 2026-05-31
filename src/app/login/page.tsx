"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/motion/page-transition";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectTo = searchParams.get("redirect") || "/account";

  /* AUTO REDIRECT IF LOGGED IN */
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !password) {
        setError("Fill in all fields");
        return;
      }

      await login(cleanEmail, password);

      router.replace(redirectTo);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center pt-32 pb-section">

        <div className="page-container max-w-xl w-full">

          {/* HEADER */}
          <header className="mb-20">
            <p className="editorial-subheading mb-6">Account</p>
            <h1 className="font-display text-display-xl leading-[0.95]">
              Sign in
            </h1>
          </header>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-14">

            <div className="space-y-10">

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-[0.18em]">
                  Email
                </Label>

                <Input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-base"
                  placeholder="name@email.com"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-[0.18em]">
                  Password
                </Label>

                <Input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-base"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

          </form>

          {/* FOOTER */}
          <p className="mt-16 text-center text-sm text-foreground-subtle">
            No account yet?{" "}
            <Link
              href="/signup"
              className="text-foreground hover:text-foreground-muted transition-colors"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>
    </PageTransition>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}