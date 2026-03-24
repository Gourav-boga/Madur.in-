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
      className={`cursor-pointer block bg-black hover:bg-zinc-900 text-white overflow-hidden whitespace-nowrap border-b border-black transition-colors ${isHome ? "py-1.5" : "py-1"}`}
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
