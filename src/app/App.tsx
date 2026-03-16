import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DemoRequestPage } from "./pages/DemoRequestPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { ModulesPage } from "./pages/ModulesPage";
import { StudentInfoPage } from "./pages/StudentInfoPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { WhyChooseUsPage } from "./pages/WhyChooseUsPage";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useEffect } from "react";

function AppContent() {
  // Initialize smooth scrolling with Lenis
  useSmoothScroll({
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      // Default to light mode for first-time visitors
    }
  }, []);

  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/features" element={<FeaturesPage />} />
          <Route path="/product/modules" element={<ModulesPage />} />
          <Route path="/product/student-information" element={<StudentInfoPage />} />
          <Route path="/product/solutions" element={<SolutionsPage />} />
          <Route path="/product/testimonials" element={<TestimonialsPage />} />
          <Route path="/product/why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<DemoRequestPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
