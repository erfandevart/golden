import React from "react";
import Image from "next/image";

function Header() {
  return (
    <header className="px-4 py-1 bg-[#1e293b] backdrop-blur-sm shadow sticky top-0 z-20 sm:hidden flex items-center justify-between gap-3">
      {/* متن هدر */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-blue-100">
          قیمت‌های لحظه‌ای طلا و ارز
        </h1>
        <p className="text-sm text-blue-400">آپدیت هر ۳۰ ثانیه</p>
      </div>

      {/* لوگو */}
      <Image
        src="/images/logo.webp" // مسیر درست
        alt="لوگو"
        width={100} // اندازه دلخواه
        height={100}
        className="rounded-full"
        loading="lazy"
      />
    </header>
  );
}

export default Header;
