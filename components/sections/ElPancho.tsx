"use client";

import { Button } from "../ui/Button";

export function ElPancho({ onGoToppings }: { onGoToppings: () => void }) {
  return (
    <section
      id="sec-pancho"
      data-screen-label="El pancho"
      style={{
        position: "relative",
        padding: "var(--space-24) var(--space-4)",
        background: "var(--color-bg-base)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          backgroundImage: "url(/assets/backgrounds/graffiti-3.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.14,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background: "radial-gradient(70% 55% at 50% 45%,rgba(139,26,38,0.45),transparent 70%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <img
          data-parallax="0.4"
          src="/assets/products/pancho-chili.webp"
          alt=""
          style={{
            position: "absolute",
            left: "4%",
            top: "12%",
            width: 120,
            opacity: 0.28,
            filter: "blur(2px)",
            transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="0.5"
          src="/assets/products/pancho-clasico.webp"
          alt=""
          style={{
            position: "absolute",
            right: "6%",
            top: "16%",
            width: 140,
            opacity: 0.3,
            filter: "blur(2px)",
            transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="0.7"
          src="/assets/products/pancho-clasico.webp"
          alt=""
          style={{
            position: "absolute",
            left: "9%",
            bottom: "10%",
            width: 170,
            opacity: 0.4,
            filter: "blur(1px)",
            transition: "transform 0.45s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="0.85"
          src="/assets/products/pancho-chili.webp"
          alt=""
          style={{
            position: "absolute",
            right: "8%",
            bottom: "6%",
            width: 190,
            opacity: 0.42,
            filter: "blur(1px)",
            transition: "transform 0.45s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="1.2"
          src="/assets/products/cono-papas.webp"
          alt=""
          style={{
            position: "absolute",
            left: "21%",
            top: "56%",
            width: 110,
            opacity: 0.5,
            transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="1.4"
          src="/assets/toppings/mayonesas.png"
          alt=""
          style={{
            position: "absolute",
            right: "19%",
            top: "6%",
            width: 120,
            opacity: 0.45,
            transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          }}
        />
      </div>
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          alignItems: "center",
          gap: "var(--space-10)",
          position: "relative",
        }}
      >
        <div
          data-parallax="0.25"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
            transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero-headline)",
              lineHeight: 0.95,
              color: "var(--color-text-primary)",
              textWrap: "balance",
            }}
          >
            ARMÁ TU PANCHO
            <br />
            <span style={{ color: "var(--color-accent-primary)" }}>COMO QUIERAS</span>
          </div>
          <p
            style={{
              margin: 0,
              maxWidth: "36ch",
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-relaxed)",
              textWrap: "pretty",
            }}
          >
            Pan, salchicha y hasta 4 toppings de la barra. Vos elegís todo, nosotros lo armamos al
            toque.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", flexWrap: "wrap" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-6xl)",
                lineHeight: 1,
                color: "var(--color-accent-primary)",
                textShadow: "0 10px 24px rgba(15,5,6,0.6)",
              }}
            >
              $3.200
            </div>
            <div
              style={{
                fontFamily: "var(--font-playful)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                maxWidth: "14ch",
                lineHeight: 1.2,
              }}
            >
              precio del pancho base
            </div>
          </div>
          <div>
            <Button variant="primary" size="lg" onClick={onGoToppings}>
              Rellenalo como quieras ↓
            </Button>
          </div>
        </div>
        <div
          data-parallax="1.6"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <img
            src="/assets/products/pancho-clasico.webp"
            alt="Pancho Doto armado"
            style={{
              width: "min(520px,84vw)",
              height: "auto",
              animation: "pdBob 5s ease-in-out infinite",
              filter: "drop-shadow(0 40px 34px rgba(15,5,6,0.75))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
