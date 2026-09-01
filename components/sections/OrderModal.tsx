"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  BEVERAGES,
  Beverage,
  Combo,
  HOT_DOG_VARIETIES,
  HotDogVariety,
  ORDER_SAUCES,
  ORDER_TOPPINGS,
} from "../../data/menu";

type Step =
  | "variety"
  | "sauces"
  | "toppings"
  | "another"
  | "beverages"
  | "summary";

type PendingHotDog = {
  variety: HotDogVariety | null;
  quantity: number;
  sauces: string[];
  toppings: string[];
};

type PendingBeverage = Record<string, number>;

const formatPrice = (n: number) =>
  "$" +
  n
    .toLocaleString("es-AR")
    .replace(/,/g, ".")
    .replace(/\.00$/, "");

const STEP_LABELS: Record<Step, { title: string; step: number }> = {
  variety: { title: "Elegí tu pancho", step: 1 },
  sauces: { title: "Agregale salsas", step: 2 },
  toppings: { title: "Agregale toppings", step: 3 },
  another: { title: "¿Otro pancho más?", step: 4 },
  beverages: { title: "¿Algo para tomar?", step: 5 },
  summary: { title: "Resumen del pedido", step: 6 },
};

const STEP_LABELS_COMBO: Record<Step, { title: string; step: number }> = {
  variety: { title: "Tu combo ya incluye", step: 1 },
  sauces: { title: "Salsas para el pancho", step: 2 },
  toppings: { title: "Toppings para el pancho", step: 3 },
  another: { title: "¿Agregar algo más?", step: 4 },
  beverages: { title: "Bebidas de tu combo", step: 5 },
  summary: { title: "Resumen del combo", step: 6 },
};

const TOTAL_STEPS = 6;

function QtyControl({
  value,
  onChange,
  min = 1,
  size = "lg",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { wrap: { padding: "3px 4px", gap: 6 }, btn: 28, text: 14 },
    md: { wrap: { padding: "3px 5px", gap: 8 }, btn: 34, text: 17 },
    lg: { wrap: { padding: "4px 6px", gap: 10 }, btn: 40, text: 20 },
  };
  const s = sizes[size];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.wrap.gap,
        background:
          "linear-gradient(135deg,var(--color-bg-panel) 0%,var(--color-bg-surface) 100%)",
        borderRadius: 9999,
        padding: s.wrap.padding,
        width: "fit-content",
        flex: "none",
        alignSelf: "center",
        border: "2px solid var(--color-border-subtle)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
      }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        style={{
          width: s.btn,
          height: s.btn,
          borderRadius: "50%",
          border: "2px solid var(--color-black)",
          background: "linear-gradient(135deg,#2a2022 0%,#1f1718 100%)",
          color: value <= min ? "var(--color-text-secondary)" : "#ffffff",
          fontWeight: 900,
          cursor: value <= min ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: s.text,
          lineHeight: 1,
          flexShrink: 0,
          opacity: value <= min ? 0.45 : 1,
          transition: "all .15s ease",
          boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.4)",
        }}
      >
        −
      </button>
      <span
        style={{
          minWidth: size === "lg" ? 38 : size === "md" ? 32 : 24,
          textAlign: "center",
          fontWeight: 900,
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-display)",
          fontSize:
            size === "lg"
              ? "var(--text-2xl)"
              : size === "md"
                ? "var(--text-xl)"
                : "var(--text-lg)",
          userSelect: "none",
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        style={{
          width: s.btn,
          height: s.btn,
          borderRadius: "50%",
          border: "2px solid rgba(206,242,73,0.6)",
          background:
            "linear-gradient(135deg,var(--color-accent-primary) 0%,#98b81f 100%)",
          color: "var(--color-text-on-accent)",
          fontWeight: 900,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: s.text,
          lineHeight: 1,
          flexShrink: 0,
          transition: "all .15s ease",
          boxShadow:
            "0 4px 12px rgba(206,242,73,0.35), inset 0 -2px 4px rgba(0,0,0,0.2)",
        }}
      >
        +
      </button>
    </div>
  );
}

