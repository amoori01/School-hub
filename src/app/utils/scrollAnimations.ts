import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// SECTION REVEAL ANIMATIONS
// ============================================================================

/**
 * Creates a premium section reveal animation
 * Elements fade in and slide up as they enter the viewport
 */
export const createSectionReveal = (
  element: HTMLElement,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
) => {
  const {
    from = { opacity: 0, y: 80, scale: 0.98 },
    to = { opacity: 1, y: 0, scale: 1 },
    delay = 0,
    duration = 1,
    stagger = 0,
  } = options;

  gsap.set(element, from);

  return gsap.to(element, {
    ...to,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
};

/**
 * Creates multiple section reveals with stagger
 */
export const createStaggeredSectionReveal = (
  elements: HTMLElement[],
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    delay?: number;
    duration?: number;
  } = {}
) => {
  const {
    from = { opacity: 0, y: 60, scale: 0.95 },
    to = { opacity: 1, y: 0, scale: 1 },
    stagger = 0.1,
    delay = 0,
    duration = 0.8,
  } = options;

  gsap.set(elements, from);

  return gsap.to(elements, {
    ...to,
    duration,
    stagger,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elements[0],
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
};

// ============================================================================
// PARALLAX EFFECTS
// ============================================================================

/**
 * Creates a parallax effect on an element
 * Element moves at a different speed than the scroll
 */
export const createParallax = (
  element: HTMLElement | string,
  options: {
    speed?: number;
    direction?: "y" | "x";
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onUpdate?: () => void;
  } = {}
) => {
  const {
    speed = 0.5,
    direction = "y",
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    onUpdate,
  } = options;

  const target = typeof element === "string" 
    ? (gsap.utils.toArray(element) as HTMLElement[])
    : [element];

  const movement = 100 * speed * (direction === "y" ? 1 : 1);
  const config = direction === "y" 
    ? { y: movement }
    : { x: movement };

  return target.map((el) => 
    gsap.to(el, {
      ...config,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        onUpdate,
      },
    })
  );
};

/**
 * Creates a reverse parallax effect (element moves faster than scroll)
 */
export const createReverseParallax = (
  element: HTMLElement | string,
  options: {
    speed?: number;
    direction?: "y" | "x";
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    speed = 0.5,
    direction = "y",
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  const target = typeof element === "string"
    ? (gsap.utils.toArray(element) as HTMLElement[])
    : [element];

  const movement = -100 * speed * (direction === "y" ? 1 : 1);
  const config = direction === "y"
    ? { y: movement }
    : { x: movement };

  return target.map((el) =>
    gsap.to(el, {
      ...config,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    })
  );
};

/**
 * Creates parallax for background elements
 */
export const createBackgroundParallax = (
  container: HTMLElement,
  backgroundElements: HTMLElement[],
  options: {
    speed?: number;
  } = {}
) => {
  const { speed = 0.3 } = options;

  return backgroundElements.map((el) =>
    gsap.to(el, {
      y: -200 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  );
};

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

/**
 * Creates a scroll-triggered fade in animation
 */
export const createScrollFadeIn = (
  element: HTMLElement | string,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    duration?: number;
    delay?: number;
    start?: string;
    end?: string;
    toggleActions?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    from = { opacity: 0 },
    to = { opacity: 1 },
    duration = 1,
    delay = 0,
    start = "top 85%",
    end = "bottom 20%",
    toggleActions = "play none none reverse",
    scrub = false,
  } = options;

  const target = typeof element === "string"
    ? (gsap.utils.toArray(element) as HTMLElement[])
    : [element];

  gsap.set(target, from);

  return target.map((el) =>
    gsap.to(el, {
      ...to,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        toggleActions,
        scrub,
      },
    })
  );
};

/**
 * Creates a scroll-triggered slide animation
 */
export const createScrollSlide = (
  element: HTMLElement | string,
  direction: "left" | "right" | "up" | "down",
  options: {
    distance?: number;
    duration?: number;
    delay?: number;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    distance = 100,
    duration = 1,
    delay = 0,
    start = "top 85%",
    ease = "power3.out",
  } = options;

  const transforms: Record<string, gsap.TweenVars> = {
    left: { x: -distance, opacity: 0 },
    right: { x: distance, opacity: 0 },
    up: { y: -distance, opacity: 0 },
    down: { y: distance, opacity: 0 },
  };

  const target = typeof element === "string"
    ? (gsap.utils.toArray(element) as HTMLElement[])
    : [element];

  gsap.set(target, transforms[direction]);

  return target.map((el) =>
    gsap.to(el, {
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none reverse",
      },
    })
  );
};

/**
 * Creates a scroll-triggered scale animation
 */
export const createScrollScale = (
  element: HTMLElement | string,
  options: {
    from?: number;
    to?: number;
    duration?: number;
    delay?: number;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    from = 0.8,
    to = 1,
    duration = 1,
    delay = 0,
    start = "top 85%",
    ease = "back.out(1.7)",
  } = options;

  const target = typeof element === "string"
    ? (gsap.utils.toArray(element) as HTMLElement[])
    : [element];

  gsap.set(target, { scale: from, opacity: 0 });

  return target.map((el) =>
    gsap.to(el, {
      scale: to,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none reverse",
      },
    })
  );
};

// ============================================================================
// HORIZONTAL SCROLL (SCROLLYTELLING)
// ============================================================================

/**
 * Creates horizontal scroll section (pin and translate)
 */
export const createHorizontalScroll = (
  container: HTMLElement,
  sections: HTMLElement[],
  options: {
    speed?: number;
    ease?: string;
  } = {}
) => {
  const { speed = 1, ease = "none" } = options;

  const totalWidth = sections.length * 100;

  return gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease,
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${container.offsetWidth * speed * sections.length}`,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      anticipatePin: 1,
    },
  });
};

// ============================================================================
// TEXT & CHARACTER ANIMATIONS
// ============================================================================

/**
 * Creates a scroll-linked text reveal animation
 */
export const createScrollTextReveal = (
  element: HTMLElement,
  options: {
    type?: "words" | "chars" | "lines";
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    duration?: number;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    type = "chars",
    from = { opacity: 0, y: 40, rotationX: -90 },
    to = { opacity: 1, y: 0, rotationX: 0 },
    stagger = 0.02,
    duration = 0.8,
    scrub = 1,
  } = options;

  // Split text into spans
  const text = element.textContent || "";
  const separator = type === "words" ? " " : type === "chars" ? "" : "<br />";
  
  element.innerHTML = type === "lines" 
    ? text.split("\n").map(line => `<span class="inline-block">${line}</span>`).join(separator)
    : text.split("").map(char => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`).join("");

  const spans = element.querySelectorAll("span");
  gsap.set(spans, from);

  return gsap.to(spans, {
    ...to,
    duration,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      scrub,
    },
  });
};

