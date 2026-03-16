import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { SolutionsSection } from "../components/SolutionsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { WhySchoolManagementSection } from "../components/WhySchoolManagementSection";
import { PerfectSolutionSection } from "../components/PerfectSolutionSection";
import { TechPioneersSection } from "../components/TechPioneersSection";
import { FAQsSection } from "../components/FAQsSection";
import { CTASection } from "../components/CTASection";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { t } = useTranslation();
  const pageHeaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pageHeaderRef.current,
            start: "top 80%",
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pageHeaderRef.current,
            start: "top 75%",
          }
        }
      );

      // Content paragraphs animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          }
        }
      );
    }, pageHeaderRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <HeroSection />
      
       {/* Page Header */}
      <div ref={pageHeaderRef} className="pt-28 pb-16 px-4 text-center bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            {t("hero.title")}
          </h1>
          <p ref={subtitleRef} className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>
      <div ref={contentRef} className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our School Management System is a comprehensive digital platform designed to simplify and automate the daily academic and administrative operations of educational institutions. The system provides an integrated environment where administrators, teachers, students, parents, and staff can access important information through secure and user-friendly dashboards. From student admissions and attendance tracking to examinations, grading, and communication, the platform centralizes all school activities into one efficient system. By reducing manual paperwork and streamlining workflows, it enables schools to save time, improve accuracy, and focus more on delivering quality education.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">
            The platform includes powerful modules such as Student Information Management, Timetable Scheduling, Attendance Monitoring, Examination and Gradebook Management, Finance and Fee Management, Library, Transportation, Human Resources, and Communication Tools. It also supports features like reporting and analytics, event calendars, messaging systems, and mobile accessibility for students and parents. With secure data management, role-based access control, and scalable architecture, the system helps institutions manage their entire academic ecosystem smoothly while enhancing collaboration and transparency across the school community.
          </p>
        </div>
      </div>
      <FeaturesSection />
      {/* <SolutionsSection /> */}
      {/* <WhySchoolManagementSection /> */}
      {/* <PerfectSolutionSection /> */}
      {/* <TechPioneersSection /> */}
      <FAQsSection />
       <TestimonialsSection />
      <CTASection />
    </>
  );
}
