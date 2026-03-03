import { Users, Target, Award, Globe, TrendingUp, Heart } from "lucide-react";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower educational institutions worldwide with innovative technology that simplifies administration and enhances learning outcomes."
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the global leader in educational management solutions, transforming how institutions operate and students learn."
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "We believe in innovation, integrity, excellence, and putting our customers at the heart of everything we do."
  }
];

const stats = [
  { number: "15+", label: "Years of Experience" },
  { number: "5000+", label: "Institutions" },
  { number: "150+", label: "Countries" },
  { number: "2M+", label: "Active Users" }
];

const team = [
  { name: "John Anderson", role: "Chief Executive Officer", avatar: "JA" },
  { name: "Sarah Mitchell", role: "Chief Technology Officer", avatar: "SM" },
  { name: "David Kumar", role: "VP of Product", avatar: "DK" },
  { name: "Emily Chen", role: "Head of Customer Success", avatar: "EC" }
];

function Eye(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero background parallax
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      // Header with clip-path reveal (like PricingSection)
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

      // Story section with slide reveal
      const storyChildren = storyRef.current?.children;
      if (storyChildren) {
        gsap.set(storyChildren, { opacity: 0, x: -50 });
        gsap.to(storyChildren, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: storyRef.current, 
            start: "top 80%" 
          }
        });
      }

      // Values with 3D card reveals
      const valueCards = valuesRef.current?.children;
      if (valueCards) {
        gsap.set(valueCards, { opacity: 0, y: 60, scale: 0.9, rotationX: -15 });
        gsap.to(valueCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: valuesRef.current, 
            start: "top 80%" 
          }
        });
      }

      // Stats with counter-style reveal
      const statItems = statsRef.current?.children;
      if (statItems) {
        gsap.set(statItems, { opacity: 0, y: 30, scale: 0.9 });
        gsap.to(statItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { 
            trigger: statsRef.current, 
            start: "top 85%" 
          }
        });
      }

      // Team with 3D card reveals
      const teamCards = teamRef.current?.querySelectorAll('.team-card');
      if (teamCards) {
        gsap.set(teamCards, { opacity: 0, y: 50, scale: 0.9, rotationY: -10 });
        gsap.to(teamCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: teamRef.current, 
            start: "top 80%" 
          }
        });
      }

      // Why choose with slide reveal
      const whyChooseChildren = whyChooseRef.current?.children;
      if (whyChooseChildren) {
        gsap.set(whyChooseChildren, { opacity: 0, x: 50 });
        gsap.to(whyChooseChildren, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: whyChooseRef.current, 
            start: "top 80%" 
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-slate-950">
      {/* Hero */}
      <section className="relative py-24 bg-[radial-gradient(circle_at_top,_#0b1120,_#020617_70%)] overflow-hidden">
        <div ref={heroBgRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.3),_rgba(236,72,153,0.3),_transparent)] blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.2),_transparent_70%)] blur-3xl opacity-40" />
        </div>
        <div ref={heroRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={headerRef} className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 text-sm font-medium mb-6 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
              About Us
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 mb-6 leading-tight">
              Transforming Education
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent"> Management </span>
              Worldwide
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We're on a mission to revolutionize education management through innovative technology and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>EduManage was founded in 2011 by a team of educators and technologists who saw firsthand the challenges schools face in managing day-to-day operations.</p>
                <p>What started as a simple attendance tracking system has evolved into a comprehensive platform used by over 5,000 institutions across 150 countries.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-[0_22px_55px_rgba(15,23,42,0.95)] border border-slate-800/80 group">
              <ImageWithFallback src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?w=1080" alt="Our team" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">Our Mission, Vision & Values</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-8 text-center border border-slate-800/80 bg-slate-950/80 rounded-2xl backdrop-blur-xl group hover:border-sky-400/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 flex items-center justify-center mx-auto mb-6 shadow-[0_16px_40px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-slate-950" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 mb-4">{value.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[radial-gradient(circle_at_top,_#020617,_#020617_70%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-sky-300 mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-slate-400 group-hover:text-slate-200 transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">Meet Our Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
{team.map((member, index) => (
              <Card key={index} className="team-card p-6 text-center border border-slate-800/80 hover:shadow-[0_18px_35px_rgba(15,23,42,0.95)] transition-all duration-300 bg-slate-950/80 rounded-2xl backdrop-blur-xl group cursor-default">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 flex items-center justify-center text-slate-950 text-2xl font-bold mx-auto mb-4 shadow-[0_16px_40px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-slate-100 mb-1 group-hover:text-sky-200 transition-colors duration-300">{member.name}</h3>
                <p className="text-sm text-slate-400">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-950">
        <div ref={whyChooseRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-[0_22px_55px_rgba(15,23,42,0.95)] border border-slate-800/80 order-2 lg:order-1 group">
              <ImageWithFallback src="https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?w=1080" alt="Team collaboration" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-6">Why Choose EduManage?</h2>
              <div className="space-y-6">
                {[{ icon: Award, title: "Industry Leading", desc: "Award-winning platform trusted by top institutions" }, { icon: Users, title: "Customer Focused", desc: "Dedicated support team and personalized onboarding" }, { icon: TrendingUp, title: "Continuous Innovation", desc: "Regular updates and new features based on feedback" }, { icon: Globe, title: "Global Reach", desc: "Multi-language support and presence in 150+ countries" }].map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 flex items-center justify-center mr-4 flex-shrink-0 shadow-[0_16px_40px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-slate-950" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-100 mb-2 group-hover:text-sky-200 transition-colors duration-300">{item.title}</h3>
                      <p className="text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
