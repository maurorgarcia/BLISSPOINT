import { Button } from "../ui/Button";

export function Footer({ onOpenOrder }: { onOpenOrder: () => void }) {
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
          <img src="/assets/brand/logo.png" alt="Bliss Point" style={{ width: 160, height: "auto" }} />
          <div style={{ fontFamily: "var(--font-playful)", color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", maxWidth: "26ch" }}>
            Bliss Point — el punto justo para disfrutar algo rico.
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
          <a href="https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2Fe9pr7p%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaflQuZH8BXZ34T5c3EcuBsZc-5AP7yQa2-YjJw6_mOVHZxk84XN1UCTf8cF0g_aem_h8If6LbwAJKiBFSUIB7MdA&e=AUCIYuQmGaqDl3_19u7iwrHr3tLIoGBkd20-QUH5SAm5pRZQ17x6GtGTdJ--L26dIL-2vY0CYOwpEiGIH6mUhNXd-RPFLs0VBj4k4V3nsjTx6sZ_eYerWYqs3xHzteJnvr71B74" target="_blank" rel="noopener" style={{ fontSize: "var(--text-sm)" }}>
            WhatsApp pedidos
          </a>
          <a href="https://www.instagram.com/blisspoint.sn/" target="_blank" rel="noopener" style={{ fontSize: "var(--text-sm)" }}>
            @blisspoint.sn
          </a>
          <a href="https://www.facebook.com/BlissPointSNpancheria/" target="_blank" rel="noopener" style={{ fontSize: "var(--text-sm)" }}>
            Bliss Point SN
          </a>
        </div>
        <div className="pd-footer-col" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--color-accent-primary)" }}>
            PEDÍ AHORA
          </div>
          <Button variant="primary" onClick={onOpenOrder} icon="/assets/pedidosya/envio.png">
            Ver menú
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
        Bliss Point · Bartolomé Mitre 133 · San Nicolás de los Arroyos, Buenos Aires
      </div>
    </footer>
  );
}
