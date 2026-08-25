"use client";

import { Particles } from "../ui/Particles";
import { LOCATIONS } from "../../data/menu";

export function Nosotros() {
  const loc = LOCATIONS[0];

  return (
    <section
      id="sec-nosotros"
      data-screen-label="Nosotros"
      style={{
        padding: "var(--space-20) var(--space-4)",
        background: "linear-gradient(160deg,var(--color-green-olive),var(--color-green-olive-dark) 60%,var(--color-black))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Particles density={18} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(55% 45% at 50% 50%,rgba(13,13,13,0.0) 0%,rgba(13,13,13,0.25) 100%)",
          pointerEvents: "none",
        }}
      />
      <div className="pd-nosotros-grid" style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="/assets/brand/logo.png"
            alt="Bliss Point"
            style={{
              height: "min(280px,36vw)",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              animation: "pdBob 5s ease-in-out infinite",
              filter: "drop-shadow(0 40px 36px rgba(13,13,13,0.8))",
            }}
          />
        </div>
        <div
          className="pd-nosotros-copy"
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", textAlign: "center", alignItems: "center" }}
        >
          <div style={{ fontFamily: "var(--font-playful)", fontSize: "var(--text-lg)", color: "var(--color-accent-primary)", letterSpacing: "0.04em" }}>
            Hola, somos Bliss Point
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-section-headline)",
              color: "#fff",
              lineHeight: 1,
              textWrap: "balance",
            }}
          >
            EL PUNTO JUSTO
            <br />
            PARA DISFRUTAR ALGO RICO
          </div>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.82)",
              fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "42ch",
              textWrap: "pretty",
            }}
          >
            Gastronomía de comida rápida en San Nicolás de los Arroyos. Panchos, hamburguesas, papas fritas, acompañamientos, bebidas y combos para disfrutar en el local o para llevar.
          </p>
          <a
            href="https://www.instagram.com/blisspoint.sn/"
            target="_blank"
            rel="noopener"
            className="pd-ig-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(45deg,#BFD962,#778C4A 55%,#5A6B35 100%)",
              color: "#fff",
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: "var(--text-base)",
              padding: "12px 24px",
              borderRadius: "var(--radius-full)",
              boxShadow: "0 12px 24px rgba(13,13,13,0.5)",
              transition: "transform .15s ease",
            }}
          >
            <i className="ph-fill ph-instagram-logo" style={{ fontSize: 20 }} />
            @blisspoint.sn
          </a>
        </div>
        <div
          className="pd-location-card"
          style={{
            width: "100%",
            maxWidth: 380,
            background: "var(--color-bg-panel)",
            color: "var(--color-text-on-panel)",
            borderRadius: "var(--radius-card)",
            padding: "var(--space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            boxShadow: "0 18px 32px rgba(15,5,6,0.5)",
            transition: "transform .25s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <iframe
            src={loc.embed}
            title={`Mapa ${loc.address}`}
            loading="lazy"
            className="pd-nosotros-map"
            style={{
              width: "100%",
              border: 0,
              borderRadius: "var(--radius-sm)",
              filter: "saturate(0.9)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", lineHeight: 1.1 }}>
            <i className="ph-fill ph-map-pin" style={{ color: "var(--color-accent-secondary)", fontSize: 18, flexShrink: 0 }} />
            {loc.address}
          </div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-on-panel)", opacity: 0.8 }}>
            {loc.city}
          </div>
          <a
            href={loc.maps}
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "var(--color-accent-primary)",
              color: "var(--color-text-on-accent)",
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              padding: "10px 18px",
              borderRadius: "var(--radius-full)",
            }}
          >
            Cómo llegar
            <i className="ph-fill ph-arrow-right" style={{ fontSize: 16 }} />
          </a>
        </div>
      </div>
    </section>
  );
}
