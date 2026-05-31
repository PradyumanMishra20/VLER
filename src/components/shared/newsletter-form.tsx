"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  compact?: boolean;
  className?: string;
}

export function NewsletterForm({ compact, className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className={cn("flex gap-4", compact ? "flex-col" : "flex-col sm:flex-row sm:items-end")}>
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus("idle");
            }}
            aria-label="Email address"
          />
        </div>
        <Button type="submit" variant={compact ? "outline" : "default"} size="sm">
          Subscribe
        </Button>
      </div>
      {status === "success" && (
        <p className="text-xs text-foreground-muted">Welcome to the archive.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-accent">Please enter a valid email.</p>
      )}
    </form>
  );
}
