import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5,000+", label: "Schools Worldwide" },
  { value: "2M+", label: "Active Users" },
  { value: "150+", label: "Countries" },
  { value: "99.9%", label: "Uptime SLA" }
];

export function HeroSection() {
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

      // Reverse parallax on content - moves faster than scroll
      gsap.to(contentRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
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

      // Fade and slide out elements as they leave viewport
      gsap.to([badgeRef.current, headlineRef.current, subtextRef.current, ctaRef.current], {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "30% top",
          scrub: 1
        }
      });

      // Stats section - horizontal scroll-linked animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current?.children || [], 
          { y: 0, opacity: 1 },
          {
            y: -20,
            opacity: 0.5,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }

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
      className="relative pt-28 pb-32 overflow-hidden bg-background"
    >
      {/* Animated gradient background - dark mode only */}
      <div ref={gradientRef} className="absolute inset-0 dark:block hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1d2642,_#020617_55%,_#020617_100%)]" />
        <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[conic-gradient(from_220deg,_rgba(56,189,248,0.6),_rgba(236,72,153,0.55),_transparent)] blur-3xl opacity-70 animate-pulse-slow" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.3),_transparent_70%)] blur-3xl opacity-70 animate-pulse-slow-delayed" />
      </div>

      {/* Light mode gradient */}
      <div ref={gradientRef} className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-white" />
        <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[conic-gradient(from_220deg,_rgba(99,102,241,0.3),_rgba(168,85,247,0.3),_transparent)] blur-3xl opacity-50" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.2),_transparent_70%)] blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary border border-primary/30 text-sm font-medium text-secondary-foreground shadow-md backdrop-blur-md mb-7 cursor-default hover:scale-105 transition-transform duration-300"
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
                {splitText("The operating system for")}
              </span>
              <span className="block mt-2">
                <span ref={headlineLine2Ref} className="bg-gradient-to-r from-primary via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {splitText("modern education teams")}
                </span>
              </span>
            </h1>

            {/* Supporting text */}
            <p
              ref={subtextRef}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-9 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Orchestrate admissions, academics, finance, and communication from a single,
              beautifully crafted control center designed for fast‑moving schools.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-[#e35336] dark:bg-[#f47236] text-white hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-base px-8 py-6 rounded-2xl font-semibold transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-[#e35336]/40 group"
              >
                <span className="relative flex items-center z-10">
                  Request a live demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.15),_transparent)]" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-border bg-background dark:bg-background/60 hover:bg-secondary dark:hover:bg-secondary text-foreground dark:text-foreground text-base px-8 py-6 rounded-2xl font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch 3‑minute overview
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
          <div ref={imageRef} className="relative perspective-1000">
            <div className="relative transform preserve-3d">
              {/* Main dashboard image */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(15,23,42,0.95)] border border-border bg-card backdrop-blur-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1732203971761-e9d4a6f5e93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBzY3JlZW58ZW58MXx8fHwxNzcxMjM5MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="School Management Dashboard"
                  className="w-full h-auto transform hover:scale-[1.03] transition-transform duration-700 will-change-transform"
                />
                {/* Enhanced overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-fuchsia-500/18" />
              </div>

              {/* Floating card 1 - Student stats */}
              <div
                ref={floatingCard1Ref}
                className="hidden lg:block absolute -left-10 top-1/4 bg-card/95 backdrop-blur-xl rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.95)] p-5 border border-border hover:border-primary/50 transition-all duration-300 cursor-default group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-xl flex items-center justify-center shadow-[0_14px_35px_rgba(16,185,129,0.7)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">2,450</div>
                    <div className="text-xs text-muted-foreground font-medium">Active students this term</div>
                  </div>
                </div>
              </div>

              {/* Floating card 2 - Attendance */}
              <div
                ref={floatingCard2Ref}
                className="hidden lg:block absolute -right-10 bottom-1/4 bg-card/95 backdrop-blur-xl rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.95)] p-5 border border-border hover:border-primary/50 transition-all duration-300 cursor-default group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary via-cyan-300 to-fuchsia-400 rounded-xl flex items-center justify-center shadow-[0_14px_35px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">96.8%</div>
                    <div className="text-xs text-muted-foreground font-medium">Average daily attendance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
