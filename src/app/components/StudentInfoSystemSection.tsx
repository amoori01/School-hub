import { 
  GraduationCap, 
  Users, 
  ClipboardCheck, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  FileText, 
  Bell, 
  Database,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const sisFeatures = [
  {
    icon: Users,
    title: "Student Enrollment Management",
    description: "Streamline the entire enrollment process from application to admission with customizable workflows and document management."
  },
  {
    icon: ClipboardCheck,
    title: "Attendance Tracking",
    description: "Real-time attendance monitoring with automated notifications to parents and comprehensive reporting dashboards."
  },
  {
    icon: FileText,
    title: "Grade Management",
    description: "Comprehensive gradebook system with customizable grading scales, automatic calculations, and report card generation."
  },
  {
    icon: Database,
    title: "Centralized Student Records",
    description: "Secure, digital storage of all student information including personal details, academic history, and health records."
  },
  {
    icon: Bell,
    title: "Parent Portal",
    description: "Give parents real-time access to their child's grades, attendance, assignments, and school announcements."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Powerful analytics tools to track student performance, identify trends, and make data-driven decisions."
  }
];

const benefits = [
  {
    icon: Clock,
    title: "Save Time & Resources",
    description: "Automate repetitive administrative tasks, reducing paperwork and freeing up staff to focus on student success."
  },
  {
    icon: TrendingUp,
    title: "Improve Student Outcomes",
    description: "Early intervention tools and performance tracking help identify at-risk students and support their success."
  },
  {
    icon: ShieldCheck,
    title: "Data Security & Compliance",
    description: "Enterprise-grade security with role-based access control ensures student data is protected and compliant with regulations."
  },
  {
    icon: GraduationCap,
    title: "Enhanced Communication",
    description: "Seamless communication between teachers, students, and parents through integrated messaging and notifications."
  }
];

export function StudentInfoSystemSection() {
  return (
    <section id="student-information-system" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 text-sm font-medium mb-4 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
            Student Information System
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            What is the Student Information System (SIS)?
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            A Student Information System (SIS) is a comprehensive software solution designed to manage 
            the complete lifecycle of student data within educational institutions. From enrollment to 
            graduation, our SIS provides a centralized platform that connects administrators, teachers, 
            students, and parents in one unified ecosystem.
          </p>
        </div>

        {/* What is SIS - Detailed */}
        <div className="max-w-7xl mx-auto mb-20">
          <Card className="p-8 lg:p-12 border border-slate-800/80 bg-slate-950/80 shadow-[0_22px_55px_rgba(15,23,42,0.95)] backdrop-blur-xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-50 mb-4">
                  A Complete Student Data Management Solution
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Our Student Information System serves as the digital backbone of your educational institution, 
                  providing a single source of truth for all student-related information. It integrates seamlessly 
                  with existing systems and workflows, eliminating data silos and reducing administrative overhead.
                </p>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  From managing admissions and tracking attendance to generating transcripts and facilitating 
                  parent-teacher communication, our SIS handles it all with ease and security.
                </p>
                <Button className="bg-[#e35336] dark:bg-[#f47236] text-white hover:bg-[#c4452b] dark:hover:bg-[#e35336] border border-[#e35336]/70 dark:border-[#f47236]/70">
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-8 flex items-center justify-center min-h-[300px] border border-slate-800/80">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 rounded-xl p-4 shadow-md text-center border border-slate-800/80">
                    <Users className="h-8 w-8 text-sky-300 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-100">Student Records</span>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-4 shadow-md text-center border border-slate-800/80">
                    <ClipboardCheck className="h-8 w-8 text-sky-300 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-100">Attendance</span>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-4 shadow-md text-center border border-slate-800/80">
                    <FileText className="h-8 w-8 text-sky-300 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-100">Grades</span>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-4 shadow-md text-center border border-slate-800/80">
                    <BarChart3 className="h-8 w-8 text-sky-300 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-100">Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-4">
              What are the Benefits of the Student Management System?
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Discover how our Student Management System transforms educational administration 
              and improves outcomes for everyone in your school community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 border border-slate-800/80 hover:border-sky-400/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300 bg-slate-950/80 rounded-2xl backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_16px_40px_rgba(56,189,248,0.7)]">
                      <Icon className="h-6 w-6 text-slate-950" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-100 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-4">
              Student Information Management System Features
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to streamline your school's operations and enhance 
              the educational experience for students, parents, and staff.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sisFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                className="p-6 border border-slate-800/80 hover:border-sky-400/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300 bg-slate-950/80 group rounded-2xl backdrop-blur-xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_40px_rgba(56,189,248,0.7)]">
                    <Icon className="h-6 w-6 text-slate-950" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-100 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Key Capabilities List */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="p-8 border border-cyan-300/40 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
            <h4 className="text-xl font-bold text-slate-50 mb-6 text-center">
              Key Capabilities at a Glance
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Complete student lifecycle management",
                "Real-time attendance tracking",
                "Automated grade calculations",
                "Parent & student portals",
                "Customizable reporting",
                "Integration with learning management",
                "Mobile-friendly access",
                "Secure data encryption"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-300 flex-shrink-0" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
