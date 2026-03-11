"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS — Vertical Pipeline Section
   Brand-colored timeline with 5 step nodes + GSAP animations
   ══════════════════════════════════════════════════════════════ */

/* ── Step SVG Icons ── */

const TargetIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke="#0b59f1" strokeWidth="1.5" opacity="0.2" />
    <circle cx="24" cy="24" r="12" stroke="#0b59f1" strokeWidth="1.5" opacity="0.4" />
    <circle cx="24" cy="24" r="6" stroke="#0b59f1" strokeWidth="2" />
    <circle cx="24" cy="24" r="2" fill="#0b59f1" />
  </svg>
);

const ServerIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="10" y="6" width="28" height="12" rx="3" stroke="#0b59f1" strokeWidth="1.5" />
    <circle cx="17" cy="12" r="2" fill="#0b59f1" />
    <circle cx="23" cy="12" r="2" fill="#0b59f1" opacity="0.4" />
    <rect x="10" y="22" width="28" height="12" rx="3" stroke="#0b59f1" strokeWidth="1.5" />
    <circle cx="17" cy="28" r="2" fill="#f2ca50" />
    <circle cx="23" cy="28" r="2" fill="#f2ca50" opacity="0.4" />
    <path d="M24 38v4" stroke="#0b59f1" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="44" r="2" fill="#0b59f1" opacity="0.3" />
  </svg>
);

const FunnelIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <polygon points="8,8 40,8 30,22 18,22" fill="rgba(11,89,241,0.08)" stroke="#0b59f1" strokeWidth="1.5" />
    <polygon points="18,22 30,22 27,34 21,34" fill="rgba(11,89,241,0.15)" stroke="#0b59f1" strokeWidth="1.5" />
    <rect x="22" y="34" width="4" height="8" rx="1" fill="#0b59f1" opacity="0.3" stroke="#0b59f1" strokeWidth="1" />
    <circle cx="14" cy="14" r="2" fill="#f2ca50" opacity="0.6" />
    <circle cx="24" cy="12" r="2" fill="#0b59f1" opacity="0.6" />
    <circle cx="34" cy="14" r="2" fill="#f2ca50" opacity="0.6" />
  </svg>
);

const LaunchIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M8 38L20 26L28 30L40 10" stroke="#0b59f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="36,8 42,8 42,14" fill="#0b59f1" opacity="0.3" />
    <polygon points="38,10 42,10 40,8" fill="#0b59f1" />
    <path d="M10 18L22 14L18 22L14 20Z" fill="rgba(11,89,241,0.15)" stroke="#0b59f1" strokeWidth="1" />
    <circle cx="32" cy="36" r="2" fill="#f2ca50" opacity="0.5" />
    <circle cx="38" cy="34" r="2" fill="#f2ca50" opacity="0.5" />
    <circle cx="36" cy="40" r="2" fill="#f2ca50" opacity="0.5" />
  </svg>
);

const ChartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="6" width="36" height="36" rx="4" stroke="#0b59f1" strokeWidth="1.5" opacity="0.2" />
    <polyline points="12,34 18,26 24,30 30,18 36,14" stroke="#0b59f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="36" cy="14" r="3" fill="#0b59f1" opacity="0.3" />
    <circle cx="36" cy="14" r="1.5" fill="#0b59f1" />
    <rect x="12" y="36" width="4" height="4" rx="1" fill="#0b59f1" opacity="0.15" />
    <rect x="20" y="34" width="4" height="6" rx="1" fill="#0b59f1" opacity="0.25" />
    <rect x="28" y="30" width="4" height="10" rx="1" fill="#0b59f1" opacity="0.35" />
  </svg>
);

