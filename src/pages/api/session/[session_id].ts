import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  try {
    const sessionId = params.session_id;
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing session_id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const upstream = await fetch(
      `https://api.senergy.mn/session/${encodeURIComponent(sessionId)}`,
      { headers: { Accept: "application/json" } }
    );

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Upstream error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
