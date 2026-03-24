"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faSearch, 
  faTimes, 
  faUser, 
  faShoppingCart,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import StreamingTagline from "./StreamingTagline";
import { supabase } from "@/lib/supabase";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cartCount } = useCart();

  useEffect(() => {
    // Check active session via our API
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        setUser(session?.user || null);
      } catch (err) {
        setUser(null);
      }
    }
    
    checkSession();
    
    // We can't easily listen for events with custom cookies without a complex setup,
    // so we rely on router.refresh() from other components to trigger a re-render if needed.
  }, [pathname]); // Check on every navigation

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{ backgroundColor: '#E9CF6A' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md border-b border-black ${
        isHome && !isScrolled ? "py-6" : isScrolled ? "py-2" : "py-4"
      }`}
    >
      <StreamingTagline />
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center -ml-6 md:-ml-12 relative">
          {/* Back Button (Only on non-home pages) */}
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="absolute -left-12 md:-left-16 p-2 text-black hover:bg-black/10 rounded-full transition-colors flex items-center justify-center z-20"
              aria-label="Go back"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
            </button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center p-0 m-0 leading-none relative z-10 transition-transform active:scale-95">
            <img 
              src="/madur-logo-official.png" 
              alt="MADUR.IN Logo" 
              className="h-24 md:h-28 w-auto object-contain select-none mix-blend-multiply"
            />
          </Link>
        </div>

      {/* Desktop Search Bar (Swiggy Style) */}
        <form 
          onSubmit={handleSearch}
          className="hidden lg:flex flex-1 max-w-md mx-4 items-center bg-black rounded-lg px-4 py-2"
        >
          <FontAwesomeIcon icon={faSearch} className="text-white mr-3" />
          <input
            type="text"
            placeholder="Search for milk, vegetables, groceries..."
            className="bg-transparent border-none outline-none w-full text-sm text-white placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-black">
          <Link href="/" className="hover:text-gray-600 font-medium">Home</Link>
          <Link href="/services" className="hover:text-gray-600 font-medium">Services</Link>
          <Link href="/about" className="hover:text-gray-600 font-medium">About</Link>
          <Link href="/contact" className="hover:text-gray-600 font-medium">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6 ml-4">
          
          {user ? (
            <Link href="/account" className="flex items-center gap-2 text-black hover:text-primary transition-colors">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-sm" />
              </div>
              <span className="hidden md:block text-sm font-black uppercase tracking-widest">Account</span>
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-black hover:text-primary transition-colors">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-sm" />
              </div>
              <span className="hidden md:block text-sm font-black uppercase tracking-widest">Sign In</span>
            </Link>
          )}

          <Link href="/cart" className="relative p-2 transition-colors text-black hover:text-gray-600">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Only on Home Page for mobile/tablet) */}
      {isHome && (
        <div className="container md:hidden mt-2 pb-2">
          <form 
            onSubmit={handleSearch}
            className="flex items-center bg-black rounded-xl px-4 py-2.5 shadow-inner"
          >
            <FontAwesomeIcon icon={faSearch} className="text-white mr-3 text-sm" />
            <input
              type="text"
              placeholder="Search for milk, vegetables..."
              className="bg-transparent border-none outline-none w-full text-xs text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background text-black absolute top-full left-0 right-0 shadow-lg border-t border-white/10 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Home</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Services</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Contact</Link>
        </div>
      )}
    </nav>
  );
}
