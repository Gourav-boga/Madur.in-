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
      className={`cursor-pointer block bg-red-600 hover:bg-red-700 text-white overflow-hidden whitespace-nowrap border-b border-red-700 transition-colors ${isHome ? "py-3" : "py-2"}`}
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
