"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { IMAGES } from "@/lib/images";

const slides = IMAGES.home.heroSlides;
const SLIDE_DURATION = 7000;

export function CinematicSlider() {
  const [active, setActive] = useState(0);

  // Preload all images
  useEffect(() => {
    slides.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    let interval: NodeJS.Timeout;

    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setActive((prev) => (prev + 1) % slides.length);
      }, SLIDE_DURATION);
    }, 3500);

    return () => {
      clearTimeout(startDelay);

      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[200vh] overflow-hidden bg-background">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: active === index ? 1 : 0,
            }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              zIndex: active === index ? 2 : 1,
            }}
          >
            <Image
              src={slide}
              alt={`VELR Collection ${index + 1}`}
              fill
              priority={index === 0}
              quality={100}
              sizes="100vw"
              className="object-cover object-top"
            />

            {/* Luxury dark layer */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Cinematic gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />

            {/* Premium vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

            {/* Soft ambient glow */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]"
              animate={{
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Film Grain */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.03]
          mix-blend-overlay
          z-10
        "
      />

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className="relative h-[2px] w-12 overflow-hidden bg-white/20"
          >
            {index === active && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: SLIDE_DURATION / 1000,
                  ease: "linear",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}