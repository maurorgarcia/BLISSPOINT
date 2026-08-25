"use client";

import { useEffect, useRef, useState } from "react";
import { MenuItem, TOPPINGS_ONLY } from "../../data/menu";

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages;
}

function ToppingTile({ t }: { t: MenuItem }) {
  return (
    <div
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
        alignSelf: "start",
        height: "fit-content",
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
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
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
  );
}

function ToppingsCarouselTrack({
  items,
  pageSize,
  trackClassName,
  pageClassName,
  drag = false,
}: {
  items: MenuItem[];
  pageSize: number;
  trackClassName: string;
  pageClassName: string;
  drag?: boolean;
}) {
  const pages = chunk(items, pageSize);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const page = Math.round(el.scrollLeft / el.clientWidth);
      setActivePage((prev) => (prev === page ? prev : page));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goToPage = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.classList.add("pd-dragging");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag || !dragState.current.dragging) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag || !dragState.current.dragging) return;
    dragState.current.dragging = false;
    const el = trackRef.current;
    el?.classList.remove("pd-dragging");
    if (!el) return;
    goToPage(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <div
        className={trackClassName}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {pages.map((page, i) => (
          <div className={pageClassName} key={i}>
            {page.map((t) => (
              <ToppingTile key={t.name} t={t} />
            ))}
          </div>
        ))}
      </div>
      {pages.length > 1 ? (
        <div className="pd-toppings-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`pd-dot${i === activePage ? " pd-dot-active" : ""}`}
              onClick={() => goToPage(i)}
              aria-label={`Página ${i + 1} de toppings`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

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
            "radial-gradient(80% 60% at 50% 0%,rgba(119,140,74,0.5),transparent 70%),linear-gradient(180deg,rgba(38,38,38,0.65),rgba(13,13,13,0.9))",
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
            Hasta 4 por pedido
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
            Lo que elijas arriba define tu experiencia. Estos son todos los toppings que tenemos en la barra para disfrutar algo rico.
          </p>
        </div>

        {/* Mobile/tablet (<=1024px): carrusel de a 4, swipe táctil */}
        <div className="pd-toppings-carousel">
          <ToppingsCarouselTrack
            items={TOPPINGS_ONLY}
            pageSize={4}
            trackClassName="pd-toppings-track"
            pageClassName="pd-toppings-page"
          />
        </div>

        {/* Desktop (>1024px): carrusel de a 8, se arrastra con el mouse */}
        <div className="pd-toppings-carousel-desktop">
          <ToppingsCarouselTrack
            items={TOPPINGS_ONLY}
            pageSize={8}
            trackClassName="pd-toppings-track-desktop"
            pageClassName="pd-toppings-page-desktop"
            drag
          />
        </div>
      </div>
    </section>
  );
}
