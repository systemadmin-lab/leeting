"use client";

import gsap from "gsap";
import React, { useCallback, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   FLOATING ELEMENT DEFINITIONS
   Each element: an SVG icon or shape, positioned around the
   center text. They repel from the mouse cursor like
   Google Antigravity.
   ══════════════════════════════════════════════════════════════ */

interface FloatingItem {
  id: number;
  /** Home position (% of viewport) */
  homeX: number;
  homeY: number;
  /** Size in px */
  size: number;
  /** Rotation (degrees) */
  rotation: number;
  /** Opacity 0-1 */
  opacity: number;
  /** Color */
  fill: string;
  /** SVG content key */
  icon: string;
}

/* SVG icon library — minimal B2B / tech shapes */
const ICONS: Record<string, (fill: string, size: number) => React.ReactNode> = {
  code: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  terminal: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 10l4 2-4 2" /><line x1="14" y1="14" x2="18" y2="14" />
    </svg>
  ),
  handshake: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 11H17l-3-3H7L3.5 11" /><path d="M3.5 11V17a1 1 0 001 1h3l3.5-3 3.5 3h3a1 1 0 001-1v-6" /><circle cx="12" cy="4" r="1" />
    </svg>
  ),
  calendar: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><circle cx="12" cy="16" r="1" fill={fill} />
    </svg>
  ),
  network: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><line x1="12" y1="7" x2="5" y2="17" /><line x1="12" y1="7" x2="19" y2="17" /><line x1="7" y1="19" x2="17" y2="19" />
    </svg>
  ),
  user: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  arrow: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  diamond: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} opacity="0.15">
      <rect x="4" y="4" width="16" height="16" rx="2" transform="rotate(45 12 12)" />
    </svg>
  ),
  circle: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" fill={fill} opacity="0.08" /><circle cx="12" cy="12" r="8" fill="none" stroke={fill} strokeWidth="1" opacity="0.2" />
    </svg>
  ),
  dots: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} opacity="0.25">
      <circle cx="6" cy="6" r="1.5" /><circle cx="12" cy="6" r="1.5" /><circle cx="18" cy="6" r="1.5" /><circle cx="6" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" /><circle cx="6" cy="18" r="1.5" /><circle cx="12" cy="18" r="1.5" /><circle cx="18" cy="18" r="1.5" />
    </svg>
  ),
  chart: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><polyline points="7 14 11 10 14 13 17 8" />
    </svg>
  ),
  mail: (fill, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 4 12 13 2 4" />
    </svg>
  ),
};

/* Color palette for elements — desaturated grays + faint blue */
const ELEMENT_COLORS = [
  "#9ca3af", // cool gray
  "#b0b8c4", // lighter gray
  "#7b8794", // darker cool gray
  "#a3b1c6", // blue-gray
  "#0b59f1", // brand blue (sparse)
  "#c5cdd8", // very light gray
  "#6b7280", // medium gray
];

/* Deterministic seeded PRNG (mulberry32) — prevents hydration mismatch */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateElements(): FloatingItem[] {
  const rand = mulberry32(42); // fixed seed
  const items: FloatingItem[] = [];
  const iconKeys = Object.keys(ICONS);

  const positions: [number, number][] = [
    [8, 10], [22, 8], [38, 6], [55, 5], [72, 8], [88, 12],
    [5, 25], [18, 20], [82, 18], [92, 28],
    [4, 42], [12, 50], [6, 62],
    [88, 45], [94, 55], [85, 65],
    [8, 78], [18, 82], [82, 80], [92, 75],
    [12, 90], [30, 92], [50, 94], [70, 90], [88, 88],
    [25, 15], [75, 15], [25, 85], [75, 85],
    [32, 28], [68, 28], [30, 72], [70, 72],
    [3, 5], [97, 5], [3, 95], [97, 95],
    [15, 38], [85, 38], [42, 88], [58, 10],
  ];

  positions.forEach(([x, y], i) => {
    const isNearCenter = x > 28 && x < 72 && y > 25 && y < 75;
    items.push({
      id: i,
      homeX: x,
      homeY: y,
      size: isNearCenter ? 18 + rand() * 8 : 22 + rand() * 18,
      rotation: rand() * 360,
      opacity: isNearCenter ? 0.2 + rand() * 0.15 : 0.3 + rand() * 0.35,
      fill: ELEMENT_COLORS[i % ELEMENT_COLORS.length],
      icon: iconKeys[i % iconKeys.length],
    });
  });

  return items;
}

const ELEMENTS = generateElements();

