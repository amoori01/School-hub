import { GraduationCap, Building2, School, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    icon: School,
    title: "K-12 Schools",
    description:
      "Comprehensive solution for primary and secondary schools with everything from admissions to alumni management.",
    features: ["Student enrollment", "Attendance tracking", "Grade management", "Parent communication"],
    color: "from-sky-400 to-cyan-300"
  },
  {
    icon: GraduationCap,
    title: "Higher Education",
    description:
      "Advanced tools for colleges and universities with course management, research tracking, and more.",
    features: ["Course registration", "Academic planning", "Research management", "Alumni network"],
    color: "from-violet-500 to-fuchsia-400"
  },
  {
    icon: Building2,
    title: "Training Centers",
    description:
      "Perfect for vocational training institutes and certification programs with flexible scheduling.",
    features: ["Course catalog", "Certification tracking", "Instructor management", "Resource allocation"],
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: Users,
    title: "Corporate Training",
    description:
      "Enterprise learning management for companies investing in employee development and upskilling.",
    features: ["Employee onboarding", "Skill development", "Performance tracking", "Compliance training"],
    color: "from-emerald-400 to-teal-400"
  }
];

export function SolutionsSection() {
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

      // Cards staggered animation - alternating left/right
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const direction = index % 2 === 0 ? -60 : 60;

        gsap.fromTo(
          card,
          { opacity: 0, x: direction, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
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
    <section ref={sectionRef} id="solutions" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[conic-gradient(from_180deg,_rgba(56,189,248,0.1),_rgba(236,72,153,0.1),_transparent)] blur-3xl opacity-30 dark:opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.08),_transparent_70%)] blur-3xl opacity-30 dark:opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 dark:bg-secondary text-secondary-foreground text-sm font-medium mb-4 border border-primary/20 dark:border-cyan-300/40 shadow-sm backdrop-blur-md">
            Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built for Every Type of Institution
          </h2>
          <p className="text-xl text-muted-foreground">
            Tailored solutions that adapt to your specific educational environment
          </p>
        </div>

        {/* Solutions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div ref={addToRefs} key={index}>
                <Card
                  className="p-8 border-2 border-border dark:border-slate-800/80 hover:border-primary/50 dark:hover:border-transparent transition-all duration-300 bg-card/50 dark:bg-slate-950/80 group relative overflow-hidden rounded-2xl backdrop-blur-xl cursor-default shadow-sm hover:shadow-xl dark:shadow-none"
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300`}
                  ></div>

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_40px_rgba(56,189,248,0.3)] dark:shadow-[0_16px_40px_rgba(56,189,248,0.7)]`}
                    >
                      <Icon className="h-8 w-8 text-white dark:text-slate-950" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {solution.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.color} mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80 dark:text-sky-300 dark:hover:text-sky-200 font-semibold transition-colors">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
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
