"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCT_MAP } from "./constants/products";
import { getProductPrice } from "./utils/priceMapper";
import { formatPrice, getPriceUnit } from "./utils/formatters";
import {
  GoldIcon,
  CoinIcon,
  CurrencyIcon,
  EuroIcon,
  DerhamIcon,
  EmptyIcon,
} from "./components/icons/Icons";
import { getProductIconType } from "./utils/iconHelper";
import { SkeletonGrid } from "./components/ui/Skeleton";

const POLL_INTERVAL = 30000;

export default function Page() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("/api/rates");
        setRates(response.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError("خطا در دریافت اطلاعات");
        setLoading(false);
      }
    };

    fetchRates();
    const intervalId = setInterval(fetchRates, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-yellow-500 p-4 space-y-3 overflow-x-clip">
        <SkeletonGrid />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-xl text-red-500">{error}</div>
      </div>
    );
  }

  const newItems = PRODUCT_MAP.map((p) => {
    const price = getProductPrice(p.id, rates);
    return price !== null ? { id: p.id, label: p.label, price } : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen text-yellow-500 p-4 space-y-3 overflow-x-clip">

      <div className="space-y-2">
        {newItems.map((p) => {
          return (
            <div
              key={p.id}
              onClick={() => setSelectedItem(p.id)}
              className="relative p-[1px] rounded-xl cursor-pointer
                   bg-gradient-to-br from-white/20 to-transparent
                   hover:scale-[1.01] transition-transform"
            >
              <div
                className="bg-white/10 backdrop-blur-sm
                     p-3 rounded-xl shadow-lg
                     border border-white/20"
              >
                <div className="flex justify-between items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex-shrink-0 flex items-center justify-center">
                      {p.id === "euro" ? (
                        <EuroIcon className="w-6 h-6 text-yellow-400" />
                      ) : p.id === "derham" ? (
                        <DerhamIcon className="w-6 h-6 text-yellow-400" />
                      ) : p.id === "usd" ? (
                        <CurrencyIcon className="w-6 h-6 text-yellow-400" />
                      ) : getProductIconType(p.id) === "coin" ? (
                        <CoinIcon className="w-6 h-6 text-yellow-400" />
                      ) : (
                        <GoldIcon className="w-6 h-6 text-yellow-400" />
                      )}
                    </div>
                    <div className="font-YekanBakhExtraBold text-white">
                      {p.label}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">
                      {formatPrice(p.price, p.id)}
                    </div>

                    <div className="text-sm font-YekanBakhSemiBold text-yellow-500 flex justify-end items-center">
                      {getPriceUnit(p.id)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {newItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <EmptyIcon className="w-24 h-24 text-yellow-400/70" />
            <p className="text-yellow-400/80 font-YekanBakhSemiBold text-base">
              موردی یافت نشد
            </p>
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 p-4 flex items-center justify-center
               bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative p-[1px] rounded-3xl
                 bg-gradient-to-br from-white/40 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-3xl p-5 max-w-xs w-full
                   bg-white/10 backdrop-blur-lg
                   shadow-xl border border-white/20
                   flex flex-col items-center text-yellow-500"
            >
              <div className="mb-4">
                <h2 className="text-xl font-YekanBakhExtraBold text-center">
                  {PRODUCT_MAP.find((p) => p.id === selectedItem)?.label}
                </h2>
              </div>

              <div className="text-center text-white text-lg">
                قیمت:{" "}
                {formatPrice(
                  newItems.find((it) => it.id === selectedItem)?.price ?? null,
                  selectedItem
                )}{" "}
                {getPriceUnit(selectedItem)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
