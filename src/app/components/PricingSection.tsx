import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const standardFeatures = {
  academic: [
    "Attendance management",
    "Marks & grades entry",
    "Assignment management",
    "Timetable management",
    "Exam scheduling",
    "Report card generation",
    "Academic reports"
  ],
  student: [
    "Admissions & enrollment",
    "Student records management",
    "Class & subject management",
    "Teacher assignment",
    "Student promotion"
  ],
  finance: [
    "Fee structure management",
    "Fee payment processing",
    "Invoice & receipt generation",
    "Fee tracking",
    "Salary management",
    "Basic financial reports"
  ],
  communication: [
    "Messaging system",
    "Announcements",
    "Exam notifications",
    "Meeting invitations"
  ],
  administration: [
    "User management",
    "Role-based access control",
    "School settings",
    "Asset management",
    "School calendar"
  ]
};

const premiumFeatures = {
  ai: [
    "AI-powered analytics",
    "Performance prediction",
    "Predictive attendance alerts",
    "AI chatbot (24/7 assistant)"
  ],
  automation: [
    "Automatic class placement",
    "Automatic exam seat allocation"
  ],
  enterprise: [
    "Multi-school (multi-campus) support",
    "Real-time dashboards",
    "Advanced analytics reports",
    "Financial trend forecasting"
  ],
  advancedComm: [
    "Targeted notification system",
    "SMS integration",
    "Push notifications",
    "Mobile app support"
  ],
  security: [
    "Full audit trails",
    "System security monitoring",
    "Database backup & restore",
    "Server configuration management",
    "Compliance monitoring"
  ],
  saas: [
    "Multi-tenant architecture",
    "Subscription management",
    "API access",
    "Integration management"
  ]
};

const roles = [
  "Student",
  "Teacher",
  "Parent",
  "Admin",
  "Registrar",
  "Finance (basic)"
];