function ComboHeader({ combo }: { combo: Combo }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(206,242,73,0.18) 0%, rgba(31,23,24,0.6) 100%)",
        border: "1px solid var(--color-accent-primary)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-4)",
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "center",
      }}
    >
      <img
        src={combo.image}
        alt=""
        style={{
          width: 68,
          height: 68,
          objectFit: "contain",
          flexShrink: 0,
          filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.5))",
        }}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          style={{
            fontFamily: "var(--font-playful)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-accent-primary)",
          }}
        >
          {combo.tag}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            color: "var(--color-text-primary)",
          }}
        >
          {combo.title}
        </div>
        <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
          {combo.desc}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            color: "var(--color-accent-primary)",
            lineHeight: 1,
          }}
        >
          {combo.price}
        </div>
        <div
          style={{
            fontFamily: "var(--font-playful)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
            marginTop: 4,
          }}
        >
          {combo.note}
        </div>
      </div>
    </div>
  );
}

function IncludedBadge({ items }: { items: { title: string; subtitle?: string; image?: string; count?: number }[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        padding: "var(--space-3) var(--space-4)",
        background: "var(--color-bg-surface)",
        borderRadius: "var(--radius-card)",
        border: "1px dashed var(--color-accent-primary)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-playful)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-accent-primary)",
        }}
      >
        ✓ Ya incluido
      </div>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          {it.image && (
            <img
              src={it.image}
              alt=""
              style={{
                width: 28,
                height: 28,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          )}
          <span style={{ color: "var(--color-text-primary)", fontWeight: 700 }}>
            {it.count && it.count > 1 ? `${it.count}x ` : ""}
            {it.title}
          </span>
          {it.subtitle && (
            <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-xs)" }}>
              · {it.subtitle}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function OrderModal({
  open,
  onClose,
  initialCombo,
  onFinalize,
}: {
  open: boolean;
  onClose: () => void;
  initialCombo?: Combo;
  onFinalize?: () => void;
}) {
  const { addHotDog, addBeverage, addFries, totalPriceLabel } = useCart();
  const [step, setStep] = useState<Step>("variety");
  const [pending, setPending] = useState<PendingHotDog>({
    variety: null,
    quantity: 1,
    sauces: [],
    toppings: [],
  });
  const [beveragesQty, setBeveragesQty] = useState<PendingBeverage>({});
  const [finishedHotDogs, setFinishedHotDogs] = useState<PendingHotDog[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const isCombo = !!initialCombo;

  const stepLabels = isCombo ? STEP_LABELS_COMBO : STEP_LABELS;
  const label = stepLabels[step];

  useEffect(() => {
    if (!open) {
      setConfirmed(false);
      return;
    }
    if (initialCombo) {
      const variety =
        HOT_DOG_VARIETIES.find((h) => h.id === initialCombo.content.hotDogVarietyId) || null;
      setPending({
        variety,
        quantity: initialCombo.content.hotDogCount,
        sauces: [],
        toppings: [],
      });
      const bevQty: PendingBeverage = {};
      for (const b of initialCombo.content.beverages) {
        bevQty[b.beverageId] = (bevQty[b.beverageId] || 0) + b.count;
      }
      setBeveragesQty(bevQty);
      setFinishedHotDogs([]);
      setStep("sauces");
    } else {
      setStep("variety");
      setPending({ variety: null, quantity: 1, sauces: [], toppings: [] });
      setBeveragesQty({});
      setFinishedHotDogs([]);
    }
  }, [open, initialCombo]);

  if (!open) return null;

  const next = () => {
    if (step === "variety") setStep("sauces");
    else if (step === "sauces") setStep("toppings");
    else if (step === "toppings") setStep("another");
    else if (step === "another") setStep("beverages");
    else if (step === "beverages") setStep("summary");
  };

  const back = () => {
    if (step === "sauces") {
      if (isCombo) return;
      setStep("variety");
    } else if (step === "toppings") setStep("sauces");
    else if (step === "another") setStep("toppings");
    else if (step === "beverages") {
      if (finishedHotDogs.length > 0 || isCombo) setStep("another");
      else setStep("toppings");
    } else if (step === "summary") setStep("beverages");
  };

  const savePendingAndRestart = () => {
    setFinishedHotDogs((prev) => [...prev, { ...pending }]);
    setPending({ variety: null, quantity: 1, sauces: [], toppings: [] });
    setStep("variety");
  };

  const finishHotDogs = () => {
    if (pending.variety) {
      setFinishedHotDogs((prev) => [...prev, { ...pending }]);
    }
    setPending({ variety: null, quantity: 1, sauces: [], toppings: [] });
    setStep("beverages");
  };

  const confirmOrder = () => {
    const allHDs = [...finishedHotDogs];
    if (pending.variety && pending.quantity > 0) allHDs.push(pending);
    for (const hd of allHDs) {
      if (!hd.variety) continue;
      addHotDog(hd.variety, hd.sauces, hd.toppings, hd.quantity);
    }
    for (const [id, q] of Object.entries(beveragesQty)) {
      const bev = BEVERAGES.find((b) => b.id === id);
      if (bev && q > 0) addBeverage(bev, q);
    }
    if (initialCombo?.content.fries) {
      addFries(
        initialCombo.content.fries.name,
        initialCombo.content.fries.price,
        initialCombo.content.fries.image,
        initialCombo.content.fries.count,
      );
    }
    setConfirmed(true);
  };

  const closeAndReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div
      onClick={closeAndReset}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(31,10,12,0.82)",
        zIndex: "var(--z-modal-overlay)" as unknown as number,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-bg-base)",
          borderRadius: "var(--radius-card)",
          width: "min(960px, 96vw)",
          maxHeight: "94vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid var(--color-border-subtle)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            padding: "var(--space-5) var(--space-6)",
            borderBottom: "1px solid var(--color-border-subtle)",
            background: "var(--color-bg-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-4)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <div
              style={{
                fontFamily: "var(--font-playful)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-accent-primary)",
              }}
            >
              Paso {label.step} / {TOTAL_STEPS}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-2xl)",
                color: "var(--color-text-primary)",
              }}
            >
              {label.title}
            </div>
          </div>
          <button
            onClick={closeAndReset}
            aria-label="Cerrar"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid var(--color-border-subtle)",
              background: "var(--color-bg-panel)",
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--space-6)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          {confirmed ? (
            <div style={{ textAlign: "center", padding: "var(--space-8) var(--space-4)" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--color-accent-primary)",
                  color: "var(--color-text-on-accent)",
                  fontSize: 40,
                  margin: "0 auto var(--space-4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-3xl)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-2)",
                }}
              >
                ¡Pedido agregado al carrito!
              </div>
              <div style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-6)" }}>
                Total:{" "}
                <strong style={{ color: "var(--color-accent-primary)" }}>{totalPriceLabel}</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-3)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={closeAndReset}
                  style={{
                    background: "var(--color-black)",
                    color: "var(--color-accent-primary)",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    padding: "14px 28px",
                    fontWeight: 700,
                    fontFamily: "var(--font-ui)",
                    cursor: "pointer",
                  }}
                >
                  Seguir mirando
                </button>
                <button
                  onClick={() => {
                    setConfirmed(false);
                    if (onFinalize) onFinalize();
                    else onClose();
                  }}
                  style={{
                    background: "var(--color-accent-primary)",
                    color: "var(--color-text-on-accent)",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    padding: "14px 28px",
                    fontWeight: 700,
                    fontFamily: "var(--font-ui)",
                    cursor: "pointer",
                  }}
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          ) : step === "variety" ? (
            <VarietyStep pending={pending} setPending={setPending} next={next} />
          ) : step === "sauces" ? (
            <SaucesStep
              pending={pending}
              setPending={setPending}
              next={next}
              back={back}
              combo={initialCombo}
            />
          ) : step === "toppings" ? (
            <ToppingsStep
              pending={pending}
              setPending={setPending}
              next={next}
              back={back}
              combo={initialCombo}
            />
          ) : step === "another" ? (
            <AnotherStep
              pending={pending}
              finishedHotDogs={finishedHotDogs}
              onAddAnother={savePendingAndRestart}
              onContinue={finishHotDogs}
              back={back}
              combo={initialCombo}
              isCombo={isCombo}
            />
          ) : step === "beverages" ? (
            <BeveragesStep
              beveragesQty={beveragesQty}
              setBeveragesQty={setBeveragesQty}
              next={next}
              back={back}
              combo={initialCombo}
            />
          ) : (
            <SummaryStep
              finishedHotDogs={finishedHotDogs}
              pending={pending}
              beveragesQty={beveragesQty}
              combo={initialCombo}
              back={back}
              confirmOrder={confirmOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function VarietyStep({
  pending,
  setPending,
  next,
}: {
  pending: PendingHotDog;
  setPending: (p: PendingHotDog) => void;
  next: () => void;
}) {
  return (
    <>
      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
        Elegí una variedad y luego continuá para agregarle salsas y toppings.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "var(--space-4)",
        }}
      >
        {HOT_DOG_VARIETIES.map((v) => {
          const selected = pending.variety?.id === v.id;
          return (
            <div
              key={v.id}
              onClick={() => setPending({ ...pending, variety: v })}
              style={{
                cursor: "pointer",
                border: selected
                  ? "3px solid var(--color-accent-primary)"
                  : "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-4)",
                background: "var(--color-bg-surface)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-2)",
                boxShadow: selected
                  ? "0 0 0 6px rgba(206,242,73,0.14)"
                  : "0 8px 20px rgba(0,0,0,0.3)",
                transition: "all .2s ease",
                position: "relative",
              }}
            >
              <img
                src={v.image}
                alt={v.name}
                style={{
                  width: "100%",
                  height: 130,
                  objectFit: "contain",
                  filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.6))",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  color: "var(--color-text-primary)",
                  textAlign: "center",
                }}
              >
                {v.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-2xl)",
                  color: "var(--color-accent-primary)",
                }}
              >
                {v.priceLabel}
              </div>
              {selected && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--color-accent-primary)",
                    color: "var(--color-text-on-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 900,
                  }}
                >
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          flexWrap: "wrap",
          marginTop: "auto",
          paddingTop: "var(--space-4)",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            background: "var(--color-bg-surface)",
            padding: "var(--space-4) var(--space-5)",
            borderRadius: "var(--radius-card)",
            border: "2px solid var(--color-border-subtle)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <span
            style={{
              color: "var(--color-accent-primary)",
              fontFamily: "var(--font-playful)",
              fontWeight: 700,
              fontSize: "var(--text-xs)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Cantidad de panchos
          </span>
          <QtyControl
            size="lg"
            value={pending.quantity}
            onChange={(q) => setPending({ ...pending, quantity: q })}
          />
        </div>
        <button
          disabled={!pending.variety}
          onClick={next}
          style={{
            background: pending.variety ? "var(--color-accent-primary)" : "var(--color-bg-panel)",
            color: pending.variety
              ? "var(--color-text-on-accent)"
              : "var(--color-text-secondary)",
            border: "none",
            borderRadius: "var(--radius-full)",
            padding: "18px 34px",
            fontWeight: 900,
            fontFamily: "var(--font-ui)",
            cursor: pending.variety ? "pointer" : "not-allowed",
            opacity: pending.variety ? 1 : 0.5,
            fontSize: "var(--text-lg)",
          }}
        >
          Continuar →
        </button>
      </div>
    </>
  );
}

