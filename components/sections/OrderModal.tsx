"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import {
  BEVERAGES,
  Beverage,
  Combo,
  HOT_DOG_VARIETIES,
  HotDogVariety,
  ORDER_SAUCES,
  ORDER_TOPPINGS,
} from "../../data/menu";

type Step = "variety" | "customize" | "another" | "beverages" | "summary";

// One PendingUnit = one physical pancho, so quantity never hides a mix of
// different toppings/sauces: every unit, even of the same variety, is its
// own customizable pancho.
type PendingUnit = {
  id: string;
  variety: HotDogVariety;
  sauces: string[];
  toppings: string[];
};

type PendingHotDog = {
  units: PendingUnit[];
};

type PendingVarietyQty = {
  variety: HotDogVariety;
  quantity: number;
  sauces: string[];
  toppings: string[];
};

type PendingBeverage = Record<string, number>;

const makeUnitId = () => Math.random().toString(36).slice(2, 10);

// Collapses units that share variety + sauces + toppings into a single
// display row with a quantity, purely for rendering/cart purposes.
function groupUnits(units: PendingUnit[]): PendingVarietyQty[] {
  const groups: PendingVarietyQty[] = [];
  for (const u of units) {
    const existing = groups.find(
      (g) =>
        g.variety.id === u.variety.id &&
        g.sauces.length === u.sauces.length &&
        g.sauces.every((s) => u.sauces.includes(s)) &&
        g.toppings.length === u.toppings.length &&
        g.toppings.every((t) => u.toppings.includes(t)),
    );
    if (existing) existing.quantity += 1;
    else groups.push({ variety: u.variety, quantity: 1, sauces: u.sauces, toppings: u.toppings });
  }
  return groups;
}

const formatPrice = (n: number) =>
  "$" +
  n
    .toLocaleString("es-AR")
    .replace(/,/g, ".")
    .replace(/\.00$/, "");

const STEP_LABELS: Record<Step, { title: string; step: number }> = {
  variety: { title: "Elegí tu pancho", step: 1 },
  customize: { title: "Personalizá cada pancho", step: 2 },
  another: { title: "¿Otro pancho más?", step: 3 },
  beverages: { title: "¿Algo para tomar?", step: 4 },
  summary: { title: "Resumen del pedido", step: 5 },
};

const STEP_LABELS_COMBO: Record<Step, { title: string; step: number }> = {
  variety: { title: "Tu combo ya incluye", step: 1 },
  customize: { title: "Personalizá tu pancho", step: 2 },
  another: { title: "¿Agregar algo más?", step: 3 },
  beverages: { title: "Bebidas de tu combo", step: 4 },
  summary: { title: "Resumen del combo", step: 5 },
};

