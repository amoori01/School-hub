import { Card } from "./ui/card";
import { Star, Quote } from "lucide-react";

const pioneers = [
  {
    company: "TechForward Academy",
    logo: "TF",
    name: "Sarah Johnson",
    role: "CTO",
    text: "The API integrations allowed us to connect our existing tools seamlessly. The custom workflow automation has saved us 20+ hours per week.",
    rating: 5,
    color: "from-sky-400 to-cyan-300"
  },
  {
    company: "Innovatech Schools",
    logo: "IS",
    name: "Michael Chen",
    role: "Director of Technology",
    text: "As an international school with multiple campuses, the multi-site management features are invaluable. Excellent scalability and performance.",
    rating: 5,
    color: "from-purple-500 to-pink-600"
  },
  {
    company: "Future Learning Group",
    logo: "FL",
    name: "Emily Rodriguez",
    role: "Head of Operations",
    text: "The mobile app for parents has transformed our communication. Parent engagement has increased by 80% since we started using this platform.",
    rating: 5,
    color: "from-green-500 to-emerald-600"
  },
  {
    company: "Digital Edge Institute",
    logo: "DE",
    name: "David Kim",
    role: "IT Manager",
    text: "The security features and compliance tools give us peace of mind. Student data has never been more secure, and audit compliance is a breeze.",
    rating: 5,
    color: "from-orange-500 to-red-600"
  },
  {
    company: "Smart Education Corp",
    logo: "SE",
    name: "Amanda Foster",
    role: "Principal",
    text: "Implementation was incredibly smooth. Their team provided excellent training and support. We were fully operational within 3 weeks.",
    rating: 5,
    color: "from-cyan-500 to-blue-600"
  },
  {
    company: "Global Tech University",
    logo: "GT",
    name: "Robert Williams",
    role: "Registrar",
    text: "The analytics dashboard provides insights we never had before. We've improved student retention by 15% using their predictive analytics.",
    rating: 5,
    color: "from-violet-500 to-purple-600"
  }
];

export function TechPioneersSection() {
  return (
    <section id="tech-pioneers" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 text-sm font-medium mb-4 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
            Loved by the Pioneers in Technology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            Trusted by Tech-Savvy Institutions
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Join hundreds of forward-thinking educational institutions that have transformed 
            their operations with our innovative solution
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pioneers.map((pioneer, index) => (
            <Card 
              key={index} 
              className="p-6 border border-slate-800/80 hover:border-sky-400/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300 bg-slate-950/80 group rounded-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${pioneer.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-slate-950 font-bold">{pioneer.logo}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">{pioneer.company}</h4>
                  <p className="text-sm text-slate-400">
                    {pioneer.name}, {pioneer.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(pioneer.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                "{pioneer.text}"
              </p>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-300 mb-1">98%</div>
            <div className="text-sm text-slate-400">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-300 mb-1">40%</div>
            <div className="text-sm text-slate-400">Time Saved Weekly</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-300 mb-1">99.9%</div>
            <div className="text-sm text-slate-400">Uptime Guaranteed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-300 mb-1">24/7</div>
            <div className="text-sm text-slate-400">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
