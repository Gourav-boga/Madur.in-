import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import QuantityModal from "./QuantityModal";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  image: string;
  image_url?: string;
  description: string;
  is_out_of_stock?: boolean;
  categories?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
  const displayImage = product.image_url || product.image;
  const displayCategory = product.categories?.name || product.category;
  const isOutOfStock = product.is_out_of_stock;

  const handleOpenModal = async () => {
    if (isOutOfStock) return;
    
    // Check if user is logged in via our custom session API
    try {
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (!session) {
        router.push("/login");
        return;
      }
    } catch (err) {
      router.push("/login");
      return;
    }
    
    setIsModalOpen(true);
  };

  const handleAddToCart = (quantity: number, selectedUnit: string) => {
    if (isOutOfStock) return;
    addToCart({ 
      ...product, 
      quantity, 
      selectedUnit,
      image: displayImage,
      category: displayCategory
    });
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`group bg-white rounded-3xl p-3 md:p-4 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full relative ${isOutOfStock ? "opacity-75 grayscale-[0.5]" : ""}`}
      >
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-accent/50 mb-3 md:mb-4 border border-gray-50">
          <Image 
            src={displayImage} 
            alt={product.name} 
            fill 
            className={`object-cover transition-transform duration-700 ${!isOutOfStock ? "group-hover:scale-110" : ""}`} 
          />
          
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <span className="bg-red-600 text-white font-black px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest shadow-xl">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 px-1">
          <div className="flex justify-between items-start mb-1.5">
            <span className="bg-secondary/10 text-secondary text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
              {displayCategory}
            </span>
            <span className="text-gray-400 font-bold text-[10px]">{product.unit}</span>
          </div>
          
          <h3 className={`text-sm md:text-base font-black leading-tight mb-1 transition-colors line-clamp-2 ${isOutOfStock ? "text-gray-500" : "text-gray-800 group-hover:text-primary"}`}>
            {product.name}
          </h3>
          
          <p className="text-gray-400 text-[10px] font-medium mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 px-1 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Price</span>
            <span className={`text-base md:text-xl font-black leading-none ${isOutOfStock ? "text-gray-400" : "text-gray-900"}`}>₹{product.price}</span>
          </div>
          
          <button 
            onClick={handleOpenModal}
            disabled={isOutOfStock}
            className={`font-black px-3 py-2 md:px-5 md:py-3 rounded-xl flex items-center gap-1.5 transition-all text-[10px] uppercase tracking-widest ${isOutOfStock ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800 text-white active:scale-95"}`}
          >
            {isOutOfStock ? "SOLD" : "Add ＋"}
          </button>
        </div>
      </motion.div>

      {!isOutOfStock && (
        <QuantityModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleAddToCart}
          product={{
            ...product,
            image: displayImage,
            category: displayCategory
          }}
        />
      )}
    </>
  );
}
