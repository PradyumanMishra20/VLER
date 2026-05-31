"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/motion/page-transition";
import { IMAGES } from "@/lib/images";

const scenes = IMAGES.lookbook.scenes;

export default function LookbookPage() {
  return (
    <PageTransition>
      <div className="pt-24 md:pt-28">

        {/* HEADER */}
        <div className="page-container mb-16 md:mb-24">
          <p className="editorial-subheading mb-3">Lookbook</p>

          <h1 className="editorial-heading">
            Fall / Winter 25
          </h1>

          <p className="mt-6 max-w-md text-sm text-foreground-muted leading-relaxed">
            An editorial study in proportion, layering, and restrained silhouettes
            for transitional weather.
          </p>
        </div>

        {/* SCENES */}
        {scenes.map((scene, i) => {

          const isPriority = i === 0 || i === 1;

          return (
            <motion.section
              key={scene.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative min-h-[90vh] md:min-h-screen flex items-end overflow-hidden"
            >

              {/* IMAGE LAYER */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={scene.src}
                  alt={scene.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={isPriority}
                  quality={90}
                />
              </motion.div>

              {/* GRADIENT CONTROL */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

              {/* TEXT LAYER */}
              <div className="relative z-10 w-full page-container pb-14 md:pb-24">

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="editorial-subheading mb-4 text-foreground-subtle"
                >
                  {scene.caption}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="font-display text-display-lg text-foreground max-w-2xl leading-[0.95]"
                >
                  {scene.title}
                </motion.h2>

              </div>

            </motion.section>
          );
        })}

      </div>
    </PageTransition>
  );
}