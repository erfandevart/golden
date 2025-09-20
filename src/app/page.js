"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Page() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [karatFilter, setKaratFilter] = useState("all");
  const [currency, setCurrency] = useState("IRR");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const historyRef = useRef({});
  const POLL = 30000;

  const PRODUCT_MAP = [
    { id: "gold_18", label: "طلای ۱۸ عیار", kind: "abshode", karat: 18 },
    { id: "gold_24", label: "طلای ۲۴ عیار", kind: "abshode", karat: 24 },
    { id: "sekke_emami", label: "سکه امامی (طرح جدید)", kind: "sekke", karat: 24 },
    { id: "sekke", label: "سکه بهار آزادی (طرح قدیم)", kind: "sekke", karat: 24 },
    { id: "usd", label: "دلار آمریکا", kind: "currency", karat: null },
    { id: "derham", label: "درهم امارات", kind: "currency", karat: null },
    { id: "euro", label: "یورو", kind: "currency", karat: null },
    { id: "ounce_gold", label: "انس طلا", kind: "gold", karat: null },
    { id: "ounce_silver", label: "انس نقره", kind: "silver", karat: null },
    { id: "pelatin", label: "پلاتین", kind: "metal", karat: null },
    { id: "YekGram18", label: "یک گرم طلای ۱۸ عیار", kind: "gold", karat: 18 },
    { id: "YekMesghal18", label: "یک مثقال طلای ۱۸ عیار", kind: "gold", karat: 18 },
    { id: "YekMesghal17", label: "یک مثقال طلای 17 عیار", kind: "gold", karat: 17 },
    { id: "SekehRob", label: "سکه ربع", kind: "sekke", karat: 24 },
    { id: "SekehNim", label: "نیم سکه", kind: "sekke", karat: 24 },
    { id: "SekehTamam", label: "سکه تمام طرح جدید", kind: "sekke", karat: 24 },
    { id: "SekehGerami", label: "سکه گرمی", kind: "sekke", karat: 24 },
    { id: "YekGram20", label: "یک گرم طلای ۲۰ عیار", kind: "gold", karat: 20 },
    { id: "YekGram21", label: "یک گرم طلای ۲۱ عیار", kind: "gold", karat: 21 },
  ];

  const visibleList = PRODUCT_MAP.filter((p) => {
    if (typeFilter !== "all" && p.kind !== typeFilter) return false;
    if (karatFilter !== "all" && String(p.karat) !== String(karatFilter)) return false;
    if (query && !p.label.includes(query)) return false;
    return true;
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://webservice.tgnsrv.ir/Pr/Get/aboutalebijewelry6468/a09134386468a');
        setRates(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchRates();
    const id = setInterval(fetchRates, POLL);
    return () => clearInterval(id);
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  const newItems = PRODUCT_MAP.map((p) => {
    let price = null;
    if (p.id === "gold_18") price = rates?.YekGram18;
    if (p.id === "gold_24") price = rates?.YekGram24;
    if (p.id === "sekke") price = rates?.Sekeh;
    if (p.id === "sekke_emami") price = rates?.SekehEmam;
    if (p.id === "usd") price = rates?.Dollar;
    if (p.id === "derham") price = rates?.Derham;
    if (p.id === "euro") price = rates?.Euro;
    if (p.id === "ounce_gold") price = rates?.OunceTala;
    if (p.id === "ounce_silver") price = rates?.OunceNoghreh;
    if (p.id === "pelatin") price = rates?.Pelatin;
    if (p.id === "SekehRob") price = rates?.SekehRob;
    if (p.id === "SekehNim") price = rates?.SekehNim;
    if (p.id === "SekehTamam") price = rates?.SekehTamam;
    if (p.id === "SekehGerami") price = rates?.SekehGerami;
    if (p.id === "YekGram20") price = rates?.YekGram20;
    if (p.id === "YekGram21") price = rates?.YekGram21;

    if (price !== null) price = price * 10; // تبدیل تومان به ریال
    return price !== null ? { id: p.id, label: p.label, price } : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0b1120] text-blue-100 md:hidden font-sans p-4 space-y-3">
      {/* فیلتر و جستجو */}
      <div className="flex gap-1 mb-3 text-sm w-full">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو..."
          className="flex-1 p-1.5 rounded-lg border border-blue-950 bg-[#1e293b] text-blue-100 placeholder-blue-100 focus:ring-1 focus:ring-blue-400 focus:outline-none"
        />
        <select
          value={karatFilter}
          onChange={(e) => setKaratFilter(e.target.value)}
          className="p-1.5 w-full rounded-lg border border-blue-950 bg-[#1e293b] text-blue-100"
        >
          <option value="all">همه عیارها</option>
          <option value="17.5">17.5</option>
          <option value="18">18</option>
          <option value="24">24</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-1.5 w-full rounded-lg border border-blue-950 bg-[#1e293b] text-blue-100"
        >
          <option value="all">همه</option>
          <option value="abshode">آب شده</option>
          <option value="sekke">سکه</option>
          <option value="currency">دلار و ارزها</option>
        </select>
      </div>

      {/* کارت‌ها */}
      <div className="space-y-2">
        {newItems.map((p) => {
          const data = historyRef.current[p.id] ?? [];
          const price = p.price ?? "—";

          return (
            <div
              key={p.id}
              className="bg-[#1e293b] p-3 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => setSelectedItem(p.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-blue-100">{p.label}</div>
                  <div className="text-xs text-blue-400">
                    آخرین بروزرسانی: {data.length ? data[data.length - 1].t : "—"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">
                    {price === null ? "—" : new Intl.NumberFormat("fa-IR").format(price)}
                  </div>
                  <div className="text-xs text-blue-400">{currency}</div>
                </div>
              </div>
            </div>
          );
        })}

        {newItems.length === 0 && (
          <div className="text-center text-blue-400 py-6">
            موردی مطابق فیلتر شما پیدا نشد.
          </div>
        )}
      </div>

      {/* مودال جزئیات */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#1e293b] rounded-3xl p-5 max-w-xs w-full flex flex-col items-center text-blue-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              {PRODUCT_MAP.find((p) => p.id === selectedItem)?.label}
            </h2>

            <div className="text-center text-white text-lg mb-2">
              قیمت:{" "}
              {newItems.find((it) => it.id === selectedItem)?.price
                ? new Intl.NumberFormat("fa-IR").format(newItems.find((it) => it.id === selectedItem)?.price)
                : "—"}{" "}
              {currency}
            </div>
            <div className="text-blue-400 text-sm">
              آخرین بروزرسانی:{" "}
              {(historyRef.current[selectedItem]?.slice(-1)[0]?.t) ?? "—"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}