"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  alpha: number;
  twinkle: number;
  rot: number;
  vr: number;
  spriteIdx: number;
};

const PANCHO_IMAGES = [
  "/assets/products/pancho-clasico.webp",
  "/assets/products/pancho-chili.webp",
];

function buildSprite(img: HTMLImageElement, blurPx: number, sizePx: number) {
  const c = document.createElement("canvas");
  const pad = Math.ceil(blurPx * 2) + 4;
  const w = sizePx + pad * 2;
  const h = Math.round(sizePx * (img.height / Math.max(1, img.width))) + pad * 2;
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  ctx.filter = `blur(${blurPx}px)`;
  ctx.drawImage(img, pad, pad, sizePx, Math.round(sizePx * (img.height / Math.max(1, img.width))));
  ctx.filter = "none";
  return c;
}

export function Particles({ density = 18 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const spritesRef = useRef<HTMLCanvasElement[]>([]);
  const visibleRef = useRef(true);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      reducedRef.current = mq.matches;
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const onVis = () => {
      visibleRef.current = !document.hidden;
      if (visibleRef.current && rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => tick());
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const tick = () => {
    rafRef.current = null;
    if (!visibleRef.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const { w, h } = sizeRef.current;
    const reduced = reducedRef.current;
    ctx.clearRect(0, 0, w, h);
    const particles = particlesRef.current;
    const sprites = spritesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!reduced) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.twinkle += 0.012;
        if (p.y < -60) {
          p.y = h + 60;
          p.x = Math.random() * w;
        }
        if (p.x < -60) p.x = w + 60;
        if (p.x > w + 60) p.x = -60;
      }
      const a = p.alpha * (0.78 + 0.22 * Math.sin(p.twinkle));
      const spr = sprites[p.spriteIdx % Math.max(1, sprites.length)];
      if (!spr) continue;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(p.scale, p.scale);
      ctx.drawImage(spr, -spr.width / 2, -spr.height / 2);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(() => tick());
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const loadedImages: HTMLImageElement[] = [];
    let pending = PANCHO_IMAGES.length;
    let started = false;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, reducedRef.current ? 1 : 1.5);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildSpritesAndStart = () => {
      if (started) return;
      started = true;
      const sprites: HTMLCanvasElement[] = [];
      if (loadedImages.length > 0) {
        for (let i = 0; i < loadedImages.length; i++) {
          const img = loadedImages[i % loadedImages.length];
          const blurLevel = i === 0 ? 2.5 : 3.5;
          const size = 36 + i * 14;
          sprites.push(buildSprite(img, blurLevel, size));
        }
      }
      spritesRef.current = sprites;
      resize();
      const area = sizeRef.current.w * sizeRef.current.h;
      const count = Math.max(6, Math.round((area / 65000) * (density / 18) * 14));
      spawn(count);
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(() => tick());
    };

    const spawn = (count: number) => {
      const { w, h } = sizeRef.current;
      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.08 - Math.random() * 0.2,
          scale: 0.85 + Math.random() * 0.6,
          alpha: 0.15 + Math.random() * 0.25,
          twinkle: Math.random() * Math.PI * 2,
          rot: (Math.random() - 0.5) * 0.7,
          vr: (Math.random() - 0.5) * 0.0025,
          spriteIdx: Math.floor(Math.random() * Math.max(1, spritesRef.current.length)),
        });
      }
      particlesRef.current = arr;
    };

    PANCHO_IMAGES.forEach((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loadedImages.push(img);
        pending--;
        if (pending === 0) buildSpritesAndStart();
      };
      img.onerror = () => {
        pending--;
        if (pending === 0) buildSpritesAndStart();
      };
      img.src = src;
    });

    resize();
    setTimeout(() => {
      if (!started && spritesRef.current.length === 0) buildSpritesAndStart();
    }, 250);

    const ro = new ResizeObserver(() => {
      resize();
      if (spritesRef.current.length > 0) {
        const area = sizeRef.current.w * sizeRef.current.h;
        const count = Math.max(6, Math.round((area / 65000) * (density / 18) * 14));
        spawn(count);
      }
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      ctxRef.current = null;
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.92,
        willChange: "contents",
      }}
    />
  );
}
