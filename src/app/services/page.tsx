"use client";

import { useState, useEffect } from "react";
import { categories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function ServicesPage() {

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-primary pt-32 pb-24 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Our Services & Products</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We bring you the finest collection of farm-fresh dairy and traditional food products, processed with care and delivered with love.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-secondary transition-all group"
            >
              <div className="w-full aspect-video relative mb-6 rounded-2xl overflow-hidden bg-gray-50 p-2">
                {service.image ? (
                  <Image src={service.image} alt={service.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-black mb-4">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Experience the pure taste of our {service.name.toLowerCase()}. Sourced directly from local farms ensuring the highest quality for your family's health.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-secondary" /> 100% Pure & Traditional
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-secondary" /> Farm Fresh Quality
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-secondary" /> Daily Home Delivery
                </li>
              </ul>
              <Link 
                href={`/products?category=${encodeURIComponent(service.name)}`}
                className="w-full bg-accent text-foreground font-bold py-3 rounded-xl hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center"
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
