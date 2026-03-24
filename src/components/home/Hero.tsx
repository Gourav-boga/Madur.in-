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
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeroImages() {
      const { data, error } = await supabase
        .from("hero_images")
        .select("image_url")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching hero images:", error);
        // Fallback to defaults or empty
        setImages([
          "/hero/hero-1.png",
          "/hero/hero-2.png",
          "/hero/hero-3.png",
          "/hero/hero-4.png",
          "/hero/hero-5.png",
        ]);
      } else if (data && data.length > 0) {
        setImages(data.map(img => img.image_url));
      } else {
        setImages([
          "/hero/hero-1.png",
          "/hero/hero-2.png",
          "/hero/hero-3.png",
          "/hero/hero-4.png",
          "/hero/hero-5.png",
        ]);
      }
      setLoading(false);
    }

    fetchHeroImages();
  }, []);

  if (loading) {
    return <div className="w-full h-[250px] md:h-[800px] bg-black animate-pulse flex items-center justify-center text-primary font-black uppercase tracking-[0.5em]">Madur Freshness Loading...</div>
  }

  return (
    <section className="relative w-full h-[250px] md:h-[800px] overflow-hidden">
      {/* Background Swiper */}
      <div className="absolute inset-0 z-0">
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
                  className="object-cover object-center sm:object-[center_30%]"
                  priority={index === 0}
                />
                {/* Dark Overlay - matches the reference aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Content Overlay */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-12">
        <div className="max-w-4xl space-y-3 md:space-y-4">
          <h1 className="text-[1.5rem] leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter">
            empowering every <br />
            <span className="text-primary inline-block underline decoration-primary decoration-2 md:decoration-4 underline-offset-[4px] md:underline-offset-[10px]">freshness</span> <br />
            from farm to <br />
            <span className="underline decoration-white decoration-2 md:decoration-4 underline-offset-[4px] md:underline-offset-[10px]">your door</span>
          </h1>
          

          
          <div className="pt-12 md:pt-20">
            <Link 
              href="/services" 
              className="group bg-black text-white font-black px-6 py-4 md:px-10 md:py-6 rounded-xl shadow-2xl hover:bg-gray-800 transition-all flex items-center gap-4 w-fit active:scale-95"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-black transition-colors">
                <FontAwesomeIcon icon={faArrowRight} className="text-lg md:text-xl" />
              </div>
              <span className="text-base md:text-xl uppercase tracking-widest">Explore Services</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
