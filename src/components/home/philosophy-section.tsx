"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";

export function PhilosophySection() {
  return (
    <section className="py-16 md:py-20 bg-background-elevated">

      <div className="page-container">

        <FadeIn className="max-w-3xl mx-auto text-center" delay={0.2}>
          <motion.div
            initial={{ opacity: 0.8, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-8"
          >

            <p className="editorial-subheading">
              Philosophy
            </p>

            <h2 className="font-display text-display-xl text-balance leading-[0.96]">
              Clothing without excess.
            </h2>

            <p className="editorial-prose text-editorial-lg text-foreground-muted max-w-2xl mx-auto">
              We focus on proportion, material, and durability rather than trend
              cycles and seasonal noise.
            </p>

          </motion.div>
        </FadeIn>

      </div>
    </section>
  );
}