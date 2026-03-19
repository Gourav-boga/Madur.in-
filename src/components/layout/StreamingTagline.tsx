"use client";

import { useSubscription } from "@/context/SubscriptionContext";

export default function StreamingTagline() {
  const { openSubscriptionModal } = useSubscription();

  return (
    <div 
      onClick={openSubscriptionModal}
      className="cursor-pointer block bg-red-600 hover:bg-red-700 text-white py-2 overflow-hidden whitespace-nowrap border-b border-red-700 transition-colors"
    >
      <div className="flex items-center">
        <div className="animate-marquee inline-block">
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
        </div>
      </div>
    </div>
  );
}