function SaucesStep({
  pending,
  setPending,
  next,
  back,
  combo,
}: {
  pending: PendingHotDog;
  setPending: (p: PendingHotDog) => void;
  next: () => void;
  back: () => void;
  combo?: Combo;
}) {
  const toggle = (id: string) => {
    const exists = pending.sauces.includes(id);
    setPending({
      ...pending,
      sauces: exists ? pending.sauces.filter((s) => s !== id) : [...pending.sauces, id],
    });
  };

  const none = pending.sauces.length === 0;

  return (
    <>
      {combo && <ComboHeader combo={combo} />}

      {pending.variety && (
        <IncludedBadge
          items={[
            {
              title: pending.variety.name,
              subtitle: pending.quantity > 1 ? `${pending.quantity} unidades` : undefined,
              image: pending.variety.image,
              count: pending.quantity,
            },
            ...(combo?.content.fries
              ? [
                  {
                    title: combo.content.fries.name,
                    image: combo.content.fries.image,
                    count: combo.content.fries.count,
                  },
                ]
              : []),
          ]}
        />
      )}

      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
        Elegí todas las salsas que quieras para tu pancho. Podés seleccionar varias o ninguna.
      </p>

      <button
        onClick={() => setPending({ ...pending, sauces: [] })}
        style={{
          alignSelf: "flex-start",
          padding: "12px 24px",
          borderRadius: "var(--radius-full)",
          border: none
            ? "2px solid var(--color-accent-primary)"
            : "1px solid var(--color-border-subtle)",
          background: none
            ? "rgba(206,242,73,0.12)"
            : "var(--color-bg-surface)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-ui)",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {none ? "✓ " : ""}No agregar salsa
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "var(--space-3)",
        }}
      >
        {ORDER_SAUCES.map((s) => {
          const active = pending.sauces.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              style={{
                border: active
                  ? "3px solid var(--color-accent-primary)"
                  : "1px solid var(--color-border-subtle)",
                background: active ? "rgba(206,242,73,0.1)" : "var(--color-bg-surface)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-3)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                textAlign: "left",
              }}
            >
              <img
                src={s.image}
                alt=""
                style={{
                  width: 32,
                  height: 32,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{s.name}</span>
              {active && (
                <span
                  style={{
                    color: "var(--color-accent-primary)",
                    fontWeight: 900,
                    fontSize: "var(--text-lg)",
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <FooterActions
        showBack={!combo}
        onBack={back}
        nextLabel="Continuar →"
        onNext={next}
      />
    </>
  );
}

function ToppingsStep({
  pending,
  setPending,
  next,
  back,
  combo,
}: {
  pending: PendingHotDog;
  setPending: (p: PendingHotDog) => void;
  next: () => void;
  back: () => void;
  combo?: Combo;
}) {
  const toggle = (id: string) => {
    const exists = pending.toppings.includes(id);
    setPending({
      ...pending,
      toppings: exists
        ? pending.toppings.filter((s) => s !== id)
        : [...pending.toppings, id],
    });
  };

  const none = pending.toppings.length === 0;

  const sauceName = (id: string) => ORDER_SAUCES.find((s) => s.id === id)?.name;

  return (
    <>
      {combo && <ComboHeader combo={combo} />}

      {pending.variety && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            padding: "var(--space-3) var(--space-4)",
            background: "var(--color-bg-surface)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-playful)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-accent-primary)",
            }}
          >
            Tu pancho hasta ahora
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <img
              src={pending.variety.image}
              alt=""
              style={{ width: 40, height: 40, objectFit: "contain" }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--color-text-primary)", fontWeight: 800 }}>
                {pending.quantity > 1 ? `${pending.quantity}x ` : ""}
                {pending.variety.name}
              </div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
                Salsas:{" "}
                <span style={{ color: "var(--color-text-primary)" }}>
                  {pending.sauces.length === 0
                    ? "Ninguna"
                    : pending.sauces.map(sauceName).join(", ")}
                </span>
              </div>
            </div>
          </div>
          {combo?.content.fries && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                paddingTop: "var(--space-2)",
                borderTop: "1px dashed var(--color-accent-primary)",
              }}
            >
              <img
                src={combo.content.fries.image}
                alt=""
                style={{ width: 32, height: 32, objectFit: "contain" }}
              />
              <span style={{ color: "var(--color-text-primary)", fontWeight: 700 }}>
                {combo.content.fries.count > 1 ? `${combo.content.fries.count}x ` : ""}
                {combo.content.fries.name}
                <span
                  style={{
                    fontFamily: "var(--font-playful)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-accent-primary)",
                    marginLeft: 8,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  incluido
                </span>
              </span>
            </div>
          )}
        </div>
      )}

      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
        Ahora los toppings. ¡Todos gratis, elegí todos los que quieras!
      </p>

      <button
        onClick={() => setPending({ ...pending, toppings: [] })}
        style={{
          alignSelf: "flex-start",
          padding: "12px 24px",
          borderRadius: "var(--radius-full)",
          border: none
            ? "2px solid var(--color-accent-primary)"
            : "1px solid var(--color-border-subtle)",
          background: none
            ? "rgba(206,242,73,0.12)"
            : "var(--color-bg-surface)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-ui)",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {none ? "✓ " : ""}No agregar toppings
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "var(--space-3)",
        }}
      >
        {ORDER_TOPPINGS.map((t) => {
          const active = pending.toppings.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              style={{
                border: active
                  ? "3px solid var(--color-accent-primary)"
                  : "1px solid var(--color-border-subtle)",
                background: active ? "rgba(206,242,73,0.1)" : "var(--color-bg-surface)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-3)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                textAlign: "left",
              }}
            >
              <img
                src={t.image}
                alt=""
                style={{
                  width: 32,
                  height: 32,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{t.name}</span>
              {active && (
                <span
                  style={{
                    color: "var(--color-accent-primary)",
                    fontWeight: 900,
                    fontSize: "var(--text-lg)",
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <FooterActions showBack onBack={back} nextLabel="Continuar →" onNext={next} />
    </>
  );
}

function AnotherStep({
  pending,
  finishedHotDogs,
  onAddAnother,
  onContinue,
  back,
  combo,
  isCombo,
}: {
  pending: PendingHotDog;
  finishedHotDogs: PendingHotDog[];
  onAddAnother: () => void;
  onContinue: () => void;
  back: () => void;
  combo?: Combo;
  isCombo: boolean;
}) {
  const all = [...finishedHotDogs];
  if (pending.variety) all.push(pending);
  const total = all.reduce((acc, hd) => {
    return acc + (hd.variety ? hd.variety.price * hd.quantity : 0);
  }, 0);

  const sauceName = (id: string) => ORDER_SAUCES.find((s) => s.id === id)?.name;
  const toppingName = (id: string) => ORDER_TOPPINGS.find((t) => t.id === id)?.name;

  return (
    <>
      {combo && <ComboHeader combo={combo} />}

      {combo?.content.fries && (
        <IncludedBadge
          items={[
            {
              title: combo.content.fries.name,
              image: combo.content.fries.image,
              count: combo.content.fries.count,
            },
          ]}
        />
      )}

      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
        {isCombo
          ? "Revisá el pancho de tu combo. ¿Querés agregar otro pancho extra o seguimos con las bebidas?"
          : "Este es tu pancho. ¿Querés armar otro más o seguimos con bebidas?"}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {all.map((hd, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-card)",
              padding: "var(--space-4)",
              display: "flex",
              gap: "var(--space-4)",
              alignItems: "center",
            }}
          >
            <img
              src={hd.variety?.image}
              alt=""
              style={{
                width: 72,
                height: 72,
                objectFit: "contain",
                flexShrink: 0,
                filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.5))",
              }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  {hd.quantity}x {hd.variety?.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-accent-primary)",
                    fontSize: "var(--text-xl)",
                  }}
                >
                  {hd.variety ? formatPrice(hd.variety.price * hd.quantity) : ""}
                </div>
              </div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                <div>
                  Salsas:{" "}
                  <span style={{ color: "var(--color-text-primary)" }}>
                    {hd.sauces.length === 0 ? "Ninguna" : hd.sauces.map(sauceName).join(", ")}
                  </span>
                </div>
                <div>
                  Toppings:{" "}
                  <span style={{ color: "var(--color-text-primary)" }}>
                    {hd.toppings.length === 0
                      ? "Ninguno"
                      : hd.toppings.map(toppingName).join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-5)",
          background: "var(--color-bg-panel)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border-subtle)",
        }}
      >
        <span
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
          }}
        >
          Subtotal parcial
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            color: "var(--color-accent-primary)",
          }}
        >
          {formatPrice(total)}
        </span>
      </div>

      <FooterActions
        showBack
        onBack={back}
        nextLabel="Continuar con bebidas →"
        onNext={onContinue}
        extraButton={
          <button
            onClick={onAddAnother}
            style={{
              background: "var(--color-black)",
              color: "var(--color-accent-primary)",
              border: "1px solid var(--color-accent-primary)",
              borderRadius: "var(--radius-full)",
              padding: "14px 24px",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
              cursor: "pointer",
            }}
          >
            + Agregar otro pancho
          </button>
        }
      />
    </>
  );
}

function BeveragesStep({
  beveragesQty,
  setBeveragesQty,
  next,
  back,
  combo,
}: {
  beveragesQty: PendingBeverage;
  setBeveragesQty: (b: PendingBeverage) => void;
  next: () => void;
  back: () => void;
  combo?: Combo;
}) {
  const hasAny = Object.values(beveragesQty).some((q) => q > 0);
  const preselected = combo?.content.beverages || [];
  const preselectedIds = preselected.map((b) => b.beverageId);

  return (
    <>
      {combo && <ComboHeader combo={combo} />}

      {preselected.length > 0 && (
        <IncludedBadge
          items={preselected.map((b) => {
            const bev = BEVERAGES.find((x) => x.id === b.beverageId);
            return {
              title: bev?.name || "Bebida",
              subtitle: bev?.priceLabel,
              image: bev?.image,
              count: b.count,
            };
          })}
        />
      )}

      {combo?.content.fries && (
        <IncludedBadge
          items={[
            {
              title: combo.content.fries.name,
              image: combo.content.fries.image,
              count: combo.content.fries.count,
            },
          ]}
        />
      )}

      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
        {combo
          ? "Estas son las bebidas de tu combo. Podés cambiar la cantidad o agregar más."
          : "Elegí lo que quieras para tomar. Usá el + para agregar."}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "var(--space-3)",
        }}
      >
        {BEVERAGES.map((b) => {
          const q = beveragesQty[b.id] || 0;
          const selected = q > 0;
          const isComboDefault = preselectedIds.includes(b.id);
          return (
            <div
              key={b.id}
              style={{
                background: "var(--color-bg-surface)",
                border: selected
                  ? "3px solid var(--color-accent-primary)"
                  : "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-3)",
                position: "relative",
              }}
            >
              {isComboDefault && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    padding: "4px 10px",
                    borderRadius: 9999,
                    background: "var(--color-accent-primary)",
                    color: "var(--color-text-on-accent)",
                    fontFamily: "var(--font-playful)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 800,
                  }}
                >
                  Incluido
                </div>
              )}
              <img
                src={b.image}
                alt={b.name}
                style={{
                  width: "100%",
                  height: 110,
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.5))",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  fontSize: "var(--text-base)",
                  textAlign: "center",
                }}
              >
                {b.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-accent-primary)",
                  fontSize: "var(--text-xl)",
                }}
              >
                {b.priceLabel}
              </div>
              <QtyControl
                size="lg"
                value={q}
                min={0}
                onChange={(nq) =>
                  setBeveragesQty({
                    ...beveragesQty,
                    [b.id]: nq,
                  })
                }
              />
            </div>
          );
        })}
      </div>

      {!hasAny && !combo && (
        <button
          onClick={() => next()}
          style={{
            alignSelf: "flex-start",
            padding: "14px 26px",
            borderRadius: "var(--radius-full)",
            border: "1px dashed var(--color-border-subtle)",
            background: "transparent",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Omitir y no agregar bebidas
        </button>
      )}

      <FooterActions
        showBack
        onBack={back}
        nextLabel="Ver resumen →"
        onNext={next}
      />
    </>
  );
}

