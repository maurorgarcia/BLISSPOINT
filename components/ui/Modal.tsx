"use client";

import { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
  ctaLabel,
  onCta,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  ctaLabel?: string;
  onCta?: () => void;
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(31,10,12,0.72)",
        zIndex: "var(--z-modal-overlay)" as unknown as number,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-bg-surface)",
          borderRadius: "var(--radius-card)",
          boxShadow: "var(--shadow-lg)",
          zIndex: "var(--z-modal-content)" as unknown as number,
          padding: "var(--space-8)",
          maxWidth: 420,
          width: "100%",
          fontFamily: "var(--font-ui)",
          color: "var(--color-text-primary)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        {title ? (
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)" }}>
            {title}
          </div>
        ) : null}
        <div style={{ fontSize: "var(--text-base)", color: "var(--color-text-secondary)" }}>
          {children}
        </div>
        {ctaLabel ? (
          <button
            onClick={onCta}
            style={{
              background: "var(--color-accent-primary)",
              color: "var(--color-text-on-accent)",
              border: "none",
              borderRadius: "var(--radius-interactive)",
              padding: "12px 24px",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            {ctaLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
