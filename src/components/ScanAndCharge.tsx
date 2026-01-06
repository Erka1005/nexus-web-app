import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanAndCharge() {
  const [qr, setQr] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const el = document.getElementById("qr-reader");
    if (!el) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        const v = (decodedText ?? "").trim();
        setQr(v);

        // ✅ Scan хиймэгц detail page руу автоматаар оруулна
        if (v) {
          setMsg("Redirecting...");
          window.location.href = `/c/${encodeURIComponent(v)}`;
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div style={{ padding: 6 }}>
      <h1 style={{ fontSize: 22, margin: "0 0 10px" }}>Scan QR</h1>

      <div
        id="qr-reader"
        style={{
          border: "1px solid rgba(148,163,184,.25)",
          borderRadius: 14,
          overflow: "hidden",
          background: "rgba(15,23,42,.4)",
        }}
      />

      <div style={{ marginTop: 10, opacity: 0.85 }}>
        Scanned: <b>{qr || "-"}</b>
      </div>

      {msg ? <div style={{ marginTop: 6, opacity: 0.8 }}>{msg}</div> : null}

      <div style={{ marginTop: 10, fontSize: 13, opacity: 0.75 }}>
        Tip: Phone default camera-аар шууд үсрүүлэх бол QR кодны агуулга URL байх хэрэгтэй:
        <div style={{ marginTop: 6, padding: 10, borderRadius: 12, border: "1px solid rgba(148,163,184,.18)" }}>
          https://yourdomain.com/c/1299489701
        </div>
      </div>
    </div>
  );
}
