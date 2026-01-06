import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params }) => {
  try {
    const sessionId = params.session_id;
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing session_id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const upstream = await fetch(
      `https://api.senergy.mn/commands/stop-session/${encodeURIComponent(sessionId)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Authorization хэрэгтэй бол:
          // Authorization: `Bearer ${import.meta.env.SENERGY_TOKEN}`,
        },
      }
    );

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
