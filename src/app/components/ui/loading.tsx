import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div 
      ref={spinnerRef}
      className={`${sizeClasses[size]} border-2 border-sky-200/70 border-t-sky-400 rounded-full ${className}`}
    />
  );
}

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    // Text pulse animation
    gsap.to(textRef.current, {
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p 
          ref={textRef}
          className="text-slate-200 font-medium"
        >
          {message}
        </p>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rect" | "circle";
  width?: string;
  height?: string;
}

export function Skeleton({ 
  className = "", 
  variant = "rect", 
  width = "100%", 
  height = "1rem" 
}: SkeletonProps) {
  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skeletonRef.current) {
      gsap.fromTo(skeletonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const variantClasses = {
    text: "rounded",
    rect: "rounded-md",
    circle: "rounded-full"
  };

  return (
    <div
      ref={skeletonRef}
      className={`
        bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
        bg-[length:200%_100%] 
        animate-shimmer
        ${variantClasses[variant]}
        ${className}
      `}
      style={{ width, height }}
    >
      <span className="sr-only">Loading</span>
    </div>
  );
}

// Add shimmer animation to global styles
export const ShimmerStyles = () => (
  <style jsx>{`
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .animate-shimmer {
      animation: shimmer 1.5s infinite linear;
    }
  `}</style>
);
