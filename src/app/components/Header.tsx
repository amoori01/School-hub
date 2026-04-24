import { Menu, X, ChevronDown, ArrowUp, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { gsap } from "gsap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

// Smooth scroll to top function with animation
const scrollToTop = () => {
  const startPosition = window.scrollY;
  const duration = 800;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic function for smooth deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    window.scrollTo(0, startPosition * (1 - easeOut));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// Handle navigation click - scroll to top for home page
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  // If navigating to home page, scroll to top smoothly
  if (path === '/' || path === '') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  const location = useLocation();
  const navigate = useNavigate();

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      // Show scroll to top button when scrolled down
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
    );

    gsap.fromTo(ctaRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.6 }
    );

    // Scroll to top button animation
    gsap.fromTo(scrollButtonRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: showScrollTop ? 1 : 0,
        scale: showScrollTop ? 1 : 0.8,
        y: showScrollTop ? 0 : 20,
        duration: 0.3,
        ease: "power2.out"
      }
    );
  }, [showScrollTop]);

  useEffect(() => {
    // Header background animation on scroll
    // In dark mode, we use a darker slate, in light mode we use a light slate/white
    const isDark = document.documentElement.classList.contains("dark");
    gsap.to(headerRef.current, {
      backgroundColor: scrolled
        ? (isDark ? "rgba(15, 23, 42, 0.96)" : "rgba(255, 255, 255, 0.96)")
        : (isDark ? "rgba(15, 23, 42, 0.88)" : "rgba(255, 255, 255, 0.88)"),
      borderColor: scrolled
        ? (isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(226, 232, 240, 0.8)")
        : "transparent",
      backdropFilter: scrolled ? "blur(22px)" : "blur(14px)",
      boxShadow: scrolled
        ? (isDark ? "0 18px 45px -24px rgba(0, 0, 0, 0.5)" : "0 18px 45px -24px rgba(15, 23, 42, 0.15)")
        : "0 10px 25px -24px rgba(15, 23, 42, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  }, [scrolled, theme]);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -20, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.4, ease: "power2.out" }
      );
    }
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 transition-all duration-300"
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <button
                onClick={() => {
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 sm:space-x-3 group"
              >
                <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-sky-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent group-hover:opacity-70 transition-all duration-300">
                  School Hub
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden lg:flex items-center space-x-6 lg:space-x-8 text-sm">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="text-base font-medium text-foreground/80 hover:text-primary transition-all duration-300 flex items-center gap-1 group"
                  >
                    Product
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 border-border bg-popover text-popover-foreground shadow-xl">
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product/features">Feature Tour</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product/student-information">Student Information System</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product/solutions">Solutions</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product/testimonials">Testimonials</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to="/pricing"
                onClick={(e) => handleNavClick(e, '/pricing')}
                className={`text-base font-medium transition-all duration-300 relative group ${isActive('/pricing') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
              >
                Pricing
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-fuchsia-400 transform origin-left transition-transform duration-300 ${isActive('/pricing') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
              <Link
                to="/about"
                onClick={(e) => handleNavClick(e, '/about')}
                className={`text-base font-medium transition-all duration-300 relative group ${isActive('/about') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
              >
                {t("header.about")}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-fuchsia-400 transform origin-left transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
              <Link
                to="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className={`text-base font-medium transition-all duration-300 relative group ${isActive('/contact') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
              >
                {t("header.contact")}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-fuchsia-400 transform origin-left transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div ref={ctaRef} className="hidden lg:flex items-center gap-2 sm:gap-3 lg:gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg lg:rounded-xl bg-secondary border border-border hover:bg-accent transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 lg:h-5 lg:w-5 text-foreground" />
                ) : (
                  <Sun className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-600" />
                )}
              </button>
              {/* Language Switcher */}
              <LanguageSwitcher />
              <Link to="/demo">
                <Button
                  size="sm"
                  className="bg-[#e35336] dark:bg-[#f47236] hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-white transition-all duration-300 font-semibold text-sm"
                >
                  Request Demo
                </Button>
              </Link>
            </div>

            {/* Tablet/Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Show Request Demo on tablet, hidden on mobile */}
              <Link to="/demo" className="hidden md:block">
                <Button
                  size="sm"
                  className="bg-[#e35336] dark:bg-[#f47236] hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-white transition-all duration-300 font-semibold text-xs sm:text-sm"
                >
                  Request Demo
                </Button>
              </Link>
              {/* Show Demo on mobile */}
              <Link to="/demo" className="md:hidden">
                <Button
                  size="sm"
                  className="bg-[#e35336] dark:bg-[#f47236] hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-white transition-all duration-300 font-semibold text-xs"
                >
                  Demo
                </Button>
              </Link>
              <button
                className="p-2 rounded-lg lg:rounded-xl hover:bg-secondary border border-border transition-colors duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 lg:h-6 lg:w-6 text-foreground hover:text-primary transition-colors duration-300" />
                ) : (
                  <Menu className="h-5 w-5 lg:h-6 lg:w-6 text-foreground hover:text-primary transition-colors duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Menu */}
          {(mobileMenuOpen) && (
            <div ref={mobileMenuRef} className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-3 sm:space-y-4">
                {/* Collapsible Product Section */}
                <div className="space-y-2">
                  <button
                    onClick={() => setMobileProductOpen(!mobileProductOpen)}
                    className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300"
                    aria-expanded={mobileProductOpen}
                    aria-controls="mobile-product-menu"
                  >
                    <span>Product</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileProductOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    id="mobile-product-menu"
                    className={`overflow-hidden transition-all duration-300 ${mobileProductOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pl-4 flex flex-col space-y-2 py-2">
                      <Link
                        to="/product/features"
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                      >
                        Feature Tour
                      </Link>
                      <Link
                        to="/product/student-information"
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                      >
                        Student Information System
                      </Link>
                      <Link
                        to="/product/why-choose-us"
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                      >
                        Why Choose Us
                      </Link>
                      <Link
                        to="/product/solutions"
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                      >
                        Solutions
                      </Link>
                      <Link
                        to="/product/testimonials"
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                      >
                        Testimonials
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  to="/pricing"
                  onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, '/pricing'); }}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, '/about'); }}
                  className={`text-sm transition-colors duration-300 ${isActive('/about') ? 'text-primary font-semibold' : 'text-foreground/70 hover:text-primary'
                    }`}
                >
                  {t("header.about")}
                </Link>
                <Link
                  to="/contact"
                  onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, '/contact'); }}
                  className={`text-sm transition-colors duration-300 ${isActive('/contact') ? 'text-primary font-semibold' : 'text-foreground/70 hover:text-primary'
                    }`}
                >
                  {t("header.contact")}
                </Link>
                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={toggleTheme}
                    className="flex-1 flex items-center justify-center p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-secondary border border-border hover:bg-accent transition-all duration-300"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <>
                        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground mr-2" />
                        <span className="text-foreground text-xs sm:text-sm font-medium">Switch to Light</span>
                      </>
                    ) : (
                      <>
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mr-2" />
                        <span className="text-foreground text-xs sm:text-sm font-medium">Switch to Dark</span>
                      </>
                    )}
                  </button>
                  {/* Language Switcher for Mobile */}
                  <div className="flex-1">
                    <LanguageSwitcher />
                  </div>
                  <Link to="/demo" className="flex-1 sm:hidden">
                    <Button
                      size="sm"
                      className="w-full bg-[#e35336] text-white hover:bg-[#c4452b] transition-all duration-300 border border-[#e35336]/40"
                    >
                      Request Demo
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Scroll to Top Button */}
      <button
        ref={scrollButtonRef}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#e35336] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}

