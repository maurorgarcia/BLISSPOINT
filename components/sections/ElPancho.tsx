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
            left: "2%",
            top: "6%",
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
            right: "3%",
            top: "9%",
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
            left: "6%",
            bottom: "5%",
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
            right: "5%",
            bottom: "3%",
            width: 190,
            opacity: 0.42,
            filter: "blur(1px)",
            transition: "transform 0.45s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="1.0"
          src="/assets/products/pancho-clasico.webp"
          alt=""
          style={{
            position: "absolute",
            left: "18%",
            top: "38%",
            width: 100,
            opacity: 0.32,
            filter: "blur(1px)",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="1.2"
          src="/assets/products/pancho-chili.webp"
          alt=""
          style={{
            position: "absolute",
            right: "16%",
            top: "52%",
            width: 130,
            opacity: 0.3,
            filter: "blur(1px)",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="0.6"
          src="/assets/products/pancho-chili.webp"
          alt=""
          style={{
            position: "absolute",
            left: "28%",
            top: "16%",
            width: 65,
            opacity: 0.2,
            filter: "blur(2px)",
            transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="0.9"
          src="/assets/products/pancho-clasico.webp"
          alt=""
          style={{
            position: "absolute",
            right: "26%",
            top: "24%",
            width: 55,
            opacity: 0.2,
            filter: "blur(2px)",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="1.1"
          src="/assets/products/pancho-chili.webp"
          alt=""
          style={{
            position: "absolute",
            left: "1%",
            top: "66%",
            width: 75,
            opacity: 0.3,
            filter: "blur(1px)",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="1.3"
          src="/assets/products/pancho-clasico.webp"
          alt=""
          style={{
            position: "absolute",
            right: "1%",
            top: "70%",
            width: 65,
            opacity: 0.28,
            filter: "blur(1px)",
            transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <img
          data-parallax="1.5"
          src="/assets/products/pancho-clasico.webp"
          alt=""
          style={{
            position: "absolute",
            left: "34%",
            bottom: "2%",
            width: 55,
            opacity: 0.22,
            filter: "blur(2px)",
            transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          }}
        />
      </div>
      <div
        className="pd-pancho-grid"
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
          className="pd-pancho-text-col"
          data-parallax="0.25"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
            transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            className="pd-order-title"
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
            className="pd-order-paragraph"
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
          <div className="pd-order-button">
            <Button variant="primary" size="lg" onClick={onGoToppings}>
              Rellenalo como quieras ↓
            </Button>
          </div>
        </div>
        <div className="pd-pancho-image-col">
          <div
            className="pd-order-image"
            data-parallax="1.6"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "8%",
                right: "4%",
                zIndex: 2,
                background: "var(--color-accent-primary)",
                color: "var(--color-text-on-accent)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-3) var(--space-6)",
                boxShadow: "0 14px 28px rgba(15,5,6,0.5)",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-5xl)",
                  lineHeight: 1,
                }}
              >
                $3.200
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playful)",
                  fontSize: "var(--text-xs)",
                  lineHeight: 1.2,
                  marginTop: 2,
                  opacity: 0.65,
                }}
              >
                precio del pancho base
              </div>
            </div>
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
      </div>
    </section>
  );
}
