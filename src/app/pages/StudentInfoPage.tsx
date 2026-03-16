import { StudentInfoSystemSection } from "../components/StudentInfoSystemSection";
import { CTASection } from "../components/CTASection";

export function StudentInfoPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-28 pb-16 px-4 text-center bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Student Information System
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Centralize all student data with our powerful and intuitive SIS platform.
          </p>
        </div>
      </div>
      <StudentInfoSystemSection />
      <CTASection />
    </>
  );
}
