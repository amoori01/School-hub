import { Card } from "./ui/card";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Principal",
    school: "Oakwood International School",
    location: "London, UK",
    avatar: "SM",
    rating: 5,
    text: "EduManage has completely transformed how we run our school. The automation features alone have saved us countless hours each week. Our staff loves how intuitive it is.",
    students: "2,500 students"
  },
  {
    name: "Michael Chen",
    role: "Director of Operations",
    school: "Singapore Academy",
    location: "Singapore",
    avatar: "MC",
    rating: 5,
    text: "The financial management module is exceptional. We've seen a 95% reduction in payment delays and our parents appreciate the transparent fee tracking.",
    students: "3,200 students"
  },
  {
    name: "Jennifer Rodriguez",
    role: "School Administrator",
    school: "Global Education Center",
    location: "New York, USA",
    avatar: "JR",
    rating: 5,
    text: "Implementation was seamless, and the support team was outstanding. Within 3 weeks, our entire school was up and running. The ROI has been incredible.",
    students: "1,800 students"
  }
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trustRef = useRef<HTMLDivElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const bgRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background elements parallax - move in opposite directions
      if (bgLeftRef.current) {
        gsap.to(bgLeftRef.current, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      if (bgRightRef.current) {
        gsap.to(bgRightRef.current, {
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
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      });

      // Cards with horizontal scroll-linked animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Initial entrance - stagger from bottom with rotation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: 0.85,
            rotationY: -10
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Parallax effect - each card moves at different speed
        gsap.to(card, {
          y: -50 * (index + 1) * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        });

        // Scale effect on scroll
        gsap.to(card, {
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1
          }
        });
      });

      // Trust indicator with fade and slide up
      gsap.fromTo(
        trustRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 95%",
          }
        }
      );

      // Horizontal scroll effect for cards - cards slide horizontally as you scroll
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.to(cards, {
          x: () => -(cards.length - 1) * 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1
          }
        });
      }
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
    <section ref={sectionRef} id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={bgLeftRef} className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.1),_transparent_70%)] blur-3xl opacity-40 dark:opacity-30" />
        <div ref={bgRightRef} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.1),_transparent_70%)] blur-3xl opacity-40 dark:opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 dark:bg-secondary text-secondary-foreground text-sm font-medium mb-4 border border-primary/20 dark:border-cyan-300/40 shadow-sm backdrop-blur-md">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by School Leaders Worldwide
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied institutions who have transformed their operations
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div ref={addToRefs} key={index}>
              <Card
                className="p-8 border-2 border-border dark:border-slate-800/80 hover:border-primary/50 dark:hover:border-sky-400/60 transition-all duration-300 bg-card/50 dark:bg-slate-950/80 relative rounded-2xl backdrop-blur-xl group cursor-default shadow-sm hover:shadow-xl dark:shadow-none"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-primary/10 dark:text-sky-300/30 group-hover:text-primary/20 dark:group-hover:text-sky-300/50 transition-colors duration-300">
                  <Quote className="h-10 w-10" fill="currentColor" />
                </div>

                {/* Rating stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-foreground/90 dark:text-slate-200 mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center border-t border-border pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 flex items-center justify-center text-white dark:text-slate-950 font-bold text-lg mr-4 flex-shrink-0 shadow-[0_16px_40px_rgba(56,189,248,0.3)] dark:shadow-[0_16px_40px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-all duration-300">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary dark:text-sky-300 font-medium mt-1 group-hover:underline decoration-primary transition-all duration-300">
                      {testimonial.school}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {testimonial.location} • {testimonial.students}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div ref={trustRef} className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 font-medium">Trusted by leading institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-black text-foreground hover:text-primary transition-colors duration-300 cursor-default">CAMBRIDGE</div>
            <div className="text-2xl font-black text-foreground hover:text-primary transition-colors duration-300 cursor-default">IB WORLD</div>
            <div className="text-2xl font-black text-foreground hover:text-primary transition-colors duration-300 cursor-default">EDEXCEL</div>
            <div className="text-2xl font-black text-foreground hover:text-primary transition-colors duration-300 cursor-default">IGCSE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
