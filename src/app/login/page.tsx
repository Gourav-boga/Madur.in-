"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faArrowRight, faTriangleExclamation, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { sendOtpAction, verifyOtpAction } from "@/lib/actions/auth";
import { googleLoginAction } from "@/lib/actions/google-auth";

declare global {
  interface Window {
    google: any;
    google_initialized?: boolean;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleGoogleCallback = useCallback(async (response: any) => {
    setIsLoading(true);
    setError("");

    const res = await googleLoginAction(response.credential);

    if (res.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      router.push("/account");
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    // 1. Google Identity Services Setup
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && !window.google_initialized) {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
        if (!clientId) console.warn("Google Client ID is missing in .env!");
        
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google_initialized = true;

        const googleBtnGroup = document.getElementById("googleBtnGroup");
        if (googleBtnGroup) {
          // Detect actual width of the container or use a safe mobile default
          const containerWidth = googleBtnGroup.offsetWidth || 300;
          
          window.google.accounts.id.renderButton(googleBtnGroup, {
            theme: "outline",
            size: "large",
            width: Math.min(containerWidth, 400), 
            text: "continue_with",
            shape: "pill",
          });
        }
      }
    };

    return () => {
      // Keep script and window.google alive for faster re-login
    };
  }, [handleGoogleCallback, step]); 


  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    const res = await sendOtpAction(email);

    if (res.error) {
      setError(res.error);
    } else {
      setSuccess("We've sent a secure code to your email. Please check your inbox.");
      setStep("otp");
    }
    
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!otp) {
      setError("Please enter the verification code.");
      setIsLoading(false);
      return;
    }

    const res = await verifyOtpAction(email, otp);

    if (res.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      // Successfully logged in via cookie
      router.push("/account");
      router.refresh(); // Refresh to update server-side auth state
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-accent/20 py-12 px-4 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/50 backdrop-blur-sm relative overflow-hidden">
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-bold text-sm">Sign in to manage your Farm-Fresh deliveries</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3 border border-red-100 animate-in fade-in zoom-in-95 duration-300">
              <FontAwesomeIcon icon={faTriangleExclamation} className="mt-1" />
              <p className="text-sm font-bold leading-tight">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded-2xl mb-6 flex items-start gap-3 border border-green-100 animate-in fade-in zoom-in-95 duration-300">
              <FontAwesomeIcon icon={faCheckCircle} className="mt-1" />
              <p className="text-sm font-bold leading-tight">{success}</p>
            </div>
          )}

          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="relative z-10">
              <div className="mb-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">
                  Email Address
                </label>
                <div className="relative group">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-accent/30 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-black font-bold outline-none transition-all focus:ring-4 ring-primary/10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-black font-black py-4 rounded-2xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10">{isLoading ? "Sending Code..." : "Continue with Email"}</span>
                {!isLoading && <FontAwesomeIcon icon={faArrowRight} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2 ml-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                    6-Digit Code
                  </label>
                  <button 
                    type="button" 
                    onClick={() => { setStep("email"); setOtp(""); setSuccess(""); setError(""); }}
                    className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wide"
                  >
                    Change Email
                  </button>
                </div>
                <div className="relative group">
                  <FontAwesomeIcon icon={faKey} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-accent/30 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-black font-bold outline-none transition-all focus:ring-4 ring-primary/10 text-center tracking-[0.5em]"
                    placeholder="------"
                    maxLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white font-black py-4 rounded-2xl shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10">{isLoading ? "Verifying..." : "Verify & Sign In"}</span>
                {!isLoading && <FontAwesomeIcon icon={faArrowRight} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          )}

          <div className="mt-8 text-center relative z-10 border-t border-gray-100 pt-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-100"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Or continue with</span>
                <div className="flex-1 h-px bg-gray-100"></div>
              </div>
              
              <div className="flex items-center justify-center min-h-[44px]">
                <div id="googleBtnGroup" className="w-[280px] sm:w-[350px]"></div>
              </div>
            </div>

            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              By continuing, you agree to our <Link href="/terms" className="text-gray-800 hover:text-primary hover:underline">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
