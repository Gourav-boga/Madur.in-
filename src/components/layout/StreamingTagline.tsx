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
      className={`cursor-pointer block bg-[#4CBB17] hover:opacity-90 text-white overflow-hidden whitespace-nowrap transition-colors ${isHome ? "py-1" : "py-0.5"}`}
    >
      <div className="flex items-center">
        <div className="animate-marquee inline-block">
          <span className="px-4 text-xs font-black uppercase tracking-widest text-white shadow-sm">
            100 % natural and form fresh | Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-xs font-black uppercase tracking-widest text-white shadow-sm">
            100 % natural and form fresh | Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-xs font-black uppercase tracking-widest text-white shadow-sm">
            100 % natural and form fresh | Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-xs font-black uppercase tracking-widest text-white shadow-sm">
            100 % natural and form fresh | Click Here to Register Now and Get Milk to Your Doorstep Every Day! 🥛
          </span>
        </div>
      </div>
    </div>
  );
}
