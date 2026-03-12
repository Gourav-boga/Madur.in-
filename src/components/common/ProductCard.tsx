"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-[#f2faf2] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Mask to hide potential watermarks at the bottom of images */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-white/90 backdrop-blur-[1px]" />
        <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4">Pure & Fresh</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-primary text-primary-foreground rounded-lg px-2 py-1 shadow-md">
              <button 
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded"
              >
                <FontAwesomeIcon icon={faMinus} size="xs" />
              </button>
              <span className="font-bold min-w-[20px] text-center">{quantity}</span>
              <button 
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded"
              >
                <FontAwesomeIcon icon={faPlus} size="xs" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="flex items-center gap-2 bg-white text-secondary font-bold border-2 border-secondary px-4 py-1.5 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all shadow-sm active:scale-95"
            >
              <FontAwesomeIcon icon={faShoppingCart} size="sm" />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
