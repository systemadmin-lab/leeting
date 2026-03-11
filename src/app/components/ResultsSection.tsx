"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   RESULTS / PERFORMANCE SECTION
   Dashboard-style data cards + animated hero numbers
   ══════════════════════════════════════════════════════════════ */

/* ── Mini SVG graphics for data cards ── */

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" fill="rgba(11,89,241,0.1)" />
    <path d="M6 10l3 3 5-6" stroke="#0b59f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MiniBarChart = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
    <rect x="2" y="14" width="6" height="10" rx="1" fill="rgba(11,89,241,0.15)" />
    <rect x="11" y="10" width="6" height="14" rx="1" fill="rgba(11,89,241,0.25)" />
    <rect x="20" y="6" width="6" height="18" rx="1" fill="rgba(11,89,241,0.4)" />
    <rect x="29" y="2" width="6" height="22" rx="1" fill="#0b59f1" />
  </svg>
);

const NetworkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="6" r="2.5" stroke="#0b59f1" strokeWidth="1" />
    <circle cx="5" cy="18" r="2.5" stroke="#0b59f1" strokeWidth="1" />
    <circle cx="19" cy="18" r="2.5" stroke="#0b59f1" strokeWidth="1" />
    <line x1="12" y1="8.5" x2="6" y2="15.5" stroke="#0b59f1" strokeWidth="1" opacity="0.4" />
    <line x1="12" y1="8.5" x2="18" y2="15.5" stroke="#0b59f1" strokeWidth="1" opacity="0.4" />
    <line x1="7.5" y1="18" x2="16.5" y2="18" stroke="#0b59f1" strokeWidth="1" opacity="0.4" />
  </svg>
);

/* ── Data cards content ── */
const DATA_CARDS = [
  {
    label: "Predictable pipeline layers",
    graphic: <MiniBarChart />,
    accent: "Built on repeatable systems",
  },
  {
    label: "Consistent qualified conversations",
    graphic: <CheckIcon />,
    accent: "Not vanity opens — real replies",
  },
  {
    label: "Multi-channel engagement signals",
    graphic: <NetworkIcon />,
    accent: "Email, LinkedIn, intent data",
  },
  {
    label: "CRM-integrated data flow",
    graphic: <MiniBarChart />,
    accent: "Every touchpoint tracked",
  },
  {
    label: "Revenue-first optimization",
    graphic: <CheckIcon />,
    accent: "Weekly refinement cycles",
  },
];

/* ══════════════════════════════════════════════════════════════ */

const ResultsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bottomHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Top section fade in ── */
      if (topRef.current) {
        gsap.fromTo(
          topRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: topRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── Animated counter for $22M ── */
      if (num1Ref.current) {
        const target1 = { val: 0 };
        gsap.to(target1, {
          val: 22,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: num1Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (num1Ref.current) {
              num1Ref.current.textContent = `$${Math.round(target1.val)}M`;
            }
          },
        });
      }

      /* ── Animated counter for $17M ── */
      if (num2Ref.current) {
        const target2 = { val: 0 };
        gsap.to(target2, {
          val: 17,
          duration: 2,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: num2Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (num2Ref.current) {
              num2Ref.current.textContent = `$${Math.round(target2.val)}M`;
            }
          },
        });
      }

      /* ── Bottom headline ── */
      if (bottomHeadRef.current) {
        gsap.fromTo(
          bottomHeadRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bottomHeadRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── Staggered data cards ── */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── Banner slide up ── */
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F4F5F7 100%)",
        padding: "100px 24px 0",
        fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* ══════════════════════════════════
            TOP SECTION — Hero Numbers
           ══════════════════════════════════ */}
        <div
          ref={topRef}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 mb-24"
          style={{ opacity: 0 }}
        >
          {/* Left text */}
          <div className="flex-1 max-w-lg">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{
                color: "#0E141C",
                fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
              }}
            >
              Performance-Driven Model
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "#4e525e" }}
            >
              We focus on outcomes, engagement, qualified conversations, and
              pipeline velocity.
            </p>
          </div>

          {/* Right — Hero numbers */}
          <div className="flex gap-8 md:gap-12 items-end">
            {/* $22M */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Glow dots */}
                <div
                  className="absolute -top-3 -right-3 rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: "#0b59f1",
                    boxShadow: "0 0 12px rgba(11,89,241,0.6)",
                  }}
                />
                <div
                  className="absolute -top-1 -left-4 rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    background: "#f2ca50",
                    boxShadow: "0 0 8px rgba(242,202,80,0.5)",
                  }}
                />
                <span
                  ref={num1Ref}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold"
                  style={{
                    color: "#0b59f1",
                    fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
                  }}
                >
                  $0M
                </span>
              </div>
              <span
                className="mt-2 text-sm font-medium"
                style={{ color: "#4e525e" }}
              >
                Pipeline Generated
              </span>
              {/* Upward arrow */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1">
                <path d="M8 12V4M8 4l3 3M8 4L5 7" stroke="#0b59f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* $17M */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className="absolute -top-2 -right-4 rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: "#f2ca50",
                    boxShadow: "0 0 10px rgba(242,202,80,0.5)",
                  }}
                />
                <span
                  ref={num2Ref}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold"
                  style={{
                    color: "#0b59f1",
                    fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
                    opacity: 0.7,
                  }}
                >
                  $0M
                </span>
              </div>
              <span
                className="mt-2 text-sm font-medium"
                style={{ color: "#4e525e" }}
              >
                Revenue Closed
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1">
                <path d="M8 12V4M8 4l3 3M8 4L5 7" stroke="#0b59f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            BOTTOM SECTION — Results Grid
           ══════════════════════════════════ */}
        <div
          ref={bottomHeadRef}
          className="text-center mb-12"
          style={{ opacity: 0 }}
        >
          <h3
            className="text-2xl md:text-3xl font-bold"
            style={{
              color: "#0E141C",
              fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
            }}
          >
            Results You Can Expect
          </h3>
        </div>

        {/* Background trend line (faint) */}
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 300"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 280 Q200 250 400 200 Q600 140 800 100 Q1000 60 1200 20"
              stroke="rgba(11,89,241,0.04)"
              strokeWidth="3"
              fill="none"
            />
          </svg>

          {/* Data Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
            {DATA_CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #e8eaed",
                  opacity: 0,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>{card.graphic}</div>
                  <div
                    className="w-2 h-2 rounded-full mt-1"
                    style={{
                      background: "#0b59f1",
                      boxShadow: "0 0 6px rgba(11,89,241,0.4)",
                    }}
                  />
                </div>
                <p
                  className="text-base font-semibold mb-1"
                  style={{ color: "#0E141C" }}
                >
                  {card.label}
                </p>
                <p className="text-sm" style={{ color: "#4e525e" }}>
                  {card.accent}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          PUNCHLINE BANNER
         ══════════════════════════════════ */}
      <div
        ref={bannerRef}
        className="text-center"
        style={{
          background: "#0E141C",
          padding: "48px 24px",
          margin: "0 -24px",
          opacity: 0,
        }}
      >
        <p
          className="text-lg md:text-xl lg:text-2xl font-bold max-w-3xl mx-auto"
          style={{
            color: "#0b59f1",
            fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
            textShadow: "0 0 30px rgba(11,89,241,0.2)",
          }}
        >
          This is a GTM revenue activation engine — not a marketing experiment.
        </p>
      </div>
    </section>
  );
};

export default ResultsSection;
