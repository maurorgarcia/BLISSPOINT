"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import {
  ORDER_SAUCES,
  ORDER_TOPPINGS,
  LOCATIONS,
} from "../../data/menu";

type CartStep = "detail" | "personal" | "delivery" | "payment";

// Placeholder while the client confirms the real business line.
const WHATSAPP_NUMBER = "5493364540036";

const formatPrice = (n: number) =>
  "$" +
  n
    .toLocaleString("es-AR")
    .replace(/,/g, ".")
    .replace(/\.00$/, "");

function MiniQty({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        background: "var(--color-bg-surface)",
        borderRadius: 9999,
        padding: 2,
        border: "1px solid var(--color-border-subtle)",
      }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "none",
          background: value <= min ? "#333" : "#1f1718",
          color: "#fff",
          fontWeight: 900,
          cursor: value <= min ? "not-allowed" : "pointer",
          fontSize: 12,
          lineHeight: 1,
          opacity: value <= min ? 0.5 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        −
      </button>
      <span
        style={{
          minWidth: 16,
          textAlign: "center",
          fontWeight: 800,
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-sm)",
        }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "none",
          background: "var(--color-accent-primary)",
          color: "var(--color-text-on-accent)",
          fontWeight: 900,
          cursor: "pointer",
          fontSize: 12,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        +
      </button>
    </div>
  );
}

function SectionHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg,var(--color-bg-surface) 0%,rgba(206,242,73,0.08) 100%)",
        padding: "var(--space-3) var(--space-4)",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-lg)",
          color: "var(--color-text-primary)",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </span>
      {right}
    </div>
  );
}

function Radio({
  checked,
  label,
  onChange,
  sub,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
  sub?: string;
}) {
  return (
    <label
      onClick={onChange}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-card)",
        background: checked
          ? "rgba(206,242,73,0.08)"
          : "var(--color-bg-surface)",
        border: checked
          ? "2px solid var(--color-accent-primary)"
          : "1px solid var(--color-border-subtle)",
        cursor: "pointer",
        transition: "all .18s ease",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "2px solid",
          borderColor: checked
            ? "var(--color-accent-primary)"
            : "var(--color-text-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
          background: "var(--color-bg-base)",
        }}
      >
        {checked && (
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--color-accent-primary)",
            }}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "var(--color-text-primary)",
            fontWeight: 700,
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-base)",
          }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-sm)",
              marginTop: 2,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  rows?: number;
}) {
  const base = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border-subtle)",
    background: "var(--color-bg-surface)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-base)",
    outline: "none",
    resize: "vertical" as const,
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          color: "var(--color-accent-primary)",
          fontFamily: "var(--font-playful)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 700,
          paddingLeft: 4,
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#ff6b6b", marginLeft: 4 }}>*</span>
        )}
      </label>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={base}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={base}
        />
      )}
    </div>
  );
}

const STEP_META: Record<
  CartStep,
  { n: number; total: number; title: string }
> = {
  detail: { n: 1, total: 4, title: "Detalle del pedido" },
  personal: { n: 2, total: 4, title: "Datos personales" },
  delivery: { n: 3, total: 4, title: "Forma de entrega" },
  payment: { n: 4, total: 4, title: "Pago y confirmación" },
};

