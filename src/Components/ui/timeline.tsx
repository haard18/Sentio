"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  /** Optional right-aligned metadata, e.g. a date or location. */
  meta?: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    // Track height so the progress rail matches the log's real extent
    // even after images load and reflow it.
    const el = ref.current;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-void text-phosphor" ref={containerRef}>
      <header className="shell border-b border-rule py-16 lg:py-24">
        <span className="t-meta text-hazard">Mission Log</span>
        <h2 className="t-display-lg mt-3">
          Evolution to
          <br />
          Sentio
        </h2>
        <div className="rule-accent my-6 max-w-md" />
        <p className="t-body">
          From a 72-hour hacker house build to a funded security platform on AO. The
          record, in order.
        </p>
      </header>

      <div className="shell">
        <div ref={ref} className="relative pb-20 pl-10 sm:pl-16">
          {/* Rail: static hairline, overlaid by a hazard fill driven by scroll. */}
          <div
            style={{ height: height + "px" }}
            className="absolute left-0 top-0 w-px overflow-hidden bg-rule sm:left-2"
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-px bg-hazard"
            />
          </div>

          {data.map((item, index) => (
            <article key={index} className="relative pt-12 md:pt-24">
              {/* Registration mark on the rail */}
              <span
                className="absolute -left-10 top-12 h-2 w-2 border border-rule2 bg-void sm:-left-[1.85rem] md:top-24"
                aria-hidden
              />

              <div className="flex flex-col gap-1 border-b border-rule pb-4 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="t-meta text-hazard">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-display-md">{item.title}</h3>
                </div>
                {item.meta && <span className="t-meta text-faint">{item.meta}</span>}
              </div>

              <div className="mt-6">{item.content}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
