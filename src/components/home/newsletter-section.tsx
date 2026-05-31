"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="py-16 md:py-20 border-t border-border">

      <div className="page-container">

        <FadeIn
          className="max-w-xl mx-auto text-center"
          delay={0.25}
        >
          <motion.div
            initial={{ opacity: 0.8, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <p className="editorial-subheading mb-6">
              Newsletter
            </p>

            <h2 className="editorial-heading mb-6">
              Join the Archive
            </h2>

            <p className="editorial-prose mb-10 text-foreground-muted">
              Early access to releases, editorials, and limited collection drops.
            </p>

          </motion.div>

          {/* FORM WRAP */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-md mx-auto"
          >
            <NewsletterForm />
          </motion.div>

        </FadeIn>

      </div>
    </section>
  );
}