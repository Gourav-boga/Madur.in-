"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image 
                src="/logo-transparent.png" 
                alt="MADUR.IN Logo" 
                width={500} 
                height={150} 
                className="h-44 w-auto object-contain"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Delivering pure, farm-fresh milk, organic groceries, and traditional food products directly to your doorstep. Purity you can trust.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/madur.in?igsh=MWpxMGppcWtlOGQ2dg==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white text-[#E4405F] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-primary">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {['Home', 'Our Services', 'About Us', 'Contact Us', 'Your Cart'].map((item) => (
                <li key={item}>
                  <Link href={
                    item === 'Home' ? '/' :
                    item === 'Our Services' ? '/services' :
                    item === 'About Us' ? '/about' :
                    item === 'Contact Us' ? '/contact' :
                    item === 'Your Cart' ? '/cart' : '#'
                  } className="text-white/70 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-6 text-primary">Categories</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/products?category=Milk%20%26%20Dairy" className="text-white/70 hover:text-white transition-colors">Milk & Dairy</Link></li>
              <li><Link href="/products?category=Vegetables" className="text-white/70 hover:text-white transition-colors">Fresh Vegetables</Link></li>
              <li><Link href="/products?category=Pickles" className="text-white/70 hover:text-white transition-colors">Traditional Pickles</Link></li>
              <li><Link href="/products?category=Cold%20Pressed%20Oils" className="text-white/70 hover:text-white transition-colors">Wood Pressed Oils</Link></li>
              <li><Link href="/products?category=Traditional%20Snacks" className="text-white/70 hover:text-white transition-colors">Traditional Snacks</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-primary">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-primary" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <FontAwesomeIcon icon={faPhoneAlt} className="text-primary" />
                <span>+91 7416750834</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                <span>info@madur.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-lg" />
                <a href="https://wa.me/917416750834" target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">
                  Chat with us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} MADUR.IN. All rights reserved.
          </p>
          <p className="text-white/60 text-xs">
            Powered by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">CODTECH IT SOLUTIONS</a>
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
