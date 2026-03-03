import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "Real-time dashboard analytics",
  "Advanced reporting engine",
  "Customizable dashboards",
  "Data visualization tools",
  "Performance tracking",
  "Automated insights"
];

export function ProductPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topImageRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top section - image animation
      gsap.fromTo(
        topImageRef.current,
        { opacity: 0, x: -40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: topContentRef.current,
            start: "top 80%",
          }
        }
      );

      // Top content animation
      gsap.fromTo(
        topContentRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: topContentRef.current,
            start: "top 75%",
          }
        }
      );

      // Bottom section content
      gsap.fromTo(
        bottomContentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomContentRef.current,
            start: "top 85%",
          }
        }
      );

      // Bottom section image
      gsap.fromTo(
        bottomImageRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomContentRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.08),_transparent_70%)] blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.08),_transparent_70%)] blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left - Image */}
            <div ref={topImageRef} className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_22px_55px_rgba(15,23,42,0.95)] border border-slate-800/80 group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBtb2NrdXB8ZW58MXx8fHwxNzcxMzIxMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Analytics Dashboard"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/12 via-transparent to-fuchsia-500/14 pointer-events-none"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div ref={topContentRef} className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 text-sm font-medium mb-6 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
                Dashboard
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-6">
                Powerful Analytics at Your Fingertips
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Get instant insights into your school's performance with our comprehensive 
                dashboard. Track attendance, grades, finances, and more in real-time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle2 className="h-6 w-6 text-sky-300 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-slate-200 group-hover:text-sky-100 transition-colors duration-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section - Full width image */}
          <div className="relative">
            <div ref={bottomContentRef} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
                Visualize Your Data Like Never Before
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Transform complex data into actionable insights with beautiful charts and reports
              </p>
            </div>
            
            <div ref={bottomImageRef} className="relative rounded-2xl overflow-hidden shadow-[0_22px_55px_rgba(15,23,42,0.95)] border border-slate-800/80 group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770681381576-f1fdceb2ea01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGNoYXJ0c3xlbnwxfHx8fDE3NzEzMTA5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Data Visualization"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Feature badges */}
              <div className="absolute top-8 left-8 bg-slate-950/90 backdrop-blur-xl rounded-xl shadow-lg p-4 border border-slate-800/80 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-sky-300 mb-1">98.5%</div>
                <div className="text-sm text-slate-300">Student Satisfaction</div>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-slate-950/90 backdrop-blur-xl rounded-xl shadow-lg p-4 border border-slate-800/80 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-sky-300 mb-1">45%</div>
                <div className="text-sm text-slate-300">Time Saved on Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
