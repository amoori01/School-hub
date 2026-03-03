import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const {
    lerp = 0.1,
    duration = 1.2,
    smoothWheel = true,
    wheelMultiplier = 1,
    touchMultiplier = 2,
  } = options;

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp,
      duration,
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    // Connect Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Create RAF function reference (IMPORTANT)
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Optional but recommended: update ScrollTrigger on refresh
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.killAll();
    };
  }, [lerp, duration, smoothWheel, wheelMultiplier, touchMultiplier]);
}