import React from "react";
import Image from "next/image";
import { useSubscription } from "@/context/SubscriptionContext";

export default function HomeBanners() {
  const { openSubscriptionModal } = useSubscription();

  return (
    <section className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Card: Customer Reviews */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-xl border-2 border-primary bg-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 z-10">
            <h3 className="text-2xl font-black text-[#5d4037] mb-6">Customer Reviews</h3>
            <div className="relative">
               <span className="absolute -top-4 -left-2 text-4xl text-[#d7ccc8] opacity-50">“</span>
               <p className="text-[#6d4c41] italic font-medium leading-relaxed mb-4 pl-4">
                Farm Fresh & So Tasty. Local Trust at our doorstep. Reliable, convenient service & delivery.
              </p>
              <p className="font-bold text-[#8d6e63] ml-4">— Anjali Sharma</p>
            </div>
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <Image 
              src="/home/testimonial-anjali.png"
              alt="Anjali Sharma"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Card: Join Our Subscription Plans */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-xl border-2 border-secondary bg-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 z-10">
            <h3 className="text-3xl font-black text-[#33691e] mb-2">Join Our Subscription Plans</h3>
            <p className="text-[#558b2f] font-bold text-lg mb-1">Daily Milk Delivery to Your Home</p>
            <p className="text-[#33691e] font-black text-xl mb-6 tracking-wide underline decoration-wavy underline-offset-4">Choose Your Plan</p>
            <button 
              onClick={openSubscriptionModal}
              className="bg-[#689f38] text-white font-black px-8 py-4 rounded-xl shadow-lg hover:bg-[#558b2f] transition-all inline-block active:scale-95"
            >
              Subscribe Now
            </button>
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 relative flex-shrink-0">
             <Image 
              src="/home/subscription-milk-eggs.png"
              alt="Subscription Plans"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
