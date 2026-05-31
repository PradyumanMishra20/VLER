"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

import { BRAND } from "@/lib/constants";
import { BRAND_ASSETS } from "@/lib/brand";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [blast, setBlast] = useState(false);

  useEffect(() => {
    const blastTimer = setTimeout(() => {
      setBlast(true);
    }, 1800);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => {
      clearTimeout(blastTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[99999] overflow-hidden bg-black"
      >
        {/* base glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[120px]"
        />

        {/* CONTENT */}
        <div className="relative flex h-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* LOGO */}
            <motion.div
              animate={{
                scale: blast ? 1.12 : 1,
                opacity: blast ? 0.95 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-[22rem] md:w-[34rem] aspect-square">
                <Image
                  src={BRAND_ASSETS.ogImage}
                  alt={BRAND.name}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* BLAST */}
        <AnimatePresence>
          {blast && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: [0, 0.6, 1],
                  scale: [0.4, 2.5, 6],
                }}
                transition={{ duration: 0.9 }}
                className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0a0a] blur-[140px]"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-black"
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}