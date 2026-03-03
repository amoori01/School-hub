import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

// Premium easing presets
export const premiumEase = {
  smooth: "power3.out",
  bouncy: "back.out(1.7)",
  gentle: "power2.out",
  cinematic: "power4.out",
} as const;

// Reusable animation configurations
export const animationConfig = {
  fast: { duration: 0.4, ease: premiumEase.gentle },
  normal: { duration: 0.6, ease: premiumEase.smooth },
  slow: { duration: 0.8, ease: premiumEase.smooth },
  cinematic: { duration: 1.0, ease: premiumEase.cinematic },
} as const;

// Split text into letters for animation
export const splitTextToLetters = (element: HTMLElement): string[] => {
  const text = element.textContent || "";
  return text.split("");
};

// Create letter-by-letter animation
export const animateLetters = (
  element: HTMLElement,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const { 
    from = { opacity: 0, y: 40, rotationX: -90 },
    to = { opacity: 1, y: 0, rotationX: 0 },
    stagger = 0.03,
    duration = 0.8,
    ease = "power3.out"
  } = options;

  const text = element.textContent || "";
  element.innerHTML = text
    .split("")
    .map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");

  const letters = element.querySelectorAll("span");
  
  return gsap.fromTo(letters, from, {
    ...to,
    duration,
    ease,
    stagger,
    onComplete: () => {
      element.textContent = text;
    }
  });
};

// Create staggered reveal animation for grid items
export const createStaggerReveal = (
  elements: Element[],
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) => {
  const {
    from = { opacity: 0, y: 60, scale: 0.95 },
    to = { opacity: 1, y: 0, scale: 1 },
    stagger = 0.08,
    scrollTrigger
  } = options;

  gsap.set(elements, from);

  const animation = gsap.to(elements, {
    ...to,
    stagger,
    ease: premiumEase.smooth,
  });

  if (scrollTrigger) {
    ScrollTrigger.create({
      trigger: elements[0]?.closest("section") || elements[0],
      start: "top 80%",
      ...scrollTrigger,
    });
  }

  return animation;
};

// Create slide-in animation (left or right)
export const createSlideIn = (
  element: Element,
  direction: "left" | "right" | "up" | "down" = "left",
  options: {
    duration?: number;
    ease?: string;
    scrollTrigger?: ScrollTrigger.Vars;
    delay?: number;
  } = {}
) => {
  const { duration = 0.8, ease = premiumEase.smooth, scrollTrigger, delay = 0 } = options;

  const transforms: Record<string, gsap.TweenVars> = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
  };

  gsap.set(element, transforms[direction]);

  const animation = gsap.to(element, {
    x: 0,
    y: 0,
    opacity: 1,
    duration,
    ease,
    delay,
  });

  if (scrollTrigger) {
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      ...scrollTrigger,
    });
  }

  return animation;
};

// Create floating animation
export const createFloating = (
  element: Element | null,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) => {
  if (!element) return;

  const { y = 15, duration = 3, delay = 0, ease = "power1.inOut" } = options;

  return gsap.to(element, {
    y: -y,
    duration,
    repeat: -1,
    yoyo: true,
    ease,
    delay,
  });
};

// Create parallax effect
export const createParallax = (
  element: Element | null,
  speed: number = 0.5,
  direction: "y" | "x" = "y"
) => {
  if (!element) return;

  const config = direction === "y" 
    ? { yPercent: -50 * speed }
    : { xPercent: -50 * speed };

  return gsap.to(element, {
    ...config,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Create clip-path reveal animation
export const createClipReveal = (
  element: Element,
  options: {
    duration?: number;
    ease?: string;
    clipType?: "circle" | "rect" | "inset";
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) => {
  const { duration = 1.2, ease = "power4.out", clipType = "circle", scrollTrigger } = options;

  const clips: Record<string, string> = {
    circle: "circle(0% at 50% 50%)",
    rect: "inset(0 0 100% 0)",
    inset: "inset(0 0 100% 0)",
  };

  gsap.set(element, { clipPath: clips[clipType] });

  const animation = gsap.to(element, {
    clipPath: "circle(150% at 50% 50%)",
    duration,
    ease,
  });

  if (scrollTrigger) {
    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      ...scrollTrigger,
    });
  }

  return animation;
};

// Create counter animation
export const animateCounter = (
  element: Element,
  endValue: number,
  options: {
    duration?: number;
    ease?: string;
    prefix?: string;
    suffix?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) => {
  const { duration = 2, ease = "power2.out", prefix = "", suffix = "", scrollTrigger } = options;

  const obj = { value: 0 };

  const animation = gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });

  if (scrollTrigger) {
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      ...scrollTrigger,
    });
  }

  return animation;
};

