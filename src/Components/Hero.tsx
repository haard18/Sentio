"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../Components/ui/hero-highlight";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="t-display-lg mx-auto max-w-4xl px-4 text-center">
        With code audits, nothing&apos;s clear. Everything is complex. Everything
        is a{" "}
        <Highlight className="text-phosphor">
          function, of a function, of a function.
        </Highlight><br/>
        <button
          className="btn btn-accent mt-8"
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }}
        >
          Get Sentio Audit
        </button>
      </motion.h1>
    </HeroHighlight>
  );
}
