"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <section className="relative bg-[#f2faf2] overflow-hidden pt-2 pb-20 md:pt-4 md:pb-24">
      {/* Background patterns/blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 rounded-l-[10rem] -z-0 transform translate-x-20"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-6 md:gap-8 max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-xs md:text-sm font-bold tracking-tight">
              Farm Fresh & Pure
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
              Freshness Delivered <br />
              From Our <span className="text-secondary">Farm To</span> <br />
              Your Door
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
              Get premium quality milk, groceries, and traditional homemade products with the trust of Madur.in.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/products" 
                className="bg-primary text-primary-foreground font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
              >
                Shop Now
              </Link>
              <Link 
                href="/services" 
                className="bg-white border-2 border-gray-100 text-gray-700 font-black px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            {/* Image Card 1 - Vegetables */}
            <div className="absolute top-0 right-10 md:right-20 w-[240px] md:w-[320px] aspect-[4/5] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white transform rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
              <Image 
                src="/categories/vegetables.png" 
                alt="Fresh Vegetables" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Image Card 2 - Milk */}
            <div className="absolute bottom-0 left-10 md:left-20 lg:left-0 w-[220px] md:w-[280px] aspect-[3/4] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-20">
              <Image 
                src="/categories/milk-dairy.png" 
                alt="Fresh Milk" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Subtext tag on image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl z-30 transform hover:scale-105 transition-all text-center border border-secondary/20">
                <span className="block text-primary font-black text-xs md:text-sm uppercase tracking-widest mb-1 leading-tight">100% Organic</span>
                <span className="block text-gray-800 font-black text-base md:text-lg leading-tight italic">Direct From Farm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
