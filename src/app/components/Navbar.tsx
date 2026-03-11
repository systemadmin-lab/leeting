"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   NAVBAR — Sticky glassmorphism with GSAP hover underlines
   ══════════════════════════════════════════════════════════════ */

const NAV_LINKS = ["How It Works", "Who We Help", "Results"];

const Navbar = () => {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const ctaFlairRef = useRef<HTMLSpanElement>(null);

  /* ── Link hover underline animation ── */
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    linkRefs.current.forEach((link, i) => {
      const line = lineRefs.current[i];
      if (!link || !line) return;

      const enter = () => {
        gsap.to(line, { width: "100%", duration: 0.3, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(line, { width: "0%", duration: 0.25, ease: "power2.in" });
      };

      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);

      cleanups.push(() => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  /* ── CTA Flair Effect ── */
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
      xSet(x); ySet(y);
      gsap.to(flair, { scale: 1, duration: 0.4, ease: "power2.out" });
    };

    const handleLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);
      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0, duration: 0.3, ease: "power2.out",
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: "16px 40px",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px) saturate(1.6)",
        WebkitBackdropFilter: "blur(16px) saturate(1.6)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
      }}
    >
      {/* ── Left: Brand ── */}
      <a href="#" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="8" fill="#0b59f1" opacity="0.15" />
          <rect x="6" y="6" width="20" height="20" rx="5" fill="#0b59f1" opacity="0.3" />
          <rect x="10" y="10" width="12" height="12" rx="3" fill="#0b59f1" />
        </svg>
        <span
          className="text-xl font-bold"
          style={{
            color: "#0E141C",
            fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
          }}
        >
          GtmReachoutly
        </span>
      </a>

      {/* ── Center: Nav Links ── */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((label, i) => (
          <a
            key={label}
            href="#"
            ref={(el) => { linkRefs.current[i] = el; }}
            className="relative text-base font-medium cursor-pointer"
            style={{ color: "#4e525e", textDecoration: "none" }}
          >
            {label}
            {/* Animated underline */}
            <span
              ref={(el) => { lineRefs.current[i] = el; }}
              className="absolute left-0 -bottom-1 h-[2px] rounded-full"
              style={{ width: "0%", background: "#0b59f1" }}
            />
          </a>
        ))}
      </div>

      {/* ── Right: CTA Button ── */}
      <a
        ref={ctaBtnRef}
        href="#"
        className="relative inline-flex items-center justify-center px-7 py-2.5 rounded-full font-semibold text-base overflow-hidden cursor-pointer"
        style={{
          background: "#0b59f1",
          color: "#FFFFFF",
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(11,89,241,0.2)",
          fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
        }}
      >
        {/* Flair */}
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

        {/* Shimmer */}
        <span
          className="absolute top-0 w-[10%] h-full pointer-events-none"
          style={{
            background: "linear-gradient(106deg, rgba(255,255,255,0) 22%, rgba(255,255,255,0.3) 77%)",
            transform: "rotate(4deg)",
            animation: "nav-slide 2.5s ease-in-out infinite",
          }}
        />

        <span className="relative z-10">Book a Call</span>

        <style>{`
          @keyframes nav-slide {
            0% { left: -40%; }
            100% { left: 140%; }
          }
        `}</style>
      </a>
    </nav>
  );
};

export default Navbar;
