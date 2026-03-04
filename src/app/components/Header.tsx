import { Menu, X, ChevronDown, ArrowUp, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { gsap } from "gsap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Smooth scroll to top function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <Link
                to="/"
                onClick={(e) => handleNavClick(e, '/')}
                className="flex items-center space-x-3 group"
              >
                <div className="h-11 w-11 rounded-2xl bg-[#e35336] dark:bg-[#f47236] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  <span className="text-slate-950 font-extrabold text-xl">E</span>
                </div>
                <span className="text-2xl font-semibold bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent group-hover:from-sky-300 group-hover:to-fuchsia-300 transition-all duration-300">
                  EduManage
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden md:flex items-center space-x-8 text-sm">

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
                    <Link to="/product">Product Overview</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product#features">Feature Tour</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product#student-information-system">Student Information System</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product#solutions">Solutions</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                    <Link to="/product#testimonials">Testimonials</Link>
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
                About
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-fuchsia-400 transform origin-left transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
              <Link
                to="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className={`text-base font-medium transition-all duration-300 relative group ${isActive('/contact') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
              >
                Contact
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-fuchsia-400 transform origin-left transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div ref={ctaRef} className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-secondary border border-border hover:bg-accent transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 text-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-600" />
                )}
              </button>
              <Link to="/signin">
                <Button
                  variant="ghost"
                  size="default"
                  className="text-foreground hover:text-primary hover:bg-secondary border border-border transition-all duration-300 font-medium"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/demo">
                <Button
                  size="default"
                  className="bg-[#e35336] dark:bg-[#f47236] hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-white transition-all duration-300 font-semibold"
                >
                  Request Demo
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-secondary border border-border transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground hover:text-primary transition-colors duration-300" />
              ) : (
                <Menu className="h-6 w-6 text-foreground hover:text-primary transition-colors duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div ref={mobileMenuRef} className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Product</span>
                  <div className="pl-4 flex flex-col space-y-2">
                    <Link
                      to="/product#features"
                      onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      Feature Tour
                    </Link>
                    <Link
                      to="/product#student-information-system"
                      onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      Student Information System
                    </Link>
                    <Link
                      to="/product#why-choose-us"
                      onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      Why Choose Us
                    </Link>
                    <Link
                      to="/product#solutions"
                      onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      Solutions
                    </Link>
                    <Link
                      to="/product#testimonials"
                      onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      Testimonials
                    </Link>
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
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, '/contact'); }}
                  className={`text-sm transition-colors duration-300 ${isActive('/contact') ? 'text-primary font-semibold' : 'text-foreground/70 hover:text-primary'
                    }`}
                >
                  Contact
                </Link>
                <div className="pt-4 space-y-2">
                  <Link to="/signin">
                    <Button variant="ghost" size="sm" className="w-full bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground border border-border transition-colors duration-300">
                      Sign In
                    </Button>
                  </Link>
                  {/* Theme Toggle for Mobile */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center p-3 rounded-xl bg-secondary border border-border hover:bg-accent transition-all duration-300 w-full"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <>
                        <Moon className="h-5 w-5 text-foreground mr-2" />
                        <span className="text-foreground">Switch to Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="text-foreground">Switch to Dark Mode</span>
                      </>
                    )}
                  </button>
                  <Link to="/demo">
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
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#e35336] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ${showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
