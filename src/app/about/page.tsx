"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-background pt-6 pb-8 md:pt-10 md:pb-20 overflow-hidden">
        <div className="container flex flex-col lg:flex-row items-center gap-6 md:gap-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-8 leading-tight text-[#222222]">
              Bringing the <span className="text-brown">Farm</span> <br /> Closer to You.
            </h1>
            <p className="text-lg text-[#222222] leading-relaxed mb-4 md:mb-8">
              Madur.in is a local farm-fresh grocery and dairy brand focused on delivering pure, natural, and high-quality products directly to customers' homes. Our mission is to provide fresh milk, vegetables, groceries, traditional sweets, and homemade food products with trusted quality and affordable prices.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-xl inline-block border-l-8 border-primary">
              <p className="font-bold text-xl italic">"Purity, Freshness, and Healthy Living"</p>
            </div>
          </div>
          <div className="flex-1 relative aspect-square max-w-lg w-full">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/hero-banner.png"
                alt="Farm fresh food"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container py-8 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
           <div className="order-2 md:order-1 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/brand-image.png"
                alt="Health and purity"
                fill
                className="object-contain"
              />
           </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-black mb-6 text-[#222222]">Our Mission</h2>
              <p className="text-[#222222] leading-relaxed mb-6">
                Madur emphasizes purity, freshness, and healthy living for families. We believe that the best food doesn't need chemicals, it needs care. Our goal is to revive the traditional ways of food production that our ancestors followed, ensuring that every drop of milk and every spoon of ghee contributes to your well-being.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-accent p-4 rounded-xl border-b-4 border-secondary">
                  <h4 className="font-black text-2xl text-secondary mb-1">100%</h4>
                  <p className="text-xs font-bold text-[#222222]">Pure Organic</p>
                </div>
                <div className="bg-accent p-4 rounded-xl border-b-4 border-primary">
                  <h4 className="font-black text-2xl text-primary mb-1">Daily</h4>
                  <p className="text-xs font-bold text-[#222222]">Fast Delivery</p>
                </div>
              </div>
           </div>
        </div>
      </section>
      {/* Why Choose Madur */}
      <section className="bg-background py-8 md:py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-16">
            <div className="h-[2px] bg-secondary/30 flex-1 hidden md:block"></div>
            <h2 className="text-3xl md:text-4xl font-black text-center text-secondary-foreground whitespace-nowrap px-4 border-l-4 border-r-4 border-secondary">
              Why Choose Madur?
            </h2>
            <div className="h-[2px] bg-secondary/30 flex-1 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-xl">
                 <Image src="/about/delivery-man.png" alt="Daily Fresh Delivery" fill className="object-cover" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary p-2 rounded-lg text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                </div>
                <h4 className="text-xl font-black text-[#222222]">Daily Fresh Delivery</h4>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-xl">
                 <Image src="/about/quality-seal.png" alt="Best Quality Products" fill className="object-cover" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary p-2 rounded-lg text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h4 className="text-xl font-black text-[#222222]">Best Quality Products</h4>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-xl">
                 <Image src="/about/delivery-van.png" alt="Free Home Delivery" fill className="object-cover" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary p-2 rounded-lg text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h4 className="text-xl font-black text-[#222222]">Free Home Delivery</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(166,230,122,0.05),transparent)] pointer-events-none"></div>
      </section>

      {/* Founder Section */}
      <section className="bg-background pt-8 pb-12 md:pt-24 md:pb-24">
        <div className="container max-w-4xl mx-auto rounded-[3rem] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch">
           <div className="md:w-1/3 relative min-h-[300px]">
              <Image 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
                alt="Sindhusha G - Founder"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
           </div>
           <div className="md:w-2/3 p-12 flex flex-col justify-center">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-primary text-4xl mb-6 opacity-20" />
              <h3 className="text-3xl font-black mb-2 text-[#222222]">Sindhusha G</h3>
              <p className="text-primary font-bold mb-6 uppercase tracking-widest text-xs">Founder of MADUR.IN</p>
              <p className="text-[#222222] leading-relaxed mb-8">
                An entrepreneur focused on building local businesses and providing fresh, high-quality food products to communities. Her vision for Madur is to bridge the gap between rural pure produce and urban healthy living.
              </p>
              <button className="bg-secondary text-secondary-foreground font-black px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all w-fit uppercase tracking-widest text-xs">
                Connect with Founder
              </button>
           </div>
        </div>
      </section>

      {/* Co-Founders Grid Section */}
      <section className="bg-background pb-12 md:pb-32">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Co-Founder 1 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-secondary transition-all">
               <div className="w-32 h-32 relative rounded-full overflow-hidden mb-6 border-4 border-accent">
                 <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" 
                    alt="Co-Founder 1" 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                 />
               </div>
               <h4 className="text-xl font-black text-[#222222] mb-1">Ravi Sharma</h4>
               <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">Co-Founder & Operations</p>
               <p className="text-[#222222] text-sm leading-relaxed opacity-80">
                 Leading our supply chain and farm-to-doorstep logistics to ensure freshness.
               </p>
            </div>

            {/* Co-Founder 2 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-secondary transition-all">
               <div className="w-32 h-32 relative rounded-full overflow-hidden mb-6 border-4 border-accent">
                 <Image 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" 
                    alt="Co-Founder 2" 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                 />
               </div>
               <h4 className="text-xl font-black text-[#222222] mb-1">Anil Kumar</h4>
               <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">Co-Founder & Strategy</p>
               <p className="text-[#222222] text-sm leading-relaxed opacity-80">
                  Driving brand growth and ensuring the highest quality standards for all products.
               </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
