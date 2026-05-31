"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";
import { IMAGES } from "@/lib/images";

export function MaterialSection() {
  return (
    <section className="py-16 md:py-20">

      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* IMAGE */}
          <FadeIn delay={0.1}>
            <motion.div
              initial={{ opacity: 0.8, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={IMAGES.home.materialFleece}
                alt="Material detail — heavyweight fleece"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </FadeIn>

          {/* TEXT */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">

              <div>
                <p className="editorial-subheading mb-5">
                  Construction
                </p>

                <h2 className="editorial-heading mb-6">
                  Material Focused
                </h2>

                <p className="editorial-prose text-editorial-lg max-w-md text-foreground-muted">
                  Heavyweight cottons, structured fleece, and durable construction
                  designed for repeated wear.
                </p>
              </div>

              <ul className="space-y-6 text-sm text-foreground-subtle">
                {[
                  "480gsm brushed fleece",
                  "Japanese selvedge denim",
                  "Italian wool blends",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-5">
                    <span className="h-px w-10 bg-foreground/30" />
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}