import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BookOpen, Award, Users, GraduationCap, Clock, Calendar, 
  MessageSquare, ClipboardList, UserCheck, BarChart3, Mail,
  Truck, FileText, Palette, Briefcase, Image, CheckSquare,
  Package, MessageCircle, TestTube, School, Building2, ChevronDown,
  CreditCard, UserPlus, Bell, Shield, Database, Link
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Core Modules with icons and descriptions
const coreModules = [
  { name: "Courses and Batches", icon: BookOpen, description: "Create and manage courses, organize batches, and track enrollment periods effectively." },
  { name: "Certificate Generator", icon: Award, description: "Design and generate customizable certificates for students and staff." },
  { name: "Student Information", icon: Users, description: "Comprehensive student database with profiles, documents, and academic history." },
  { name: "Human Resources", icon: Briefcase, description: "Manage employee records, payroll, leaves, and performance evaluations." },
  { name: "Multiple Dashboards", icon: LayoutDashboard, description: "Role-based dashboards for admins, teachers, students, and parents." },
  { name: "Employee / Teacher Login", icon: UserCheck, description: "Separate portal for staff with attendance, grading, and communication tools." },
  { name: "Student Attendance", icon: Calendar, description: "Track daily attendance with mobile check-in and automated notifications." },
  { name: "Student Admission", icon: UserPlus, description: "Streamlined online admission process with document upload and status tracking." },
  { name: "Students / Parents Login", icon: GraduationCap, description: "Dedicated portal for grades, attendance, fees, and communications." },
  { name: "Timetable", icon: Clock, description: "Create and manage class schedules with conflict detection and room allocation." },
  { name: "News Management", icon: Newspaper, description: "Publish announcements, news articles, and updates to specific groups." },
  { name: "Messaging System", icon: MessageSquare, description: "Internal messaging between staff, students, and parents with notifications." },
  { name: "Gradebook", icon: ClipboardList, description: "Record and manage grades with weighted calculations and GPA tracking." },
  { name: "Examination", icon: FileText, description: "Plan, schedule, and grade exams with automated result processing." },
  { name: "User Management", icon: Shield, description: "Manage roles, permissions, and access controls across the system." },
  { name: "SMS Integration", icon: Smartphone, description: "Send SMS alerts for attendance, fees, and important announcements." },
  { name: "School / Events Calendar", icon: Calendar, description: "Shared calendar for events, exams, holidays, and activities." },
  { name: "Report Center", icon: BarChart3, description: "Generate comprehensive reports on academics, finance, and attendance." },
  { name: "ID Card Generator", icon: CreditCard, description: "Design and print customizable ID cards for students and staff." },
  { name: "Finance", icon: DollarSign, description: "Manage fees, expenses, invoices, and financial reporting." },
  { name: "Custom Student Remarks", icon: MessageCircle, description: "Add personalized notes and observations for student progress." }
];

// Standard Modules with icons and descriptions
const standardModules = [
  { name: "Library", icon: BookOpen, description: "Digital catalog, book issuing, return tracking, and member management." },
  { name: "Data Management", icon: Database, description: "Import, export, and backup your institutional data securely." },
  { name: "Email Integration", icon: Mail, description: "Automated email notifications and newsletters to stakeholders." },
  { name: "Transportation", icon: Truck, description: "Track school buses, routes, and student pick-up/drop-off." },
  { name: "Custom Import", icon: Upload, description: "Bulk import data from spreadsheets and other systems." },
  { name: "Blog", icon: FileText, description: "Publish articles, educational content, and school updates." },
  { name: "Custom Report", icon: BarChart3, description: "Build custom reports with drag-and-drop report builder." },
  { name: "Theme", icon: Palette, description: "Customize the look and feel with branded themes and colors." },
  { name: "Placement", icon: Briefcase, description: "Track student placements, internships, and career opportunities." },
  { name: "Gallery", icon: Image, description: "Photo and video galleries for events, activities, and campus life." },
  { name: "Task", icon: CheckSquare, description: "Assign and track tasks across departments and teams." },
  { name: "Inventory", icon: Package, description: "Manage school supplies, equipment, and asset tracking." },
  { name: "Discussion", icon: MessageCircle, description: "Forums for teachers, students, and parents to collaborate." },
  { name: "Online Exam", icon: TestTube, description: "Conduct computer-based tests with anti-cheating features." },
  { name: "Alumni", icon: School, description: "Maintain alumni database and track graduate outcomes." },
  { name: "Hostel", icon: Building2, description: "Manage hostel rooms, allocations, and meal plans." },
  { name: "Institution Profile", icon: GraduationCap, description: "Public profile page with information and branding." }
];

// Helper function to get icon component (handling case where icon might be string)
const getIcon = (icon: any) => {
  if (typeof icon === 'string') {
    // Return a default icon if it's a string
    return BookOpen;
  }
  return icon;
};

function LayoutDashboard(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function Newspaper(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V6c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2v1"/>
      <path d="M10 6h8"/>
      <path d="M10 10h8"/>
      <path d="M10 14h4"/>
    </svg>
  );
}

function Smartphone(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
      <path d="M12 18h.01"/>
    </svg>
  );
}

function DollarSign(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" x2="12" y1="2" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}

function Upload(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  );
}

export function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const coreGridRef = useRef<HTMLDivElement>(null);
  const standardGridRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [expandedCore, setExpandedCore] = useState<number | null>(null);
  const [expandedStandard, setExpandedStandard] = useState<number | null>(null);

  const toggleCoreModule = (index: number) => {
    setExpandedCore(expandedCore === index ? null : index);
  };

  const toggleStandardModule = (index: number) => {
    setExpandedStandard(expandedStandard === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate gradient background
      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          backgroundPosition: "200% 200%",
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
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

      // Core modules with clip-path reveal and staggered animation
      const coreCards = coreGridRef.current?.children;
      if (coreCards) {
        gsap.set(coreCards, { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 30 });
        gsap.to(coreCards, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: coreGridRef.current,
            start: "top 85%"
          }
        });
      }

      // Standard modules with clip-path reveal and staggered animation
      const standardCards = standardGridRef.current?.children;
      if (standardCards) {
        gsap.set(standardCards, { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 30 });
        gsap.to(standardCards, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: standardGridRef.current,
            start: "top 85%"
          }
        });
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
      <div ref={gradientRef} className="absolute inset-0 dark:block hidden">
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
            {coreModules.map((module, index) => {
              const Icon = getIcon(module.icon);
              const isExpanded = expandedCore === index;
              
              return (
                <div
                  key={`core-${index}`}
                  className={`bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer ${isExpanded ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => toggleCoreModule(index)}
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-fuchsia-400 flex items-center justify-center mr-3 flex-shrink-0">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 flex-1">
                        {module.name}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                      <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-2">
                        {module.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
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
            {standardModules.map((module, index) => {
              const Icon = getIcon(module.icon);
              const isExpanded = expandedStandard === index;
              
              return (
                <div
                  key={`standard-${index}`}
                  className={`bg-secondary/30 dark:bg-secondary/20 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 group cursor-pointer ${isExpanded ? 'ring-2 ring-cyan-400' : ''}`}
                  onClick={() => toggleStandardModule(index)}
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-cyan-400 dark:group-hover:text-cyan-300 transition-colors duration-300 flex-1">
                        {module.name}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                      <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-2">
                        {module.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
