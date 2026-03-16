import { ModulesSection } from "../components/ModulesSection";
import { CTASection } from "../components/CTASection";

export function ModulesPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-28 pb-16 px-4 text-center bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Comprehensive Modules for Every Need
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive range of modules designed to handle all aspects of school management.
          </p>
        </div>
      </div>
      <ModulesSection />
      <CTASection />
    </>
  );
}
