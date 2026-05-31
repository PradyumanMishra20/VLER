"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: IMAGES.home.heroSlides[0],
    label: "COLLECTION 06",
    headline: "Engineered Silence",
    description:
      "Minimal silhouettes designed for movement, weight, and atmosphere.",
    cta: "Explore Collection",
    ctaLink: "/collection/fw25",
  },
  {
    image: IMAGES.home.heroSlides[1] || IMAGES.home.heroSlides[0],
    label: "ESSENTIALS",
    headline: "Built to Last",
    description:
      "Everyday wardrobe staples with uncompromising quality and timeless design.",
    cta: "Shop Essentials",
    ctaLink: "/collection/essentials",
  },
  {
    image: IMAGES.home.heroSlides[2] || IMAGES.home.heroSlides[0],
    label: "NEW ARRIVALS",
    headline: "Seasonal Drop",
    description:
      "The latest pieces from our Fall/Winter 25 collection.",
    cta: "View All",
    ctaLink: "/shop",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideCount = slides.length;

  const slideVariants = {
    enter: () => ({
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: () => ({
      opacity: 0,
      scale: 0.98,
    }),
  };

  const textVariants = {
    enter: {
      opacity: 0,
      y: 30,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -15,
    },
  };

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((prev) =>
        dir === 1
          ? (prev + 1) % slideCount
          : (prev - 1 + slideCount) % slideCount
      );
    },
    [slideCount]
  );

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  useEffect(() => {
    if (slideCount <= 1) return;

    const start = () => {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % slideCount);
      }, 7000);
    };

    const timeout = setTimeout(start, 2500);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slideCount]);

  const currentSlide = slides[active];

  return (
    <section className="relative h-[100vh] overflow-hidden bg-background">

      {/* IMAGE LAYER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.headline}
            fill
            priority={active === 0}
            sizes="100vw"
            className="object-cover"
            quality={90}
          />

          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">
        <div className="page-container w-full">
          <div className="max-w-3xl">

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="space-y-8"
              >
                <p className="editorial-overline text-foreground/90">
                  {currentSlide.label}
                </p>

                <h1 className="font-display text-display-xl lg:text-display-xl text-balance leading-[0.92]">
                  {currentSlide.headline}
                </h1>

                <p className="editorial-prose text-foreground/80 max-w-xl">
                  {currentSlide.description}
                </p>

                <Button asChild size="lg" className="min-h-[52px] px-10">
                  <Link href={currentSlide.ctaLink}>
                    {currentSlide.cta}
                  </Link>
                </Button>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* NAV ARROWS */}
      <button
        type="button"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        type="button"
        onClick={() => paginate(1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className="p-2"
          >
            <span
              className={`block h-px transition-all duration-700 ${
                active === index
                  ? "w-14 bg-white"
                  : "w-8 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>

    </section>
  );
}