import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  MessageSquare, 
  Smartphone,
  BarChart3,
  BookOpen,
  Shield,
  Globe,
  Zap,
  Award
} from "lucide-react";
import { Card } from "./ui/card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Users,
    title: "Student Information Management",
    description: "Comprehensive student profiles with admission, enrollment, and academic records management."
  },
  {
    icon: Calendar,
    title: "Attendance & Timetable",
    description: "Automated attendance tracking and intelligent timetable scheduling for all classes."
  },
  {
    icon: FileText,
    title: "Exams & Gradebook",
    description: "Digital exam management with automated grading and report card generation."
  },
  {
    icon: DollarSign,
    title: "Fees & Finance Automation",
    description: "Complete fee collection, invoicing, and financial reporting with payment gateway integration."
  },
  {
    icon: MessageSquare,
    title: "Parent & Teacher Communication",
    description: "Real-time messaging, announcements, and parent-teacher collaboration portal."
  },
  {
    icon: Smartphone,
    title: "Mobile App Access",
    description: "Native iOS and Android apps for students, parents, and teachers on the go."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Powerful dashboards and insights to track school performance and student progress."
  },
  {
    icon: BookOpen,
    title: "Library Management",
    description: "Digital library system with book cataloging, borrowing, and inventory tracking."
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Enterprise-grade security with role-based access control and data encryption."
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Support for 40+ languages to serve schools worldwide with localized content."
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "Connect with third-party tools and services through our robust REST API."
  },
  {
    icon: Award,
    title: "Certification Management",
    description: "Generate and manage digital certificates, transcripts, and official documents."
  }
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax effect
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      // Header animation with clip-path reveal
      gsap.set(headerRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
      gsap.to(headerRef.current, {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      });

      // Cards staggered animation with scale and fade
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Different animation directions based on position
        const xOffset = index % 3 === 0 ? -50 : index % 3 === 2 ? 50 : 0;
        
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.9,
            rotationX: -15
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Add parallax to each card
        gsap.to(card, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // Progressive reveal effect for the entire section
      gsap.fromTo(sectionRef.current,
        { opacity: 0.8 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
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
    <section ref={sectionRef} id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.08),_transparent_70%)] opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 text-sm font-medium mb-4 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            Everything Your School Needs
          </h2>
          <p className="text-xl text-slate-300">
            A complete suite of tools to manage every aspect of your educational institution
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div ref={addToRefs} key={index}>
                <Card 
                  className="p-8 border border-slate-800/80 hover:border-sky-400/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300 bg-slate-950/80 group rounded-2xl backdrop-blur-xl cursor-default"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_40px_rgba(56,189,248,0.7)] group-hover:shadow-[0_20px_50px_rgba(56,189,248,0.8)]">
                    <Icon className="h-7 w-7 text-slate-950" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-sky-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
