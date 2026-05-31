"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-section">
      <div className="page-container max-w-2xl text-center">
        <p className="editorial-subheading mb-6">Error</p>
        <h1 className="font-display text-display-xl mb-8">
          Something went wrong
        </h1>
        <p className="text-sm text-foreground-muted mb-12 leading-relaxed">
          We encountered an unexpected error. This has been logged and our team
          has been notified.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
