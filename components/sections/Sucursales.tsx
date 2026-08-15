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
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-gap-grid)" }}>
          {LOCATIONS.map((loc) => (
            <div
              key={`${loc.city}-${loc.address}`}
              className="pd-location-card pd-location-card-h"
              style={{
                background: "var(--color-bg-panel)",
                color: "var(--color-text-on-panel)",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 18px 32px rgba(15,5,6,0.5)",
                transition: "transform .25s cubic-bezier(.22,1,.36,1)",
                animation: "pdReveal .7s both",
                animationTimeline: "view()",
                animationRange: "entry 0% cover 22%",
              } as React.CSSProperties}
            >
              <div className="pd-location-map-h">
                <iframe
                  src={loc.embed}
                  title={`Mapa ${loc.address}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", border: 0, filter: "saturate(0.9)" }}
                />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)", justifyContent: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1.05 }}>{loc.city}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "var(--text-lg)" }}>{loc.address}</div>
                <div style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-snug)", color: "#4A2529" }}>{loc.hours}</div>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-2)" }}>
                  <a
                    href={loc.whatsapp}
                    target="_blank"
                    rel="noopener"
                    style={{
                      background: "var(--color-nearblack-950)",
                      color: "var(--color-accent-primary)",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: "var(--text-sm)",
                      padding: "10px 18px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={loc.maps}
                    target="_blank"
                    rel="noopener"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(31,10,12,0.3)",
                      color: "var(--color-nearblack-950)",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: "var(--text-sm)",
                      padding: "10px 18px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    Cómo llegar
                  </a>
                </div>
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
