import React from "react";
import Image from "next/image";
import { useSubscription } from "@/context/SubscriptionContext";

export default function HomeBanners() {
  const { openSubscriptionModal } = useSubscription();

  return (
    <section className="container py-10">
      <div className="flex justify-center">
        {/* Right Card: Join Our Subscription Plans */}
        <div className="w-full max-w-5xl relative overflow-visible rounded-[2.5rem] shadow-2xl border-4 border-white bg-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 z-10 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-black text-[#33691e] mb-2 leading-tight">Join Our Subscription Plans</h3>
            <p className="text-[#558b2f] font-bold text-lg md:text-xl mb-1">Daily Milk Delivery to Your Home</p>
            <p className="text-secondary font-black text-xl mb-8 tracking-wide underline decoration-wavy underline-offset-4 decoration-secondary/30">Choose Your Plan</p>
            <button 
              onClick={openSubscriptionModal}
              className="bg-secondary text-white font-black px-10 py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all inline-block active:scale-95 text-lg uppercase tracking-widest"
            >
              Subscribe Now
            </button>
          </div>
          <div className="w-56 h-56 md:w-72 md:h-72 relative flex-shrink-0 animate-bounce-slow">
             <Image 
              src="/home/subscription-milk-eggs.png"
              alt="Subscription packages"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
