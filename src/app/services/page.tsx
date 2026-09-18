"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBox } from "@fortawesome/free-solid-svg-icons";

function ServiceCardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => setImgSrc(src), [src]);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-500"
      onError={() => setImgSrc("/placeholder.png")}
      unoptimized
    />
  );
}

export default function ServicesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categoryList", { 
          cache: "no-store",
          headers: { "Accept": "application/json" }
        });
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);


  return (
    <div>
      {/* Header */}
      <section className="bg-background pt-6 pb-10 md:pt-10 md:pb-24 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#222222]">Our Services & Products</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We bring you the finest collection of farm-fresh dairy and traditional food products, processed with care and delivered with love.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => <div key={i} className="h-64 bg-white animate-pulse rounded-3xl shadow-lg"></div>)
          ) : (Array.isArray(categories) ? categories : []).map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-secondary transition-all group flex flex-col h-full"
            >
              <div className="w-full aspect-[4/3] md:aspect-square relative mb-6 rounded-2xl overflow-hidden bg-gray-50">
                {service.image_url || service.image ? (
                  <ServiceCardImage src={service.image_url || service.image} alt={service.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                    <FontAwesomeIcon icon={faBox} className="text-4xl" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-black mb-4 text-[#222222]">{service.name}</h3>
              <p className="text-[#222222] text-sm mb-6 leading-relaxed">
                Experience the pure taste of our {service.name.toLowerCase()}. Sourced directly from local farms ensuring the highest quality for your family's health.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-secondary" /> 100% Pure & Traditional
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-secondary" /> Farm Fresh Quality
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-secondary" /> Daily Home Delivery
                </li>
              </ul>
              <Link 
                href={`/products?category=${encodeURIComponent(service.name)}`}
                className="w-full bg-secondary text-white font-black py-4 rounded-2xl flex items-center justify-center shadow-lg text-sm uppercase tracking-widest mt-auto"
              >
                View Products
              </Link>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
