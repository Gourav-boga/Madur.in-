"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch team:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  const founders = members.filter(m => m.is_founder);
  const coFounders = members.filter(m => !m.is_founder);

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
                unoptimized
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
                unoptimized
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

      {/* Founder Section */}
      {founders.map((founder) => (
        <section key={founder.id} className="bg-background pt-8 pb-12 md:pt-24 md:pb-24">
          <div className="container max-w-4xl mx-auto rounded-[3rem] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch border border-gray-100">
             <div className="md:w-1/3 relative min-h-[300px]">
                <Image 
                  src={founder.image_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"}
                  alt={founder.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  unoptimized
                />
             </div>
             <div className="md:w-2/3 p-12 flex flex-col justify-center">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-primary text-4xl mb-6 opacity-20" />
                <h3 className="text-3xl font-black mb-2 text-[#222222]">{founder.name}</h3>
                <p className="text-primary font-bold mb-6 uppercase tracking-widest text-xs">{founder.role}</p>
                <p className="text-[#222222] leading-relaxed mb-8">
                  {founder.bio}
                </p>
                <button className="bg-secondary text-white font-black px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all w-fit uppercase tracking-widest text-xs">
                  Connect with Founder
                </button>
             </div>
          </div>
        </section>
      ))}

      {/* Co-Founders Grid Section */}
      {coFounders.length > 0 && (
        <section className="bg-background pb-12 md:pb-32">
          <div className="container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coFounders.map((member) => (
                <div key={member.id} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-secondary transition-all">
                   <div className="w-32 h-32 relative rounded-full overflow-hidden mb-6 border-4 border-accent shadow-inner">
                     <Image 
                        src={member.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"} 
                        alt={member.name} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        unoptimized
                     />
                   </div>
                   <h4 className="text-xl font-black text-[#222222] mb-1">{member.name}</h4>
                   <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">{member.role}</p>
                   <p className="text-[#222222] text-sm leading-relaxed opacity-80">
                     {member.bio}
                   </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
