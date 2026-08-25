"use client";

import { BAR_CATEGORIES, BarCategory, CATS } from "../../data/menu";

export function Barra({
  cat,
  onSelectCat,
}: {
  cat: BarCategory;
  onSelectCat: (cat: BarCategory) => void;
}) {
  return (
    <section
      id="sec-barra"
      data-screen-label="La barra"
      style={{
        padding: "var(--space-24) var(--space-4)",
        background: "var(--color-bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1150, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-6)",
            flexWrap: "wrap",
            textAlign: "center",
            animation: "pdReveal 0.7s both",
            animationTimeline: "view()",
            animationRange: "entry 0% cover 25%",
          } as React.CSSProperties}
        >
          <div style={{ minWidth: 260 }}>
            <div
              style={{
                fontFamily: "var(--font-playful)",
                fontSize: "var(--text-base)",
                color: "var(--color-accent-primary)",
                letterSpacing: "0.04em",
                marginBottom: "var(--space-1)",
              }}
            >
              Elegí la base
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-section-headline)",
                color: "var(--color-text-primary)",
                lineHeight: 1,
              }}
            >
              LA BARRA
            </div>
            <p
              style={{
                margin: "var(--space-2) 0 0 0",
                color: "var(--color-text-secondary)",
                fontSize: "var(--text-lg)",
                maxWidth: "44ch",
                marginLeft: "auto",
                marginRight: "auto",
                textWrap: "pretty",
              }}
            >
              Pan, salchicha, salsas y extras para completar tu pedido como quieras.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--space-2)",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "var(--space-8) 0",
          }}
        >
          {BAR_CATEGORIES.map((name) => {
            const active = name === cat;
            return (
              <button
                key={name}
                onClick={() => onSelectCat(name)}
                style={{
                  fontFamily: "var(--font-playful)",
                  fontSize: "var(--text-base)",
                  padding: "10px 22px",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  transition: "all .2s ease",
                  border: `1px solid ${active ? "var(--color-accent-primary)" : "var(--color-border-subtle)"}`,
                  background: active ? "var(--color-accent-primary)" : "transparent",
                  color: active ? "var(--color-text-on-accent)" : "var(--color-text-secondary)",
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-gap-grid)" }}>
          {CATS[cat].map((it) => (
            <div
              key={it.name}
              className="pd-hover-card"
              style={{
                width: 170,
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-3)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 10px 20px rgba(15,5,6,0.35)",
                transition: "transform 0.22s cubic-bezier(.22,1,.36,1),border-color 0.22s ease,box-shadow 0.22s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 130,
                  flex: "0 0 130px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={it.image}
                  alt={it.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 12px 14px rgba(15,5,6,0.6))",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {it.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-accent-primary)",
                  letterSpacing: "0.04em",
                }}
              >
                {it.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
