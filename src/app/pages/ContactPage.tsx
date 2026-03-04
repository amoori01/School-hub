import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@edumanage.com", "sales@edumanage.com"],
    description: "Our support team is here to help"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    description: "Mon-Fri from 8am to 6pm EST"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Education Street", "Learning City, ED 12345"],
    description: "Come visit our office"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 8am - 6pm", "Weekend: Closed"],
    description: "EST Time Zone"
  }
];

export function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const contactCards = contactCardsRef.current?.children;
      if (contactCards) {
        gsap.set(contactCards, { opacity: 0, y: 40, scale: 0.9, rotationX: -15 });
        gsap.to(contactCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: contactCardsRef.current, start: "top 80%" }
        });
      }

      const formElements = formRef.current?.children;
      if (formElements) {
        gsap.set(formElements, { opacity: 0, x: -50 });
        gsap.to(formElements, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" }
        });
      }

      const mapElements = mapRef.current?.children;
      if (mapElements) {
        gsap.set(mapElements, { opacity: 0, x: 50 });
        gsap.to(mapElements, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 80%" }
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div ref={pageRef} className="bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,_#0b1120,_#020617_70%)]" />
        <div className="absolute inset-0 dark:hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div ref={heroBgRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[conic-gradient(from_200deg,_rgba(99,102,241,0.2),_rgba(168,85,247,0.2),_transparent)] dark:bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.3),_rgba(236,72,153,0.3),_transparent)] blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.15),_transparent_70%)] dark:bg-[radial-gradient(circle,_rgba(236,72,153,0.2),_transparent_70%)] blur-3xl opacity-40" />
        </div>
        <div ref={heroRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={headerRef} className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary border border-primary/30 text-primary dark:text-sky-100 text-sm font-medium mb-6 shadow-md backdrop-blur-md">
              Contact Us
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Get in
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                {" "}Touch{" "}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contactCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="p-6 border border-border hover:shadow-xl dark:hover:shadow-[0_18px_35px_rgba(15,23,42,0.95)] hover:border-primary/40 dark:hover:border-sky-400/60 transition-all duration-300 bg-card/80 dark:bg-slate-950/80 rounded-2xl backdrop-blur-xl group cursor-default">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary via-cyan-400 to-fuchsia-400 flex items-center justify-center mb-4 shadow-lg dark:shadow-[0_16px_40px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white dark:text-slate-950" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-sky-200 transition-colors duration-300">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {info.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="mt-1 bg-secondary dark:bg-slate-900/80 border-border focus:border-primary dark:focus:border-sky-400/60"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="mt-1 bg-secondary dark:bg-slate-900/80 border-border focus:border-primary dark:focus:border-sky-400/60"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-secondary dark:bg-slate-900/80 border-border focus:border-primary dark:focus:border-sky-400/60"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 bg-secondary dark:bg-slate-900/80 border-border focus:border-primary dark:focus:border-sky-400/60"
                  />
                </div>

                <div>
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="mt-1 bg-secondary dark:bg-slate-900/80 border-border focus:border-primary dark:focus:border-sky-400/60"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-secondary dark:bg-slate-900/80 border-border focus:border-primary dark:focus:border-sky-400/60"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-1 bg-secondary dark:bg-slate-900/80 border-border focus:border-primary dark:focus:border-sky-400/60"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#e35336] dark:bg-[#f47236] text-white hover:bg-[#c4452b] dark:hover:bg-[#e35336] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* FAQ Cards */}
            <div ref={mapRef} className="space-y-8">
              <Card className="p-6 border border-border bg-card/80 dark:bg-slate-950/80 rounded-2xl backdrop-blur-xl">
                <h3 className="font-semibold text-foreground mb-2">
                  How long does it take to implement EduManage?
                </h3>
                <p className="text-muted-foreground">
                  Most institutions can go live within 2-4 weeks. We provide comprehensive
                  onboarding and training to ensure a smooth transition.
                </p>
              </Card>

              <Card className="p-6 border border-border bg-card/80 dark:bg-slate-950/80 rounded-2xl backdrop-blur-xl">
                <h3 className="font-semibold text-foreground mb-2">
                  Do you offer training for staff?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We provide extensive training programs including video tutorials,
                  documentation, and live training sessions for your team.
                </p>
              </Card>

              <Card className="p-6 border border-border bg-card/80 dark:bg-slate-950/80 rounded-2xl backdrop-blur-xl">
                <h3 className="font-semibold text-foreground mb-2">
                  Can I migrate data from my current system?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely. Our team assists with data migration to ensure all your
                  existing information is transferred securely and accurately.
                </p>
              </Card>

              <Card className="p-6 border border-border bg-card/80 dark:bg-slate-950/80 rounded-2xl backdrop-blur-xl">
                <h3 className="font-semibold text-foreground mb-2">
                  What kind of support do you provide?
                </h3>
                <p className="text-muted-foreground">
                  We offer 24/7 support via email, phone, and chat. Enterprise customers
                  get a dedicated account manager and priority support.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}