"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { ChartIcon } from "../icons/Icons";

dayjs.extend(jalaliday);

function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs().calendar("jalali").locale("fa");
      setTime(now.format("HH:mm - YYYY/MM/DD"));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassmorphism Header */}
      <div className="relative px-4 py-3 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          {/* Right side - Title and Time */}
          <div className="flex items-center gap-3 flex-1">
            <ChartIcon className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div className="flex flex-col">
              <h1 className="text-lg font-YekanBakhExtraBold text-white leading-tight">
                قیمت‌ لحظه‌ای طلا و ارز
              </h1>
              {time && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-yellow-400/80 font-YekanBakhSemiBold">
                    {time}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Left side - Logo */}
          <div className="relative -mt-2">
            <Image
              src="/images/logo.png"
              alt="لوگو"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      </div>
    </header>
  );
}

export default Header;