// Create premium card hover effect
export const createCardHover = (card: HTMLElement) => {
  const handleMouseEnter = () => {
    gsap.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.4,
      ease: premiumEase.gentle,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: premiumEase.gentle,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
    });
  };

  card.addEventListener("mouseenter", handleMouseEnter);
  card.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    card.removeEventListener("mouseenter", handleMouseEnter);
    card.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Create button micro-interactions
export const createButtonAnimation = (button: HTMLElement) => {
  const handleMouseEnter = () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseDown = () => {
    gsap.to(button, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.in",
    });
  };

  const handleMouseUp = () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  button.addEventListener("mouseenter", handleMouseEnter);
  button.addEventListener("mouseleave", handleMouseLeave);
  button.addEventListener("mousedown", handleMouseDown);
  button.addEventListener("mouseup", handleMouseUp);

  return () => {
    button.removeEventListener("mouseenter", handleMouseEnter);
    button.removeEventListener("mouseleave", handleMouseLeave);
    button.removeEventListener("mousedown", handleMouseDown);
    button.removeEventListener("mouseup", handleMouseUp);
  };
};

// Create section reveal animation
export const createSectionReveal = (
  section: HTMLElement,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) => {
  const {
    from = { opacity: 0, y: 80 },
    to = { opacity: 1, y: 0 },
    scrollTrigger = { start: "top 80%" },
  } = options;

  gsap.set(section, from);

  return gsap.to(section, {
    ...to,
    duration: 1,
    ease: premiumEase.smooth,
    scrollTrigger: {
      trigger: section,
      ...scrollTrigger,
    },
  });
};

// Create gradient background animation
export const animateGradientBackground = (
  element: HTMLElement,
  options: {
    duration?: number;
    colors?: string[];
  } = {}
) => {
  const { duration = 8, colors = ["#1d2642", "#0f172a", "#020617"] } = options;

  return gsap.to(element, {
    backgroundPosition: "400% 400%",
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
};

// Custom hook for GSAP animations in React
export const useGSAP = (
  callback: () => gsap.Context | void,
  deps: React.DependencyList = []
) => {
  if (typeof window === "undefined") return;
  
  return callback();
};

// Split text for animation (returns HTML with spans)
export const splitTextToSpans = (text: string, className?: string): string => {
  return text
    .split("")
    .map((char) => `<span class="${className || ""}">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");
};

// Batch animation for multiple elements
export const batchAnimate = (
  elements: Element[],
  animationType: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale",
  options: {
    stagger?: number;
    duration?: number;
    delay?: number;
    scrollTrigger?: boolean;
  } = {}
) => {
  const { stagger = 0.1, duration = 0.6, delay = 0, scrollTrigger = false } = options;

  const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
    fadeUp: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
    },
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideLeft: {
      from: { opacity: 0, x: -60 },
      to: { opacity: 1, x: 0 },
    },
    slideRight: {
      from: { opacity: 0, x: 60 },
      to: { opacity: 1, x: 0 },
    },
    scale: {
      from: { opacity: 0, scale: 0.9 },
      to: { opacity: 1, scale: 1 },
    },
  };

  const { from, to } = animations[animationType] || animations.fadeUp;

  gsap.set(elements, from);

  const animation = gsap.to(elements, {
    ...to,
    duration,
    stagger,
    delay,
    ease: premiumEase.smooth,
  });

  if (scrollTrigger) {
    ScrollTrigger.create({
      trigger: elements[0]?.closest("section") || elements[0],
      start: "top 80%",
      onEnter: () => animation.play(),
    });
  }

  return animation;
};

// Initialize premium page animations
export const initPageAnimations = (container: HTMLElement) => {
  const ctx = gsap.context(() => {
    // Animate all sections on page load
    gsap.fromTo(
      "section",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, container);

  return ctx;
};
