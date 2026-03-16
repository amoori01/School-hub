import { SolutionsSection } from "../components/SolutionsSection";
import { CTASection } from "../components/CTASection";

export function SolutionsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-28 pb-16 px-4 text-center bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Tailored Solutions for Every Institution
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover how our customizable solutions meet the unique needs of your organization.
          </p>
        </div>
      </div>
      <SolutionsSection />
      <CTASection />
    </>
  );
}
