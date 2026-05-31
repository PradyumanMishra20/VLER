"use client";

import { useAuthStore } from "@/store/auth";
import { PageTransition } from "@/components/motion/page-transition";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="min-h-[70vh] flex items-center justify-center text-center">
          <div className="page-container max-w-md">
            <p className="editorial-subheading mb-4">Account</p>
            <h1 className="font-display text-display-md mb-6">
              Sign in to view your account
            </h1>
            <Button asChild variant="outline">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-24 md:pt-28 pb-section">
        <div className="page-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="editorial-subheading mb-3">Account</p>
              <h1 className="editorial-heading">
                Welcome, {user?.name || "User"}
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Sign out
            </Button>
          </div>

          <div className="border border-border-strong p-12 bg-background-elevated">
            <p className="text-sm text-foreground-muted">
              Account functionality coming soon. Orders, addresses, and wishlist
              will be available here.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}