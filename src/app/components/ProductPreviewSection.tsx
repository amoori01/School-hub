import { TrendingUp, Users, Layout, Monitor, PieChart } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "./ui/card";

gsap.registerPlugin(ScrollTrigger);

const previewFeatures = [
  {
    icon: Layout,
    title: "Intuitive Interface",
    description: "Designed for clarity and ease of use, reducing the learning curve for staff."
  },
  {
    icon: Monitor,
    title: "Responsive Design",
    description: "Access your dashboard from any device — desktop, tablet, or smartphone."
  },
  {
    icon: PieChart,
    title: "Real-time Insights",
    description: "Visual data representations that help you make informed decisions instantly."
  }
];

export function ProductPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
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

      // Mockup animation
      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mockupRef.current,
            start: "top 75%",
          }
        }
      );

      // Features staggered animation
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="product-preview" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 dark:via-cyan-400/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.1),_transparent_70%)] dark:bg-[radial-gradient(circle,_rgba(56,189,248,0.08),_transparent_70%)] opacity-50 dark:opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 dark:bg-secondary text-secondary-foreground text-sm font-medium mb-4 border border-primary/20 dark:border-cyan-300/40 shadow-sm backdrop-blur-md">
            Product Preview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            See the Power of School-Hub
          </h2>
          <p className="text-xl text-muted-foreground">
            An intuitive dashboard designed for efficiency and ease of use
          </p>
        </div>

        {/* Dashboard Preview - Main Mockup Area */}
        <div ref={mockupRef} className="relative max-w-6xl mx-auto mb-20 lg:mb-32">
          {/* Main Dashboard Frame */}
          <Card
            className="relative p-2 sm:p-4 border-2 border-border dark:border-slate-800/80 bg-card dark:bg-slate-900 shadow-2xl rounded-3xl overflow-hidden group hover:scale-[1.01] transition-transform duration-500 shadow-primary/10 dark:shadow-none"
          >
            {/* Mockup content - stylized UI elements */}
            <div className="aspect-[16/10] bg-muted/30 dark:bg-slate-950 rounded-2xl overflow-hidden flex">
              {/* Sidebar mockup */}
              <div className="w-16 sm:w-20 lg:w-24 bg-secondary/50 dark:bg-slate-900 border-r border-border dark:border-slate-800 flex flex-col items-center py-6 gap-6">
                <div className="w-8 h-8 rounded-lg bg-primary/20 dark:bg-sky-400/20" />
                <div className="flex-1 flex flex-col gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-muted dark:bg-slate-800" />
                  ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-muted dark:bg-slate-800" />
              </div>

              {/* Main content mockup */}
              <div className="flex-1 p-4 lg:p-8 flex flex-col gap-6">
                {/* Header mockup */}
                <div className="flex justify-between items-center mb-4">
                  <div className="h-8 w-40 sm:w-64 bg-muted dark:bg-slate-800 rounded-lg" />
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-muted dark:bg-slate-800 rounded-full" />
                    <div className="h-8 w-8 bg-muted dark:bg-slate-800 rounded-full" />
                  </div>
                </div>

                {/* Grid mockup */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 sm:h-32 bg-card dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-4 shadow-sm">
                      <div className="w-8 h-8 bg-primary/10 dark:bg-sky-400/10 rounded-lg mb-2" />
                      <div className="h-4 w-2/3 bg-muted dark:bg-slate-800 rounded" />
                    </div>
                  ))}
                </div>

                {/* Table/List mockup */}
                <div className="flex-1 bg-card dark:bg-slate-900 border border-border dark:border-slate-800 rounded-xl p-6 shadow-sm overflow-hidden">
                  <div className="h-6 w-1/4 bg-muted dark:bg-slate-800 rounded mb-6" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex gap-4 p-2 border-b border-border dark:border-slate-800/50">
                        <div className="w-10 h-10 rounded-full bg-muted dark:bg-slate-800" />
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="h-4 w-1/3 bg-muted dark:bg-slate-800 rounded" />
                          <div className="h-3 w-1/4 bg-muted/60 dark:bg-slate-800/60 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>

          {/* Floating UI Elements */}
          <div className="hidden lg:block">
            <div className="absolute -top-10 -right-10 w-48 p-4 bg-card/80 dark:bg-slate-900/80 border border-primary/20 dark:border-cyan-300/30 rounded-2xl backdrop-blur-xl shadow-xl animate-float-slow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/20 dark:bg-emerald-400/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase">Total Revenue</div>
                  <div className="text-lg font-bold text-foreground">$124,500</div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-56 p-4 bg-card/80 dark:bg-slate-900/80 border border-primary/20 dark:border-cyan-300/30 rounded-2xl backdrop-blur-xl shadow-xl animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 dark:bg-sky-400/20 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase">Active Students</div>
                  <div className="text-lg font-bold text-foreground">2,450</div>
                </div>
              </div>
              <div className="flex mt-3 -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background dark:border-slate-900 bg-muted dark:bg-slate-800" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-background dark:border-slate-900 bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">+2k</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {previewFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-sky-400/10 rounded-xl flex items-center justify-center border border-primary/20 dark:border-cyan-300/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