/**
 * Creates a clip-path reveal animation
 */
export const createClipReveal = (
  element: HTMLElement,
  options: {
    type?: "circle" | "rect" | "inset" | "ellipse";
    duration?: number;
    ease?: string;
    start?: string;
  } = {}
) => {
  const {
    type = "circle",
    duration = 1.2,
    ease = "power4.out",
    start = "top 80%",
  } = options;

  const clips: Record<string, string> = {
    circle: "circle(0% at 50% 50%)",
    rect: "inset(0 0 100% 0)",
    inset: "inset(0 0 100% 0)",
    ellipse: "ellipse(0% 0% at 50% 50%)",
  };

  gsap.set(element, { clipPath: clips[type], scale: 1.1 });

  return gsap.to(element, {
    clipPath: "circle(150% at 50% 50%)",
    scale: 1,
    duration,
    ease,
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none reverse",
    },
  });
};

// ============================================================================
// CONTINUOUS MOTION EFFECTS
// ============================================================================

/**
 * Creates a continuous floating animation
 */
export const createContinuousFloat = (
  element: HTMLElement,
  options: {
    y?: number;
    x?: number;
    rotation?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    repeat?: number;
    yoyo?: boolean;
  } = {}
) => {
  const {
    y = 20,
    x = 0,
    rotation = 0,
    duration = 3,
    delay = 0,
    ease = "power1.inOut",
    repeat = -1,
    yoyo = true,
  } = options;

  return gsap.to(element, {
    y: -y,
    x: x !== 0 ? -x : undefined,
    rotation: rotation !== 0 ? -rotation : undefined,
    duration,
    delay,
    ease,
    repeat,
    yoyo,
  });
};

