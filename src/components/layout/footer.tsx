import Image from "next/image";
import Link from "next/link";
import { BRAND, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { BRAND_ASSETS } from "@/lib/brand";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated">

      <div className="page-container py-section">

        <div className="grid gap-16 lg:grid-cols-12">

          {/* BRAND */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src={BRAND_ASSETS.logo}
                alt={BRAND.name}
                width={100}
                height={28}
                className="h-7 w-auto object-contain opacity-90"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {BRAND.tagline}
            </p>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">

            {/* NAV */}
            <div>
              <h4 className="editorial-subheading mb-6">
                Navigate
              </h4>

              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h4 className="editorial-subheading mb-6">
                Support
              </h4>

              <ul className="space-y-3 text-sm text-foreground-muted">
                <li>
                  <Link href="/account" className="hover:text-foreground transition-colors">
                    Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="editorial-subheading mb-6">
                Connect
              </h4>

              <ul className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* NEWSLETTER */}
          <div className="lg:col-span-3">
            <h4 className="editorial-subheading mb-6">
              Join the Archive
            </h4>

            <p className="mb-6 text-sm text-foreground-muted">
              Early access to drops and editorial releases.
            </p>

            <NewsletterForm compact />
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-foreground-subtle">
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Terms
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}