function SummaryStep({
  finishedHotDogs,
  pending,
  beveragesQty,
  combo,
  back,
  confirmOrder,
}: {
  finishedHotDogs: PendingHotDog[];
  pending: PendingHotDog;
  beveragesQty: PendingBeverage;
  combo?: Combo;
  back: () => void;
  confirmOrder: () => void;
}) {
  const allHD = [...finishedHotDogs];
  if (pending.variety && pending.quantity > 0) allHD.push(pending);

  const hotDogsTotal = allHD.reduce(
    (acc, hd) => acc + (hd.variety ? hd.variety.price * hd.quantity : 0),
    0,
  );
  const beveragesSubtotal = Object.entries(beveragesQty).reduce((acc, [id, q]) => {
    const bev = BEVERAGES.find((b) => b.id === id);
    return acc + (bev ? bev.price * q : 0);
  }, 0);
  const friesPrice = combo?.content.fries ? combo.content.fries.price * combo.content.fries.count : 0;

  const total = useMemo(() => {
    if (combo) {
      return combo.priceNumber;
    }
    return hotDogsTotal + beveragesSubtotal + friesPrice;
  }, [combo, hotDogsTotal, beveragesSubtotal, friesPrice]);

  const totalHdCount = allHD.reduce((acc, hd) => acc + hd.quantity, 0);
  const totalBevCount = Object.values(beveragesQty).reduce((a, b) => a + b, 0);

  const sauceName = (id: string) => ORDER_SAUCES.find((s) => s.id === id)?.name;
  const toppingName = (id: string) => ORDER_TOPPINGS.find((t) => t.id === id)?.name;

  const beverageList = Object.entries(beveragesQty).filter(([, q]) => q > 0);

  return (
    <>
      {combo && <ComboHeader combo={combo} />}

      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
        Revisá tu pedido. Si todo está bien, confirmá para agregarlo al carrito.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <div
          style={{
            fontFamily: "var(--font-playful)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-accent-primary)",
          }}
        >
          Panchos ({totalHdCount})
        </div>
        {allHD.map((hd, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-card)",
              padding: "var(--space-4)",
              display: "flex",
              gap: "var(--space-4)",
              alignItems: "center",
            }}
          >
            <img
              src={hd.variety?.image}
              alt=""
              style={{
                width: 56,
                height: 56,
                objectFit: "contain",
                flexShrink: 0,
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.4))",
              }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  {hd.quantity}x {hd.variety?.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-accent-primary)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  {hd.variety ? formatPrice(hd.variety.price * hd.quantity) : ""}
                </div>
              </div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                {hd.sauces.length > 0 && (
                  <div>Salsas: {hd.sauces.map(sauceName).join(", ")}</div>
                )}
                {hd.toppings.length > 0 && (
                  <div>Toppings: {hd.toppings.map(toppingName).join(", ")}</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {combo?.content.fries && (
          <div
            style={{
              background: "var(--color-bg-surface)",
              border: "1px dashed var(--color-accent-primary)",
              borderRadius: "var(--radius-card)",
              padding: "var(--space-3) var(--space-4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            <img
              src={combo.content.fries.image}
              alt=""
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, color: "var(--color-text-primary)", fontWeight: 700 }}>
              {combo.content.fries.count > 1
                ? `${combo.content.fries.count}x `
                : ""}
              {combo.content.fries.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-playful)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-accent-primary)",
                fontWeight: 800,
              }}
            >
              incluido
            </div>
          </div>
        )}

        {beverageList.length > 0 && (
          <>
            <div
              style={{
                fontFamily: "var(--font-playful)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-accent-primary)",
                marginTop: "var(--space-2)",
              }}
            >
              Bebidas ({totalBevCount})
            </div>
            {beverageList.map(([id, q]) => {
              const bev = BEVERAGES.find((b) => b.id === id) as Beverage;
              return (
                <div
                  key={id}
                  style={{
                    background: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "var(--radius-card)",
                    padding: "var(--space-3) var(--space-4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                  }}
                >
                  <img
                    src={bev.image}
                    alt=""
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, color: "var(--color-text-primary)", fontWeight: 700 }}>
                    {q}x {bev.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-accent-primary)",
                    }}
                  >
                    {formatPrice(bev.price * q)}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-5)",
          background:
            "linear-gradient(135deg,var(--color-green-olive-dark) 0%,var(--color-black-soft) 100%)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-accent-primary)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-playful)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-accent-primary)",
              marginBottom: 4,
            }}
          >
            {combo ? "Precio del combo" : "Total del pedido"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-3xl)",
              color: "var(--color-text-primary)",
            }}
          >
            {formatPrice(total)}
          </div>
        </div>
      </div>

      <FooterActions
        showBack
        onBack={back}
        nextLabel="✓ Confirmar y agregar al carrito"
        onNext={confirmOrder}
        nextPrimary
      />
    </>
  );
}

function FooterActions({
  showBack,
  onBack,
  nextLabel,
  onNext,
  extraButton,
  nextPrimary = false,
}: {
  showBack: boolean;
  onBack: () => void;
  nextLabel: string;
  onNext: () => void;
  extraButton?: React.ReactNode;
  nextPrimary?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        flexWrap: "wrap",
        marginTop: "auto",
        paddingTop: "var(--space-4)",
        borderTop: "1px solid var(--color-border-subtle)",
      }}
    >
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        {showBack && (
          <button
            onClick={onBack}
            style={{
              background: "var(--color-bg-panel)",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-full)",
              padding: "14px 24px",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
              cursor: "pointer",
            }}
          >
            ← Atrás
          </button>
        )}
        {extraButton}
      </div>
      <button
        onClick={onNext}
        style={{
          background: "var(--color-accent-primary)",
          color: "var(--color-text-on-accent)",
          border: "none",
          borderRadius: "var(--radius-full)",
          padding: nextPrimary ? "18px 34px" : "16px 30px",
          fontWeight: nextPrimary ? 900 : 800,
          fontFamily: "var(--font-ui)",
          cursor: "pointer",
          fontSize: nextPrimary ? "var(--text-lg)" : "var(--text-base)",
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
}
