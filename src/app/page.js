"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Page() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [karatFilter, setKaratFilter] = useState("all");
  const [currency, setCurrency] = useState("IRR");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
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
    if (karatFilter !== "all" && String(p.karat) !== String(karatFilter)) return false;
    if (query && !p.label.includes(query)) return false;
    return true;
  });

  async function fetchPrices() {
    try {
      const res = await fetch("/api/prices");
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
        if (historyRef.current[it.id].length > 50) historyRef.current[it.id].shift();
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
    <div className="min-h-screen bg-[#0b1120] text-blue-100 md:hidden font-sans p-4 space-y-3">
      {/* فیلتر و جستجو جمع‌وجور */}
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
          <option value="18">18 عیار</option>
          <option value="24">24 عیار</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-1.5 w-full rounded-lg border border-blue-950 bg-[#1e293b] text-blue-100"
        >
          <option value="all">همه</option>
          <option value="abshode">آب شده</option>
          <option value="sekke">سکه</option>
          <option value="currency">دلار</option>
        </select>
      </div>

      {/* کارت‌ها */}
      <div className="space-y-2">
        {visibleList.map((p) => {
          const data = historyRef.current[p.id] ?? [];
          const price = items.find((it) => it.id === p.id)?.price ?? "—";

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

              <div className="h-28 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <XAxis dataKey="t" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293bcc",
                        border: "1px solid #3b82f6",
                        color: "#e0f2fe",
                      }}
                      labelStyle={{ color: "#e0f2fe" }}
                    />
                    <Line type="monotone" dataKey="v" stroke="#3b82f6" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}

        {visibleList.length === 0 && (
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

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={(historyRef.current[selectedItem] ?? [])
                    .slice()
                    .sort((a, b) => new Date(a.t) - new Date(b.t))}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="t"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={40} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293bcc",
                      border: "1px solid #3b82f6",
                      borderRadius: "8px",
                      padding: "6px",
                      color: "#e0f2fe",
                    }}
                    labelStyle={{ color: "#e0f2fe", fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
