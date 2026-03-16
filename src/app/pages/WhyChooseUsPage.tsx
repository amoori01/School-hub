import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { CTASection } from "../components/CTASection";

export function WhyChooseUsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-28 pb-16 px-4 text-center bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Why Choose School Hub
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover the advantages that set us apart from other school management solutions.
          </p>
        </div>
      </div>
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
