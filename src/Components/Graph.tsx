"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "../lib/utils";
import { AnimatedBeam } from "./../Components/ui/animated-beam";
import logo from "../assets/white.jpeg"
import { FaUser } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null); // Reference for the third icon

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg  bg-background p-10 md:shadow-xl "
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex lg:flex-row justify-between gap-7 flex-col">
          <Circle ref={div1Ref}>
            <Icons.user />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.openai />
          </Circle>
          <Circle ref={div3Ref}> {/* Third Icon */}
            <Icons.target />
          </Circle>
        </div>
      </div>

      {/* Beam from user to openai */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={10}
        endYOffset={10}
        curvature={-20}
        gradientStartColor="#ffffff"
        gradientStopColor="#9966ff"
        duration={5}
        delay={1}
      />

      {/* Beam from openai to user */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div1Ref}
        startYOffset={-10}
        endYOffset={-10}
        curvature={20}
        reverse
      />

      {/* Unidirectional beam from openai to third icon */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={30}
      />
    </div>
  );
}

const Icons = {
  openai: () => (
    <img
      src={logo}
      alt="OpenAI Logo"
      width="40"
      height="34"
      className="rounded-full"
    />
  ),
  user: () => (
    <FaUser size={24} color="#000000"/>
  ),
  target: () => (
    <GiProcessor size={28} color="#000000"/>
  ),
};
