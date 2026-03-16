import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useTranslation();

  const stats = [
    { value: "5,000+", label: t("hero.stats.schools") },
    { value: "2M+", label: t("hero.stats.users") },
    { value: "150+", label: t("hero.stats.countries") },
    { value: "99.9%", label: t("hero.stats.uptime") }
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingCard1Ref = useRef<HTMLDivElement>(null);
  const floatingCard2Ref = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate gradient background
      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          backgroundPosition: "200% 200%",
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Initial set for all elements
      gsap.set([badgeRef.current], { opacity: 0, y: -20, scale: 0.9 });
      gsap.set(headlineLine1Ref.current?.children || [], {
        opacity: 0,
        y: 60,
        rotationX: -45,
        filter: "blur(10px)"
      });
      gsap.set(headlineLine2Ref.current?.children || [], {
        opacity: 0,
        y: 60,
        rotationX: -45,
        filter: "blur(10px)"
      });
      gsap.set(subtextRef.current, { opacity: 0, y: 25 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(statsRef.current?.children || [], { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { opacity: 0, scale: 0.85, rotationY: 15 });
      gsap.set(floatingCard1Ref.current, { opacity: 0, x: -50, y: 20, rotation: -5 });
      gsap.set(floatingCard2Ref.current, { opacity: 0, x: 50, y: 20, rotation: 5 });

      // Master timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge animation
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6
      }, 0);

      // Headline line 1 - letter by letter
      if (headlineLine1Ref.current?.children) {
        tl.to(headlineLine1Ref.current.children, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out"
        }, 0.2);
      }

      // Headline line 2 - letter by letter (delayed)
      if (headlineLine2Ref.current?.children) {
        tl.to(headlineLine2Ref.current.children, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out"
        }, 0.5);
      }

      // Subtext slide up with fade
      tl.to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, 0.9);

      // CTA buttons
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6
      }, 1.1);

      // Stats with stagger
      if (statsRef.current?.children) {
        tl.to(statsRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out"
        }, 1.3);
      }

      // Main image with 3D effect
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out"
      }, 1.5);

      // Floating cards
      tl.to(floatingCard1Ref.current, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: "back.out(1.2)"
      }, 1.8);

      tl.to(floatingCard2Ref.current, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: "back.out(1.2)"
      }, 1.9);

      // Continuous floating animations for cards
      gsap.to(floatingCard1Ref.current, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(floatingCard2Ref.current, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });

      // =====================================================
      // ADVANCED SCROLL EFFECTS (jasonbergh.com style)
      // =====================================================

      // Parallax scroll effect on main image - moves slower than scroll
      gsap.to(imageRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Subtle parallax on floating cards
      gsap.to(floatingCard1Ref.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(floatingCard2Ref.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Scale effect on image as you scroll (subtle zoom out)
      gsap.to(imageRef.current, {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Gradient background intensity change on scroll
      gsap.to(gradientRef.current, {
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Split text helper
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block" style={{ transformOrigin: "50% 100%" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 lg:pb-32 overflow-hidden bg-background"
    >
      {/* Animated gradient background - dark mode only */}
      <div className="absolute inset-0 dark:block hidden overflow-hidden">
        <div ref={gradientRef} className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1d2642,_#020617_55%,_#020617_100%)]" />
        <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[conic-gradient(from_220deg,_rgba(56,189,248,0.6),_rgba(236,72,153,0.55),_transparent)] blur-3xl opacity-70 animate-pulse-slow" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.3),_transparent_70%)] blur-3xl opacity-70 animate-pulse-slow-delayed" />
      </div>

      {/* Light mode gradient */}
      <div className="absolute inset-0 dark:hidden overflow-hidden">
        <div ref={gradientRef} className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-white" />
        <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[conic-gradient(from_220deg,_rgba(99,102,241,0.3),_rgba(168,85,247,0.3),_transparent)] blur-3xl opacity-50" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.2),_transparent_70%)] blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary/50 dark:bg-secondary border border-primary/30 text-sm font-medium text-secondary-foreground shadow-md backdrop-blur-md mb-7 cursor-default hover:scale-105 transition-transform duration-300"
            >
              <span className="mr-3 flex h-2 w-2 items-center justify-center">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-400 animate-pulse" />
              </span>
              Trusted by 5,000+ schools globally
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.6rem] font-extrabold text-foreground mb-6 leading-tight tracking-tight"
            >
              <span ref={headlineLine1Ref} className="block">
                {splitText(t("hero.title"))}
              </span>

            </h1>

            {/* Supporting text */}
            <p
              ref={subtextRef}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-9 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t("hero.subtitle")}
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="lg"
                variant="outline"
                className="border border-border bg-background dark:bg-background/60 hover:bg-secondary dark:hover:bg-secondary text-foreground text-base px-8 py-6 rounded-2xl font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                {t("hero.watchDemo")}
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left group cursor-default">
                  <div className="text-2xl sm:text-3xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 group-hover:-translate-y-1 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Dashboard mockup */}
          <div ref={imageRef} className="lg:col-span-2 relative perspective-1000">
            <div className="relative transform preserve-3d">
              {/* Main dashboard video - Canva animation */}
              <div className="relative h-[50%]">
              <img src="/image.png" className="h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] w-auto max-w-full mx-auto" alt="" />
              </div>

              {/* Floating card 1 - Student stats */}
      


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
