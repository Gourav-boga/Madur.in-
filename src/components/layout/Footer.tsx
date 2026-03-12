"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-gray-200 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image 
                src="/brand-logo-transparent.png" 
                alt="MADUR.IN Logo" 
                width={400} 
                height={120} 
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Delivering pure, farm-fresh milk, organic groceries, and traditional food products directly to your doorstep. Purity you can trust.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary transition-colors">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary transition-colors">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary transition-colors">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/cart" className="hover:text-primary transition-colors">Your Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-6">Categories</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li><Link href="/products?category=Milk%20%26%20Dairy" className="hover:text-primary transition-colors">Milk & Dairy</Link></li>
              <li><Link href="/products?category=Vegetables" className="hover:text-primary transition-colors">Fresh Vegetables</Link></li>
              <li><Link href="/products?category=Pickles" className="hover:text-primary transition-colors">Traditional Pickles</Link></li>
              <li><Link href="/products?category=Cold%20Pressed%20Oils" className="hover:text-primary transition-colors">Wood Pressed Oils</Link></li>
              <li><Link href="/products?category=Traditional%20Snacks" className="hover:text-primary transition-colors">Traditional Snacks</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li className="flex gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mt-1" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-primary mt-1" />
                <span>+91 7416750834</span>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary mt-1" />
                <span>info@madur.in</span>
              </li>
              <li className="flex gap-3 items-center text-green-600 font-bold">
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                <span>Chat with us</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 MADUR.IN. All rights reserved.</p>
          <p>Powered by <a href="https://www.codtechitsolutions.com/" className="underline hover:text-primary">Codtech IT Solutions</a></p>
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-primary">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
