import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { FAQsSection } from "../components/FAQsSection";
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
      <div ref={contentRef} className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("home.description1")}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">
            {t("home.description2")}
          </p>
        </div>
      </div>
      <FeaturesSection />
      {/* <SolutionsSection /> */}
      {/* <WhySchoolManagementSection /> */}
      {/* <PerfectSolutionSection /> */}
      {/* <TechPioneersSection /> */}
      <FAQsSection />
    </>
  );
}
