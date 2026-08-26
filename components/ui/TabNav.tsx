"use client";

import { useEffect, useRef } from "react";

export function TabNav({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const run = () => {
      if (!mq.matches) return;
      const scrollEl = scrollRef.current;
      const btn = btnRefs.current[active];
      if (!scrollEl || !btn) return;

      const index = tabs.indexOf(active);
      if (index <= 0) {
        scrollEl.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const btnRect = btn.getBoundingClientRect();
      const trackRect = scrollEl.getBoundingClientRect();
      const delta = btnRect.left - trackRect.left - (trackRect.width - btnRect.width) / 2;
      const max = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
      scrollEl.scrollTo({
        left: Math.min(max, Math.max(0, scrollEl.scrollLeft + delta)),
        behavior: "smooth",
      });
    };
    run();
  }, [active, tabs]);

  return (
    <nav
      className="pd-tab-nav"
      style={{
        height: "var(--space-nav-height)",
        background: "color-mix(in srgb, var(--color-bg-base) 92%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        position: "sticky",
        top: 0,
        zIndex: "var(--z-nav-sticky)" as unknown as number,
        width: "100%",
      }}
    >
      <div
        ref={scrollRef}
        className="pd-tab-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          paddingInline: "var(--space-4)",
          maxWidth: "1100px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              ref={(el) => {
                btnRefs.current[tab] = el;
              }}
              onClick={() => onChange(tab)}
              className={`pd-tab-item ${isActive ? "pd-tab-active" : ""}`}
              style={{
                flexShrink: 0,
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-interactive)",
                border: "none",
                cursor: "pointer",
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                background: isActive ? "rgba(119,140,74,0.25)" : "transparent",
                boxShadow: isActive ? "inset 0 -3px 0 var(--color-accent-secondary)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
