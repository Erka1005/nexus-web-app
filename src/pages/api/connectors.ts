import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const upstream = await fetch("https://api.senergy.mn/connector/", {
      headers: { Accept: "application/json" },
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
        // Cache хүсвэл:
        // "Cache-Control": "public, max-age=30",
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Upstream error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
