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
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
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
  className="
    space-y-8
    rounded-3xl
    border
    border-border/40
    bg-background-elevated/20
    p-8
    md:p-10
    backdrop-blur-sm
  "
>
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    disabled={status === "loading"}
                    className="h-14 border-border/60 bg-background/40 px-5 backdrop-blur-sm transition-all duration-300 focus-visible:border-white/30 focus-visible:ring-0"
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
                    placeholder="you@example.com"
                    required
                    disabled={status === "loading"}
                    className="h-14 border-border/60 bg-background/40 px-5 backdrop-blur-sm transition-all duration-300 focus-visible:border-white/30 focus-visible:ring-0"
                  />
                
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject
                  </Label>

                  <Input
                   id="subject"
                   name="subject"
                   placeholder="Order inquiry"
                   required
                   disabled={status === "loading"}
                   className="h-14 border-border/60 bg-background/40 px-5 backdrop-blur-sm transition-all duration-300 focus-visible:border-white/30 focus-visible:ring-0"
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
                  placeholder="Tell us how we can help..."
                  required
                  disabled={status === "loading"}
                  className=" w-full min-h-[180px] rounded-xl border border-border/60 bg-background/40 px-5 py-4 text-sm backdrop-blur-sm transition-all duration-300 resize-none focus:border-white/30 focus:outline-none disabled:opacity-50"
                  />
                </div>
                   <p className="text-xs text-foreground-subtle">
                    We typically respond {" "}
                    {BRAND.responseTime.toLowerCase()}.
                   </p>
                <Button
                 type="submit"
                 disabled={status === "loading"}
                 className="w-full sm:w-auto min-w-[220px] h-14"
                >
                  {status === "loading"
  ? "Delivering Message..."
  : "Send Message"}
                </Button>

               {status === "success" && (
  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 backdrop-blur-sm">
    <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">
      Message Received
    </p>

    <p className="mt-3 text-sm leading-relaxed text-foreground">
      Thank you for contacting VELR.
      Your message has been delivered successfully and is now under review.
    </p>

    <p className="mt-3 text-xs text-foreground-muted">
      A confirmation email should arrive shortly.
      Our team typically responds {" "}
      {BRAND.responseTime.toLowerCase()}.
    </p>
  </div>
)}

               {status === "error" && (
  <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5 backdrop-blur-sm">
    <p className="text-xs uppercase tracking-[0.18em] text-red-400">
      Delivery Failed
    </p>

    <p className="mt-3 text-sm text-foreground">
      Your message could not be delivered at this time.
    </p>

    <p className="mt-2 text-xs text-foreground-muted">
      Please try again in a few moments or contact us directly at{" "}
      {BRAND.email}.
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