import React from "react";

function Header() {
  return (
    <header className="p-4 bg-white/80 backdrop-blur-sm shadow sticky top-0 z-20 sm:hidden">
      <h1 className="text-lg font-semibold">قیمت‌های لحظه‌ای طلا و ارز</h1>
      <p className="text-sm text-slate-500">آپدیت هر ۳۰ ثانیه</p>
    </header>
  );
}

export default Header;
