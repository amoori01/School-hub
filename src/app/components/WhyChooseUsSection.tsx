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
    <section ref={sectionRef} id="why-choose-us" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.08),_transparent_70%)] blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.08),_transparent_70%)] blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 text-sm font-medium mb-4 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            Built for Modern Education
          </h2>
          <p className="text-xl text-slate-300">
            The most advanced school management platform trusted by institutions worldwide
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div ref={addToRefs} key={index}>
                <Card 
                  className="p-8 border-2 border-slate-800/80 hover:border-transparent hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300 bg-slate-950/80 group relative overflow-hidden rounded-2xl backdrop-blur-xl cursor-default"
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_40px_rgba(56,189,248,0.7)] group-hover:shadow-[0_20px_50px_rgba(56,189,248,0.8)]`}>
                      <Icon className="h-8 w-8 text-slate-950" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-50 mb-3 group-hover:text-sky-200 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {reason.description}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
