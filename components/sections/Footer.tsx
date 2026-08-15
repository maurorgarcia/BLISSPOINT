import { Button } from "../ui/Button";

export function Footer({ onOpenPedidosYa }: { onOpenPedidosYa: () => void }) {
  return (
    <footer
      style={{
        background: "var(--color-bg-base)",
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "var(--space-16) var(--space-4) var(--space-10)",
      }}
    >
      <div
        className="pd-footer-grid"
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "var(--space-8)",
          alignItems: "start",
        }}
      >
        <div className="pd-footer-col" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <img src="/assets/brand/logo.png" alt="Pancho Doto" style={{ width: 110, height: "auto" }} />
          <div style={{ fontFamily: "var(--font-playful)", color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", maxWidth: "26ch" }}>
            Los panchos del barrio, desde 1999.
          </div>
        </div>
        <div className="pd-footer-col" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--color-accent-primary)" }}>
            HORARIOS
          </div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>
            Lun a Jue 11 a 24hs
            <br />
            Vie y Sáb 11 a 7hs
            <br />
            Dom 18 a 24hs
          </div>
        </div>
        <div className="pd-footer-col" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--color-accent-primary)" }}>
            CONTACTO
          </div>
          <a href="https://wa.me/5493364000000" target="_blank" rel="noopener" style={{ fontSize: "var(--text-sm)" }}>
            WhatsApp pedidos
          </a>
          <a href="https://instagram.com/panchodotosan_nicolas" target="_blank" rel="noopener" style={{ fontSize: "var(--text-sm)" }}>
            @panchodotosan_nicolas
          </a>
        </div>
        <div className="pd-footer-col" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--color-accent-primary)" }}>
            PEDÍ AHORA
          </div>
          <Button variant="pedidosya" onClick={onOpenPedidosYa}>
            PedidosYa
          </Button>
        </div>
      </div>
      <div
        className="pd-footer-bottom"
        style={{
          maxWidth: 1150,
          margin: "var(--space-10) auto 0",
          paddingTop: "var(--space-5)",
          borderTop: "1px solid var(--color-border-subtle)",
          color: "var(--color-text-secondary)",
          fontSize: "var(--text-xs)",
        }}
      >
        Pancho Doto · San Nicolás de los Arroyos · Villa Constitución
      </div>
    </footer>
  );
}
