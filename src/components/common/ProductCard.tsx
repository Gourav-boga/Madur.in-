import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import QuantityModal from "./QuantityModal";

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  image: string;
  image_url?: string;
  description: string;
  categories?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const displayImage = product.image_url || product.image;
  const displayCategory = product.categories?.name || product.category;

  const handleAddToCart = (quantity: number, selectedUnit: string) => {
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
        className="group bg-white rounded-[2.5rem] p-5 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full relative"
      >
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-accent/50 mb-6 border border-gray-50">
          <Image 
            src={displayImage} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          
          <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="w-12 h-12 bg-black text-white rounded-2xl shadow-xl flex items-center justify-center active:scale-90 hover:bg-gray-800 transition-colors"
             >
               <FontAwesomeIcon icon={faCartPlus} />
             </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-2">
          <div className="flex justify-between items-start mb-2">
            <span className="bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {displayCategory}
            </span>
            <span className="text-gray-400 font-bold text-xs">{product.unit}</span>
          </div>
          
          <h3 className="text-lg font-black text-gray-800 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-400 text-xs font-medium mb-6 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 px-2 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
            <span className="text-2xl font-black text-gray-900 leading-none">₹{product.price}</span>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white font-black px-6 py-4 rounded-2xl flex items-center gap-2 transition-all active:scale-95 text-xs uppercase tracking-widest"
          >
            Add ＋
          </button>
        </div>
      </motion.div>

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
    </>
  );
}
