import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const { t } = useTranslation();
  const benefits = [
    t("cta.trial"),
    t("cta.noCard"),
    t("cta.fullAccess"),
    t("cta.cancelAnytime")
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate gradient background
      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          backgroundPosition: "200% 200%",
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Background elements parallax
      const bgElements = gradientRef.current?.children;
      if (bgElements) {
        Array.from(bgElements).forEach((el, index) => {
          gsap.to(el, {
            y: index === 0 ? 50 : -50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          });
        });
      }

      // Initial set
      gsap.set(badgeRef.current, { opacity: 0, scale: 0.8, y: -20 });
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set(subtextRef.current, { opacity: 0, y: 30 });
      gsap.set(benefitsRef.current?.children || [], { opacity: 0, x: -30 });
      gsap.set(buttonsRef.current, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(trustRef.current, { opacity: 0, y: 30 });

      // Badge animation with clip-path
      gsap.set(badgeRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(badgeRef.current, {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });

      // Heading animation with blur reveal
      gsap.set(headingRef.current, { filter: "blur(10px)" });
      gsap.to(headingRef.current, {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      });

      // Subtext animation
      gsap.to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      });

      // Benefits staggered animation
      if (benefitsRef.current?.children) {
        gsap.to(benefitsRef.current.children, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 85%"
          }
        });
      }

      // Buttons animation
      gsap.to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 90%"
        }
      });

      // Trust indicator animation
      gsap.to(trustRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trustRef.current,
          start: "top 95%"
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Background decorations — dark mode */}
      <div ref={gradientRef} className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0b1120,_#020617_70%)]" />
        <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.5),_rgba(236,72,153,0.5),_transparent_60%)] blur-3xl opacity-80" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.3),_transparent_65%)] blur-3xl opacity-80" />
      </div>
      {/* Background decorations — light mode */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-[conic-gradient(from_200deg,_rgba(99,102,241,0.25),_rgba(168,85,247,0.25),_transparent_60%)] blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.15),_transparent_65%)] blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary backdrop-blur-md text-primary dark:text-sky-100 text-sm font-medium mb-8 border border-primary/30 shadow-md cursor-default hover:scale-105 transition-transform duration-300"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" />
            Join 5,000+ forward‑thinking institutions
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-foreground mb-5 sm:mb-6 lg:mb-8 leading-tight"
          >
            Ready to upgrade your school's operating system?
          </h2>

          {/* Supporting text */}
          <p
            ref={subtextRef}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Start with a guided demo tailored to your workflows, then roll out at your own
            pace with white‑glove onboarding and migration support.
          </p>

          {/* Benefits */}
          <div ref={benefitsRef} className="flex flex-wrap justify-center gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center text-foreground bg-secondary backdrop-blur-md px-6 py-3 rounded-full border border-border hover:border-primary/40 dark:hover:border-sky-300/60 transition-all duration-300 cursor-default group"
              >
                <CheckCircle2 className="h-5 w-5 mr-3 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium group-hover:text-primary dark:group-hover:text-sky-100 transition-colors duration-300">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-border text-foreground hover:bg-secondary text-sm sm:text-base lg:text-lg px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-8 font-bold rounded-xl lg:rounded-2xl backdrop-blur-md transition-all duration-300 hover:border-primary/50 dark:hover:border-sky-300/70 hover:scale-[1.02] active:scale-[0.98]"
            >
              Schedule a Call
            </Button>
          </div>

          {/* Trust indicator */}
          <div ref={trustRef} className="mt-10 sm:mt-12 lg:mt-16 pt-8 sm:pt-10 border-t border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
              Trusted by high‑growth schools, universities, and training providers worldwide
            </p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-primary via-cyan-400 to-fuchsia-400 border-2 border-background flex items-center justify-center text-white dark:text-slate-950 text-sm font-bold shadow-lg dark:shadow-[0_14px_35px_rgba(56,189,248,0.7)] hover:scale-110 hover:z-10 transition-transform duration-300 cursor-pointer"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="ml-6 text-foreground font-semibold text-lg">
                  5,000+ institutions onboarded globally
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
