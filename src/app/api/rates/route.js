import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://webservice.tgnsrv.ir/Pr/Get/aboutalebijewelry6468/a09134386468a"
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
