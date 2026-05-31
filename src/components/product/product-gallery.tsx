"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  if (!images?.length) return null;

  return (
    <>
      <div className="space-y-6">
        <div
          className="relative aspect-[3/4] overflow-hidden bg-background-surface cursor-zoom-in group"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onClick={() => setFullscreen(true)}
        >
          <motion.div
            animate={{ scale: zoomed ? 1.06 : 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={images[activeIndex]}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <span className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.22em] text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            View
          </span>
        </div>

        {images.length > 1 && (
          <div className="flex gap-4">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative h-[5rem] w-16 overflow-hidden transition-all duration-500",
                  activeIndex === i
                    ? "opacity-100 ring-1 ring-foreground ring-offset-2 ring-offset-background"
                    : "opacity-40 hover:opacity-70"
                )}
              >
                <Image
                  src={img}
                  alt={`${name} view ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-background/99 flex items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            <button
              type="button"
              className="absolute top-10 right-10 text-[11px] uppercase tracking-[0.22em] text-foreground-subtle hover:text-foreground z-10 transition-colors duration-300"
              onClick={() => setFullscreen(false)}
            >
              Close
            </button>
            <div
              className="relative w-full max-w-4xl aspect-[3/4] mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={name}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
