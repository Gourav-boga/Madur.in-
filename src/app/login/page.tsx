"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("In a real app, this would log you in. For now, we'll proceed as a guest.");
    window.location.href = "/";
  };

  return (
    <div className="container py-24 flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 max-w-lg w-full">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black inline-block mb-6">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-xl">MADUR</span>
            <span className="text-secondary">.IN</span>
          </Link>
          <h2 className="text-2xl font-black">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-2">Sign in to continue your healthy journey</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                required
                placeholder="email@example.com"
                className="w-full bg-accent/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex justify-between">
              Password
              <Link href="#" className="text-primary text-xs hover:underline">Forgot?</Link>
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-accent/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="bg-primary text-primary-foreground font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95"
          >
            SIGN IN
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-secondary font-black hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
