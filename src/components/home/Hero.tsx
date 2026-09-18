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
        const res = await fetch("/api/heroSlides");
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
    <section className="relative w-full h-[220px] sm:h-[340px] md:h-[460px] lg:h-[520px] overflow-hidden bg-gray-100">
      {/* Edge-to-Edge Full Width Background Swiper */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
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
                  alt={`Hero Banner ${index + 1}`} 
                  fill 
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Content Overlay: Only Shop Now Button */}
      <div className="container relative z-10 h-full flex items-end sm:items-center px-6 sm:px-12 md:px-20 pb-5 sm:pb-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Link 
            href="/products" 
            className="group bg-secondary text-white font-black px-4 py-2 sm:px-7 sm:py-3.5 md:px-8 md:py-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-[#255732] hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all flex items-center gap-2.5 sm:gap-4 w-fit active:scale-95 border border-white/20"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-secondary transition-colors">
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px] sm:text-xs md:text-sm" />
            </div>
            <span className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider md:tracking-widest">
              Shop Now
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