/**
 * Creates scroll-linked continuous rotation
 */
export const createScrollRotation = (
  element: HTMLElement,
  options: {
    rotation?: number;
    duration?: number;
    ease?: string;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    rotation = 360,
    duration = 1,
    ease = "none",
    start = "top bottom",
    end = "bottom top",
  } = options;

  return gsap.to(element, {
    rotation,
    duration,
    ease,
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
};

// ============================================================================
// MASK & CLIP PATH EFFECTS
// ============================================================================

/**
 * Creates a reveal mask animation
 */
export const createRevealMask = (
  element: HTMLElement,
  maskElement: HTMLElement,
  options: {
    direction?: "left" | "right" | "top" | "bottom";
    duration?: number;
    ease?: string;
    start?: string;
  } = {}
) => {
  const {
    direction = "left",
    duration = 1.2,
    ease = "power3.inOut",
    start = "top 80%",
  } = options;

  const masks: Record<string, string> = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 100% 0)",
    top: "inset(100% 0 0 0)",
    bottom: "inset(0 0 100% 0)",
  };

  gsap.set(maskElement, { clipPath: masks[direction] });

  return gsap.to(maskElement, {
    clipPath: "inset(0 0 0 0)",
    duration,
    ease,
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none reverse",
    },
  });
};

// ============================================================================
// PROGRESSIVE REVEAL EFFECTS
// ============================================================================

/**
 * Creates a progressive section reveal
 */
export const createProgressiveReveal = (
  element: HTMLElement,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    speed?: number;
  } = {}
) => {
  const {
    from = { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
    to = { clipPath: "inset(0 0% 0 0)", scale: 1 },
    speed = 1,
  } = options;

  gsap.set(element, from);

  return gsap.to(element, {
    ...to,
    duration: 1.2,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: element,
      start: "top 75%",
      end: "center center",
      scrub: speed,
      pin: false,
    },
  });
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Batch animate multiple elements with the same effect
 */
export const batchAnimate = (
  selector: string,
  animationType: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale",
  options: {
    stagger?: number;
    duration?: number;
    delay?: number;
    start?: string;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
  } = {}
) => {
  const {
    stagger = 0.1,
    duration = 0.8,
    delay = 0,
    start = "top 85%",
    from,
    to,
  } = options;

  const elements = gsap.utils.toArray(selector) as HTMLElement[];

  const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { opacity: 0, y: 60 },
      to: { opacity: 1, y: 0 },
    },
    slideDown: {
      from: { opacity: 0, y: -60 },
      to: { opacity: 1, y: 0 },
    },
    slideLeft: {
      from: { opacity: 0, x: 60 },
      to: { opacity: 1, x: 0 },
    },
    slideRight: {
      from: { opacity: 0, x: -60 },
      to: { opacity: 1, x: 0 },
    },
    scale: {
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
    },
  };

  const config = from && to 
    ? { from, to } 
    : animations[animationType] || animations.fadeIn;

  gsap.set(elements, config.from);

  return gsap.to(elements, {
    ...config.to,
    duration,
    stagger,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elements[0],
      start,
      toggleActions: "play none none reverse",
    },
  });
};

/**
 * Kill all ScrollTriggers (useful for cleanup)
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Refresh all ScrollTriggers
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

