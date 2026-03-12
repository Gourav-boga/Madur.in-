"use client";

import { usePathname } from "next/navigation";

export default function StreamingTagline() {
  const pathname = usePathname();

  // Show on all pages

  return (
    <div className="bg-secondary text-secondary-foreground py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
      <div className="flex items-center">
        <div className="animate-marquee inline-block">
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Register Now and Get Fresh Milk Delivered to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Register Now and Get Fresh Milk Delivered to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Register Now and Get Fresh Milk Delivered to Your Doorstep Every Day! 🥛
          </span>
          <span className="px-4 text-sm font-bold uppercase tracking-wider">
            Register Now and Get Fresh Milk Delivered to Your Doorstep Every Day! 🥛
          </span>
        </div>
      </div>
    </div>
  );
}
