// import { NextResponse } from "next/server";

// export async function GET() {
//   console.log("🔔 /api/prices request received");

//   const isProduction =
//     process.env.NODE_ENV === "production" &&
//     process.env.VERCEL_URL?.includes("aboutalebijewelry.ir");

//   if (!isProduction) {
//     // لوکال: داده فیک
//     console.log("🟡 Mock mode: returning fake data for local development");
//     return NextResponse.json({
//       gold_18: { p: 15000000 },
//       gold_24: { p: 20000000 },
//       sekke: { p: 120000000 },
//       sekke_emami: { p: 125000000 },
//       price_dollar_rl: { p: 102000 },
//     });
//   }

//   try {
//     const res = await fetch(
//       "https://webservice.tgnsrv.ir/Pr/Get/aboutalebijewelry6468/a09134386468a",
//       {
//         cache: "no-store",
//         headers: {
//           Origin: "https://www.aboutalebijewelry.ir",
//           Referer: "https://www.aboutalebijewelry.ir/",
//         },
//       }
//     );

//     if (!res.ok) {
//       console.error("❌ API error:", res.status);
//       return NextResponse.json(
//         { error: "Cannot fetch prices" },
//         { status: res.status }
//       );
//     }

//     const json = await res.json();
//     console.log("📥 Raw API data:", json);

//     return NextResponse.json(json);
//   } catch (err) {
//     console.error("💥 Price fetching error:", err);
//     return NextResponse.json({ error: "Cannot fetch prices" }, { status: 500 });
//   }
// }

// src/app/api/prices/route.js
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🔔 /api/prices request received");

  // بررسی محیط اجرای درخواست
  const isProduction =
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_URL?.includes("aboutalebijewelry.ir");

  if (!isProduction) {
    console.log("🟡 Local development - API call blocked");
    return NextResponse.json({ error: "Local development - API call blocked" });
  }

  try {
    // ⚡ درخواست مستقیم به TGN WebService
    const res = await fetch(
      "https://webservice.tgnsrv.ir/Pr/Get/aboutalebijewelry6468/a09134386468a",
      {
        cache: "no-store",
        headers: {
          Origin: "https://www.aboutalebijewelry.ir",
          Referer: "https://www.aboutalebijewelry.ir/",
        },
      }
    );

    if (!res.ok) {
      console.error("❌ API error:", res.status);
      return NextResponse.json({ error: "Cannot fetch prices" }, { status: res.status });
    }

    const json = await res.json();
    console.log("📥 Raw API data:", json); // لاگ کامل دیتای دریافتی

    // پاسخ به کلاینت
    return NextResponse.json(json);
  } catch (err) {
    console.error("💥 Price fetching error:", err);
    return NextResponse.json({ error: "Cannot fetch prices" }, { status: 500 });
  }
}
