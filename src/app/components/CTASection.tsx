import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "Free 14-day trial",
  "No credit card required",
  "Full feature access",
  "Cancel anytime"
];

export function CTASection() {
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

      // Pin section effect - creates a sticky scroll feel for the CTA
      gsap.to(sectionRef.current, {
        backgroundColor: "rgba(2, 6, 23, 0.95)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1
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
      className="py-24 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div ref={gradientRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0b1120,_#020617_70%)]" />
        <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.5),_rgba(236,72,153,0.5),_transparent_60%)] blur-3xl opacity-80" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.3),_transparent_65%)] blur-3xl opacity-80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-slate-900/70 backdrop-blur-md text-sky-100 text-sm font-medium mb-8 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] cursor-default hover:scale-105 transition-transform duration-300"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" />
            Join 5,000+ forward‑thinking institutions
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-50 mb-8 leading-tight"
          >
            Ready to upgrade your school's operating system?
          </h2>

          {/* Supporting text */}
          <p 
            ref={subtextRef}
            className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Start with a guided demo tailored to your workflows, then roll out at your own
            pace with white‑glove onboarding and migration support.
          </p>

          {/* Benefits */}
          <div ref={benefitsRef} className="flex flex-wrap justify-center gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center text-slate-100 bg-slate-900/70 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700/80 hover:border-sky-300/60 hover:bg-slate-800/80 transition-all duration-300 cursor-default group"
              >
                <CheckCircle2 className="h-5 w-5 mr-3 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium group-hover:text-sky-100 transition-colors duration-300">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-[#e35336] dark:bg-[#f47236] text-white hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-lg px-12 py-8 font-bold rounded-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-[#e35336]/70 group"
            >
              <span className="flex items-center">
                Start free interactive demo
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-slate-700 text-slate-100 hover:bg-slate-900/70 text-lg px-12 py-8 font-bold rounded-2xl backdrop-blur-md transition-all duration-300 hover:border-sky-300/70 hover:scale-[1.02] active:scale-[0.98]"
            >
              Schedule a Call
            </Button>
          </div>

          {/* Trust indicator */}
          <div ref={trustRef} className="mt-16 pt-10 border-t border-white/20">
            <p className="text-slate-300 text-sm mb-6">
              Trusted by high‑growth schools, universities, and training providers worldwide
            </p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 text-sm font-bold shadow-[0_14px_35px_rgba(56,189,248,0.7)] hover:scale-110 hover:z-10 transition-transform duration-300 cursor-pointer"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="ml-6 text-slate-100 font-semibold text-lg">
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
