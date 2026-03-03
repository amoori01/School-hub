import { 
  Zap, 
  BookOpen, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Cloud,
  Smartphone,
  FileSpreadsheet,
  Video,
  Users,
  Shield,
  Globe
} from "lucide-react";
import { Card } from "./ui/card";

const integrations = [
  {
    icon: BookOpen,
    title: "Learning Management Systems",
    description: "Seamlessly connect with popular LMS platforms",
    examples: ["Moodle", "Canvas", "Google Classroom", "Blackboard"]
  },
  {
    icon: Video,
    title: "Video Conferencing",
    description: "Integrate with video platforms for online classes",
    examples: ["Zoom", "Google Meet", "Microsoft Teams", "Skype"]
  },
  {
    icon: CreditCard,
    title: "Payment Gateways",
    description: "Secure online fee payments and transactions",
    examples: ["Stripe", "PayPal", "Razorpay", "Square"]
  },
  {
    icon: Mail,
    title: "Email Services",
    description: "Automated email communications and newsletters",
    examples: ["SendGrid", "Mailchimp", "Gmail", "Outlook"]
  },
  {
    icon: MessageSquare,
    title: "SMS & Messaging",
    description: "Instant notifications via SMS and messaging apps",
    examples: ["Twilio", "WhatsApp Business", "Slack", "Discord"]
  },
  {
    icon: FileSpreadsheet,
    title: "Accounting Software",
    description: "Sync financial data with accounting tools",
    examples: ["QuickBooks", "Xero", "Tally", "Zoho Books"]
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Backup and sync data with cloud services",
    examples: ["Google Drive", "Dropbox", "OneDrive", "AWS S3"]
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Custom mobile apps for iOS and Android",
    examples: ["iOS App", "Android App", "PWA", "SMS Alerts"]
  },
  {
    icon: Users,
    title: "HR Systems",
    description: "Integrate with HR and payroll systems",
    examples: ["BambooHR", "Workday", "Zoho HR", "GreytHR"]
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description: "Enhanced security and authentication",
    examples: ["OAuth 2.0", "SSO", "2FA", "LDAP/AD"]
  },
  {
    icon: Globe,
    title: "Webhooks & APIs",
    description: "Custom integrations with our robust API",
    examples: ["REST API", "GraphQL", "Webhooks", "Custom Scripts"]
  },
  {
    icon: Zap,
    title: "Third-Party Tools",
    description: "Connect with any service via Zapier",
    examples: ["Zapier", "Integromat", "Make.com", "Custom Integrations"]
  }
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/70 text-sky-100 text-sm font-medium mb-4 border border-cyan-300/40 shadow-[0_18px_35px_rgba(15,23,42,0.95)] backdrop-blur-md">
            Various Integration Options
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            Enhance Your School Management Experience
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Connect with 50+ popular tools and services to create a seamless ecosystem 
            that works for your entire institution
          </p>
        </div>

        {/* Integrations grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <Card 
                key={index} 
                className="p-6 border border-slate-800/80 hover:border-sky-400/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.95)] transition-all duration-300 bg-slate-950/80 group rounded-2xl backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 via-cyan-300 to-fuchsia-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_40px_rgba(56,189,248,0.7)]">
                    <Icon className="h-6 w-6 text-slate-950" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">
                      {integration.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                      {integration.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {integration.examples.map((example, eIndex) => (
                        <span 
                          key={eIndex} 
                          className="text-xs bg-slate-900/70 text-sky-200 px-2 py-1 rounded-full border border-slate-700/80"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-300 mb-4">
            Don't see what you're looking for? We offer custom integrations.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-sky-300 font-medium hover:text-sky-200"
          >
            Talk to our integration specialists
            <Zap className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
