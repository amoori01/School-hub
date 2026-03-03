import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Columns staggered animation
      columnsRef.current.forEach((column, index) => {
        if (!column) return;

        gsap.fromTo(
          column,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: column,
              start: "top 90%",
            }
          }
        );
      });

      // Bottom section animation
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 95%",
          }
        }
      );
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !columnsRef.current.includes(el)) {
      columnsRef.current.push(el);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-10 bg-gradient-to-br from-background via-background to-black text-foreground relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,1),_#020617_70%)] opacity-90" />
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.5),_rgba(236,72,153,0.5),_transparent_60%)] blur-3xl opacity-70" />
      </div>
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-white" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div ref={addToRefs} className="company-column">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="h-11 w-11 rounded-2xl bg-[#e35336] dark:bg-[#f47236] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <span className="text-slate-950 font-extrabold text-xl">E</span>
              </div>
              <span className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                EduManage
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Empowering educational institutions worldwide with innovative management solutions that simplify operations and enhance learning.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Facebook className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div ref={addToRefs} className="product-column">
            <h3 className="text-foreground font-semibold text-xl mb-8">Product</h3>
            <ul className="space-y-4">
              <li><Link to="/#features" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Features</Link></li>
              <li><Link to="/#solutions" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Solutions</Link></li>
              <li><Link to="/#pricing" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Pricing</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Updates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Integrations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div ref={addToRefs} className="company-column">
            <h3 className="text-foreground font-semibold text-xl mb-8">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">About Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Partners</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Contact</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block">Press Kit</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div ref={addToRefs} className="contact-column">
            <h3 className="text-foreground font-semibold text-xl mb-8">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start group">
                <Mail className="h-5 w-5 mr-4 mt-0.5 flex-shrink-0 text-primary group-hover:text-primary/80 transition-colors duration-300 group-hover:scale-110" />
                <div>
                  <a href="mailto:support@edumanage.com" className="hover:text-primary transition-colors duration-300 text-muted-foreground">
                    support@edumanage.com
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <Phone className="h-5 w-5 mr-4 mt-0.5 flex-shrink-0 text-primary group-hover:text-primary/80 transition-colors duration-300 group-hover:scale-110" />
                <div>
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors duration-300 text-muted-foreground">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-4 mt-0.5 flex-shrink-0 text-primary group-hover:text-primary/80 transition-colors duration-300 group-hover:scale-110" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  123 Education St
                  <br />
                  Learning City, ED 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div ref={bottomRef} className="border-t border-border pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-6 md:mb-0">
              © 2026 EduManage. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm">
              <a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:underline">
                Terms of Service
              </a>
                            <a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:underline">
                              Cookie Policy
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </footer>
                );
              }
