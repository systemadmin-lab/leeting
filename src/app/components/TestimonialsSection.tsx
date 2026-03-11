"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS SECTION
   Premium trust cards with brand colors + GSAP animations
   ══════════════════════════════════════════════════════════════ */

/* ── Star rating (brand blue) ── */
const Stars = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="#0b59f1">
        <path d="M9 1.5l2.2 4.5 5 .7-3.6 3.5.9 5L9 13l-4.5 2.2.9-5L1.8 6.7l5-.7z" />
      </svg>
    ))}
  </div>
);

/* ── Geometric avatar placeholder ── */
const Avatar = ({ color }: { color: string }) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{
      width: 48,
      height: 48,
      background: `${color}15`,
      border: `2px solid ${color}30`,
    }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  </div>
);

/* ── Testimonial data ── */
const TESTIMONIALS = [
  {
    quote:
      "Working with their team transformed how we think about outbound. It's now an integral part of our revenue system.",
    name: "Head of Revenue",
    company: "SaaS Scaleup",
    avatarColor: "#0b59f1",
  },
  {
    quote:
      "The predictable pipeline they built helped us shorten cycles and forecast Q2 more confidently.",
    name: "CEO",
    company: "Tech Services Firm",
    avatarColor: "#f2ca50",
  },
];

/* ══════════════════════════════════════════════════════════════ */

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Header fade in ── */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── Cards stagger in from sides ── */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: i === 0 ? -60 : 60,
            y: 20,
            rotateY: i === 0 ? 8 : -8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            duration: 0.9,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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
        background: "#F9FAFB",
        padding: "100px 24px",
        fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center mb-14"
          style={{ opacity: 0 }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#0b59f1" }}
          >
            Testimonials
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: "#0E141C",
              fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
            }}
          >
            Trusted by Revenue Leaders
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#FFFFFF",
                border: "1px solid #e8eaed",
                boxShadow: "0 8px 40px rgba(14,20,28,0.06), 0 2px 12px rgba(14,20,28,0.04)",
                opacity: 0,
                perspective: "600px",
              }}
            >
              {/* Massive watermark quotation mark */}
              <div
                className="absolute -top-4 -left-2 pointer-events-none select-none"
                style={{
                  fontSize: 200,
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "#0b59f1",
                  opacity: 0.05,
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="relative z-10 mb-6">
                <Stars />
              </div>

              {/* Quote */}
              <p
                className="relative z-10 text-lg md:text-xl leading-relaxed mb-8"
                style={{
                  color: "#1A1A1A",
                  fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
                  fontWeight: 500,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="relative z-10 flex items-center gap-4">
                <Avatar color={t.avatarColor} />
                <div>
                  <p
                    className="font-bold text-base"
                    style={{ color: "#0b59f1" }}
                  >
                    — {t.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "#4e525e" }}
                  >
                    {t.company}
                  </p>
                </div>
              </div>

              {/* Subtle accent border on hover (brand blue glow at bottom) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(90deg, transparent, #0b59f1, transparent)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
