// src/Components/ui/DotPatternHover.tsx

"use client";
import { cn } from "../../lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const DotPatternHover = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("relative flex justify-center w-full group", containerClassName)}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 pointer-events-none opacity-50 app-background dark:bg-dot-thick-neutral-600" />

      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
        radial-gradient(
          200px circle at ${mouseX}px ${mouseY}px,
          black 0%,
          transparent 100%
        )
      `,
          maskImage: useMotionTemplate`
        radial-gradient(
          200px circle at ${mouseX}px ${mouseY}px,
          black 0%,
          transparent 100%
        )
      `,
        }}
      />


      {/* Remove h-screen, set min-h-screen or a custom height */}
      <div className={cn("relative z-20 min-h-screen w-full text-white", className)}>

        {children}
      </div>
    </div>

  );
};
