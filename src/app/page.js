"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Page() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [karatFilter, setKaratFilter] = useState("all");
  const [currency, setCurrency] = useState("IRR");
  const [items, setItems] = useState([]);
  const historyRef = useRef({});
  const POLL = 30000;

  const PRODUCT_MAP = [
    { id: "gold_18", label: "طلای 18 عیار", kind: "abshode", karat: 18 },
    { id: "gold_24", label: "طلای 24 عیار", kind: "abshode", karat: 24 },
    { id: "sekke", label: "سکه تمام بهار", kind: "sekke", karat: 24 },
    { id: "sekke_emami", label: "سکه امامی", kind: "sekke", karat: 24 },
    { id: "usd", label: "دلار", kind: "currency", karat: null },
  ];

  const visibleList = PRODUCT_MAP.filter((p) => {
    if (typeFilter !== "all" && p.kind !== typeFilter) return false;
    if (karatFilter !== "all" && String(p.karat) !== String(karatFilter))
      return false;
    if (query && !p.label.includes(query)) return false;
    return true;
  });

  async function fetchPrices() {
    try {
      const res = await fetch("/api/prices"); // حالا از API داخلی می‌گیریم
      const json = await res.json();

      const newItems = PRODUCT_MAP.map((p) => {
        let price = null;
        if (p.id === "gold_18") price = json?.gold_18?.p;
        if (p.id === "gold_24") price = json?.gold_24?.p;
        if (p.id === "sekke") price = json?.sekke?.p;
        if (p.id === "sekke_emami") price = json?.sekke_emami?.p;
        if (p.id === "usd") price = json?.price_dollar_rl?.p;
        return { id: p.id, label: p.label, price };
      });

      setItems(newItems);
      newItems.forEach((it) => {
        if (!historyRef.current[it.id]) historyRef.current[it.id] = [];
        historyRef.current[it.id].push({
          t: new Date().toLocaleTimeString(),
          v: it.price ?? 0,
        });
        if (historyRef.current[it.id].length > 20)
          historyRef.current[it.id].shift();
      });
    } catch (err) {
      console.error("Local API fetch error", err);
    }
  }

  useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, POLL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 md:hidden">
      <header className="p-4 bg-white shadow-sm sticky top-0 z-20">
        <h1 className="text-lg font-semibold">قیمت‌های لحظه‌ای طلا و ارز</h1>
        <p className="text-sm text-slate-500">آپدیت هر ۳۰ ثانیه</p>
      </header>

      <main className="p-4 space-y-4">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو..."
            className="flex-1 p-2 rounded-lg border"
          />
          <select
            value={karatFilter}
            onChange={(e) => setKaratFilter(e.target.value)}
            className="p-2 rounded-lg border"
          >
            <option value="all">همه عیارها</option>
            <option value="18">18 عیار</option>
            <option value="24">24 عیار</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded-lg border"
          >
            <option value="all">همه</option>
            <option value="abshode">آب شده</option>
            <option value="sekke">سکه</option>
            <option value="currency">دلار</option>
          </select>
        </div>

        <div className="space-y-3">
          {visibleList.map((p) => {
            const data = historyRef.current[p.id] ?? [];
            const price = items.find((it) => it.id === p.id)?.price ?? "—";
            return (
              <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{p.label}</div>
                    <div className="text-xs text-slate-500">
                      آخرین بروزرسانی:{" "}
                      {data.length ? data[data.length - 1].t : "—"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {price === null
                        ? "—"
                        : new Intl.NumberFormat("fa-IR").format(price)}
                    </div>
                    <div className="text-xs text-slate-400">{currency}</div>
                  </div>
                </div>

                <div className="h-36 mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <XAxis dataKey="t" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke="#8884d8"
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}

          {visibleList.length === 0 && (
            <div className="text-center text-slate-500 py-8">
              موردی مطابق فیلتر شما پیدا نشد.
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 text-center text-xs text-slate-500">
        erfandevart توسعه داده شده توسط 
      </footer>
    </div>
  );
}
