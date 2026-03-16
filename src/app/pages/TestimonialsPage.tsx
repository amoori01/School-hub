import { TestimonialsSection } from "../components/TestimonialsSection";
import { CTASection } from "../components/CTASection";

export function TestimonialsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-28 pb-16 px-4 text-center bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            What Our Clients Say
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Hear from schools and universities that have transformed their operations with School Hub.
          </p>
        </div>
      </div>
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