const TOTAL_STEPS = 5;

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
  const [pending, setPending] = useState<PendingHotDog>({ units: [] });
  const [beveragesQty, setBeveragesQty] = useState<PendingBeverage>({});
  const [finishedHotDogs, setFinishedHotDogs] = useState<PendingHotDog[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const isCombo = !!initialCombo;

  const stepLabels = isCombo ? STEP_LABELS_COMBO : STEP_LABELS;
  const label = stepLabels[step];

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) {
      setConfirmed(false);
      return;
    }
    if (initialCombo) {
      const variety = HOT_DOG_VARIETIES.find(
        (h) => h.id === initialCombo.content.hotDogVarietyId,
      );
      setPending({
        units: variety
          ? Array.from({ length: initialCombo.content.hotDogCount }, () => ({
              id: makeUnitId(),
              variety,
              sauces: [],
              toppings: [],
            }))
          : [],
      });
      const bevQty: PendingBeverage = {};
      for (const b of initialCombo.content.beverages) {
        bevQty[b.beverageId] = (bevQty[b.beverageId] || 0) + b.count;
      }
      setBeveragesQty(bevQty);
      setFinishedHotDogs([]);
      setStep("customize");
    } else {
      setStep("variety");
      setPending({ units: [] });
      setBeveragesQty({});
      setFinishedHotDogs([]);
    }
  }, [open, initialCombo]);

  if (!open) return null;

  const next = () => {
    if (step === "variety") setStep("customize");
    else if (step === "customize") setStep("another");
    else if (step === "another") setStep("beverages");
    else if (step === "beverages") setStep("summary");
  };

  const back = () => {
    if (step === "customize") {
      if (isCombo) return;
      setStep("variety");
    } else if (step === "another") setStep("customize");
    else if (step === "beverages") {
      if (finishedHotDogs.length > 0 || isCombo) setStep("another");
      else setStep("customize");
    } else if (step === "summary") setStep("beverages");
  };

  const savePendingAndRestart = () => {
    setFinishedHotDogs((prev) => [...prev, { ...pending }]);
    setPending({ units: [] });
    setStep("variety");
  };

  const finishHotDogs = () => {
    if (pending.units.length > 0) {
      setFinishedHotDogs((prev) => [...prev, { ...pending }]);
    }
    setPending({ units: [] });
    setStep("beverages");
  };

  const confirmOrder = () => {
    const allHDs = [...finishedHotDogs];
    if (pending.units.length > 0) allHDs.push(pending);
    for (const hd of allHDs) {
      for (const g of groupUnits(hd.units)) {
        addHotDog(g.variety, g.sauces, g.toppings, g.quantity);
      }
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
        background: "rgba(0,0,0,0.75)",
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
              background: "var(--color-bg-surface)",
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
          ) : step === "customize" ? (
            <CustomizeStep
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
  const qtyFor = (id: string) => pending.units.filter((u) => u.variety.id === id).length;

  const setQty = (variety: HotDogVariety, q: number) => {
    const current = pending.units.filter((u) => u.variety.id === variety.id);
    const others = pending.units.filter((u) => u.variety.id !== variety.id);
    const updated =
      q <= current.length
        ? current.slice(0, q)
        : [
            ...current,
            ...Array.from({ length: q - current.length }, () => ({
              id: makeUnitId(),
              variety,
              sauces: [] as string[],
              toppings: [] as string[],
            })),
          ];
    setPending({ ...pending, units: [...others, ...updated] });
  };

  const totalQty = pending.units.length;

  return (
    <>
      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
        Elegí uno o varios panchos y la cantidad de cada uno. Después le agregás salsas y
        toppings.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "var(--space-4)",
        }}
      >
        {HOT_DOG_VARIETIES.map((v) => {
          const qty = qtyFor(v.id);
          const selected = qty > 0;
          return (
            <div
              key={v.id}
              style={{
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
              <QtyControl size="md" value={qty} min={0} onChange={(q) => setQty(v, q)} />
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
          justifyContent: "flex-end",
          gap: "var(--space-4)",
          flexWrap: "wrap",
          marginTop: "auto",
          paddingTop: "var(--space-4)",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <button
          disabled={totalQty === 0}
          onClick={next}
          style={{
            background: totalQty > 0 ? "var(--color-accent-primary)" : "var(--color-bg-surface)",
            color: totalQty > 0 ? "var(--color-text-on-accent)" : "var(--color-text-secondary)",
            border: "none",
            borderRadius: "var(--radius-full)",
            padding: "18px 34px",
            fontWeight: 900,
            fontFamily: "var(--font-ui)",
            cursor: totalQty > 0 ? "pointer" : "not-allowed",
            opacity: totalQty > 0 ? 1 : 0.5,
            fontSize: "var(--text-lg)",
          }}
        >
          Continuar →
        </button>
      </div>
    </>
  );
}

function VarietyAccordion({
  entry,
  title,
  expanded,
  onToggleExpanded,
  onChangeSauces,
  onChangeToppings,
}: {
  entry: PendingUnit;
  title: string;
  expanded: boolean;
  onToggleExpanded: () => void;
  onChangeSauces: (sauces: string[]) => void;
  onChangeToppings: (toppings: string[]) => void;
}) {
  const { variety, sauces, toppings } = entry;

  const toggleSauce = (id: string) => {
    onChangeSauces(sauces.includes(id) ? sauces.filter((s) => s !== id) : [...sauces, id]);
  };
  const toggleTopping = (id: string) => {
    onChangeToppings(
      toppings.includes(id) ? toppings.filter((s) => s !== id) : [...toppings, id],
    );
  };

  const summary =
    sauces.length === 0 && toppings.length === 0
      ? "Sin salsas ni toppings"
      : `${sauces.length} salsa${sauces.length === 1 ? "" : "s"} · ${toppings.length} topping${toppings.length === 1 ? "" : "s"}`;

  return (
    <div
      style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggleExpanded}
        style={{
          width: "100%",
          padding: "var(--space-4)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          textAlign: "left",
        }}
      >
        <img
          src={variety.image}
          alt=""
          style={{ width: 52, height: 52, objectFit: "contain", flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-lg)",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
            {summary}
          </div>
        </div>
        <span
          style={{
            color: "var(--color-accent-primary)",
            fontSize: "var(--text-lg)",
            fontWeight: 700,
            flexShrink: 0,
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform .2s ease",
          }}
        >
          ▾
        </span>
      </button>

      {expanded && (
        <div
          style={{
            padding: "0 var(--space-4) var(--space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <div
              style={{
                fontFamily: "var(--font-playful)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-accent-primary)",
              }}
            >
              Salsas
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
                gap: "var(--space-2)",
              }}
            >
              {ORDER_SAUCES.map((s) => {
                const active = sauces.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSauce(s.id)}
                    style={{
                      border: active
                        ? "2px solid var(--color-accent-primary)"
                        : "1px solid var(--color-border-subtle)",
                      background: active ? "rgba(206,242,73,0.1)" : "var(--color-bg-surface)",
                      borderRadius: "var(--radius-card)",
                      padding: "8px 10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: "var(--text-xs)",
                      textAlign: "left",
                    }}
                  >
                    <img src={s.image} alt="" style={{ width: 22, height: 22, objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{s.name}</span>
                    {active && <span style={{ color: "var(--color-accent-primary)", fontWeight: 900 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <div
              style={{
                fontFamily: "var(--font-playful)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-accent-primary)",
              }}
            >
              Toppings
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
                gap: "var(--space-2)",
              }}
            >
              {ORDER_TOPPINGS.map((t) => {
                const active = toppings.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleTopping(t.id)}
                    style={{
                      border: active
                        ? "2px solid var(--color-accent-primary)"
                        : "1px solid var(--color-border-subtle)",
                      background: active ? "rgba(206,242,73,0.1)" : "var(--color-bg-surface)",
                      borderRadius: "var(--radius-card)",
                      padding: "8px 10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: "var(--text-xs)",
                      textAlign: "left",
                    }}
                  >
                    <img src={t.image} alt="" style={{ width: 22, height: 22, objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{t.name}</span>
                    {active && <span style={{ color: "var(--color-accent-primary)", fontWeight: 900 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomizeStep({
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
  const orderedUnits = useMemo(() => {
    const order = HOT_DOG_VARIETIES.map((v) => v.id);
    return [...pending.units].sort(
      (a, b) => order.indexOf(a.variety.id) - order.indexOf(b.variety.id),
    );
  }, [pending.units]);

  const [expandedId, setExpandedId] = useState<string | null>(orderedUnits[0]?.id ?? null);

  const updateUnit = (unitId: string, patch: Partial<PendingUnit>) => {
    setPending({
      ...pending,
      units: pending.units.map((u) => (u.id === unitId ? { ...u, ...patch } : u)),
    });
  };

  const varietyTotals = new Map<string, number>();
  for (const u of orderedUnits) {
    varietyTotals.set(u.variety.id, (varietyTotals.get(u.variety.id) || 0) + 1);
  }
  const seenSoFar = new Map<string, number>();
  const titleFor = (unit: PendingUnit) => {
    const total = varietyTotals.get(unit.variety.id) || 1;
    const idx = (seenSoFar.get(unit.variety.id) || 0) + 1;
    seenSoFar.set(unit.variety.id, idx);
    return total > 1 ? `${unit.variety.name} (pancho ${idx} de ${total})` : unit.variety.name;
  };

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
        Tocá cada pancho para elegirle sus propias salsas y toppings.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {orderedUnits.map((unit) => (
          <VarietyAccordion
            key={unit.id}
            entry={unit}
            title={titleFor(unit)}
            expanded={expandedId === unit.id}
            onToggleExpanded={() => setExpandedId((cur) => (cur === unit.id ? null : unit.id))}
            onChangeSauces={(sauces) => updateUnit(unit.id, { sauces })}
            onChangeToppings={(toppings) => updateUnit(unit.id, { toppings })}
          />
        ))}
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
  if (pending.units.length > 0) all.push(pending);
  const groupTotal = (hd: PendingHotDog) =>
    hd.units.reduce((acc, u) => acc + u.variety.price, 0);
  const total = all.reduce((acc, hd) => acc + groupTotal(hd), 0);

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
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {groupUnits(hd.units).map((x, gi) => (
              <div
                key={`${x.variety.id}-${gi}`}
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  alignItems: "flex-start",
                  paddingBottom: "var(--space-2)",
                  borderBottom: "1px dashed var(--color-border-subtle)",
                }}
              >
                <img
                  src={x.variety.image}
                  alt=""
                  style={{
                    width: 64,
                    height: 64,
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
                      {x.quantity}x {x.variety.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-accent-primary)",
                        fontSize: "var(--text-xl)",
                      }}
                    >
                      {formatPrice(x.variety.price * x.quantity)}
                    </div>
                  </div>
                  <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                    <div>
                      Salsas:{" "}
                      <span style={{ color: "var(--color-text-primary)" }}>
                        {x.sauces.length === 0 ? "Ninguna" : x.sauces.map(sauceName).join(", ")}
                      </span>
                    </div>
                    <div>
                      Toppings:{" "}
                      <span style={{ color: "var(--color-text-primary)" }}>
                        {x.toppings.length === 0
                          ? "Ninguno"
                          : x.toppings.map(toppingName).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-5)",
          background: "var(--color-bg-surface)",
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
  if (pending.units.length > 0) allHD.push(pending);

  const groupTotal = (hd: PendingHotDog) =>
    hd.units.reduce((acc, u) => acc + u.variety.price, 0);
  const hotDogsTotal = allHD.reduce((acc, hd) => acc + groupTotal(hd), 0);
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

  const totalHdCount = allHD.reduce((acc, hd) => acc + hd.units.length, 0);
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
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {groupUnits(hd.units).map((x, gi) => (
              <div
                key={`${x.variety.id}-${gi}`}
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  alignItems: "flex-start",
                  paddingBottom: "var(--space-2)",
                  borderBottom: "1px dashed var(--color-border-subtle)",
                }}
              >
                <img
                  src={x.variety.image}
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
                      {x.quantity}x {x.variety.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-accent-primary)",
                        fontSize: "var(--text-lg)",
                      }}
                    >
                      {formatPrice(x.variety.price * x.quantity)}
                    </div>
                  </div>
                  {(x.sauces.length > 0 || x.toppings.length > 0) && (
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                      {x.sauces.length > 0 && (
                        <div>Salsas: {x.sauces.map(sauceName).join(", ")}</div>
                      )}
                      {x.toppings.length > 0 && (
                        <div>Toppings: {x.toppings.map(toppingName).join(", ")}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
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
              background: "var(--color-bg-surface)",
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
