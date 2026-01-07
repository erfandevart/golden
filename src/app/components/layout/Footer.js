"use client";

import React from "react";

function Footer() {
  return (
    <footer className="relative mt-auto w-full">
      {/* Glassmorphism Footer */}
      <a
        href="https://instagram.com/erfandevart"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative px-4 py-3 
          bg-gradient-to-b from-black/20 via-black/30 to-black/40 
          backdrop-blur-lg 
          border-t border-black/40 
          shadow-[inset_0_2px_10px_rgba(0,0,0,0.3),inset_0_-1px_5px_rgba(234,179,8,0.1),0_-8px_30px_rgba(0,0,0,0.4)]
          hover:shadow-[inset_0_2px_10px_rgba(0,0,0,0.35),inset_0_-1px_5px_rgba(234,179,8,0.15),0_-8px_35px_rgba(0,0,0,0.5)]
          transition-all duration-300 
          cursor-pointer
          overflow-hidden"
      >
        {/* Top shadow for depth effect */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/50 to-transparent"></div>
        
        {/* Inner glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        
        {/* Subtle inner highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-500/5 pointer-events-none"></div>
        
        <div className="flex flex-col items-center justify-center">
          {/* Main text */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-YekanBakhSemiBold text-white/70">
              توسعه داده شده توسط
            </span>
            <span className="text-xs font-YekanBakhExtraBold text-white">
              erfandevart
            </span>
          </div>
        </div>
      </a>
    </footer>
  );
}

export default Footer;
