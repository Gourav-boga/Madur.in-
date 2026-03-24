"use client";

import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import StreamingTagline from "@/components/layout/StreamingTagline";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import SplashScreen from "@/components/layout/SplashScreen";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { useState, useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // If we've already visited this session, show content immediately
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited || isAdmin) {
      setShowContent(true);
    }
  }, [isAdmin]);

  const handleSplashComplete = () => {
    setShowContent(true);
  };

  if (isAdmin) {
    return (
      <CartProvider>
        <main className="min-h-screen bg-accent/30">
          {children}
        </main>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <SubscriptionProvider>
        {!isAdmin && <SplashScreen onComplete={handleSplashComplete} />}
        
        {showContent && (
          <div className="animate-in fade-in duration-700">
            <Navbar />
            <main className="min-h-screen pt-[180px] md:pt-[160px]">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        )}
      </SubscriptionProvider>
    </CartProvider>
  );
}
