"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IMAGES } from "@/lib/images";

const slides = IMAGES.home.heroSlides;

export function CinematicSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    let interval: NodeJS.Timeout;

    // waits for intro loader to finish first
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setActive((prev) => (prev + 1) % slides.length);
      }, 4000);
    }, 3500);

    return () => {
      clearTimeout(startDelay);

      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const currentSrc = slides[active];

  return (
    <section className="relative min-h-[200vh] overflow-hidden bg-background">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentSrc}
            alt="VELR collection"
            fill
            priority={active === 0}
            sizes="100vw"
            className="object-cover object-top"
            quality={100}
          />

          {/* cinematic overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* luxury gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}