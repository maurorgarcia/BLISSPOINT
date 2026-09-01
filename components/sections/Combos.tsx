"use client";

import { COMBOS, Combo } from "../../data/menu";
import { Button } from "../ui/Button";

export function Combos({ onOpenOrder }: { onOpenOrder: (combo?: Combo) => void }) {
  return (
    <section
      id="sec-combos"
      data-screen-label="Combos"
      style={{
        padding: "var(--space-24) var(--space-4)",
        background: "var(--color-bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/assets/backgrounds/hero-banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />
      <div style={{ maxWidth: 1150, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-section-headline)",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
            }}
          >
            COMBOS DE LA CASA
          </div>
          <p style={{ margin: "var(--space-3) auto 0", color: "var(--color-text-secondary)", fontSize: "var(--text-lg)" }}>
            Los que más salen, ya armados.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "var(--space-6)",
          }}
        >
          {COMBOS.map((c) => (
            <div
              key={c.title}
              className="pd-combo-card"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                background:
                  "linear-gradient(170deg,var(--color-green-olive) 0%,var(--color-black-soft) 46%,var(--color-black) 100%)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-6) var(--space-5) var(--space-5)",
                boxShadow: "0 20px 40px rgba(13,13,13,0.55)",
                transition: "transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s ease,border-color .28s ease",
                animation: "pdReveal .7s both",
                animationTimeline: "view()",
                animationRange: "entry 0% cover 22%",
              } as React.CSSProperties}
            >
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: -6,
                  background: "var(--color-accent-primary)",
                  color: "var(--color-text-on-accent)",
                  fontFamily: "var(--font-playful)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                  padding: "7px 14px",
                  borderRadius: "0 var(--radius-full) var(--radius-full) 0",
                  boxShadow: "0 8px 16px rgba(15,5,6,0.5)",
                  zIndex: 2,
                }}
              >
                {c.tag}
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 210,
                  flex: "0 0 210px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--space-4)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "78%",
                    height: "78%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle,rgba(206,242,73,0.28),transparent 68%)",
                  }}
                />
                <img
                  src={c.image}
                  alt={c.title}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 30px 26px rgba(13,13,13,0.85))",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-3xl)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1,
                  letterSpacing: "0.01em",
                }}
              >
                {c.title}
              </div>
              <div
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--leading-snug)",
                  marginTop: "var(--space-2)",
                  flex: 1,
                }}
              >
                {c.desc}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-5xl)",
                    lineHeight: 0.9,
                    color: "var(--color-accent-primary)",
                    textShadow: "0 8px 18px rgba(15,5,6,0.6)",
                  }}
                >
                  {c.price}
                </div>
                <div style={{ fontFamily: "var(--font-playful)", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                  {c.note}
                </div>
              </div>
              <button
                onClick={() => onOpenOrder(c)}
                className="pd-cta-pill"
                style={{
                  marginTop: "var(--space-4)",
                  width: "100%",
                  background: "var(--color-accent-primary)",
                  color: "var(--color-text-on-accent)",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: "var(--text-base)",
                  border: "none",
                  padding: "14px 20px",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  transition: "background .2s ease,transform .15s ease",
                }}
              >
                Pedir este combo
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-10)" }}>
          <Button variant="primary" size="lg" onClick={() => onOpenOrder()} icon="/assets/pedidosya/envio.png">
            Hace tu pedido ahora
          </Button>
        </div>
      </div>
    </section>
  );
}
