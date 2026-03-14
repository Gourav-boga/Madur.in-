"use client";

import { usePathname } from "next/navigation";

export default function StreamingTagline() {
  const pathname = usePathname();

  // Show on all pages

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden whitespace-nowrap border-b border-red-700">
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
