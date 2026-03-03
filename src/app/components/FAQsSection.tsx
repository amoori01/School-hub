import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { HelpCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is school management software?",
    answer: "School management software is a comprehensive digital solution that helps educational institutions automate and streamline their administrative, academic, and financial processes. It includes features for student information management, attendance tracking, fee collection, timetable scheduling, examination management, and parent-teacher communication, all in one unified platform."
  },
  {
    question: "How long does implementation take?",
    answer: "Implementation typically takes 2-6 weeks depending on the size of your institution and complexity of requirements. We provide comprehensive training for your staff and dedicated support during the transition period. Our team ensures a smooth migration from existing systems with minimal disruption to your daily operations."
  },
  {
    question: "Is the software secure and compliant with regulations?",
    answer: "Absolutely. We prioritize data security with enterprise-grade encryption, role-based access controls, and regular security audits. Our platform is compliant with FERPA, GDPR, and other major education data protection regulations. We also offer data backup and disaster recovery options to ensure your data is always safe."
  },
  {
    question: "Can the software scale with our institution's growth?",
    answer: "Yes, our cloud-based platform is designed to scale seamlessly from small schools with 100 students to large university networks with 50,000+ users. We offer flexible pricing plans that grow with your needs, and our infrastructure can handle increased load without performance degradation."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide 24/7 customer support through multiple channels including email, phone, and live chat. Each customer gets a dedicated account manager, and our support team includes former educators who understand the unique challenges of educational institutions. We also offer comprehensive documentation, video tutorials, and regular webinars."
  },
  {
    question: "Can we integrate with our existing systems?",
    answer: "Yes, we offer robust API capabilities and pre-built integrations with 50+ popular educational tools including LMS platforms (Moodle, Canvas, Google Classroom), payment gateways (Stripe, PayPal), video conferencing tools (Zoom, Microsoft Teams), and more. Our technical team can also create custom integrations to meet specific needs."
  },
  {
    question: "Is there a mobile app for parents and teachers?",
    answer: "Yes, we offer native mobile apps for iOS and Android, as well as a progressive web app (PWA). Parents can view grades, attendance, fees, and communicate with teachers. Teachers can take attendance, submit grades, and manage their classes from anywhere. Students can access assignments, schedules, and communicate with teachers."
  },
  {
    question: "How is pricing structured?",
    answer: "We offer flexible pricing based on the number of students and the features you need. Our plans include a free trial, and we offer discounts for annual payments. There's no hidden fees, and all plans include regular updates, security patches, and customer support. Contact us for a customized quote based on your institution's specific requirements."
  }
];

export function FAQsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          }
        }
      );

      // FAQ items staggered animation
      const faqItems = faqsRef.current?.children;
      if (faqItems) {
        gsap.fromTo(
          faqItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqsRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Contact CTA animation
      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 95%",
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="faqs" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.06),_transparent_70%)] opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 border border-cyan-300/40 text-sm font-medium mb-4 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
            FAQs on School Management Software
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Get answers to common questions about our school management solution
          </p>
        </div>

        {/* FAQs */}
        <div ref={faqsRef} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-slate-950/80 rounded-lg border border-slate-800/80 px-6 data-[state=open]:border-sky-400/60 backdrop-blur-xl hover:border-sky-300/40 transition-colors duration-300 cursor-default"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-slate-100 hover:text-sky-200 hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-sky-300 flex-shrink-0" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div ref={contactRef} className="text-center mt-12">
          <p className="text-slate-300 mb-4">
            Still have questions? We're here to help.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-sky-300 font-medium hover:text-sky-200 hover:underline transition-all duration-300"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
}
