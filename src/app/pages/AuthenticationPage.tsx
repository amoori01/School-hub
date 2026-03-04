import { useState, useCallback } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Loader2,
  GraduationCap,
  EyeIcon,
  EyeOffIcon,
  Lock,
  Mail,
  AlertCircle,
  Shield,
} from "lucide-react";

interface FormErrors {
  email?: string;
  password?: string;
}

export function AuthenticationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");

  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  }, []);

  const validatePassword = useCallback((password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return undefined;
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  }, [email, password, validateEmail, validatePassword]);

  const handleEmailBlur = useCallback(() => {
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  }, [email, validateEmail]);

  const handlePasswordBlur = useCallback(() => {
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  }, [password, validatePassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Sign in attempt:", { email, rememberMe });
    } catch {
      setSubmitError("Unable to sign in. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Background — dark */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,_#020617,_#020617_70%)]" />
      {/* Background — light */}
      <div className="absolute inset-0 dark:hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(99,102,241,0.2),_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(56,189,248,0.35),_transparent_60%)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[conic-gradient(from_200deg,_rgba(99,102,241,0.25),_rgba(168,85,247,0.25),_transparent_60%)] dark:bg-[conic-gradient(from_200deg,_rgba(56,189,248,0.45),_rgba(236,72,153,0.5),_transparent_60%)] rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="flex items-center justify-center w-14 h-14 bg-[#e35336] dark:bg-[#f47236] rounded-2xl group-hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-8 h-8 text-white dark:text-slate-950" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-semibold text-foreground tracking-tight block">
                EduManage
              </span>
              <span className="text-xs text-muted-foreground font-normal tracking-wide">
                Intelligent School Management Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Authentication Card */}
        <div className="bg-card/90 rounded-2xl shadow-xl dark:shadow-[0_22px_55px_rgba(15,23,42,0.95)] border border-border p-8 sm:p-10 backdrop-blur-xl">
          {/* Card Header with Lock Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary dark:bg-slate-900/70 rounded-xl mb-4 border border-primary/30 dark:border-cyan-300/40">
              <Lock className="w-6 h-6 text-primary dark:text-sky-300" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Global Error Message */}
            {submitError && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${errors.email ? 'text-red-400' : 'text-muted-foreground'}`} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  onBlur={handleEmailBlur}
                  className={`pl-11 h-12 bg-secondary dark:bg-slate-900/60 border-border hover:bg-muted dark:hover:bg-slate-900 transition-colors text-foreground placeholder:text-muted-foreground ${errors.email
                      ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                      : "focus-visible:border-primary dark:focus-visible:border-sky-400 focus-visible:ring-primary/20 dark:focus-visible:ring-sky-400/20"
                    }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${errors.password ? 'text-red-400' : 'text-muted-foreground'}`} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  onBlur={handlePasswordBlur}
                  className={`pl-11 pr-11 h-12 bg-secondary dark:bg-slate-900/60 border-border hover:bg-muted dark:hover:bg-slate-900 transition-colors text-foreground placeholder:text-muted-foreground ${errors.password
                      ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                      : "focus-visible:border-primary dark:focus-visible:border-sky-400 focus-visible:ring-primary/20 dark:focus-visible:ring-sky-400/20"
                    }`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-red-500 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  disabled={isLoading}
                  className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-sky-400 data-[state=checked]:border-primary dark:data-[state=checked]:border-sky-400 border-border"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-200 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#e35336] dark:bg-[#f47236] hover:bg-[#c4452b] dark:hover:bg-[#e35336] text-white font-semibold transition-all duration-300 text-base border border-[#e35336]/70 dark:border-[#f47236]/70"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Security Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <Shield className="w-4 h-4 text-primary dark:text-sky-300" />
              <span>Secure access to your EduManage dashboard. All data is encrypted and protected.</span>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            New to EduManage?{" "}
            <Link to="/demo" className="font-semibold text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-200 transition-colors">
              Request a demo
            </Link>
          </p>
        </div>

        {/* SSL Secure Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
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
            <span>256-bit SSL encryption</span>
          </div>
          <span className="text-border">•</span>
          <span>SOC 2 Compliant</span>
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span>GDPR Ready</span>
          <span className="text-border">•</span>
          <span>99.9% Uptime</span>
          <span className="text-border">•</span>
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
}