/* ── Steps Data ── */
const STEPS = [
  {
    num: 1,
    title: "Strategic Kick-off & ICP Alignment",
    desc: "Define your ideal customer profile, map decision-makers, and align outbound goals with your revenue targets.",
    Icon: TargetIcon,
  },
  {
    num: 2,
    title: "Outbound Infrastructure Engineering",
    desc: "Set up domains, mailboxes, SPF/DKIM/DMARC, and warm-up — bullet-proof deliverability from day one.",
    Icon: ServerIcon,
  },
  {
    num: 3,
    title: "Targeting & Data Enrichment",
    desc: "Build hyper-targeted prospect lists enriched with intent signals, firmographics, and technographics.",
    Icon: FunnelIcon,
  },
  {
    num: 4,
    title: "Sequence Design & Launch",
    desc: "Craft human-sounding, multi-touch sequences optimized for reply rates — then launch at scale.",
    Icon: LaunchIcon,
  },
  {
    num: 5,
    title: "Weekly Performance & Refinement",
    desc: "Analyze open rates, replies, and meetings booked. Continuously refine messaging, targeting, and timing.",
    Icon: ChartIcon,
  },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */

const PipelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineGlowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const lineGlow = lineGlowRef.current;
    if (!section || !header || !lineGlow) return;

    const ctx = gsap.context(() => {
      /* ── Header fade in ── */
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── Pipeline line draws downward on scroll ── */
      gsap.fromTo(
        lineGlow,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: section.querySelector(".pipeline-track"),
            start: "top 70%",
            end: "bottom 40%",
            scrub: 0.8,
          },
        }
      );

      /* ── Each card slides in + fades ── */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -60 : 60,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── Node dots scale in with glow pulse ── */
      dotsRef.current.forEach((dot) => {
        if (!dot) return;

        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0E141C",
        padding: "100px 24px",
        fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
      }}
    >
      {/* Section header */}
      <div ref={headerRef} className="text-center mb-16 max-w-2xl mx-auto" style={{ opacity: 0 }}>
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "#0b59f1" }}
        >
          How It Works
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
          }}
        >
          The 5-Step Pipeline
        </h2>
        <p
          className="mt-4 text-base md:text-lg leading-relaxed"
          style={{ color: "#4e525e" }}
        >
          A proven system that turns cold outreach into predictable revenue.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto pipeline-track">
        {/* Central pipeline line (muted background) */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
          style={{ background: "#1e2a38" }}
        />

        {/* Glowing line that draws downward via ScrollTrigger */}
        <div
          ref={lineGlowRef}
          className="absolute left-6 md:left-1/2 top-0 w-[2px] -translate-x-1/2"
          style={{
            height: "0%",
            background: "#0b59f1",
            boxShadow: "0 0 12px rgba(11,89,241,0.5), 0 0 30px rgba(11,89,241,0.2)",
          }}
        />

        {/* Steps */}
        {STEPS.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={step.num}
              className={`relative flex items-start gap-6 md:gap-0 mb-20 last:mb-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Node dot on the pipeline */}
              <div
                ref={(el) => { dotsRef.current[i] = el; }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
                style={{
                  width: 24,
                  height: 24,
                  top: 24,
                  opacity: 0,
                }}
              >
                {/* Outer glow ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 24,
                    height: 24,
                    background: "rgba(11,89,241,0.15)",
                    border: "1px solid rgba(11,89,241,0.3)",
                  }}
                />
                {/* Inner dot */}
                <div
                  className="relative rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    background: "#0b59f1",
                    boxShadow: "0 0 10px rgba(11,89,241,0.6)",
                  }}
                />
              </div>

              {/* Connector line from dot to card (desktop only) */}
              <div
                className={`hidden md:block absolute top-[34px] h-[1px] w-[calc(50%-36px)] ${
                  isLeft ? "left-[calc(50%+12px)]" : "right-[calc(50%+12px)]"
                }`}
                style={{
                  background: "linear-gradient(90deg, rgba(11,89,241,0.3), rgba(11,89,241,0.05))",
                  transform: isLeft ? "none" : "scaleX(-1)",
                }}
              />

              {/* Card */}
              <div
                ref={(el) => { cardsRef.current[i] = el; }}
                className="ml-16 md:ml-0 md:w-1/2 md:px-8"
                style={{ opacity: 0 }}
              >
                <div
                  className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <step.Icon />
                  </div>

                  {/* Step number badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                    style={{
                      background: "rgba(11,89,241,0.1)",
                      color: "#0b59f1",
                      border: "1px solid rgba(11,89,241,0.2)",
                    }}
                  >
                    Step {step.num}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg md:text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: "#8899aa" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Spacer for opposite side on desktop */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PipelineSection;
