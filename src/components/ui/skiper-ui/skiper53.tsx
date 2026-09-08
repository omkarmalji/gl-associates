"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { PageLink } from "@/components/PageLink";
import { cn } from "@/lib/utils";

const Skiper53 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/9.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/25.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },

    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <HoverExpand_002 className="" images={images} />
    </div>
  );
};

export { Skiper53 };

const HoverExpand_002 = ({
  images,
  className,
  collapsedHeight = "2.5rem",
  expandedHeight = "24rem",
  panelWidth = "24rem",
  gap = "0.25rem",
}: {
  images: { src: string; alt: string; code: string; href?: string; label?: string }[];
  className?: string;
  collapsedHeight?: string;
  expandedHeight?: string;
  panelWidth?: string;
  gap?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full flex-col items-center justify-center" style={{ gap }}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative w-full cursor-pointer overflow-hidden rounded-2xl"
              style={{ maxWidth: panelWidth }}
              initial={{ height: collapsedHeight }}
              animate={{
                height: activeImage === index ? expandedHeight : collapsedHeight,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="pointer-events-none absolute flex h-full w-full flex-col items-end justify-end px-4 pb-5"
                  >
                    <div className="w-full text-left">
                      {image.label && (
                        <p className="m-0 text-sm text-white">{image.label}</p>
                      )}
                      <p className="m-0 text-xs text-white/50">{image.code}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {image.href && activeImage === index ? (
                <PageLink
                  to={image.href}
                  className="block size-full"
                  aria-label={image.label ?? image.alt}
                >
                  <img
                    src={image.src}
                    className="size-full object-cover"
                    alt={image.alt}
                  />
                </PageLink>
              ) : (
                <img
                  src={image.src}
                  className="size-full object-cover"
                  alt={image.alt}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_002 };

/**
 * Skiper 53 HoverExpand_002 — React + Framer Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
