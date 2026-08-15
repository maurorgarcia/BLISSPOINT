"use client";

import { CSSProperties, ReactNode, useState } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "solidDark"
  | "solidPanel"
  | "pedidosya"
  | "brown"
  | "ghost";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled,
  type = "button",
}: {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const base: CSSProperties = {
    fontFamily: "var(--font-ui)",
    fontWeight: 700,
    border: "none",
    borderRadius: "var(--radius-interactive)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition:
      "transform var(--motion-duration-microfeedback) var(--motion-ease-ui), background var(--motion-duration-microfeedback) var(--motion-ease-ui)",
    opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap",
  };

  const sizes: Record<Size, CSSProperties> = {
    sm: { padding: "8px 16px", fontSize: "var(--text-sm)" },
    md: { padding: "12px 24px", fontSize: "var(--text-cta-label)" },
    lg: { padding: "16px 32px", fontSize: "var(--text-lg)" },
  };

  const variants: Record<Variant, CSSProperties> = {
    primary: { background: "var(--color-accent-primary)", color: "var(--color-text-on-accent)" },
    secondary: { background: "var(--color-accent-secondary)", color: "#fff" },
    solidDark: { background: "var(--color-nearblack-950)", color: "var(--color-accent-primary)" },
    solidPanel: { background: "var(--color-bg-panel)", color: "var(--color-text-on-panel)" },
    pedidosya: { background: "#EA1D2C", color: "#fff" },
    brown: { background: "#6B3A1F", color: "#F7CE66" },
    ghost: {
      background: "transparent",
      color: "var(--color-text-primary)",
      border: "1px solid var(--color-border-subtle)",
    },
  };

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const hoverBg: Partial<Record<Variant, string>> = {
    primary: "var(--color-accent-primary-hover)",
    secondary: "var(--color-accent-secondary-hover)",
  };

  const style: CSSProperties = { ...base, ...sizes[size], ...variants[variant] };
  if (hover && !disabled && hoverBg[variant]) style.background = hoverBg[variant];
  if (active && !disabled) style.transform = "scale(0.98)";

  return (
    <button
      type={type}
      disabled={disabled}
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      {children}
    </button>
  );
}
