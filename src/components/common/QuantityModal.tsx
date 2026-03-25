"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes, faCheckCircle, faBox } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  category: string;
}

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, selectedUnit: string) => void;
  product: Product;
}

export default function QuantityModal({ isOpen, onClose, onConfirm, product }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);
  const currentUnit = product.unit || "unit";
  const [selectedUnit, setSelectedUnit] = useState(currentUnit);

  // Derive some common units based on category or default unit
  const units = [currentUnit];
  if (currentUnit.includes("kg") && !units.includes("500 g")) units.unshift("500 g");
  if (currentUnit.includes("L") && !units.includes("500 ml")) units.unshift("500 ml");
  
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = () => {
    onConfirm(quantity, selectedUnit);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all z-10"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* Product Info Section */}
              <div className="p-6 pb-2 md:p-8 md:pb-4">
                <div className="flex gap-4 md:gap-6 items-center mb-4 md:mb-6">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden bg-accent/20 border border-gray-100">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                        <FontAwesomeIcon icon={faBox} />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-secondary bg-secondary/10 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-black text-gray-800 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-black text-gray-900 mt-1">₹{product.price}</p>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />
              </div>

              {/* Selection Content */}
              <div className="p-8 pt-0 space-y-8">
                {/* Unit Selection */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                    Choose Unit
                  </label>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {units.map((u) => (
                      <button
                        key={u}
                        onClick={() => setSelectedUnit(u)}
                        className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold transition-all border-2 ${
                          selectedUnit === u
                            ? "bg-primary border-primary text-black shadow-lg shadow-primary/20"
                            : "bg-gray-50 border-gray-100 text-gray-500 hover:border-primary/30 hover:bg-primary/5"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block text-center">
                    Select Quantity
                  </label>
                  <div className="flex items-center justify-center gap-8">
                    <button
                      onClick={handleDecrement}
                      className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-800 flex items-center justify-center text-xl hover:bg-gray-200 transition-all active:scale-90"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="text-4xl font-black text-gray-900 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-xl hover:bg-gray-800 transition-all active:scale-90"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                {/* Delivery Tagline */}
                <div className="flex items-center gap-2 mb-4 justify-center bg-gray-50 py-3 rounded-xl border border-dashed border-gray-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                  <p className="text-[9px] font-black text-secondary uppercase tracking-[0.15em]">
                    Guaranteed 24 Hours Delivery
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleConfirm}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-black py-4 md:py-4.5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 text-[10px] md:text-xs uppercase tracking-widest mt-2 md:mt-4"
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Confirm Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
