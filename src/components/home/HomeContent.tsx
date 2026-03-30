"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight, faPaperPlane, faBox, faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/components/common/ProductCard";
import HomeBanners from "@/components/home/HomeBanners";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import { useRouter } from "next/navigation";

export default function HomeContent() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const normalizeImageUrl = (url: string) => {
    if (!url) return "/logo.png";
    if (url.startsWith("http")) return url;
    // Use relative paths to avoid origin mismatch issues (e.g. www vs non-www)
    return url.startsWith("/") ? url : `/${url}`;
  };
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      setIsLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/categoryList", { signal: controller.signal, cache: "no-store", headers: { "Accept": "application/json" } }),
          fetch("/api/productList?limit=8", { signal: controller.signal, cache: "no-store", headers: { "Accept": "application/json" } })
        ]);
        
        const catData = catRes.ok ? await catRes.json() : [];
        const prodData = prodRes.ok ? await prodRes.json() : [];
        
        setCategories(Array.isArray(catData) ? catData : []);
        setProducts(Array.isArray(prodData) ? prodData : []);

        const revRes = await fetch("/api/reviews", { signal: controller.signal });
        const revData = await revRes.json();
        if (revData && !revData.error) {
          setReviews(Array.isArray(revData) ? revData : []);
        } else {
          console.error("Reviews API Error:", revData?.error, revData?.details);
          setReviews([]);
        }

      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("Failed to fetch data:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    
    return () => controller.abort();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will get back to you soon.");
    setFormData({ name: "", phone: "", message: "" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:gap-16 pb-0 md:pb-20">
      <Hero />
      
      {/* Featured Products */}
      <section className="bg-secondary/5 pt-4 pb-2 md:py-16">
        <div className="container">
          {/* Mobile Search Bar */}
          <div className="md:hidden mt-2 mb-6">
            <form 
              onSubmit={handleSearch}
              className="flex items-center bg-white border border-secondary/20 rounded-xl px-4 py-3 shadow-md"
            >
              <FontAwesomeIcon icon={faSearch} className="text-secondary mr-3 text-sm" />
              <input
                type="text"
                placeholder="Search for fresh items..."
                className="bg-transparent border-none outline-none w-full text-sm text-[#222222] placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center justify-between mb-2 md:mb-10">
            <h2 className="text-2xl font-black flex items-center gap-3 text-[#222222]">
              <span className="w-2 h-8 bg-secondary rounded-full"></span>
              Popular Products
            </h2>
            <Link href="/products" className="text-secondary font-bold flex items-center gap-2 hover:underline text-sm md:text-base">
              See more Fresh Items <FontAwesomeIcon icon={faArrowRight} size="xs" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8 mb-3 md:mb-12">
            {isLoading ? (
                [...Array(4)].map((_, i) => <div key={i} className="h-80 bg-white/50 animate-pulse rounded-3xl"></div>)
            ) : (Array.isArray(products) ? products : []).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-2">
            <Link 
              href="/products" 
              className="bg-secondary text-secondary-foreground font-black px-5 py-2.5 md:px-10 md:py-5 text-xs md:text-base rounded-xl md:rounded-2xl shadow-xl hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 md:gap-3"
            >
              VIEW ALL PRODUCTS
              <FontAwesomeIcon icon={faArrowRight} className="text-xs md:text-base" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container">
        <div className="flex items-center justify-between mb-2 md:mb-8">
          <h2 className="text-2xl font-black flex items-center gap-3 text-[#222222]">
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
          ) : (Array.isArray(categories) ? categories : []).map((cat) => (
            <Link 
              href={`/products?category=${encodeURIComponent(cat.name)}`} 
              key={cat.id}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-secondary transition-all text-center overflow-hidden"
            >
              <div className="w-full aspect-[4/3] md:aspect-square relative overflow-hidden bg-gray-50">
                {cat.image_url || cat.image ? (
                  <Image 
                    src={normalizeImageUrl(cat.image_url || cat.image)} 
                    alt={cat.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <FontAwesomeIcon icon={faBox} className="text-gray-200 text-4xl" />
                  </div>
                )}
              </div>
              <div className="p-2 md:p-3">
                <span className="text-[10px] md:text-xs font-bold text-[#222222] leading-tight">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container pt-0 pb-2 md:py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-[500px] overflow-hidden">
            <Image 
              src="/hero-banner.png"
              alt="Farm fresh journey"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 p-4 bg-white/90 backdrop-blur rounded-xl shadow-lg max-w-xs">
              <p className="font-black text-secondary text-xl mb-1">Purity First</p>
              <p className="text-xs text-[#222222] font-bold">Reviving traditional ways for a healthier tomorrow.</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-8 leading-tight text-[#222222]">
              The Journey of <span className="text-secondary">MADUR.IN</span>
            </h2>
            <p className="text-[#222222] text-lg leading-relaxed mb-4 md:mb-8">
              Madur.in is born out of a passion for purity and healthy living. We bridge the gap between rural pure produce and urban healthy living, delivering 100% natural and farm-fresh products directly to your doorstep.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 md:mb-10">
              <div className="bg-accent p-6 rounded-2xl border-l-4 border-secondary shadow-sm">
                <h4 className="font-black text-3xl text-secondary mb-1">100%</h4>
                <p className="text-xs font-bold text-[#222222] uppercase tracking-wider">Natural Produces</p>
              </div>
              <div className="bg-accent p-6 rounded-2xl border-l-4 border-secondary shadow-sm">
                <h4 className="font-black text-3xl text-secondary mb-1">Farm</h4>
                <p className="text-xs font-bold text-[#222222] uppercase tracking-wider">To Home Delivery</p>
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
      <section className="container py-2 md:py-10">
        <div className="bg-secondary/10 rounded-[2rem] p-5 md:p-16 flex flex-col lg:flex-row items-center gap-6 md:gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 leading-tight text-[#222222]">
              Purely Natural. <br />
              Part of Your Healthy Life.
            </h2>
            <p className="text-[#222222] mb-4 md:mb-8 leading-relaxed">
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
              <h3 className="text-2xl font-black mb-6 text-[#222222]">Send an Inquiry</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-[#222222]">
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
                <div className="flex flex-col gap-1 text-gray-800">
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
                <div className="flex flex-col gap-1 text-gray-800">
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
                    className="bg-secondary text-white font-black py-4 rounded-2xl shadow-xl hover:opacity-90 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  SUBMIT FORM
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="container py-4 md:py-8">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <h2 className="text-2xl font-black flex items-center gap-3 text-[#222222]">
            <span className="w-2 h-8 bg-secondary rounded-full"></span>
            Customer Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {reviews.length === 0 ? (
            <div className="col-span-full text-center py-10 opacity-30 text-[#222222] italic font-bold">
               No reviews shared yet.
            </div>
          ) : reviews.slice(0, 2).map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-secondary" />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className={i < review.rating ? "text-yellow-400 text-sm" : "text-gray-100 text-sm"} />
                ))}
              </div>
              <p className="text-[#222222] text-lg font-bold italic leading-relaxed mb-6">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black">
                  {review.customer_name.charAt(0)}
                </div>
                <p className="font-black text-[#222222]">— {review.customer_name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            href="/reviews" 
            className="bg-secondary text-secondary-foreground font-black px-6 py-3 md:px-10 md:py-4 text-xs md:text-sm rounded-xl md:rounded-2xl shadow-lg hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
          >
            VIEW MORE REVIEWS
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
}
