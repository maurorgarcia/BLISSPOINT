"use client";

import { Button } from "../ui/Button";
import { Particles } from "../ui/Particles";

export function Nosotros({ onGoSucursales }: { onGoSucursales: () => void }) {
  return (
    <section
      id="sec-nosotros"
      data-screen-label="Nosotros"
      style={{
        padding: "var(--space-6) var(--space-4)",
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
              height: "min(320px,36vw)",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              animation: "pdBob 5s ease-in-out infinite",
              filter: "drop-shadow(0 40px 36px rgba(13,13,13,0.8))",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", textAlign: "center", alignItems: "center" }}>
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
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="primary" onClick={onGoSucursales}>
              Dónde encontrarnos
            </Button>
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
        </div>
      </div>
    </section>
  );
}
