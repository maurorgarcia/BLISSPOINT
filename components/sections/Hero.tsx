"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/Button";

export function Hero({
  onOpenPedidosYa,
  onGoMenu,
}: {
  onOpenPedidosYa: () => void;
  onGoMenu: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    el.playsInline = true;
    el.loop = true;
    el.setAttribute("muted", "");
    const go = () => {
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
    };
    go();
    el.addEventListener("canplay", go, { once: true });
    document.addEventListener("click", go, { once: true });
    return () => {
      el.removeEventListener("canplay", go);
      document.removeEventListener("click", go);
    };
  }, []);

  return (
    <header
      data-screen-label="Hero"
      style={{
        position: "relative",
        height: "100dvh",
        maxHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(12px,2.2vh,24px)",
        padding: "clamp(16px,4vh,48px) var(--space-4)",
        textAlign: "center",
        isolation: "isolate",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src="/assets/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(120% 80% at 50% 40%,rgba(31,10,12,0.55),rgba(31,10,12,0.92) 75%),linear-gradient(180deg,rgba(139,26,38,0.35),rgba(31,10,12,0.9))",
        }}
      />
      <img
        src="/assets/brand/logo.png"
        alt="Pancho Doto"
        style={{
          width: "min(320px,58vw,32vh)",
          height: "auto",
          flexShrink: 1,
          minHeight: 0,
          objectFit: "contain",
          filter: "drop-shadow(0 24px 40px rgba(15,5,6,0.7))",
          animation: "pdBob 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-playful)",
          fontSize: "var(--text-xl)",
          color: "var(--color-offwhite-50)",
          maxWidth: "34ch",
          lineHeight: "var(--leading-snug)",
        }}
      >
        Panchos gourmet desde 1999. Armalo como se te cante.
      </div>
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="pedidosya" size="lg" onClick={onOpenPedidosYa}>
          Pedir por PedidosYa
        </Button>
        <Button variant="solidDark" size="lg" onClick={onGoMenu}>
          Ver el menú
        </Button>
      </div>
      <div
        onClick={onGoMenu}
        style={{
          marginTop: "clamp(16px,4vh,40px)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          color: "var(--color-offwhite-200)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        <span>Bajá</span>
        <span style={{ fontSize: 28, lineHeight: 1, animation: "pdBob 1.8s ease-in-out infinite" }}>
          ↓
        </span>
      </div>
    </header>
  );
}
