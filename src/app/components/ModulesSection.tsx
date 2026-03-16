import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Core Modules (21)
const coreModules = [
  "Courses and Batches",
  "Certificate Generator",
  "Student Information",
  "Human Resources",
  "Multiple Dashboards",
  "Employee / Teacher Login",
  "Student Attendance",
  "Student Admission",
  "Students / Parents Login",
  "Timetable",
  "News Management",
  "Messaging System",
  "Gradebook",
  "Examination",
  "User Management",
  "SMS Integration",
  "School / Events Calendar",
  "Report Center",
  "ID Card Generator",
  "Finance",
  "Custom Student Remarks"
];

// Standard Modules (17)
const standardModules = [
  "Library",
  "Data Management",
  "Email Integration",
  "Transportation",
  "Custom Import",
  "Blog",
  "Custom Report",
  "Theme",
  "Placement",
  "Gallery",
  "Task",
  "Inventory",
  "Discussion",
  "Online Exam",
  "Alumni",
  "Hostel",
  "Institution Profile"
];

export function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const coreGridRef = useRef<HTMLDivElement>(null);
  const standardGridRef = useRef<HTMLDivElement>(null);

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
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );

      // Core modules staggered animation
      const coreCards = coreGridRef.current?.children;
      if (coreCards) {
        gsap.fromTo(
          coreCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: coreGridRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Standard modules staggered animation
      const standardCards = standardGridRef.current?.children;
      if (standardCards) {
        gsap.fromTo(
          standardCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: standardGridRef.current,
              start: "top 85%"
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
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-background"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,1),_#020617_70%)]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[conic-gradient(from_180deg,_rgba(56,189,248,0.15),_rgba(236,72,153,0.15),_rgba(56,189,248,0.15))] blur-3xl opacity-50" />
      </div>
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-white" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-foreground mb-3 sm:mb-4">
            A complete suite of mission-critical modules
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Empower your educational institution with our comprehensive management tools
          </p>
        </div>

        {/* Core Modules Section */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-5 sm:mb-6 lg:mb-8 text-center">
            <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
              Core Modules
            </span>
            <span className="text-muted-foreground ml-2">(21)</span>
          </h3>
          <div
            ref={coreGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {coreModules.map((module, index) => (
              <div
                key={`core-${index}`}
                className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary/50 dark:hover:border-sky-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-400 mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {module}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Standard Modules Section */}
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-5 sm:mb-6 lg:mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Standard Modules
            </span>
            <span className="text-muted-foreground ml-2">(17)</span>
          </h3>
          <div
            ref={standardGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {standardModules.map((module, index) => (
              <div
                key={`standard-${index}`}
                className="bg-secondary/30 dark:bg-secondary/20 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-cyan-400/50 dark:hover:border-cyan-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 group"
              >
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-cyan-400 dark:group-hover:text-cyan-300 transition-colors duration-300">
                    {module}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
