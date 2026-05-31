"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

import { BRAND, SOCIAL_LINKS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/motion/page-transition";
import { FadeIn } from "@/components/motion/fade-in";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
  if (status !== "success") return;

  const timer = window.setTimeout(() => {
    setStatus("idle");
  }, 5000);

  return () => window.clearTimeout(timer);
}, [status]);

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (status === "loading") return;

  const formElement = e.currentTarget;

  setStatus("loading");

  try {
    const form = new FormData(formElement);

    const templateParams = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      subject: String(form.get("subject") || "").trim(),
      message: String(form.get("message") || "").trim(),
    };

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !templateParams.name ||
      !templateParams.email ||
      !templateParams.subject ||
      !templateParams.message
    ) {
      throw new Error("Missing required fields");
    }

    if (!emailRegex.test(templateParams.email)) {
      throw new Error("Invalid email address");
    }

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    formElement.reset();
    setStatus("success");
  } catch (error) {
    console.error("Contact form error:", error);
    setStatus("error");

    // Optional: auto-hide error after 5 seconds
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  }
};

  return (
    <PageTransition>
      <div className="pt-24 md:pt-28 pb-section">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left Side */}
            <FadeIn>
              <p className="editorial-subheading mb-6">
                Contact
              </p>

              <h1 className="editorial-heading mb-8">
                Get in touch
              </h1>

              <div className="space-y-8 text-sm text-foreground-muted">

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-foreground-subtle mb-2">
                    Email
                  </p>

                  <a
                    href={`mailto:${BRAND.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {BRAND.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-foreground-subtle mb-2">
                    Response Time
                  </p>

                  <p>{BRAND.responseTime}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-foreground-subtle mb-2">
                    Social
                  </p>

                  <ul className="space-y-2">
                    {SOCIAL_LINKS.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.15}>
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject
                  </Label>

                  <Input
                    id="subject"
                    name="subject"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message
                  </Label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    disabled={status === "loading"}
                    className="w-full border-b border-border-strong bg-transparent py-3 text-sm focus:outline-none resize-none disabled:opacity-50"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  {status === "loading"
                    ? "Sending..."
                    : "Send Message"}
                </Button>

                {status === "success" && (
                  <div className="rounded-md border border-green-500/20 bg-green-500/5 px-4 py-3">
                    <p className="text-sm text-green-400">
                      Message sent successfully.
                    </p>

                    <p className="mt-1 text-xs text-foreground-muted">
                      Response usually within{" "}
                      {BRAND.responseTime.toLowerCase()}.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-md border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="text-sm text-red-400">
                      Something went wrong.
                    </p>

                    <p className="mt-1 text-xs text-foreground-muted">
                      Please try again in a few moments.
                    </p>
                  </div>
                )}
              </form>
            </FadeIn>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}