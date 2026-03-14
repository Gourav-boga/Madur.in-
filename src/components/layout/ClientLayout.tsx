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
  const isAdmin = pathname?.startsWith("/admin");

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
      <Navbar />
      <main className={`min-h-screen ${isHome ? "pt-[230px] md:pt-[190px]" : "pt-[175px] md:pt-[180px]"}`}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  );
}
