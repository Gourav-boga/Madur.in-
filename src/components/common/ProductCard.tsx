"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faShoppingCart, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  unit: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const cartItems = cart.filter(item => item.id === product.id);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isLiquid = product.unit.toLowerCase().includes('l') || 
                   product.unit.toLowerCase().includes('ml') || 
                   product.category === "Milk & Dairy" || 
                   product.category === "Cold Pressed Oils";

  const options = isLiquid 
    ? [
        { label: "1 Litre", value: "1 L", multiplier: 1 },
        { label: "500 ml", value: "500 ml", multiplier: 0.5 }
      ]
    : [
        { label: "250 g", value: "250 g", multiplier: 0.25 },
        { label: "500 g", value: "500 g", multiplier: 0.5 },
        { label: "1 kg", value: "1 kg", multiplier: 1 }
      ];

  const handleAddToCart = (option: { value: string, multiplier: number }) => {
    // Calculate price based on the multiplier relative to the base price in data.ts
    // In data.ts, price is usually for the unit specified (e.g. 1L or 500g)
    // We need to normalize to calculate the price for other units.
    // Base unit value
    let baseMultiplier = 1;
    if (product.unit.includes("500 g")) baseMultiplier = 0.5;
    if (product.unit.includes("250 g")) baseMultiplier = 0.25;
    if (product.unit.includes("200 g")) baseMultiplier = 0.2;
    if (product.unit.includes("100 g")) baseMultiplier = 0.1;

    const pricePerUnit = product.price / baseMultiplier;
    const selectedPrice = Math.round(pricePerUnit * option.multiplier);

    addToCart({
      ...product,
      price: selectedPrice,
      quantity: 1,
      selectedUnit: option.value
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-white/90 backdrop-blur-[1px]" />
        <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4">Pure & Fresh (Base: {product.unit})</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-secondary font-bold border-2 border-secondary px-4 py-1.5 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all shadow-sm active:scale-95"
          >
            <FontAwesomeIcon icon={faShoppingCart} size="sm" />
            <span>{totalQuantity > 0 ? `ADD (${totalQuantity})` : "ADD"}</span>
          </button>
        </div>
      </div>

      {/* Quantity Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative p-6 border-b border-gray-100">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-xl" />
              </button>
              <h4 className="text-xl font-black text-gray-800 uppercase tracking-tight">Select Quantity</h4>
              <p className="text-sm text-gray-500">{product.name}</p>
            </div>
            
            <div className="p-6 space-y-4">
              {options.map((option) => {
                const cartItem = cart.find(i => i.id === product.id && i.selectedUnit === option.value);
                const quantity = cartItem?.quantity || 0;
                
                // Calculate display price for this option
                let baseMultiplier = 1;
                if (product.unit.includes("500 g")) baseMultiplier = 0.5;
                if (product.unit.includes("250 g")) baseMultiplier = 0.25;
                if (product.unit.includes("200 g")) baseMultiplier = 0.2;
                if (product.unit.includes("100 g")) baseMultiplier = 0.1;
                const pricePerUnit = product.price / baseMultiplier;
                const optionPrice = Math.round(pricePerUnit * option.multiplier);

                return (
                  <div key={option.value} className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-primary transition-colors bg-gray-50/50">
                    <div>
                      <span className="block font-bold text-gray-800">{option.label}</span>
                      <span className="text-sm text-primary font-black">₹{optionPrice}</span>
                    </div>
                    
                    {quantity > 0 ? (
                      <div className="flex items-center gap-3 bg-primary text-primary-foreground rounded-xl px-3 py-2 shadow-lg scale-100 hover:scale-105 transition-transform">
                        <button 
                          onClick={() => updateQuantity(product.id, quantity - 1, option.value)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-full"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="font-black min-w-[20px] text-center text-lg">{quantity}</span>
                        <button 
                          onClick={() => handleAddToCart(option)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-full"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(option)}
                        className="bg-white text-secondary font-black border-2 border-secondary px-6 py-2 rounded-xl hover:bg-secondary hover:text-secondary-foreground transition-all shadow-md active:scale-95"
                      >
                        ADD
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-gray-50 text-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-black text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:bg-primary hover:text-black transition-all"
              >
                Close Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
