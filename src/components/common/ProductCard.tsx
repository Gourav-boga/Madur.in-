import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import QuantityModal from "./QuantityModal";

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
  
  const displayImage = product.image_url || product.image || "/logo.png";
  const displayCategory = product.categories?.name || product.category || "General";
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
        className={`group bg-white rounded-xl md:rounded-3xl p-1.5 md:p-3.5 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full relative ${isOutOfStock ? "opacity-75 grayscale-[0.5]" : ""}`}
      >
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-lg md:rounded-2xl overflow-hidden bg-accent/50 mb-1.5 md:mb-3.5 border border-gray-50">
          {displayImage ? (
            <Image 
              src={displayImage} 
              alt={product.name || "Product"} 
              fill 
              className={`object-cover transition-transform duration-700 ${!isOutOfStock ? "group-hover:scale-110" : ""}`} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 italic text-gray-400 text-[8px]">
              No Image
            </div>
          )}
          
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <span className="bg-red-600 text-white font-black px-2 py-1 rounded-md text-[8px] md:text-xs uppercase tracking-widest shadow-xl">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 px-0.5">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <span className="bg-secondary/10 text-secondary text-[7px] md:text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full">
              {displayCategory}
            </span>
            <span className="text-gray-400 font-bold text-[8px] md:text-[10px]">{product.unit}</span>
          </div>
          
          <h3 className={`text-[10px] md:text-sm font-black leading-tight mb-0.5 md:mb-1.5 transition-colors line-clamp-2 ${isOutOfStock ? "text-[#222222]" : "text-[#222222] group-hover:text-primary"}`}>
            {product.name}
          </h3>
          
          <p className="text-[#222222]/80">
            {product.description}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-1.5 md:pt-3 px-0.5 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="hidden md:block text-[8px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
            <span className={`text-[12px] md:text-lg font-black leading-none ${isOutOfStock ? "text-gray-400" : "text-[#222222]"}`}>₹{product.price}</span>
          </div>
          
          <button 
            onClick={handleOpenModal}
            disabled={isOutOfStock}
            className={`font-black px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl flex items-center gap-1 transition-all text-[8px] md:text-[10px] uppercase tracking-widest ${isOutOfStock ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-secondary hover:opacity-90 text-white active:scale-95"}`}
          >
            {isOutOfStock ? "SOLD" : (
              <>
                Add <span className="text-[10px] md:text-sm">＋</span>
              </>
            )}
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
