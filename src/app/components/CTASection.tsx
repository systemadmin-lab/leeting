"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   CTA SECTION — Dark mode with magnetic button + pulsing glow
   ══════════════════════════════════════════════════════════════ */

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Pulsing radial glow ── */
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.6,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      /* ── Headline reveal — slide up + fade ── */
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── Subtext fade in ── */
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtextRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── Button scale in ── */
      if (btnWrapRef.current) {
        gsap.fromTo(
          btnWrapRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: btnWrapRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── CTA Flair Effect ── */
  useEffect(() => {
    const button = btnRef.current;
    const flair = flairRef.current;
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

  /* ── Magnetic button effect ── */
  const handleBtnMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.05,
      boxShadow: "0 12px 50px rgba(11,89,241,0.4), 0 0 80px rgba(11,89,241,0.15)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleBtnMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      boxShadow: "0 8px 30px rgba(11,89,241,0.3)",
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: "#0E141C",
        padding: "140px 24px",
        fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
      }}
    >
      {/* ── Pulsing radial glow behind button ── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,89,241,0.2) 0%, rgba(11,89,241,0.05) 40%, transparent 70%)",
          opacity: 0.4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── Headline ── */}
      <h2
        ref={headlineRef}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto"
        style={{
          color: "#FFFFFF",
          fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
          opacity: 0,
        }}
      >
        Ready to build a GTM outbound engine that delivers{" "}
        <span style={{ color: "#0b59f1" }}>predictability</span>?
      </h2>

      {/* ── Subtext ── */}
      <p
        ref={subtextRef}
        className="relative z-10 mt-6 text-base md:text-lg max-w-xl mx-auto"
        style={{ color: "#4e525e", opacity: 0 }}
      >
        Book a short call to map a custom plan for your revenue system.
      </p>

      {/* ── Magnetic Button ── */}
      <div
        ref={btnWrapRef}
        className="relative z-10 mt-10"
        style={{ opacity: 0 }}
        onMouseMove={handleBtnMouseMove}
        onMouseLeave={handleBtnMouseLeave}
      >
        <a
          ref={btnRef}
          href="#"
          className="relative inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-lg cursor-pointer overflow-hidden"
          style={{
            background: "#0b59f1",
            color: "#FFFFFF",
            fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
            boxShadow: "0 8px 30px rgba(11,89,241,0.3)",
            border: "none",
            letterSpacing: "0.02em",
            textDecoration: "none",
          }}
        >
          {/* Flair — cursor-following fill */}
          <span
            ref={flairRef}
            className="absolute inset-0 pointer-events-none origin-top-left"
            style={{ transform: "scale(0)" }}
          >
            <span
              className="absolute rounded-full"
              style={{
                width: "170%",
                aspectRatio: "1",
                background: "#000000",
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
              animation: "cta-slide-2 2s ease-in-out infinite",
            }}
          />

          {/* Label */}
          <span className="relative z-10">Map Your Plan</span>

          <style>{`
            @keyframes cta-slide-2 {
              0% { left: -40%; }
              100% { left: 140%; }
            }
          `}</style>
        </a>
      </div>

      {/* ── Subtle decorative dots ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "15%", left: "10%", size: 4, opacity: 0.15 },
          { top: "25%", right: "15%", size: 3, opacity: 0.1 },
          { bottom: "20%", left: "20%", size: 5, opacity: 0.12 },
          { bottom: "30%", right: "12%", size: 3, opacity: 0.08 },
          { top: "40%", left: "5%", size: 4, opacity: 0.1 },
          { top: "60%", right: "8%", size: 6, opacity: 0.06 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              ...dot,
              width: dot.size,
              height: dot.size,
              background: "#0b59f1",
              boxShadow: `0 0 ${dot.size * 3}px rgba(11,89,241,0.3)`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CTASection;
