import { HeroSection } from "../components/HeroSection";
import { WhySchoolManagementSection } from "../components/WhySchoolManagementSection";
import { ModulesSection } from "../components/ModulesSection";
import { PerfectSolutionSection } from "../components/PerfectSolutionSection";
import { IntegrationsSection } from "../components/IntegrationsSection";
import { TechPioneersSection } from "../components/TechPioneersSection";
import { FAQsSection } from "../components/FAQsSection";
import { CTASection } from "../components/CTASection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WhySchoolManagementSection />
      <ModulesSection />
      <PerfectSolutionSection />
      <IntegrationsSection />
      <TechPioneersSection />
      <FAQsSection />
      <CTASection />
    </>
  );
}