const coreCount = Object.values(standardFeatures).reduce((acc, list) => acc + list.length, 0);
const advancedCount = Object.values(premiumFeatures).reduce((acc, list) => acc + list.length, 0);

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const standardCardRef = useRef<HTMLDivElement>(null);
  const premiumCardRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const bgTopRef = useRef<HTMLDivElement>(null);
  const bgBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      if (bgTopRef.current) {
        gsap.to(bgTopRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      if (bgBottomRef.current) {
        gsap.to(bgBottomRef.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      // Header with clip-path reveal
      gsap.set(headerRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
      gsap.to(headerRef.current, {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      });

      // Standard card animation with 3D effect
      gsap.set(standardCardRef.current, { opacity: 0, x: -80, scale: 0.9, rotationY: -15 });
      gsap.to(standardCardRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: standardCardRef.current,
          start: "top 85%",
        }
      });

      // Premium card animation with 3D effect
      gsap.set(premiumCardRef.current, { opacity: 0, x: 80, scale: 0.9, rotationY: 15 });
      gsap.to(premiumCardRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: premiumCardRef.current,
          start: "top 85%",
        }
      });

      // Parallax effect on cards
      gsap.to(standardCardRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: standardCardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(premiumCardRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: premiumCardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Comparison table reveal
      gsap.fromTo(
        comparisonRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: comparisonRef.current,
            start: "top 90%",
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={bgTopRef} className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.15),_rgba(236,72,153,0.15),_transparent)] blur-3xl opacity-50 dark:opacity-30" />
        <div ref={bgBottomRef} className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.1),_transparent_70%)] blur-3xl opacity-40 dark:opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 dark:bg-secondary text-secondary-foreground border border-primary/20 dark:border-cyan-300/40 text-sm font-medium mb-4 shadow-sm backdrop-blur-md">
            Pricing Plans
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-3">
            Transparent pricing. Enterprise outcomes.
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose a plan built to run your school smoothly — from core operations to automation at global scale.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div ref={standardCardRef}>
            <Card className="p-8 border border-border dark:border-slate-800/80 hover:border-primary/50 dark:hover:border-transparent bg-card/50 dark:bg-slate-950/80 rounded-2xl backdrop-blur-xl group cursor-default shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300">
              {/* Plan header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-medium mb-3 border border-emerald-400/40">
                  <Zap className="h-4 w-4" />
                  STANDARD
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-1">Core School Package</h3>
                <p className="text-sm text-muted-foreground mb-4">Reliable ERP for small–medium schools</p>

                <div className="inline-flex items-baseline gap-2 justify-center mb-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-foreground">$299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground/80">billed monthly · up to 500 students</p>
              </div>

              {/* Roles */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Included Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role, index) => (
                    <span key={index} className="bg-secondary/50 dark:bg-slate-900/70 text-secondary-foreground dark:text-slate-200 px-3 py-1 rounded-full text-sm border border-border dark:border-slate-700/70 group-hover:border-emerald-400/40 transition-colors duration-300">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feature summary chips */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 px-3 py-2 rounded-lg border border-emerald-400/40 group-hover:scale-105 transition-transform duration-300">
                  <Check className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-sm font-semibold">{coreCount} Core</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-300/80 font-medium">Essential features</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-secondary/50 dark:bg-slate-900/70 text-secondary-foreground dark:text-slate-200 px-3 py-2 rounded-lg border border-border dark:border-slate-700/70">
                  <div className="text-left">
                    <div className="text-sm font-semibold">{roles.length} Roles</div>
                    <div className="text-xs text-muted-foreground">Included</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {Object.entries(standardFeatures).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-sm font-bold text-foreground mb-2 capitalize">{group.replace(/([A-Z])/g, ' $1')}</p>
                    <ul className="space-y-2">
                      {items.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-emerald-500 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Total features */}
              <div className="bg-emerald-500/10 rounded-xl p-4 mb-6 text-center border border-emerald-400/40 group-hover:bg-emerald-500/15 transition-colors duration-300">
                <p className="text-emerald-700 dark:text-emerald-200 font-semibold text-sm">
                  {coreCount} Core features — everything you need to run day‑to‑day school operations
                </p>
              </div>

              {/* CTA */}
              <Button className="w-full bg-[#e35336] dark:bg-[#f47236] text-white hover:bg-[#c4452b] dark:hover:bg-[#e35336] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-500/20" size="lg">
                Start 14‑day free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>

          {/* Premium Plan */}
          <div ref={premiumCardRef}>
            <Card className="relative p-8 shadow-xl dark:shadow-none bg-card/80 dark:bg-slate-900/90 rounded-2xl border-2 border-primary/50 dark:border-cyan-300/30 backdrop-blur-xl group cursor-default overflow-visible transition-all duration-300">
              {/* Popular badge */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 text-white dark:text-slate-950 px-5 py-2 rounded-full text-sm font-semibold shadow-lg dark:shadow-[0_18px_40px_rgba(56,189,248,0.7)] flex items-center gap-2 border border-white/20 dark:border-cyan-200/70 animate-pulse-slow">
                  <Sparkles className="h-4 w-4" />
                  Most Popular
                </div>
              </div>

              {/* Plan header */}
              <div className="text-center mb-6 pt-4">
                <div className="inline-flex items-center gap-2 bg-secondary/50 dark:bg-slate-900/70 text-secondary-foreground dark:text-sky-100 px-3 py-1 rounded-full text-xs font-medium mb-3 border border-border dark:border-cyan-300/40">
                  <Crown className="h-4 w-4" />
                  PREMIUM
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-1">Enterprise Package</h3>
                <p className="text-sm text-muted-foreground mb-4">Core + advanced automation, AI, and enterprise features</p>

                <div className="inline-flex items-baseline gap-2 justify-center mb-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-foreground">$599</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground/80">billed monthly · up to 2,000 students</p>
              </div>

              {/* Feature summary chips */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-secondary/80 dark:bg-slate-900/80 text-foreground dark:text-sky-100 px-3 py-2 rounded-lg border border-border dark:border-cyan-300/40 group-hover:scale-105 transition-transform duration-300">
                  <Check className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-sm font-semibold">{coreCount} Core</div>
                    <div className="text-xs text-muted-foreground font-medium">Included</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-primary/10 dark:bg-slate-900/80 text-primary dark:text-sky-100 px-3 py-2 rounded-lg border border-primary/20 dark:border-cyan-300/40 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-sm font-semibold">+ {advancedCount} Advanced</div>
                    <div className="text-xs text-primary/70 dark:text-slate-400 font-medium">Automation & AI</div>
                  </div>
                </div>
              </div>

              {/* Premium Features grouped */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {Object.entries(premiumFeatures).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-sm font-bold text-foreground mb-2 capitalize">{group.replace(/([A-Z])/g, ' $1')}</p>
                    <ul className="space-y-2">
                      {items.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-primary dark:text-sky-300 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Total features */}
              <div className="bg-primary/10 dark:bg-slate-900/80 rounded-xl p-4 mb-6 text-center border border-primary/20 dark:border-cyan-300/40 group-hover:bg-primary/20 dark:group-hover:bg-slate-900/90 transition-colors duration-300">
                <p className="text-primary dark:text-sky-100 font-semibold text-sm">
                  {coreCount} Core + {advancedCount} Advanced = {coreCount + advancedCount} features — built for scale
                </p>
              </div>

              {/* CTA */}
              <Button className="w-full bg-[#e35336] dark:bg-[#f47236] text-white hover:bg-[#c4452b] dark:hover:bg-[#e35336] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-500/40" size="lg">
                Start 14‑day free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>

        {/* Plan comparison */}
        <div ref={comparisonRef} className="mt-16 max-w-4xl mx-auto">
          <div className="bg-card/50 dark:bg-slate-950/80 rounded-2xl shadow-sm dark:shadow-none overflow-hidden border border-border dark:border-slate-800/80 backdrop-blur-xl transition-all duration-300">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Compare plans at a glance</h3>
              <p className="text-sm text-muted-foreground mt-1">Quickly see which features are included in each plan.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-fixed">
                <thead className="bg-secondary/30 dark:bg-slate-900/80">
                  <tr>
                    <th className="text-left p-4 text-sm font-bold text-foreground">Feature</th>
                    <th className="text-center p-4 text-sm font-bold text-foreground">Standard</th>
                    <th className="text-center p-4 text-sm font-bold text-foreground">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-slate-800">
                  <tr className="hover:bg-secondary/20 dark:hover:bg-slate-900/70 transition-colors duration-200">
                    <td className="p-4 text-foreground font-medium">AI & Analytics</td>
                    <td className="p-4 text-center text-muted-foreground">—</td>
                    <td className="p-4 text-center"><Check className="h-5 w-5 text-primary dark:text-sky-300 mx-auto" /></td>
                  </tr>

                  <tr className="hover:bg-secondary/20 dark:hover:bg-slate-900/70 transition-colors duration-200">
                    <td className="p-4 text-foreground font-medium">Multi-campus support</td>
                    <td className="p-4 text-center text-muted-foreground">—</td>
                    <td className="p-4 text-center"><Check className="h-5 w-5 text-primary dark:text-sky-300 mx-auto" /></td>
                  </tr>

                  <tr className="hover:bg-secondary/20 dark:hover:bg-slate-900/70 transition-colors duration-200">
                    <td className="p-4 text-foreground font-medium">API access</td>
                    <td className="p-4 text-center text-muted-foreground">—</td>
                    <td className="p-4 text-center"><Check className="h-5 w-5 text-primary dark:text-sky-300 mx-auto" /></td>
                  </tr>

                  <tr className="hover:bg-secondary/20 dark:hover:bg-slate-900/70 transition-colors duration-200">
                    <td className="p-4 text-foreground font-medium">SMS integration</td>
                    <td className="p-4 text-center text-muted-foreground">—</td>
                    <td className="p-4 text-center"><Check className="h-5 w-5 text-primary dark:text-sky-300 mx-auto" /></td>
                  </tr>

                  <tr className="hover:bg-secondary/20 dark:hover:bg-slate-900/70 transition-colors duration-200">
                    <td className="p-4 text-foreground font-medium">Advanced security</td>
                    <td className="p-4 text-center text-muted-foreground">Basic</td>
                    <td className="p-4 text-center"><Check className="h-5 w-5 text-primary dark:text-sky-300 mx-auto" /></td>
                  </tr>

                  <tr className="hover:bg-secondary/20 dark:hover:bg-slate-900/70 transition-colors duration-200">
                    <td className="p-4 text-foreground font-medium">Onboarding & training</td>
                    <td className="p-4 text-center"><Check className="h-5 w-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="h-5 w-5 text-primary dark:text-sky-300 mx-auto" /></td>
                  </tr>

                  <tr className="hover:bg-secondary/20 dark:hover:bg-slate-900/70 transition-colors duration-200">
                    <td className="p-4 text-foreground font-medium">Customer support</td>
                    <td className="p-4 text-center text-muted-foreground">Email</td>
                    <td className="p-4 text-center text-foreground font-semibold">Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground font-medium">
            All plans include free onboarding, training, and migration assistance.
          </p>
          <p className="text-muted-foreground mt-2">
            Need a custom plan?{" "}
            <a href="#contact" className="text-primary hover:text-primary/80 dark:text-sky-300 dark:hover:text-sky-200 font-bold hover:underline underline-offset-4 transition-all duration-300">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
