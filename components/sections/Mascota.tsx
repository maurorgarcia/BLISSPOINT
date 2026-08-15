"use client";

import { Button } from "../ui/Button";

export function Mascota({ onGoSucursales }: { onGoSucursales: () => void }) {
  return (
    <section
      id="sec-mascota"
      data-screen-label="Mascota"
      style={{
        padding: "var(--space-6) var(--space-4)",
        background: "linear-gradient(160deg,var(--color-bordeaux-700),var(--color-bordeaux-800) 60%,var(--color-nearblack-950))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(180px,1fr) minmax(280px,1.4fr) minmax(180px,1fr)",
          alignItems: "center",
          justifyItems: "center",
          gap: "var(--space-6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="/assets/brand/logo.png"
            alt="Pancho Doto"
            style={{
              height: "min(320px,36vw)",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              animation: "pdBob 5s ease-in-out infinite",
              filter: "drop-shadow(0 40px 36px rgba(15,5,6,0.8))",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", textAlign: "center", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--font-playful)", fontSize: "var(--text-lg)", color: "var(--color-accent-primary)", letterSpacing: "0.04em" }}>
            Hola, soy el Doto
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
            DESDE 1999 HACIENDO
            <br />
            LOS PANCHOS DEL BARRIO
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
            Arrancamos con un carrito y una parrilla en San Nicolás. Hoy somos dos locales, un
            foodtruck y una barra de salsas que te va a hacer perder la cabeza.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="primary" onClick={onGoSucursales}>
              Dónde encontrarnos
            </Button>
            <a
              href="https://instagram.com/panchodotosan_nicolas"
              target="_blank"
              rel="noopener"
              className="pd-ig-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(45deg,#F58529,#DD2A7B 55%,#8134AF 100%)",
                color: "#fff",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: "var(--text-base)",
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
                boxShadow: "0 12px 24px rgba(15,5,6,0.5)",
                transition: "transform .15s ease",
              }}
            >
              <i className="ph-fill ph-instagram-logo" style={{ fontSize: 20 }} />
              @panchodotosan_nicolas
            </a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="/assets/mascot/mascot-eating-trim.png"
            alt="Mascota de Pancho Doto comiendo"
            style={{
              height: "min(320px,36vw)",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              transform: "scaleX(-1)",
              animation: "pdBob 5.8s ease-in-out infinite",
              filter: "drop-shadow(0 40px 36px rgba(15,5,6,0.8))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
