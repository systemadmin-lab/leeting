"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   NAVBAR — Sticky glassmorphism with GSAP hover underlines
   ══════════════════════════════════════════════════════════════ */

const NAV_LINKS = ["How It Works", "Who We Help", "Results"];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const ctaFlairRef = useRef<HTMLSpanElement>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileCtaRef = useRef<HTMLAnchorElement>(null);
  const mobileFlairRef = useRef<HTMLSpanElement>(null);

  /* ── Link hover underline animation (Desktop) ── */
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

  /* ── CTA Flair Effect (Shared Logic) ── */
  const setupFlair = (button: HTMLAnchorElement | null, flair: HTMLSpanElement | null) => {
    if (!button || !flair) return () => {};

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
  };

  useEffect(() => {
    return setupFlair(ctaBtnRef.current, ctaFlairRef.current);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      return setupFlair(mobileCtaRef.current, mobileFlairRef.current);
    }
  }, [isMenuOpen]);

  /* ── Body Scroll Lock (Mobile Menu) ── */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* ── Mobile Menu GSAP Animation ── */
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isMenuOpen) {
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(menu, 
        { opacity: 0, x: "100%" },
        { opacity: 1, x: "0%", duration: 0.5, ease: "power3.out" }
      );
      
      // Stagger links
      gsap.fromTo(mobileLinksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
      );
      
      gsap.fromTo(mobileCtaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(menu, { 
        opacity: 0, 
        x: "100%", 
        duration: 0.4, 
        ease: "power3.in",
        onComplete: () => gsap.set(menu, { display: "none" })
      });
    }
  }, [isMenuOpen]);

  return (
    <>
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

        {/* ── Center: Nav Links (Desktop) ── */}
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

        {/* ── Right: CTA Button (Desktop) ── */}
        <div className="hidden md:flex">
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
          </a>
        </div>

        {/* ── Mobile Hamburger Toggle ── */}
        <button
          className="flex flex-col gap-1.5 md:hidden p-2 z-[60]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span 
            className={`w-6 h-0.5 bg-[#0E141C] transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ backgroundColor: isMenuOpen ? "#0E141C" : "#0E141C" }}
          />
          <span 
            className={`w-6 h-0.5 bg-[#0E141C] transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span 
            className={`w-6 h-0.5 bg-[#0E141C] transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ backgroundColor: isMenuOpen ? "#0E141C" : "#0E141C" }}
          />
        </button>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[55] hidden flex-col items-center justify-center gap-8 md:hidden"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((label, i) => (
            <a
              key={label}
              href="#"
              ref={(el) => { mobileLinksRef.current[i] = el; }}
              className="text-2xl font-bold"
              style={{ 
                color: "#0E141C", 
                textDecoration: "none",
                fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif"
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          
          <a
            ref={mobileCtaRef}
            href="#"
            className="relative inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold text-lg overflow-hidden cursor-pointer"
            style={{
              background: "#0b59f1",
              color: "#FFFFFF",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(11,89,241,0.25)",
              marginTop: "1rem"
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Flair */}
            <span
              ref={mobileFlairRef}
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
          </a>
        </div>
      </div>

      <style>{`
        @keyframes nav-slide {
          0% { left: -40%; }
          100% { left: 140%; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

