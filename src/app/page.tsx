"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight, faPaperPlane, faBox } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/components/common/ProductCard";
import HomeBanners from "@/components/home/HomeBanners";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data: catData } = await supabase.from("categories").select("*");
      const { data: prodData } = await supabase.from("products").select("*, categories(name)").limit(8);
      
      setCategories(catData || []);
      setProducts(prodData || []);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will get back to you soon.");
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="flex flex-col gap-6 md:gap-16 pb-10 md:pb-20">
      <Hero />
      
      {/* Categories Grid */}
      <section className="container">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h2 className="text-2xl font-black flex items-center gap-3 text-black">
            <span className="w-2 h-8 bg-secondary rounded-full"></span>
            Shop by Category
          </h2>
          <Link href="/products" className="text-secondary font-bold flex items-center gap-2 hover:underline">
            View All <FontAwesomeIcon icon={faArrowRight} size="xs" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {isLoading ? (
            [...Array(4)].map((_, i) => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl"></div>)
          ) : categories.map((cat, index) => (
            <Link 
              href={`/products?category=${encodeURIComponent(cat.name)}`} 
              key={cat.id}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-secondary transition-all text-center overflow-hidden"
            >
              <div className="w-full aspect-[4/3] md:aspect-square relative overflow-hidden bg-gray-50">
                {cat.image_url || cat.image ? (
                  <Image src={cat.image_url || cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <FontAwesomeIcon icon={faBox} className="text-gray-200 text-4xl" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-sm font-bold text-gray-700 leading-tight">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/5 py-6 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-4 md:mb-10">
            <h2 className="text-2xl font-black flex items-center gap-3 text-black">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Popular Products
            </h2>
            <Link href="/products" className="text-primary font-bold flex items-center gap-2 hover:underline text-sm md:text-base">
              See more Fresh Items <FontAwesomeIcon icon={faArrowRight} size="xs" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
            {isLoading ? (
                [...Array(4)].map((_, i) => <div key={i} className="h-80 bg-white/50 animate-pulse rounded-3xl"></div>)
            ) : products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link 
              href="/products" 
              className="bg-primary text-primary-foreground font-black px-10 py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all active:scale-95 flex items-center gap-3"
            >
              VIEW ALL PRODUCTS
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container py-4 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src="/hero-banner.png"
              alt="Farm fresh journey"
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur rounded-2xl shadow-xl max-w-xs">
              <p className="font-black text-primary text-xl mb-1">Purity First</p>
              <p className="text-xs text-gray-600 font-bold">Reviving traditional ways for a healthier tomorrow.</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-8 leading-tight text-black">
              The Journey of <span className="text-primary">MADUR.IN</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4 md:mb-8">
              Madur.in is born out of a passion for purity and healthy living. We bridge the gap between rural pure produce and urban healthy living, delivering 100% natural and farm-fresh products directly to your doorstep.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 md:mb-10">
              <div className="bg-accent p-6 rounded-2xl border-l-4 border-secondary shadow-sm">
                <h4 className="font-black text-3xl text-secondary mb-1">100%</h4>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Natural Produces</p>
              </div>
              <div className="bg-accent p-6 rounded-2xl border-l-4 border-primary shadow-sm">
                <h4 className="font-black text-3xl text-primary mb-1">Farm</h4>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">To Home Delivery</p>
              </div>
            </div>

            <Link href="/about" className="group bg-secondary text-secondary-foreground font-black px-10 py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center gap-3 w-fit">
              READ FULL STORY
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <HomeBanners />

      {/* Contact Form Section */}
      <section className="container py-4 md:py-10">
        <div className="bg-secondary/10 rounded-[2rem] p-5 md:p-16 flex flex-col lg:flex-row items-center gap-6 md:gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 leading-tight text-black">
              Purely Natural. <br />
              Part of Your Healthy Life.
            </h2>
            <p className="text-gray-600 mb-4 md:mb-8 leading-relaxed">
              At Madur.in, we believe in the power of pure, natural nutrition. Have questions about our products or delivery? We're here to help you live a healthier, purer life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="bg-secondary text-secondary-foreground font-black px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-3">
                VIEW CONTACT DETAILS
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">
              <h3 className="text-2xl font-black mb-6 text-black">Send an Inquiry</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-black">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your name"
                    className="bg-accent/50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 ring-primary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-1 text-black">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Enter phone number"
                    className="bg-accent/50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 ring-primary transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-1 text-black">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">How can we help?</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Your message"
                    className="bg-accent/50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 ring-primary resize-none transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-primary text-primary-foreground font-black py-4 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 mt-2"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  SUBMIT FORM
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
