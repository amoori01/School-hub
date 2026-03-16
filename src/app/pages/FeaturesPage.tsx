import { FeaturesSection } from "../components/FeaturesSection";
import { ModulesSection } from "../components/ModulesSection";
import { CTASection } from "../components/CTASection";

export function FeaturesPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-28 pb-16 px-4 text-center bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Powerful Features for Modern Education
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover the comprehensive tools that streamline school operations and enhance learning outcomes.
          </p>
        </div>
      </div>
      {/* <FeaturesSection /> */}
      <ModulesSection />
      <CTASection />
    </>
  );
}
