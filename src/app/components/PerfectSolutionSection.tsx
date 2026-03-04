import {
  School,
  Building2,
  GraduationCap,
  Users,
  Award,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const solutions = [
  {
    icon: School,
    title: "K-12 Schools",
    description: "Perfect for primary and secondary schools looking to modernize their administrative processes.",
    students: "100 - 5,000+ students",
    color: "from-sky-400 to-cyan-300"
  },
  {
    icon: GraduationCap,
    title: "Higher Education",
    description: "Advanced features for colleges and universities with complex academic structures.",
    students: "500 - 20,000+ students",
    color: "from-violet-500 to-fuchsia-400"
  },
  {
    icon: Building2,
    title: "International Schools",
    description: "Multi-campus support with multi-language capabilities for global institutions.",
    students: "200 - 10,000+ students",
    color: "from-emerald-400 to-teal-400"
  },
  {
    icon: Users,
    title: "Training Centers",
    description: "Flexible scheduling and certification tracking for vocational training institutes.",
    students: "50 - 2,000+ students",
    color: "from-amber-400 to-orange-500"
  }
];

const keyPoints = [
  "Scalable from small institutions to large university networks",
  "Customizable workflows to match your existing processes",
  "Dedicated support team with education industry expertise",
  "Regular updates with new features and security patches",
  "Competitive pricing with flexible subscription plans",
  "Free training and onboarding assistance"
];

export function PerfectSolutionSection() {
  return (
    <section id="perfect-solution" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary border border-primary/30 text-primary dark:text-sky-100 text-sm font-medium mb-4 shadow-md backdrop-blur-md">
            Perfect School Management System
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Your Institution Needs
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Whether you run a small school or a large university network, our scalable solution
            adapts to your unique requirements
          </p>
        </div>

        {/* Solutions for different institutions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card
                key={index}
                className="p-6 border-2 border-border hover:border-transparent hover:shadow-xl dark:hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300 bg-card/80 dark:bg-slate-950/80 group relative overflow-hidden rounded-2xl backdrop-blur-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white dark:text-slate-950" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {solution.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary dark:text-sky-300 font-medium">
                    <Users className="h-4 w-4" />
                    {solution.students}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Why choose us */}
        <Card className="p-8 lg:p-12 border border-border bg-gradient-to-r from-secondary via-card to-secondary dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Why Institutions Choose Our Platform
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're committed to helping educational institutions succeed with a solution
                that's built for the unique challenges of modern education.
              </p>
              <ul className="space-y-3">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary dark:text-sky-300 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary dark:text-sky-300 mb-2">10+</div>
                <div className="text-muted-foreground">Years of Experience</div>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary dark:text-sky-300 mb-2">500+</div>
                <div className="text-muted-foreground">Institutions Served</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary dark:text-sky-300 mb-2">50K+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
