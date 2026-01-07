"use client";

export default function LiquidGlass() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
      {/* Liquid Glass Container */}
      <div className="relative w-96 h-96 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg overflow-hidden">
        {/* Animated Liquid Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 opacity-30 animate-floatBG rounded-3xl"></div>

        {/* Glass Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Liquid Glass</h1>
        </div>
      </div>
    </div>
  );
}
