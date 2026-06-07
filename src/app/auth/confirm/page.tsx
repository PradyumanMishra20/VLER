"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const badgeMotion = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardMotion = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ConfirmPage() {
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (countdown <= 0) {
      router.replace("/login");
      return;
    }

    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown, router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),transparent_22%),linear-gradient(180deg,#020617_0%,#070b14_42%,#05070d_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.12),transparent_30%,rgba(15,23,42,0.12))]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(148,163,184,0.04),rgba(148,163,184,0.04)_1px,transparent_1px,transparent_80px),repeating-linear-gradient(180deg,rgba(148,163,184,0.04),rgba(148,163,184,0.04)_1px,transparent_1px,transparent_80px)] opacity-20" />

      <motion.div
        className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center px-6 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }}
      >
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-8 top-1/3 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-44 w-44 rounded-full bg-violet-500/8 blur-3xl" />

        <motion.section
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-[0_48px_96px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:p-10"
          variants={cardMotion}
          initial="initial"
          animate="animate"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-300 shadow-sm shadow-slate-950/20">
                Verified securely
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/20 via-slate-900 to-slate-800 shadow-[0_32px_64px_rgba(14,165,233,0.18)] ring-1 ring-cyan-400/15 backdrop-blur-xl">
                  <motion.span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-4xl"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } }}
                  >
                    ✅
                  </motion.span>
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                    Email Verified Successfully
                  </h1>
                  <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    Your account has been confirmed and is ready to use.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="flex w-full flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_48px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:w-auto"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.55, delay: 0.12, ease: "easeOut" } }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                  Redirecting in
                </p>
                <motion.span
                  className="rounded-full bg-slate-950/80 px-3 py-1 text-sm font-semibold text-slate-100 ring-1 ring-white/10"
                  variants={badgeMotion}
                  initial="initial"
                  animate="animate"
                  aria-live="polite"
                >
                  {countdown}s
                </motion.span>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                You will be taken to the login page automatically. You can also continue manually.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-[1fr_auto]">
            <Button size="lg" className="rounded-3xl px-8 py-4 shadow-[0_18px_40px_rgba(14,165,233,0.16)]">
              <Link href="/login">Continue to Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-3xl px-8 py-4 text-slate-100 hover:text-white hover:border-white/30">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-white/5 bg-slate-950/70 p-5 text-sm text-slate-400 shadow-[0_24px_56px_rgba(15,23,42,0.25)]">
            <p className="font-medium text-slate-200">Your email has been securely verified.</p>
            <p className="mt-2 leading-6 text-slate-400">
              We protect every step of your sign-in experience with premium security and modern authentication flows.
            </p>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
