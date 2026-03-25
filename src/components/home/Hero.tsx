"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { useState, useEffect } from "react";


export default function Hero() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const res = await fetch("/api/hero");
        if (!res.ok) throw new Error("API Failed");
        const data = await res.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setImages(data.map((img: any) => img.image_url));
        } else {
          // Use defaults if empty
          setImages([
            "/hero/hero-1.png",
            "/hero/hero-2.png",
            "/hero/hero-3.png",
            "/hero/hero-4.png",
            "/hero/hero-5.png",
          ]);
        }
      } catch (error) {
        console.warn("Could not fetch hero images, using defaults.");
        setImages([
          "/hero/hero-1.png",
          "/hero/hero-2.png",
          "/hero/hero-3.png",
          "/hero/hero-4.png",
          "/hero/hero-5.png",
        ]);
      } finally {
        setLoading(false);
      }
    }


    fetchHeroImages();
  }, []);

  if (loading) {
    return <div className="w-full h-[200px] md:h-[400px] bg-white p-2 md:p-4 flex items-center justify-center text-primary font-black uppercase tracking-[0.5em]">Madur Freshness Loading...</div>
  }

  return (
    <section className="relative w-full max-w-7xl mx-auto h-[210px] md:h-[450px] bg-white p-1.5 md:p-4 shadow-sm mt-0 md:mt-6">
      {/* Background Swiper with Border effect */}
      <div className="absolute inset-1.5 md:inset-4 z-0 overflow-hidden rounded-xl md:rounded-3xl border-2 md:border-4 border-white shadow-inner">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image 
                  src={src} 
                  alt={`Hero Background ${index + 1}`} 
                  fill 
                  className="object-cover object-center sm:object-[center_20%]"
                  priority={index === 0}
                  unoptimized
                />
                {/* Dark Overlay - slightly softened */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Content Overlay - Adjusted for shorter height */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-start px-4 md:px-12">
        <div className="max-w-2xl space-y-1.5 md:space-y-4">
          <h1 className="text-[1.2rem] leading-[1.1] sm:text-2xl md:text-3xl lg:text-4xl font-black text-white italic uppercase tracking-tighter">
            Pure <span className="text-primary inline-block underline decoration-primary decoration-2 md:decoration-4 underline-offset-[2px] md:underline-offset-[6px]">Natural Products</span> <br />
            delivered to <br />
            <span className="underline decoration-white decoration-2 md:decoration-4 underline-offset-[2px] md:underline-offset-[6px]">your home</span>
          </h1>
          
          <div className="pt-3 md:pt-10">
            <Link 
              href="/products" 
              className="group bg-secondary text-white font-black px-3 py-1.5 md:px-8 md:py-4 rounded-lg shadow-xl hover:opacity-90 transition-all flex items-center gap-2 md:gap-4 w-fit active:scale-95"
            >
              <div className="w-5 h-5 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-black transition-colors">
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px] md:text-lg" />
              </div>
              <span className="text-[10px] md:text-lg uppercase tracking-wider md:tracking-widest">Shop Now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
