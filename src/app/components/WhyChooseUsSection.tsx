import { Shield, TrendingUp, Smartphone, Cloud } from "lucide-react";
import { Card } from "./ui/card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Bank-level security with GDPR and FERPA compliance. Your data is protected with 256-bit encryption and regular security audits.",
    color: "from-emerald-400 to-teal-400"
  },
  {
    icon: TrendingUp,
    title: "Scalable Solution",
    description: "Grows with your institution from 100 to 10,000+ students. No performance degradation, just seamless scaling.",
    color: "from-sky-400 to-cyan-300"
  },
  {
    icon: Smartphone,
    title: "Easy to Use",
    description: "Intuitive interface designed for educators, not engineers. Get started in minutes with minimal training required.",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Cloud,
    title: "Cloud-Based",
    description: "Access from anywhere, anytime. Automatic updates, backups, and 99.9% uptime SLA guaranteed.",
    color: "from-orange-500 to-red-600"
  }
];

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="why-choose-us" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={bgRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.1),_transparent_70%)] dark:bg-[radial-gradient(circle,_rgba(56,189,248,0.08),_transparent_70%)] opacity-30 dark:opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 dark:bg-secondary text-secondary-foreground text-sm font-medium mb-4 border border-primary/20 dark:border-cyan-300/40 shadow-sm backdrop-blur-md">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Preferred Choice for Modern Schools
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the difference with a platform built for educational excellence
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div ref={addToRefs} key={index}>
                <Card
                  className="h-full p-8 border border-border dark:border-slate-800/80 hover:border-primary/50 dark:hover:border-sky-400/60 transition-all duration-300 bg-card/50 dark:bg-slate-950/80 group rounded-2xl backdrop-blur-xl text-center shadow-sm hover:shadow-xl dark:shadow-none cursor-default"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_40px_rgba(56,189,248,0.3)] dark:shadow-[0_16px_40px_rgba(56,189,248,0.7)]">
                    <Icon className="h-8 w-8 text-white dark:text-slate-950" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {reason.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div ref={statsRef} className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-border pt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground font-medium">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground font-medium">Expert Support</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground font-medium">Countries Reached</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50k+</div>
            <div className="text-sm text-muted-foreground font-medium">Daily Active Users</div>
          </div>
        </div>
      </div>
    </section>
  );
}
