import { useState, useCallback } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Loader2,
  GraduationCap,
  CheckCircle2,
  BarChart3,
  Users,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";

type UserRole = "owner" | "head_of_school" | "administrator" | "teacher" | "other";
type StudentCount = "0-200" | "200-500" | "500-1000" | "1000+";
type AccountStatus = "not_yet" | "free_trial" | "paid_account" | "renew";

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  phoneNumber?: string;
  schoolName?: string;
  role?: string;
  otherRole?: string;
  studentCount?: string;
  accountStatus?: string;
}

interface FormData {
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  schoolName: string;
  role: UserRole | "";
  otherRole: string;
  studentCount: StudentCount | "";
  countryCity: string;
  challenges: string;
  accountStatus: AccountStatus | "";
}

const initialFormData: FormData = {
  fullName: "",
  workEmail: "",
  phoneNumber: "",
  schoolName: "",
  role: "",
  otherRole: "",
  studentCount: "",
  countryCity: "",
  challenges: "",
  accountStatus: "",
};

export function DemoRequestPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return "Work email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  }, []);

  const validatePhone = useCallback((phone: string): string | undefined => {
    if (!phone.trim()) {
      return "Phone number is required";
    }
    const phoneRegex = /^[\d\s\-+()]{8,}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    return undefined;
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {
      fullName: !formData.fullName.trim() ? "Full name is required" : undefined,
      workEmail: validateEmail(formData.workEmail),
      phoneNumber: validatePhone(formData.phoneNumber),
      schoolName: !formData.schoolName.trim() ? "School name is required" : undefined,
      role: !formData.role ? "Please select your role" : undefined,
      otherRole: formData.role === "other" && !formData.otherRole.trim() ? "Please specify your role" : undefined,
      studentCount: !formData.studentCount ? "Please select number of students" : undefined,
      accountStatus: !formData.accountStatus ? "Please select an option" : undefined,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  }, [formData, validateEmail, validatePhone]);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof FormData) => {
    switch (field) {
      case "workEmail":
        setErrors((prev) => ({ ...prev, workEmail: validateEmail(formData.workEmail) }));
        break;
      case "phoneNumber":
        setErrors((prev) => ({ ...prev, phoneNumber: validatePhone(formData.phoneNumber) }));
        break;
      case "fullName":
        setErrors((prev) => ({ ...prev, fullName: !formData.fullName.trim() ? "Full name is required" : undefined }));
        break;
      case "schoolName":
        setErrors((prev) => ({ ...prev, schoolName: !formData.schoolName.trim() ? "School name is required" : undefined }));
        break;
      case "otherRole":
        setErrors((prev) => ({ ...prev, otherRole: formData.role === "other" && !formData.otherRole.trim() ? "Please specify your role" : undefined }));
        break;
    }
  }, [formData, validateEmail, validatePhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      console.log("Demo request submitted:", formData);
      setIsSubmitted(true);
    } catch {
      console.error("Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Clock,
      title: "Automate attendance, grading, and administration",
    },
    {
      icon: Users,
      title: "Centralize communication with parents and staff",
    },
    {
      icon: Shield,
      title: "Secure cloud-based system",
    },
    {
      icon: BarChart3,
      title: "Real-time reporting & analytics",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#020617,_#020617_70%)] px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-slate-950/90 rounded-2xl shadow-[0_22px_55px_rgba(15,23,42,0.95)] border border-slate-800/80 p-10 backdrop-blur-xl">
            <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/50">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-50 mb-3">
              Demo Request Submitted!
            </h2>
            <p className="text-slate-300 mb-6">
              Thank you for your interest in EduManage. Our team will contact you within 24 hours to schedule your personalized demo.
            </p>
            <Link to="/">
              <Button className="bg-[#e35336] dark:bg-[#f47236] hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-white border border-[#e35336]/70 dark:border-[#f47236]/70">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#020617,_#020617_70%)]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[radial-gradient(circle,_rgba(56,189,248,0.35),_transparent_60%)] rounded-full opacity-70 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.45),_rgba(236,72,153,0.5),_transparent_60%)] rounded-full opacity-70 blur-3xl" />
      </div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Value Proposition */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 p-12 xl:p-16 flex-col justify-between border-r border-slate-800/80">
          <div>
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 bg-[#e35336] dark:bg-[#f47236] backdrop-blur-sm rounded-2xl border border-[#e35336]/70 dark:border-[#f47236]/70 group-hover:scale-105 transition-colors">
                <GraduationCap className="w-7 h-7 text-slate-950" />
              </div>
              <span className="text-xl font-semibold tracking-tight">EduManage</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center py-12">
            <h1 className="text-4xl xl:text-5xl font-semibold leading-tight mb-6">
              See EduManage<br />in Action
            </h1>
            <p className="text-lg xl:text-xl text-slate-300 mb-10 max-w-lg">
              Discover how EduManage simplifies school management and improves efficiency.
            </p>

            {/* Benefits */}
            <div className="space-y-5">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-900/70 backdrop-blur-sm rounded-lg flex items-center justify-center border border-sky-400/40">
                    <benefit.icon className="w-5 h-5 text-sky-300" />
                  </div>
                  <p className="text-base xl:text-lg text-slate-200 pt-1.5">
                    {benefit.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="mt-8">
            <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl border border-slate-700/80 p-4 shadow-2xl">
              <div className="bg-slate-900 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="h-32 bg-gradient-to-br from-sky-400/10 via-cyan-300/10 to-fuchsia-400/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-10 h-10 text-sky-300/70 mx-auto mb-2" />
                    <span className="text-sm text-slate-400">Dashboard Preview</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 bg-slate-900 rounded-lg" />
                <div className="h-16 bg-slate-900 rounded-lg" />
                <div className="h-16 bg-slate-900 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Card */}
        <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-lg">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="flex items-center justify-center w-12 h-12 bg-[#e35336] dark:bg-[#f47236] rounded-2xl group-hover:scale-105 transition-all">
                  <GraduationCap className="w-7 h-7 text-slate-950" />
                </div>
                <span className="text-xl font-semibold text-slate-50 tracking-tight">
                  EduManage
                </span>
              </Link>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-2">
                Schedule Your Free Demo
              </h2>
              <p className="text-slate-300">
                Fill out the form below and our team will reach out to schedule your personalized demo.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-slate-950/90 rounded-2xl shadow-[0_22px_55px_rgba(15,23,42,0.95)] border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-slate-200">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    onBlur={() => handleBlur("fullName")}
                    className={`h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 placeholder:text-slate-500 ${
                      errors.fullName ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : ""
                    }`}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="text-sm text-red-500 flex items-center gap-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div className="space-y-2">
                  <Label htmlFor="workEmail" className="text-sm font-medium text-slate-200">
                    Work Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="workEmail"
                    type="email"
                    placeholder="Enter your work email"
                    value={formData.workEmail}
                    onChange={(e) => handleInputChange("workEmail", e.target.value)}
                    onBlur={() => handleBlur("workEmail")}
                    className={`h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 placeholder:text-slate-500 ${
                      errors.workEmail ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : ""
                    }`}
                    aria-invalid={!!errors.workEmail}
                    aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.workEmail && (
                    <p id="workEmail-error" className="text-sm text-red-500 flex items-center gap-1">
                      {errors.workEmail}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium text-slate-200">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    onBlur={() => handleBlur("phoneNumber")}
                    className={`h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 placeholder:text-slate-500 ${
                      errors.phoneNumber ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : ""
                    }`}
                    aria-invalid={!!errors.phoneNumber}
                    aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.phoneNumber && (
                    <p id="phoneNumber-error" className="text-sm text-red-500 flex items-center gap-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* School / Institution Name */}
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="text-sm font-medium text-slate-200">
                    School / Institution Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="schoolName"
                    type="text"
                    placeholder="Enter your school name"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange("schoolName", e.target.value)}
                    onBlur={() => handleBlur("schoolName")}
                    className={`h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 placeholder:text-slate-500 ${
                      errors.schoolName ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : ""
                    }`}
                    aria-invalid={!!errors.schoolName}
                    aria-describedby={errors.schoolName ? "schoolName-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.schoolName && (
                    <p id="schoolName-error" className="text-sm text-red-500 flex items-center gap-1">
                      {errors.schoolName}
                    </p>
                  )}
                </div>

                {/* Role at School */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-slate-200">
                    Role at School <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => {
                      handleInputChange("role", value);
                      if (value !== "other") {
                        handleInputChange("otherRole", "");
                      }
                    }}
                  >
                    <SelectTrigger
                      id="role"
                      className={`w-full h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 ${
                        errors.role ? "border-red-300" : ""
                      }`}
                      aria-label="Select your role"
                      disabled={isLoading}
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="head_of_school">Head of School</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="other">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-red-500">{errors.role}</p>
                  )}
                </div>

                {/* Other Role Input - shown only when "Others" is selected */}
                {formData.role === "other" && (
                  <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    <Label htmlFor="otherRole" className="text-sm font-medium text-slate-200">
                      Please specify your role <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="otherRole"
                      type="text"
                      placeholder="Enter your role"
                      value={formData.otherRole}
                      onChange={(e) => handleInputChange("otherRole", e.target.value)}
                      onBlur={() => handleBlur("otherRole")}
                      className={`h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 placeholder:text-slate-500 ${
                        errors.otherRole ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : ""
                      }`}
                      aria-invalid={!!errors.otherRole}
                      aria-describedby={errors.otherRole ? "otherRole-error" : undefined}
                      disabled={isLoading}
                    />
                    {errors.otherRole && (
                      <p id="otherRole-error" className="text-sm text-red-500 flex items-center gap-1">
                        {errors.otherRole}
                      </p>
                    )}
                  </div>
                )}

                {/* Number of Students */}
                <div className="space-y-2">
                  <Label htmlFor="studentCount" className="text-sm font-medium text-slate-200">
                    Number of Students <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.studentCount}
                    onValueChange={(value) => handleInputChange("studentCount", value)}
                  >
                    <SelectTrigger
                      id="studentCount"
                      className={`w-full h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 ${
                        errors.studentCount ? "border-red-300" : ""
                      }`}
                      aria-label="Select number of students"
                      disabled={isLoading}
                    >
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-200">0–200</SelectItem>
                      <SelectItem value="200-500">200–500</SelectItem>
                      <SelectItem value="500-1000">500–1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.studentCount && (
                    <p className="text-sm text-red-500">{errors.studentCount}</p>
                  )}
                </div>

                {/* Country / City - Optional */}
                <div className="space-y-2">
                  <Label htmlFor="countryCity" className="text-sm font-medium text-slate-200">
                    Country / City <span className="text-slate-500">(Optional)</span>
                  </Label>
                  <Input
                    id="countryCity"
                    type="text"
                    placeholder="Enter your location"
                    value={formData.countryCity}
                    onChange={(e) => handleInputChange("countryCity", e.target.value)}
                    className="h-11 bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors text-slate-100 placeholder:text-slate-500"
                    disabled={isLoading}
                  />
                </div>

                {/* Do you presently have an EduManage Account? */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-slate-200">
                      Do you presently have an EduManage Account?
                    </Label>
                    <span className="text-red-500">*</span>
                  </div>
                  
                  <RadioGroup
                    value={formData.accountStatus}
                    onValueChange={(value) => handleInputChange("accountStatus", value)}
                    className="grid gap-3"
                  >
                    {/* Option 1: Not yet */}
                    <label 
                      htmlFor="not_yet"
                      className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.accountStatus === "not_yet" 
                          ? "border-sky-400 bg-sky-500/10 shadow-sm" 
                          : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <RadioGroupItem 
                        value="not_yet" 
                        id="not_yet" 
                        className="mt-0.5 data-[state=checked]:border-sky-400 data-[state=checked]:text-sky-400" 
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-100 block">
                          Not yet, but I'm interested in learning more
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5 block">
                          New to EduManage
                        </span>
                      </div>
                      {formData.accountStatus === "not_yet" && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center">
                          <svg className="w-3 h-3 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </label>

                    {/* Option 2: Free trial */}
                    <label 
                      htmlFor="free_trial"
                      className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.accountStatus === "free_trial" 
                          ? "border-sky-400 bg-sky-500/10 shadow-sm" 
                          : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <RadioGroupItem 
                        value="free_trial" 
                        id="free_trial" 
                        className="mt-0.5 data-[state=checked]:border-sky-400 data-[state=checked]:text-sky-400" 
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-100 block">
                          Yes, I currently have a free trial account
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5 block">
                          Exploring EduManage features
                        </span>
                      </div>
                      {formData.accountStatus === "free_trial" && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center">
                          <svg className="w-3 h-3 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </label>

                    {/* Option 3: Paid account */}
                    <label 
                      htmlFor="paid_account"
                      className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.accountStatus === "paid_account" 
                          ? "border-sky-400 bg-sky-500/10 shadow-sm" 
                          : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <RadioGroupItem 
                        value="paid_account" 
                        id="paid_account" 
                        className="mt-0.5 data-[state=checked]:border-sky-400 data-[state=checked]:text-sky-400" 
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-100 block">
                          Yes, I currently have a paid account
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5 block">
                          Active EduManage subscriber
                        </span>
                      </div>
                      {formData.accountStatus === "paid_account" && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center">
                          <svg className="w-3 h-3 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </label>

                    {/* Option 4: Renew */}
                    <label 
                      htmlFor="renew"
                      className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.accountStatus === "renew" 
                          ? "border-sky-400 bg-sky-500/10 shadow-sm" 
                          : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <RadioGroupItem 
                        value="renew" 
                        id="renew" 
                        className="mt-0.5 data-[state=checked]:border-sky-400 data-[state=checked]:text-sky-400" 
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-100 block">
                          Yes, I want to renew my account
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5 block">
                          Extend your subscription
                        </span>
                      </div>
                      {formData.accountStatus === "renew" && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center">
                          <svg className="w-3 h-3 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </label>
                  </RadioGroup>
                  
                  {errors.accountStatus && (
                    <p className="text-sm text-red-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.accountStatus}
                    </p>
                  )}
                </div>

                {/* Challenges - Optional */}
                <div className="space-y-2">
                  <Label htmlFor="challenges" className="text-sm font-medium text-slate-200">
                    What challenges are you facing? <span className="text-slate-500">(Optional)</span>
                  </Label>
                  <Textarea
                    id="challenges"
                    placeholder="Tell us about your current challenges..."
                    value={formData.challenges}
                    onChange={(e) => handleInputChange("challenges", e.target.value)}
                    className="min-h-[80px] bg-slate-900/60 border-slate-800 hover:bg-slate-900 transition-colors resize-none text-slate-100 placeholder:text-slate-500"
                    disabled={isLoading}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#e35336] dark:bg-[#f47236] hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-white font-semibold transition-all duration-300 text-base border border-[#e35336]/70 dark:border-[#f47236]/70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <span>Schedule My Free Demo</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                {/* Trust Text */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                  <svg
                    className="w-4 h-4 text-sky-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Your information is secure. We never share your data.</span>
                </div>
              </form>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center text-xs text-slate-400">
              <p>
                By submitting this form, you agree to our{" "}
                <Link to="#" className="text-slate-200 hover:text-sky-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-slate-200 hover:text-sky-300 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
