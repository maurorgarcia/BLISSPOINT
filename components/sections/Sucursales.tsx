import { LOCATIONS } from "../../data/menu";

export function Sucursales() {
  return (
    <section
      id="sec-sucursales"
      data-screen-label="Sucursales"
      style={{ padding: "var(--space-24) var(--space-4)", background: "var(--color-bg-product-block)" }}
    >
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-section-headline)",
            color: "var(--color-text-primary)",
            lineHeight: 1,
          }}
        >
          ENCONTRÁ TU DOTO MÁS CERCA
        </div>
        <p
          style={{
            textAlign: "center",
            margin: "var(--space-2) auto var(--space-10)",
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-lg)",
          }}
        >
          Tres puntos y un foodtruck que va a donde lo llames.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "var(--space-gap-grid)" }}>
          {LOCATIONS.map((loc, i) => (
            <div
              key={`${loc.city}-${loc.address}`}
              className="pd-location-card"
              style={{
                background: "var(--color-bg-panel)",
                color: "var(--color-text-on-panel)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                boxShadow: "0 18px 32px rgba(15,5,6,0.5)",
                transition: "transform .25s cubic-bezier(.22,1,.36,1)",
                animation: "pdReveal .7s both",
                animationTimeline: "view()",
                animationRange: "entry 0% cover 22%",
              } as React.CSSProperties}
            >
              <div style={{ position: "relative" }}>
                <iframe
                  src={loc.embed}
                  title={`Mapa ${loc.address}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 150,
                    border: 0,
                    borderRadius: "var(--radius-sm)",
                    filter: "saturate(0.9)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    left: -10,
                    width: 32,
                    height: 32,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-accent-primary)",
                    color: "var(--color-nearblack-950)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-base)",
                    boxShadow: "0 6px 14px rgba(15,5,6,0.5)",
                  }}
                >
                  {i + 1}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playful)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-accent-secondary)",
                  letterSpacing: "0.04em",
                }}
              >
                {loc.city}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1.05 }}>
                <i className="ph-fill ph-map-pin" style={{ color: "var(--color-accent-secondary)", fontSize: 20 }} />
                {loc.address}
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "var(--text-sm)", lineHeight: "var(--leading-snug)", color: "#4A2529" }}>
                <i className="ph-fill ph-clock" style={{ color: "var(--color-accent-secondary)", fontSize: 16, marginTop: 2, flexShrink: 0 }} />
                {loc.hours}
              </div>
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-2)" }}>
                <a
                  href={loc.whatsapp}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "var(--color-accent-secondary)",
                    color: "#fff",
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    fontSize: "var(--text-sm)",
                    padding: "10px 18px",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  <i className="ph-fill ph-whatsapp-logo" style={{ fontSize: 16 }} />
                  WhatsApp
                </a>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "var(--color-yellow-600)",
                    border: "none",
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
          ))}
        </div>
        <div
          style={{
            marginTop: "var(--space-8)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-6)",
            flexWrap: "wrap",
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-card)",
            padding: "var(--space-6)",
          }}
        >
          <img src="/assets/mascot/mascot-eating.png" alt="Mascota Pancho Doto" style={{ width: 110, height: "auto" }} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--color-text-primary)" }}>
              FOODTRUCK PARA EVENTOS
            </div>
            <p style={{ margin: "var(--space-2) 0 var(--space-3) 0", color: "var(--color-text-secondary)" }}>
              Cumples, casamientos, egresados. Llevamos la panche a donde estés.
            </p>
            <a
              href="https://wa.me/5493364000000"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-block",
                background: "var(--color-accent-secondary)",
                color: "#fff",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
              }}
            >
              Consultar por el foodtruck
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
