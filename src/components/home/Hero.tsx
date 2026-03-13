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

const heroImages = [
  "/hero/hero-1.png",
  "/hero/hero-2.png",
  "/hero/hero-3.png",
  "/hero/hero-4.png",
  "/hero/hero-5.png",
];

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
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
          {heroImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image 
                  src={src} 
                  alt={`Hero Background ${index + 1}`} 
                  fill 
                  className="object-cover"
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white italic leading-tight uppercase tracking-tighter">
            empowering every <br />
            <span className="text-primary inline-block underline decoration-primary decoration-2 md:decoration-4 underline-offset-[8px] md:underline-offset-[10px]">freshness</span> <br />
            from farm to <br />
            <span className="underline decoration-white decoration-2 md:decoration-4 underline-offset-[8px] md:underline-offset-[10px]">your door</span>
          </h1>
          
          <div className="max-w-xl bg-black/30 backdrop-blur-sm p-3 rounded-xl border-l-2 border-primary">
            <p className="text-white text-sm md:text-base font-bold leading-relaxed shadow-black drop-shadow-lg">
              Freshness Delivered with Trust. Get premium quality milk, groceries, and traditional 
              homemade products directly from local farms.
            </p>
          </div>
          
          <div className="pt-4 md:pt-8">
            <Link 
              href="/services" 
              className="group bg-primary text-black font-black px-6 py-4 md:px-10 md:py-6 rounded-xl shadow-2xl hover:bg-white transition-all flex items-center gap-4 w-fit active:scale-95"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-black/10 rounded-full flex items-center justify-center text-black group-hover:bg-primary transition-colors">
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
