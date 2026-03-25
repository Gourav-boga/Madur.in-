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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md bg-white ${
        isHome && !isScrolled ? "py-3 md:py-5" : "py-1 md:py-2"
      }`}
    >
      <StreamingTagline />
      <div className="container mt-2 flex items-center justify-between gap-4 relative">
        {/* Mobile Left Section (Menu) */}
        <div className="flex items-center md:hidden z-50">
          <button
            className="p-2 text-[#222222]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>

        <div className="flex items-center flex-1 md:flex-initial justify-center md:justify-start">
          {/* Logo - CENTERED ON MOBILE, LEFT ON DESKTOP */}
          <Link 
            href="/" 
            className="flex items-center p-0 m-0 leading-none z-10 transition-transform active:scale-95 -my-8 md:-my-8"
          >
            <Image 
              src="/madur-logo-2026.png" 
              alt="MADUR.IN Logo" 
              width={350}
              height={120}
              className="h-44 md:h-44 w-auto object-contain select-none mix-blend-multiply"
              priority
            />
          </Link>
        </div>

        {/* Desktop Search Bar (Swiggy Style) - HIDDEN ON MOBILE */}
        <form 
          onSubmit={handleSearch}
          className="hidden lg:flex flex-1 max-w-md mx-4 items-center bg-white border border-black/10 rounded-lg px-4 py-2 shadow-sm"
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search for milk, vegetables, groceries..."
            className="bg-transparent border-none outline-none w-full text-sm text-[#222222] placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Desktop Links - HIDDEN ON MOBILE */}
        <div className="hidden md:flex items-center gap-8 text-[#222222]">
          <Link href="/" className="hover:text-gray-600 font-medium">Home</Link>
          <Link href="/services" className="hover:text-gray-600 font-medium">Services</Link>
          <Link href="/about" className="hover:text-gray-600 font-medium">About</Link>
          <Link href="/contact" className="hover:text-gray-600 font-medium">Contact</Link>
        </div>

        {/* Actions - ACCOUNT ON RIGHT ON MOBILE, CART+ACCOUNT ON DESKTOP */}
        <div className="flex items-center gap-4 md:gap-6 z-50">
          
          {user ? (
            <Link href="/account" className="flex items-center gap-2 text-[#222222] hover:text-primary transition-colors">
              <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-sm" />
              </div>
              <span className="hidden md:block text-sm font-black uppercase tracking-widest">Account</span>
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-[#222222] hover:text-primary transition-colors">
              <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-sm" />
              </div>
              <span className="hidden md:block text-sm font-black uppercase tracking-widest">Sign In</span>
            </Link>
          )}

          {/* Cart Icon - HIDDEN ON MOBILE HEADER, MOVED TO MENU */}
          <Link href="/cart" className="hidden md:block relative p-2 transition-colors text-[#222222] hover:text-gray-600">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>


      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background text-gray-800 absolute top-full left-0 right-0 shadow-lg border-t border-white/10 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Home</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Services</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Contact</Link>
          <Link 
            href="/cart" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="py-2 border-b flex items-center justify-between"
          >
            <span className="flex items-center gap-3 text-secondary font-black">
              <FontAwesomeIcon icon={faShoppingCart} />
              MY CART
            </span>
            {cartCount > 0 && (
              <span className="bg-secondary text-secondary-foreground text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