export function CartDrawer({
  open,
  onClose,
  initialStep = "detail",
}: {
  open: boolean;
  onClose: () => void;
  initialStep?: CartStep;
}) {
  const cart = useCart();
  const {
    hotDogs,
    beverages,
    fries,
    totalPrice,
    totalPriceLabel,
    totalCount,
    updateHotDogQty,
    updateBeverageQty,
    updateFriesQty,
    removeHotDog,
    removeBeverage,
    removeFries,
    clearCart,
    checkout,
    setCheckoutField,
  } = cart;

  const [step, setStep] = useState<CartStep>("detail");
  const [detailOpen, setDetailOpen] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(initialStep);
      setConfirmed(false);
    }
  }, [open, initialStep]);

  const sauceName = (id: string) => ORDER_SAUCES.find((s) => s.id === id)?.name;
  const toppingName = (id: string) =>
    ORDER_TOPPINGS.find((t) => t.id === id)?.name;

  const meta = STEP_META[step];

  useLockBodyScroll(open);

  const hasItems =
    hotDogs.length + beverages.length + fries.length > 0;

  const canGoPersonal = hasItems;

  const personalValid = useMemo(() => {
    if (!checkout.clientName.trim()) return false;
    if (!checkout.clientPhone.trim()) return false;
    return true;
  }, [checkout]);

  const canGoDeliveryType = personalValid;

  const deliveryValid = useMemo(() => {
    if (!checkout.deliveryType) return false;
    if (checkout.deliveryType === "takeaway") {
      if (!checkout.takeAwayName.trim()) return false;
      if (!checkout.takeAwayTiming) return false;
      if (
        checkout.takeAwayTiming === "specific-time" &&
        !checkout.takeAwaySpecificTime.trim()
      )
        return false;
      return true;
    }
    if (!checkout.envioCalle.trim()) return false;
    if (!checkout.envioAltura.trim()) return false;
    return true;
  }, [checkout]);

  const paymentValid = checkout.paymentMethod !== null;
  const canConfirm = personalValid && deliveryValid && paymentValid && hasItems;

  const buildWhatsAppMessage = () => {
    const lines: string[] = ["🌭 *Nuevo pedido - Bliss Point*", ""];

    if (hotDogs.length > 0) {
      lines.push("*Panchos:*");
      for (const h of hotDogs) {
        lines.push(`${h.quantity}x ${h.variety.name} - ${formatPrice(h.variety.price * h.quantity)}`);
        if (h.sauces.length > 0) lines.push(`  Salsas: ${h.sauces.map(sauceName).join(", ")}`);
        if (h.toppings.length > 0) lines.push(`  Toppings: ${h.toppings.map(toppingName).join(", ")}`);
      }
      lines.push("");
    }

    if (fries.length > 0) {
      lines.push("*Extras:*");
      for (const f of fries) {
        lines.push(`${f.quantity}x ${f.name} - ${formatPrice(f.price * f.quantity)}`);
      }
      lines.push("");
    }

    if (beverages.length > 0) {
      lines.push("*Bebidas:*");
      for (const b of beverages) {
        lines.push(`${b.quantity}x ${b.beverage.name} - ${formatPrice(b.beverage.price * b.quantity)}`);
      }
      lines.push("");
    }

    lines.push(`*Total: ${totalPriceLabel}*`, "");

    lines.push(
      "*Datos del cliente*",
      `Nombre: ${checkout.clientName}`,
      `Teléfono: ${checkout.clientPhone}`,
      "",
    );

    lines.push("*Entrega*");
    if (checkout.deliveryType === "takeaway") {
      lines.push(
        "Modalidad: Take Away",
        `Retira por: ${LOCATIONS[0].address}`,
        `Nombre de quien retira: ${checkout.takeAwayName}`,
        `Cuándo: ${
          checkout.takeAwayTiming === "asap"
            ? "Lo antes posible"
            : `A las ${checkout.takeAwaySpecificTime}`
        }`,
      );
    } else {
      lines.push("Modalidad: Envío a domicilio", `Dirección: ${checkout.envioCalle} ${checkout.envioAltura}`);
      if (checkout.envioEntreCalles) lines.push(`Entre calles: ${checkout.envioEntreCalles}`);
      if (checkout.envioReferencia) lines.push(`Referencia: ${checkout.envioReferencia}`);
      if (checkout.envioComentario) lines.push(`Comentario: ${checkout.envioComentario}`);
    }
    lines.push("");

    lines.push(
      "*Pago*",
      checkout.paymentMethod === "efectivo"
        ? "Efectivo"
        : checkout.paymentMethod === "debito"
          ? "Tarjeta de Débito"
          : "Mercado Pago",
    );

    return lines.join("\n");
  };

  const sendOrderToWhatsApp = () => {
    const text = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const next = () => {
    if (step === "detail" && canGoPersonal) setStep("personal");
    else if (step === "personal" && personalValid) setStep("delivery");
    else if (step === "delivery" && deliveryValid) setStep("payment");
  };
  const back = () => {
    if (step === "payment") setStep("delivery");
    else if (step === "delivery") setStep("personal");
    else if (step === "personal") setStep("detail");
  };

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.72)",
          zIndex: "calc(var(--z-modal-overlay) as unknown as number) - 5",
        }}
      />
      <aside
        aria-label="Carrito"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100dvh",
          width: "min(520px, 100vw)",
          background: "var(--color-bg-base)",
          zIndex: "var(--z-modal-overlay)" as unknown as number,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-30px 0 70px rgba(0,0,0,0.55)",
          borderLeft: "1px solid var(--color-border-subtle)",
          animation: "slideInRight .28s cubic-bezier(.22,1,.36,1) both",
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
          @keyframes popIn {
            0% { transform: scale(.2); opacity: 0; }
            70%{ transform: scale(1.15); opacity: 1; }
            100%{ transform: scale(1); }
          }
        `}</style>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--space-5) var(--space-5)",
            borderBottom: "1px solid var(--color-border-subtle)",
            background: "var(--color-bg-surface)",
            gap: "var(--space-3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <button
              onClick={back}
              aria-label="Atrás"
              disabled={step === "detail"}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid var(--color-border-subtle)",
                background: step === "detail" ? "transparent" : "var(--color-bg-surface)",
                color: step === "detail" ? "var(--color-text-secondary)" : "var(--color-text-primary)",
                fontWeight: 800,
                fontSize: "var(--text-xl)",
                cursor: step === "detail" ? "default" : "pointer",
                opacity: step === "detail" ? 0.3 : 1,
                flexShrink: 0,
              }}
            >
              ←
            </button>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-playful)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-accent-primary)",
                }}
              >
                Paso {meta.n} / {meta.total}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-2xl)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1,
                }}
              >
                Mi Pedido.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid var(--color-border-subtle)",
                background: "var(--color-bg-surface)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--text-lg)",
                fontWeight: 700,
                cursor: "pointer",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
            <button
              onClick={() => {
                clearCart();
                onClose();
              }}
              style={{
                background: "rgba(255,80,90,0.12)",
                color: "#ff6b6b",
                border: "1px solid rgba(255,80,90,0.35)",
                borderRadius: "var(--radius-full)",
                padding: "8px 16px",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Anular
            </button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {confirmed ? (
            <div
              style={{
                padding: "var(--space-10) var(--space-6)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-5)",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,var(--color-accent-primary) 0%,#98b81f 100%)",
                  color: "var(--color-text-on-accent)",
                  fontSize: 46,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "popIn .5s cubic-bezier(.22,1,.36,1) both",
                  boxShadow: "0 20px 40px rgba(206,242,73,0.3)",
                }}
              >
                ✓
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-3xl)",
                    color: "var(--color-text-primary)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  ¡Pedido Confirmado!
                </div>
                <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)" }}>
                  Enviá el pedido por WhatsApp para que lo confirmemos.
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  background: "var(--color-bg-surface)",
                  border: "1px dashed var(--color-accent-primary)",
                  borderRadius: "var(--radius-card)",
                  padding: "var(--space-5)",
                  textAlign: "left",
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-primary)",
                }}
              >
                <div style={{ marginBottom: 12, fontWeight: 700 }}>
                  Total:{" "}
                  <span style={{ color: "var(--color-accent-primary)", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)" }}>
                    {totalPriceLabel}
                  </span>
                </div>
                <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  Cliente: <strong style={{ color: "var(--color-text-primary)" }}>{checkout.clientName}</strong>
                  <br />
                  Teléfono: <strong style={{ color: "var(--color-text-primary)" }}>{checkout.clientPhone}</strong>
                  <br />
                  {checkout.deliveryType === "takeaway" ? (
                    <>
                      <br />
                      Modalidad: <strong style={{ color: "var(--color-text-primary)" }}>Take Away</strong>
                      <br />
                      Retira por: <strong style={{ color: "var(--color-text-primary)" }}>{LOCATIONS[0].address}</strong>
                      <br />
                      Nombre de quien retira: <strong style={{ color: "var(--color-text-primary)" }}>{checkout.takeAwayName}</strong>
                      <br />
                      Cuándo:{" "}
                      <strong style={{ color: "var(--color-text-primary)" }}>
                        {checkout.takeAwayTiming === "asap"
                          ? "Lo antes posible"
                          : `A las ${checkout.takeAwaySpecificTime}`}
                      </strong>
                    </>
                  ) : (
                    <>
                      <br />
                      Modalidad: <strong style={{ color: "var(--color-text-primary)" }}>Envío a domicilio</strong>
                      <br />
                      Dirección: <strong style={{ color: "var(--color-text-primary)" }}>{checkout.envioCalle} {checkout.envioAltura}</strong>
                      {checkout.envioEntreCalles && (
                        <>
                          <br />
                          Entre calles: <strong style={{ color: "var(--color-text-primary)" }}>{checkout.envioEntreCalles}</strong>
                        </>
                      )}
                      {checkout.envioReferencia && (
                        <>
                          <br />
                          Referencia: <strong style={{ color: "var(--color-text-primary)" }}>{checkout.envioReferencia}</strong>
                        </>
                      )}
                      {checkout.envioComentario && (
                        <>
                          <br />
                          Comentario: <strong style={{ color: "var(--color-text-primary)" }}>{checkout.envioComentario}</strong>
                        </>
                      )}
                    </>
                  )}
                  <br />
                  <br />
                  Pago:{" "}
                  <strong style={{ color: "var(--color-text-primary)" }}>
                    {checkout.paymentMethod === "efectivo"
                      ? "Efectivo"
                      : checkout.paymentMethod === "debito"
                        ? "Tarjeta de Débito"
                        : "Mercado Pago"}
                  </strong>
                </div>
              </div>
              <button
                onClick={() => {
                  sendOrderToWhatsApp();
                  clearCart();
                  onClose();
                }}
                style={{
                  background: "#25D366",
                  color: "#0f1400",
                  border: "none",
                  borderRadius: "var(--radius-full)",
                  padding: "16px 34px",
                  fontWeight: 900,
                  fontFamily: "var(--font-ui)",
                  cursor: "pointer",
                  fontSize: "var(--text-lg)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38a9.94 9.94 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-9.84-10.01-9.84Zm5.86 14.2c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.62-2.97-1.28-4.9-4.28-5.05-4.48-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.17-.2.73-.85.93-1.14.2-.29.4-.24.67-.14.28.1 1.75.83 2.05 .98.3.15.5.22.57.35.08.13.08.75-.17 1.45Z" />
                </svg>
                Enviar pedido por WhatsApp
              </button>
            </div>
          ) : (
            <>
              <SectionHeader
                title="DETALLE DEL PEDIDO"
                right={
                  <button
                    onClick={() => setDetailOpen((v) => !v)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--color-accent-primary)",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "var(--text-sm)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {detailOpen ? "OCULTAR ▲" : "VER ▼"}
                  </button>
                }
              />

              {detailOpen && (
                <div
                  style={{
                    padding: "var(--space-4) var(--space-5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                  }}
                >
                  {!hasItems && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "var(--space-8) var(--space-4)",
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-ui)",
                      }}
                    >
                      Tu carrito está vacío.
                      <br />
                      ¡Agregá un pancho para empezar!
                    </div>
                  )}

                  {hotDogs.map((h) => (
                    <div
                      key={h.id}
                      style={{
                        background: "var(--color-bg-surface)",
                        border: "1px solid var(--color-border-subtle)",
                        borderRadius: "var(--radius-card)",
                        padding: "var(--space-3) var(--space-4)",
                        display: "flex",
                        gap: "var(--space-3)",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={h.variety.image}
                        alt=""
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "contain",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "var(--color-text-primary)",
                              fontSize: "var(--text-base)",
                            }}
                          >
                            {h.variety.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "var(--color-accent-primary)",
                              fontSize: "var(--text-lg)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatPrice(h.variety.price * h.quantity)}
                          </div>
                        </div>
                        <div
                          style={{
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--text-xs)",
                            marginTop: 4,
                            lineHeight: 1.5,
                          }}
                        >
                          {h.quantity} × {formatPrice(h.variety.price)}
                          {h.sauces.length > 0 && (
                            <div>
                              Salsas:{" "}
                              <span style={{ color: "var(--color-text-primary)" }}>
                                {h.sauces.map(sauceName).join(", ")}
                              </span>
                            </div>
                          )}
                          {h.toppings.length > 0 && (
                            <div>
                              Toppings:{" "}
                              <span style={{ color: "var(--color-text-primary)" }}>
                                {h.toppings.map(toppingName).join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            marginTop: "var(--space-2)",
                            flexWrap: "wrap",
                          }}
                        >
                          <MiniQty
                            value={h.quantity}
                            onChange={(q) => updateHotDogQty(h.id, q - h.quantity)}
                          />
                          <button
                            onClick={() => removeHotDog(h.id)}
                            style={{
                              background: "rgba(255,80,90,0.1)",
                              color: "#ff6b6b",
                              border: "1px solid rgba(255,80,90,0.3)",
                              borderRadius: "var(--radius-full)",
                              padding: "6px 14px",
                              fontFamily: "var(--font-ui)",
                              fontWeight: 700,
                              fontSize: "var(--text-xs)",
                              cursor: "pointer",
                            }}
                          >
                            × Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {fries.map((f) => (
                    <div
                      key={f.id}
                      style={{
                        background: "var(--color-bg-surface)",
                        border: "1px dashed var(--color-accent-primary)",
                        borderRadius: "var(--radius-card)",
                        padding: "var(--space-3) var(--space-4)",
                        display: "flex",
                        gap: "var(--space-3)",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={f.image}
                        alt=""
                        style={{
                          width: 44,
                          height: 44,
                          objectFit: "contain",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "var(--color-text-primary)",
                              fontSize: "var(--text-base)",
                            }}
                          >
                            {f.name}
                            <span
                              style={{
                                fontFamily: "var(--font-playful)",
                                fontSize: 10,
                                color: "var(--color-accent-primary)",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                marginLeft: 8,
                              }}
                            >
                              extra
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "var(--color-accent-primary)",
                              fontSize: "var(--text-lg)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatPrice(f.price * f.quantity)}
                          </div>
                        </div>
                        <div
                          style={{
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--text-xs)",
                            marginTop: 4,
                          }}
                        >
                          {f.quantity} × {formatPrice(f.price)}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            marginTop: "var(--space-2)",
                            flexWrap: "wrap",
                          }}
                        >
                          <MiniQty
                            value={f.quantity}
                            onChange={(q) => updateFriesQty(f.id, q - f.quantity)}
                          />
                          <button
                            onClick={() => removeFries(f.id)}
                            style={{
                              background: "rgba(255,80,90,0.1)",
                              color: "#ff6b6b",
                              border: "1px solid rgba(255,80,90,0.3)",
                              borderRadius: "var(--radius-full)",
                              padding: "6px 14px",
                              fontFamily: "var(--font-ui)",
                              fontWeight: 700,
                              fontSize: "var(--text-xs)",
                              cursor: "pointer",
                            }}
                          >
                            × Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {beverages.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        background: "var(--color-bg-surface)",
                        border: "1px solid var(--color-border-subtle)",
                        borderRadius: "var(--radius-card)",
                        padding: "var(--space-3) var(--space-4)",
                        display: "flex",
                        gap: "var(--space-3)",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={b.beverage.image}
                        alt=""
                        style={{
                          width: 40,
                          height: 48,
                          objectFit: "contain",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "var(--color-text-primary)",
                              fontSize: "var(--text-base)",
                            }}
                          >
                            {b.beverage.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "var(--color-accent-primary)",
                              fontSize: "var(--text-lg)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatPrice(b.beverage.price * b.quantity)}
                          </div>
                        </div>
                        <div
                          style={{
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--text-xs)",
                            marginTop: 4,
                          }}
                        >
                          {b.quantity} × {formatPrice(b.beverage.price)}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            marginTop: "var(--space-2)",
                            flexWrap: "wrap",
                          }}
                        >
                          <MiniQty
                            value={b.quantity}
                            onChange={(q) => updateBeverageQty(b.id, q - b.quantity)}
                          />
                          <button
                            onClick={() => removeBeverage(b.id)}
                            style={{
                              background: "rgba(255,80,90,0.1)",
                              color: "#ff6b6b",
                              border: "1px solid rgba(255,80,90,0.3)",
                              borderRadius: "var(--radius-full)",
                              padding: "6px 14px",
                              fontFamily: "var(--font-ui)",
                              fontWeight: 700,
                              fontSize: "var(--text-xs)",
                              cursor: "pointer",
                            }}
                          >
                            × Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === "detail" && (
                <div style={{ marginTop: "auto" }} />
              )}

              {step === "personal" && (
                <>
                  <SectionHeader title="DATOS PERSONALES" />
                  <div
                    style={{
                      padding: "var(--space-5)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-4)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-text-secondary)",
                        margin: 0,
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      Completá tus datos para poder contactarte si hace falta.
                    </p>
                    <TextInput
                      label="Nombre completo"
                      value={checkout.clientName}
                      onChange={(v) => setCheckoutField("clientName", v)}
                      placeholder="Tu nombre y apellido"
                      required
                    />
                    <TextInput
                      label="Teléfono"
                      type="tel"
                      value={checkout.clientPhone}
                      onChange={(v) => setCheckoutField("clientPhone", v)}
                      placeholder="Ej: 336 123-4567"
                      required
                    />
                  </div>
                </>
              )}

              {step === "delivery" && (
                <>
                  <SectionHeader title="FORMA DE ENTREGA" />
                  <div
                    style={{
                      padding: "var(--space-5)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-3)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-text-secondary)",
                        margin: 0,
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      Elegí cómo querés recibir tu pedido.
                    </p>
                    <Radio
                      checked={checkout.deliveryType === "takeaway"}
                      label="Take Away / Retiro en el local"
                      sub="Pasás a buscarlo por nuestra sucursal"
                      onChange={() => setCheckoutField("deliveryType", "takeaway")}
                    />
                    <Radio
                      checked={checkout.deliveryType === "envio"}
                      label="Envío"
                      sub="Entrega a domicilio"
                      onChange={() => setCheckoutField("deliveryType", "envio")}
                    />
                  </div>

                  {checkout.deliveryType === "takeaway" && (
                    <>
                      <SectionHeader title="DATOS DEL RETIRO" />
                      <div
                        style={{
                          padding: "0 var(--space-5) var(--space-5) var(--space-5)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "var(--space-4)",
                        }}
                      >
                        <div
                          style={{
                            background: "rgba(206,242,73,0.06)",
                            border: "1px dashed var(--color-accent-primary)",
                            borderRadius: "var(--radius-card)",
                            padding: "var(--space-3) var(--space-4)",
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--text-sm)",
                          }}
                        >
                          📍 Retirá por: <strong style={{ color: "var(--color-text-primary)" }}>{LOCATIONS[0].address}</strong>
                        </div>
                        <TextInput
                          label="Nombre de quien retira"
                          value={checkout.takeAwayName}
                          onChange={(v) => setCheckoutField("takeAwayName", v)}
                          placeholder="Si venís vos, podés repetir tu nombre"
                          required
                        />
                        <div
                          style={{
                            fontFamily: "var(--font-playful)",
                            fontSize: "var(--text-xs)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-accent-primary)",
                            fontWeight: 700,
                            paddingLeft: 4,
                          }}
                        >
                          ¿Cuándo lo retiras?
                          <span style={{ color: "#ff6b6b", marginLeft: 4 }}>*</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                          <Radio
                            checked={checkout.takeAwayTiming === "asap"}
                            label="Lo Antes Posible"
                            sub="Lo preparamos de inmediato"
                            onChange={() => setCheckoutField("takeAwayTiming", "asap")}
                          />
                          <Radio
                            checked={checkout.takeAwayTiming === "specific-time"}
                            label="En una hora específica"
                            sub="Indicás a qué hora venís"
                            onChange={() => setCheckoutField("takeAwayTiming", "specific-time")}
                          />
                        </div>
                        {checkout.takeAwayTiming === "specific-time" && (
                          <TextInput
                            label="Horario"
                            type="time"
                            value={checkout.takeAwaySpecificTime}
                            onChange={(v) => setCheckoutField("takeAwaySpecificTime", v)}
                            required
                          />
                        )}
                      </div>
                    </>
                  )}

                  {checkout.deliveryType === "envio" && (
                    <>
                      <SectionHeader title="DATOS DEL ENVÍO" />
                      <div
                        style={{
                          padding: "0 var(--space-5) var(--space-5) var(--space-5)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "var(--space-4)",
                        }}
                      >
                        <TextInput
                          label="Calle"
                          value={checkout.envioCalle}
                          onChange={(v) => setCheckoutField("envioCalle", v)}
                          placeholder="Ej: San Martín, Mitre, etc."
                          required
                        />
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "var(--space-3)",
                          }}
                        >
                          <TextInput
                            label="Altura"
                            value={checkout.envioAltura}
                            onChange={(v) => setCheckoutField("envioAltura", v)}
                            placeholder="Ej: 1234"
                            required
                          />
                          <TextInput
                            label="Entre calles (opcional)"
                            value={checkout.envioEntreCalles}
                            onChange={(v) => setCheckoutField("envioEntreCalles", v)}
                            placeholder="Ej: Rivadavia y Lavalle"
                          />
                        </div>
                        <TextInput
                          label="Referencia (opcional)"
                          value={checkout.envioReferencia}
                          onChange={(v) => setCheckoutField("envioReferencia", v)}
                          placeholder="Ej: Portón negro, edificio celeste, etc."
                        />
                        <TextInput
                          label="Comentario (opcional)"
                          rows={3}
                          value={checkout.envioComentario}
                          onChange={(v) => setCheckoutField("envioComentario", v)}
                          placeholder="Ej: No tocar el timbre / Dejar en portería / Con cuchillo extra, etc."
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {step === "payment" && (
                <>
                  <SectionHeader title="FORMA DE PAGO" />
                  <div
                    style={{
                      padding: "var(--space-5)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-3)",
                    }}
                  >
                    <Radio
                      checked={checkout.paymentMethod === "efectivo"}
                      label="Efectivo"
                      sub="Pagás al retirar o al recibir el envío"
                      onChange={() => setCheckoutField("paymentMethod", "efectivo")}
                    />
                    <Radio
                      checked={checkout.paymentMethod === "debito"}
                      label="Tarjeta de Débito"
                      sub="Cobro en el local o al repartidor"
                      onChange={() => setCheckoutField("paymentMethod", "debito")}
                    />
                    <Radio
                      checked={checkout.paymentMethod === "mercado-pago"}
                      label="Mercado Pago"
                      sub="Te pasamos el link al confirmar"
                      onChange={() => setCheckoutField("paymentMethod", "mercado-pago")}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {!confirmed && (
          <div
            style={{
              padding: "var(--space-5)",
              borderTop: "1px solid var(--color-border-subtle)",
              background:
                "linear-gradient(180deg,var(--color-bg-surface) 0%,var(--color-bg-base) 100%)",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg,var(--color-accent-primary) 0%,#98b81f 100%)",
                borderRadius: "var(--radius-2xl)",
                padding: "var(--space-4) var(--space-5)",
                boxShadow: "0 12px 30px rgba(206,242,73,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-3)",
                  flexWrap: "wrap",
                  gap: "var(--space-2)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-playful)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#0f1400",
                      fontWeight: 800,
                    }}
                  >
                    Total del Pedido
                  </span>
                  {totalCount > 0 && (
                    <span
                      style={{
                        marginLeft: 12,
                        fontFamily: "var(--font-ui)",
                        color: "#1f1718",
                        fontWeight: 700,
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      ({totalCount} {totalCount === 1 ? "producto" : "productos"})
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#0f1400",
                    fontSize: "var(--text-4xl)",
                    lineHeight: 1,
                    textShadow: "0 2px 6px rgba(255,255,255,0.25)",
                  }}
                >
                  {totalPriceLabel}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "var(--space-3)",
                  flexWrap: "wrap",
                }}
              >
                {step !== "detail" && (
                  <button
                    onClick={back}
                    style={{
                      flex: 1,
                      minWidth: 140,
                      background: "rgba(15,10,10,0.7)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "var(--radius-full)",
                      padding: "14px 24px",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "var(--text-base)",
                    }}
                  >
                    ← Atrás
                  </button>
                )}
                {step !== "payment" ? (
                  <button
                    onClick={next}
                    disabled={
                      step === "detail"
                        ? !canGoPersonal
                        : step === "personal"
                          ? !personalValid
                          : !deliveryValid
                    }
                    style={{
                      flex: 2,
                      minWidth: 180,
                      background: "#0f1400",
                      color: "var(--color-accent-primary)",
                      border: "none",
                      borderRadius: "var(--radius-full)",
                      padding: "14px 24px",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 900,
                      cursor:
                        step === "detail"
                          ? canGoPersonal
                            ? "pointer"
                            : "not-allowed"
                          : step === "personal"
                            ? personalValid
                              ? "pointer"
                              : "not-allowed"
                            : deliveryValid
                              ? "pointer"
                              : "not-allowed",
                      opacity:
                        step === "detail"
                          ? canGoPersonal
                            ? 1
                            : 0.5
                          : step === "personal"
                            ? personalValid
                              ? 1
                              : 0.5
                            : deliveryValid
                              ? 1
                              : 0.5,
                      fontSize: "var(--text-base)",
                    }}
                  >
                    {step === "detail"
                      ? "Continuar →"
                      : step === "personal"
                        ? "Elegir entrega →"
                        : "Ir a pago →"}
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmed(true)}
                    disabled={!canConfirm}
                    style={{
                      flex: 2,
                      minWidth: 180,
                      background: "#0f1400",
                      color: "var(--color-accent-primary)",
                      border: "none",
                      borderRadius: "var(--radius-full)",
                      padding: "16px 26px",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 900,
                      cursor: canConfirm ? "pointer" : "not-allowed",
                      opacity: canConfirm ? 1 : 0.5,
                      fontSize: "var(--text-lg)",
                    }}
                  >
                    ✓ Confirmar Pedido
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export function CartFloatingButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const { totalCount } = useCart();
  if (totalCount === 0) return null;
  return (
    <button
      onClick={onClick}
      aria-label="Abrir carrito"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        width: 64,
        height: 64,
        borderRadius: "50%",
        border: "none",
        background:
          "linear-gradient(135deg,var(--color-accent-primary) 0%,#98b81f 100%)",
        color: "var(--color-text-on-accent)",
        cursor: "pointer",
        boxShadow: "0 12px 28px rgba(206,242,73,0.45), 0 6px 14px rgba(0,0,0,0.4)",
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform .2s ease, box-shadow .2s ease",
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            minWidth: 26,
            height: 26,
            padding: "0 6px",
            borderRadius: 9999,
            background: "#ff4d58",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-sm)",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(255,77,88,0.5)",
            border: "2px solid #0f1400",
          }}
        >
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </button>
  );
}
