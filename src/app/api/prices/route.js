// src/app/api/prices/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch('https://www.tgju.org/%D9%82%DB%8C%D9%85%D8%AA-%D8%B7%D9%84%D8%A7');
    const html = await res.text();

    const gold18Match = html.match(/طلای 18 عیار[^\d]*(\d[\d,]*)/);
    const gold24Match = html.match(/طلای 24 عیار[^\d]*(\d[\d,]*)/);
    const sekkeMatch = html.match(/سکه تمام[^\d]*(\d[\d,]*)/);
    const sekkeEmamiMatch = html.match(/سکه امامی[^\d]*(\d[\d,]*)/);
    const usdMatch = html.match(/دلار[^\d]*(\d[\d,]*)/);

    const formatPrice = (str) => str ? Number(str.replace(/,/g, '')) : null;

    const data = {
      gold_18: { p: formatPrice(gold18Match?.[1]) },
      gold_24: { p: formatPrice(gold24Match?.[1]) },
      sekke: { p: formatPrice(sekkeMatch?.[1]) },
      sekke_emami: { p: formatPrice(sekkeEmamiMatch?.[1]) },
      price_dollar_rl: { p: formatPrice(usdMatch?.[1]) }
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error('TGJU scraping error', err);
    return NextResponse.json({ error: 'Cannot fetch prices' }, { status: 500 });
  }
}
