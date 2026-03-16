import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { t } = useTranslation();
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
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-10 sm:py-14 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12 lg:mb-16">
          {/* Company Info */}
          <div ref={addToRefs} className="company-column">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 group">
              <div className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 rounded-xl sm:rounded-2xl bg-[#e35336] dark:bg-[#f47236] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <span className="text-slate-950 font-extrabold text-lg sm:text-xl">E</span>
              </div>
              <span className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                School Hub
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary hover:bg-[#e35336] transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border">
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div ref={addToRefs} className="product-column">
            <h3 className="text-foreground font-semibold text-lg sm:text-xl mb-5 sm:mb-6 lg:mb-8">{t("footer.product")}</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li><Link to="/#features" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">{t("footer.features")}</Link></li>
              <li><Link to="/#solutions" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">{t("footer.solutions")}</Link></li>
              <li><Link to="/#pricing" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">{t("footer.pricing")}</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">Updates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">Integrations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div ref={addToRefs} className="company-column">
            <h3 className="text-foreground font-semibold text-lg sm:text-xl mb-5 sm:mb-6 lg:mb-8">{t("footer.company")}</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li><Link to="/about" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">{t("footer.aboutUs")}</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">{t("footer.careers")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">{t("footer.blog")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">Partners</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">{t("footer.contact")}</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:translate-x-1 inline-block text-sm sm:text-base">Press Kit</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div ref={addToRefs} className="contact-column">
            <h3 className="text-foreground font-semibold text-lg sm:text-xl mb-5 sm:mb-6 lg:mb-8">{t("footer.contact")}</h3>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-start group">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-3 sm:mr-4 mt-0.5 flex-shrink-0 text-primary group-hover:text-primary/80 transition-colors duration-300 group-hover:scale-110" />
                <div>
                  <a href="mailto:support@edumanage.com" className="hover:text-primary transition-colors duration-300 text-muted-foreground text-sm sm:text-base">
                    support@edumanage.com
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-3 sm:mr-4 mt-0.5 flex-shrink-0 text-primary group-hover:text-primary/80 transition-colors duration-300 group-hover:scale-110" />
                <div>
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors duration-300 text-muted-foreground text-sm sm:text-base">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-3 sm:mr-4 mt-0.5 flex-shrink-0 text-primary group-hover:text-primary/80 transition-colors duration-300 group-hover:scale-110" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">
                  123 Education St
                  <br />
                  Learning City, ED 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div ref={bottomRef} className="border-t border-border pt-6 sm:pt-8 lg:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-xs sm:text-sm mb-4 md:mb-0">
              {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 lg:space-x-8 text-xs sm:text-sm">
              <a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:underline">
                {t("footer.privacy")}
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:underline">
                {t("footer.terms")}
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-300 text-muted-foreground hover:underline">
                {t("footer.cookies")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
