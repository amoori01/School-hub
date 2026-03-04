import {
  Users,
  Calendar,
  FileText,
  DollarSign,
  MessageSquare,
  BookOpen,
  BarChart3,
  GraduationCap,
  ClipboardCheck,
  Bell,
  Shield,
  Wifi
} from "lucide-react";
import { Card } from "./ui/card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    icon: Users,
    title: "Student Information System",
    description: "Complete student database with enrollment, profiles, academic records, and health information management.",
    features: ["Admission management", "Student profiles", "Academic records", "Document storage"]
  },
  {
    icon: ClipboardCheck,
    title: "Attendance Management",
    description: "Automated attendance tracking with SMS/email notifications to parents and detailed reporting.",
    features: ["Daily attendance", "Leave management", "Parent notifications", "Attendance reports"]
  },
  {
    icon: FileText,
    title: "Examination System",
    description: "Comprehensive exam management from scheduling to result publication with automated grading.",
    features: ["Exam scheduling", "Grade management", "Report cards", "Transcript generation"]
  },
  {
    icon: DollarSign,
    title: "Fee & Finance Management",
    description: "Complete financial management with fee collection, invoicing, expense tracking, and financial reports.",
    features: ["Fee collection", "Online payments", "Expense tracking", "Financial reports"]
  },
  {
    icon: Calendar,
    title: "Timetable & Scheduling",
    description: "Intelligent class scheduling with conflict detection and automatic timetable generation.",
    features: ["Class scheduling", "Teacher allocation", "Room management", "Calendar integration"]
  },
  {
    icon: MessageSquare,
    title: "Communication Portal",
    description: "Unified messaging system for announcements, notifications, and parent-teacher communication.",
    features: ["SMS/Email alerts", "Announcements", "Parent portal", "Discussion forums"]
  },
  {
    icon: BookOpen,
    title: "Library Management",
    description: "Digital library system with cataloging, issue/return tracking, and inventory management.",
    features: ["Book catalog", "Issue/return", "Member management", "Late fee tracking"]
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Powerful dashboards and custom reports for data-driven decision making.",
    features: ["Performance analytics", "Custom reports", "Data visualization", "Export options"]
  },
  {
    icon: GraduationCap,
    title: "Certificate Management",
    description: "Generate and manage digital certificates, transcripts, and official documents.",
    features: ["Certificate templates", "Bulk generation", "Verification system", "Digital signatures"]
  },
  {
    icon: Bell,
    title: "Notifications System",
    description: "Automated multi-channel notifications for events, deadlines, and important updates.",
    features: ["SMS notifications", "Email alerts", "Push notifications", "Scheduled reminders"]
  },
  {
    icon: Shield,
    title: "Security & Access Control",
    description: "Role-based access control with comprehensive user management and audit logs.",
    features: ["User roles", "Permission management", "Audit logs", "Data encryption"]
  },
  {
    icon: Wifi,
    title: "Online Learning Integration",
    description: "Seamless integration with LMS platforms for hybrid and online learning.",
    features: ["LMS integration", "Online classes", "Assignment management", "Progress tracking"]
  }
];

export function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cardsRef.current,
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
      className="py-24 relative overflow-hidden"
    >
      {/* Background decoration — dark mode */}
      <div className="pointer-events-none absolute inset-0 opacity-70 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9),_rgba(15,23,42,0.98))]" />
        <div className="absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.35),_transparent_60%)] blur-3xl" />
      </div>
      {/* Background decoration — light mode */}
      <div className="pointer-events-none absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50" />
        <div className="absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.15),_transparent_60%)] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary border border-primary/30 text-primary dark:text-sky-100 text-sm font-medium mb-6 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-400 mr-3 animate-pulse" />
            Modules that power the entire institution
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="block">A complete suite of</span>
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
              mission‑critical modules
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            From admissions to analytics, every workflow is modelled in depth so your team can
            scale operations without adding headcount.
          </p>
        </div>

        {/* Modules grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 max-w-7xl mx-auto"
        >
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card
                key={index}
                className="p-7 lg:p-8 border border-border hover:border-primary/40 dark:hover:border-sky-400/60 hover:shadow-xl dark:hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-500 bg-card/80 dark:bg-slate-950/70 backdrop-blur-xl group hover:-translate-y-2 rounded-2xl"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary via-cyan-400 to-fuchsia-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500 shadow-lg dark:shadow-[0_16px_40px_rgba(56,189,248,0.7)]">
                    <Icon className="h-6 w-6 text-white dark:text-slate-950" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {module.description}
                    </p>
                    <ul className="space-y-2">
                      {module.features.map((feature, fIndex) => (
                        <li
                          key={fIndex}
                          className="text-xs text-muted-foreground flex items-center gap-2 group-hover:text-foreground transition-colors duration-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-fuchsia-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
