"use client";

export function TabNav({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <nav
      style={{
        height: "var(--space-nav-height)",
        background: "color-mix(in srgb, var(--color-bg-base) 92%, transparent)",
        backdropFilter: "blur(12px)",
        display: "flex",
        position: "sticky",
        top: 0,
        zIndex: "var(--z-nav-sticky)" as unknown as number,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-2)",
          padding: "0 var(--space-4)",
          maxWidth: "1100px",
          width: "100%",
          margin: "0 auto",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              style={{
                scrollSnapAlign: "start",
                flexShrink: 0,
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-interactive)",
                border: "none",
                cursor: "pointer",
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                background: isActive ? "rgba(139,26,38,0.25)" : "transparent",
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
