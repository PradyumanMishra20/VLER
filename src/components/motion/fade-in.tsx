"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  direction?: "up" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = "up",
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === "up" ? 32 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
