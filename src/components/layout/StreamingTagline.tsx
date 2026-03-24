"use client";

import { useSubscription } from "@/context/SubscriptionContext";
import { usePathname } from "next/navigation";

export default function StreamingTagline() {
  const { openSubscriptionModal } = useSubscription();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div 
      onClick={openSubscriptionModal}
      className={`cursor-pointer block bg-[#90EE90] hover:bg-[#aef4ae] text-black overflow-hidden whitespace-nowrap border-b border-black transition-colors ${isHome ? "py-1" : "py-0.5"}`}
    >
      <div className="flex items-center">
        <div className="animate-marquee inline-block">
          <span className="px-4 text-xs font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-xs font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-xs font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-xs font-bold uppercase tracking-wider">
            Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
        </div>
      </div>
    </div>
  );
}
