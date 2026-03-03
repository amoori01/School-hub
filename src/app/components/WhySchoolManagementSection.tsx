import { 
  Lightbulb, 
  Zap, 
  Shield, 
  Users, 
  BarChart3, 
  Globe, 
  Clock, 
  HeadphonesIcon,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Zap,
    title: "Automate Administrative Tasks",
    description: "Save hours every day by automating attendance tracking, fee collection, report generation, and other routine administrative processes."
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description: "Gain valuable insights with comprehensive analytics and reporting dashboards that help you make informed decisions for your institution."
  },
  {
    icon: Users,
    title: "Enhanced Communication",
    description: "Improve parent-teacher collaboration with real-time messaging, automated notifications, and a unified communication platform."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Protect sensitive student data with enterprise-grade security, role-based access controls, and compliance with education regulations."
  },
  {
    icon: Clock,
    title: "Save Time & Resources",
    description: "Reduce paperwork and manual processes, allowing your staff to focus on what matters most - student success and education quality."
  },
  {
    icon: Globe,
    title: "Anywhere Access",
    description: "Cloud-based platform means you can manage your school from anywhere, on any device, with automatic updates and backups."
  }
];

export function WhySchoolManagementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%"
            }
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%"
          }
        }
      );
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
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.96),_#020617_70%)]" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.4),_rgba(236,72,153,0.5),_transparent_60%)] blur-3xl opacity-80" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-slate-900/70 border border-cyan-300/40 text-sky-100 text-sm font-medium mb-6 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400 mr-3 animate-pulse" />
            Why modern school teams centralize operations
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-slate-50">Transform every layer of</span>
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              your educational institution
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-3xl mx-auto">
            Manual spreadsheets and disconnected tools slow everything down. A unified operating system
            unlocks faster decisions, better visibility, and calmer teams.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 max-w-7xl mx-auto"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index} 
                className="p-7 lg:p-8 border border-slate-800/80 hover:border-sky-400/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-500 bg-slate-950/70 backdrop-blur-xl group hover:-translate-y-2 hover:bg-slate-900/90 rounded-2xl"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500 shadow-[0_16px_40px_rgba(56,189,248,0.7)]">
                  <Icon className="h-7 w-7 text-slate-950" />
                </div>
                <h3 className="text-xl font-semibold text-slate-50 mb-4 group-hover:text-sky-200 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <Button className="bg-[#e35336] dark:bg-[#f47236] text-white hover:bg-[#c4452b] dark:hover:bg-[#e35336] transform hover:scale-[1.02] transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl border border-[#e35336]/60 dark:border-[#f47236]/60">
            See how it works
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
