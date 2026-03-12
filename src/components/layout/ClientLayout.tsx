"use client";

import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import StreamingTagline from "@/components/layout/StreamingTagline";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <CartProvider>
      {/* Decorative Leaves */}
      <div className="fixed top-0 left-0 w-48 md:w-64 h-48 md:h-64 z-[-1] pointer-events-none overflow-hidden opacity-80">
        <Image 
          src="/assets/corner-leaves.png" 
          alt="" 
          fill 
          className="object-contain -translate-x-10 -translate-y-10 rotate-[-15deg]"
        />
      </div>
      <div className="fixed top-0 right-0 w-48 md:w-64 h-48 md:h-64 z-[-1] pointer-events-none overflow-hidden opacity-80">
        <Image 
          src="/assets/corner-leaves.png" 
          alt="" 
          fill 
          className="object-contain translate-x-10 -translate-y-10 scale-x-[-1] rotate-[15deg]"
          priority
        />
      </div>

      <Navbar />
      <main className={`relative z-0 min-h-screen ${isHome ? "pt-[230px] md:pt-[190px]" : "pt-[175px] md:pt-[180px]"}`}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  );
}
