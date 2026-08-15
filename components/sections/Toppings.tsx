import { TOPPINGS_ONLY } from "../../data/menu";

export function Toppings() {
  return (
    <section
      id="sec-toppings"
      data-screen-label="Toppings"
      style={{
        padding: "var(--space-24) var(--space-4)",
        background: "var(--color-bg-product-block)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/assets/backgrounds/hero-banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(80% 60% at 50% 0%,rgba(139,26,38,0.5),transparent 70%),linear-gradient(180deg,rgba(43,9,0,0.65),rgba(43,9,0,0.9))",
        }}
      />
      <div style={{ maxWidth: 1150, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--space-10)",
            animation: "pdReveal .7s both",
            animationTimeline: "view()",
            animationRange: "entry 0% cover 25%",
          } as React.CSSProperties}
        >
          <div
            style={{
              fontFamily: "var(--font-playful)",
              fontSize: "var(--text-base)",
              color: "var(--color-accent-primary)",
              letterSpacing: "0.04em",
            }}
          >
            Hasta 4 por pancho
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-section-headline)",
              color: "var(--color-text-primary)",
              lineHeight: 1,
              marginTop: "var(--space-1)",
            }}
          >
            TOPPINGS
          </div>
          <p
            style={{
              margin: "var(--space-2) auto 0",
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-lg)",
              maxWidth: "46ch",
              textWrap: "pretty",
            }}
          >
            Lo que le tires arriba define tu pancho. Estos son todos los que tenemos en la barra.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-gap-grid)" }}>
          {TOPPINGS_ONLY.map((t) => (
            <div
              key={t.name}
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
                transition: "transform .22s cubic-bezier(.22,1,.36,1),border-color .22s ease,box-shadow .22s ease",
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
                  src={t.image}
                  alt={t.name}
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
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-accent-primary)",
                  letterSpacing: "0.04em",
                }}
              >
                {t.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