/* ══════════════════════════════════════════════════════════════
   HERO COMPONENT
   ══════════════════════════════════════════════════════════════ */

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  /* ── Repulsion Physics Loop ── */
  const animate = useCallback(() => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    elementsRef.current.forEach((el, i) => {
      if (!el) return;
      const item = ELEMENTS[i];

      // Home position in px
      const hx = (item.homeX / 100) * rect.width;
      const hy = (item.homeY / 100) * rect.height;

      // Mouse position relative to container
      const relMx = mx - rect.left;
      const relMy = my - rect.top;

      // Distance from mouse to home
      const dx = hx - relMx;
      const dy = hy - relMy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion parameters
      const repulsionRadius = 220;
      const repulsionStrength = 120;

      let offsetX = 0;
      let offsetY = 0;
      let scale = 1;
      let extraRotation = 0;

      if (dist < repulsionRadius && dist > 0) {
        const force = (1 - dist / repulsionRadius) * repulsionStrength;
        const angle = Math.atan2(dy, dx);
        offsetX = Math.cos(angle) * force;
        offsetY = Math.sin(angle) * force;
        scale = 1 + (1 - dist / repulsionRadius) * 0.3;
        extraRotation = (1 - dist / repulsionRadius) * 25;
      }

      // Apply transform
      const finalX = hx + offsetX;
      const finalY = hy + offsetY;
      const finalRot = item.rotation + extraRotation;

      el.style.transform = `translate(${finalX - item.size / 2}px, ${finalY - item.size / 2}px) rotate(${finalRot}deg) scale(${scale})`;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  /* ── CTA Button Flair Effect ── */
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const ctaFlairRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = ctaBtnRef.current;
    const flair = ctaFlairRef.current;
    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent") as (v: number) => void;
    const ySet = gsap.quickSetter(flair, "yPercent") as (v: number) => void;

    const getXY = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const xT = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );
      const yT = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );
      return { x: xT(e.clientX - left), y: yT(e.clientY - top) };
    };

    const handleEnter = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);
      gsap.to(flair, { scale: 1, duration: 0.4, ease: "power2.out" });
    };

    const handleLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);
      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMove = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.to(flair, { xPercent: x, yPercent: y, duration: 0.4, ease: "power2" });
    };

    button.addEventListener("mouseenter", handleEnter);
    button.addEventListener("mouseleave", handleLeave);
    button.addEventListener("mousemove", handleMove);

    return () => {
      button.removeEventListener("mouseenter", handleEnter);
      button.removeEventListener("mouseleave", handleLeave);
      button.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden hero-dot-grid"
      style={{ background: "#FFFFFF", cursor: "default" }}
    >
      {/* ── Floating Antigravity Elements ── */}
      {ELEMENTS.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => { elementsRef.current[i] = el; }}
          className="antigravity-element"
          style={{
            width: item.size,
            height: item.size,
            opacity: item.opacity,
            transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {ICONS[item.icon]?.(item.fill, item.size)}
        </div>
      ))}

      {/* ── Central Text (absolutely positioned at top) ── */}
      <div className="absolute inset-x-0 top-20 z-10 flex flex-col items-center text-center px-6 pt-[15vh] pointer-events-none select-none">
        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
          style={{
            fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
            color: "#0E141C",
          }}
        >
          Predictable Outbound <br /> Pipeline Engine
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed font-normal"
          style={{
            fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
            color: "#4e525e",
          }}
        >
          A Done-For-You GTM Outbound System That Generates{" "}
          <span className="font-semibold" style={{ color: "#0b59f1" }}>
            Qualified Conversations
          </span>
          , Not{" "}
          <span style={{ color: "#9ca3af", textDecoration: "line-through", textDecorationColor: "#d1d5db" }}>
            Vanity Metrics
          </span>
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 pointer-events-auto">
          {/* Primary CTA — Flair Button */}
          <a
            ref={ctaBtnRef}
            href="#"
            className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base text-white overflow-hidden cursor-pointer"
            style={{
              background: "#0b59f1",
              fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
              boxShadow: "0 4px 24px rgba(11,89,241,0.2)",
              textDecoration: "none",
            }}
          >
            {/* Flair — cursor-following fill */}
            <span
              ref={ctaFlairRef}
              className="absolute inset-0 pointer-events-none origin-top-left"
              style={{ transform: "scale(0)" }}
            >
              <span
                className="absolute rounded-full"
                style={{
                  width: "170%",
                  aspectRatio: "1",
                  background: "#0E141C",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </span>

            {/* Sliding glass bar */}
            <span
              className="absolute top-0 w-[10%] h-full pointer-events-none"
              style={{
                background: "linear-gradient(106deg, rgba(255,255,255,0) 22%, rgba(255,255,255,0.3) 77%)",
                transform: "rotate(4deg)",
                animation: "cta-slide 2s ease-in-out infinite",
              }}
            />

            {/* Label */}
            <span className="relative z-10">Book a Strategy Call</span>

            <style>{`
              @keyframes cta-slide {
                0% { left: -40%; }
                100% { left: 140%; }
              }
            `}</style>
          </a>
          <button
            className="px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 hover:scale-105 active:scale-[0.98]"
            style={{
              border: "1.5px solid #e5e7eb",
              color: "#4e525e",
              background: "transparent",
              fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
            }}
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* ── Subtle radial gradient for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(245,247,250,0.8) 100%)",
        }}
      />
    </section>
  );
};

export default HeroSection;
