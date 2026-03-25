"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 pt-8 md:pt-16 pb-8 border-t border-gray-200 mt-4 md:mt-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image 
                src="/madur-logo-official.png" 
                alt="MADUR.IN Logo" 
                width={350} 
                height={120} 
                className="h-40 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Delivering pure, farm-fresh milk, organic groceries, and traditional food products directly to your doorstep. Purity you can trust.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/madur.in?igsh=MWpxMGppcWtlOGQ2dg==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 text-[#E4405F] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
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
                  } className="text-gray-500 hover:text-primary transition-colors text-sm">
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
              <li><Link href="/products?category=Milk%20%26%20Dairy" className="text-gray-500 hover:text-primary transition-colors">Milk &amp; Dairy</Link></li>
              <li><Link href="/products?category=Vegetables" className="text-gray-500 hover:text-primary transition-colors">Fresh Vegetables</Link></li>
              <li><Link href="/products?category=Pickles" className="text-gray-500 hover:text-primary transition-colors">Traditional Pickles</Link></li>
              <li><Link href="/products?category=Cold%20Pressed%20Oils" className="text-gray-500 hover:text-primary transition-colors">Wood Pressed Oils</Link></li>
              <li><Link href="/products?category=Traditional%20Snacks" className="text-gray-500 hover:text-primary transition-colors">Traditional Snacks</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-primary">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-primary" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <FontAwesomeIcon icon={faPhoneAlt} className="text-primary" />
                <span>+91 7416750834</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
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

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} MADUR.IN. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Powered by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">CODTECH IT SOLUTIONS</a>
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors text-xs">Terms &amp; Conditions &amp; Refund Policy</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors text-xs">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
