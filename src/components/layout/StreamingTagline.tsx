"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function StreamingTagline() {
  const pathname = usePathname();

  return (
    <Link 
      href="/register" 
      className="block bg-red-600 hover:bg-red-700 text-white py-2 overflow-hidden whitespace-nowrap border-b border-red-700 transition-colors"
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
    </Link>
  );
}
