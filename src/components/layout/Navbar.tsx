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
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cartCount } = useCart();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#f2faf2] shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <StreamingTagline />
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Back Button (Only on non-home pages) */}
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center text-gray-700"
              aria-label="Go back"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
            </button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/brand-logo-transparent.png" 
            alt="MADUR.IN Logo" 
            width={400} 
            height={120} 
            className="h-28 md:h-36 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Desktop Search Bar (Swiggy Style) */}
        <form 
          onSubmit={handleSearch}
          className="hidden lg:flex flex-1 max-w-xl mx-8 items-center bg-accent rounded-lg px-4 py-2"
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search for milk, vegetables, groceries..."
            className="bg-transparent border-none outline-none w-full text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-primary font-medium">Home</Link>
          <Link href="/services" className="hover:text-primary font-medium">Services</Link>
          <Link href="/about" className="hover:text-primary font-medium">About</Link>
          <Link href="/contact" className="hover:text-primary font-medium">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 ml-4">
          <Link href="/cart" className="relative p-2 ml-2 hover:text-primary transition-colors">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/login" className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
            <FontAwesomeIcon icon={faUser} />
            <span>Sign In</span>
          </Link>
          <button
            className="md:hidden p-2"
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
            className="flex items-center bg-accent rounded-xl px-4 py-2.5 shadow-inner"
          >
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3 text-sm" />
            <input
              type="text"
              placeholder="Search for milk, vegetables..."
              className="bg-transparent border-none outline-none w-full text-xs placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Home</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Services</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">Contact</Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-2 flex items-center gap-2 text-primary font-bold">
            <FontAwesomeIcon icon={faUser} />
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
