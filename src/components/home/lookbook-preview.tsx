"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { IMAGES } from "@/lib/images";

const panels = IMAGES.home.lookbookLayers.map((image, i) => {
  const subtitle =
    i === 0 ? "Base construction" : i === 1 ? "Mid insulation" : "Outer shell";

  return {
    image,
    title: `Layer ${i + 1}`,
    subtitle,
  };
});

export function LookbookPreview() {
  return (
    <section className="py-16 md:py-20">

      {/* HEADER */}
      <div className="page-container mb-12">
        <FadeIn delay={0.2}>
          <p className="editorial-subheading mb-4">
            Editorial
          </p>

          <h2 className="editorial-heading">
            Built Around Layering
          </h2>
        </FadeIn>
      </div>

      {/* PANELS */}
      <div className="space-y-1">
        {panels.map((panel, i) => (
          <motion.div
            key={panel.title}
            initial={{ opacity: 0.6, scale: 1.01 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden"
          >
            <Image
              src={panel.image}
              alt={panel.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={i === 0}
            />

            {/* gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/20 to-transparent" />

            {/* content */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-20">

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="editorial-subheading text-foreground/80 mb-3"
              >
                {panel.subtitle}
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="font-display text-display-lg text-foreground leading-[0.96]"
              >
                {panel.title}
              </motion.h3>

            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="page-container mt-12 text-center">
        <Button variant="outline" asChild size="lg">
          <Link href="/lookbook">
            Explore Lookbook
          </Link>
        </Button>
      </div>

    </section>
  );
}