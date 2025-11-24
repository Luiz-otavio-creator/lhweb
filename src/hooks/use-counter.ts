"use client";
import { useEffect } from "react";
import { useMotionValue, animate } from "framer-motion";

export function useCounter(to: number, duration = 1.2) {
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, to, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [motionValue, to, duration]);

  return motionValue;
}
