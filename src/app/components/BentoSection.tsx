import React from "react";



/* ── Reusable card wrapper ── */
const Card = ({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`rounded-2xl overflow-hidden ${className}`}
    style={{
      background: "#FFFFFF",
      border: "1px solid #e8eaed",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ── SVG Illustrations ── */

const PipelineViz = () => (
  <svg width="100%" height="120" viewBox="0 0 400 120" fill="none">
    {[20, 40, 60, 80, 100].map((y) => (
      <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#e8eaed" strokeWidth="1" />
    ))}
    {[
      { x: 30, h: 40 }, { x: 70, h: 50 }, { x: 110, h: 48 },
      { x: 150, h: 62 }, { x: 190, h: 58 }, { x: 230, h: 72 },
      { x: 270, h: 78 }, { x: 310, h: 85 }, { x: 350, h: 95 },
    ].map((bar, i) => (
      <rect
        key={i}
        x={bar.x}
        y={120 - bar.h}
        width="24"
        height={bar.h}
        rx="4"
        fill={i >= 7 ? "#0b59f1" : `rgba(11,89,241,${0.12 + i * 0.08})`}
      />
    ))}
    <path d="M 42 80 Q 120 70 190 62 Q 280 48 362 25" stroke="#0b59f1" strokeWidth="2" strokeDasharray="6 4" fill="none" />
  </svg>
);

const EngineViz = () => (
  <svg width="100%" height="140" viewBox="0 0 400 140" fill="none">
    <circle cx="200" cy="70" r="32" stroke="#0b59f1" strokeWidth="2" fill="rgba(11,89,241,0.06)" />
    <circle cx="200" cy="70" r="18" stroke="#0b59f1" strokeWidth="1.5" fill="rgba(11,89,241,0.1)" />
    <circle cx="200" cy="70" r="6" fill="#0b59f1" />
    <line x1="40" y1="40" x2="168" y2="60" stroke="#4e525e" strokeWidth="1.5" />
    <line x1="40" y1="70" x2="168" y2="70" stroke="#4e525e" strokeWidth="1.5" />
    <line x1="40" y1="100" x2="168" y2="80" stroke="#4e525e" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="4" fill="#4e525e" opacity="0.4" />
    <circle cx="40" cy="70" r="4" fill="#4e525e" opacity="0.4" />
    <circle cx="40" cy="100" r="4" fill="#4e525e" opacity="0.4" />
    <line x1="232" y1="60" x2="360" y2="40" stroke="#0b59f1" strokeWidth="1.5" />
    <line x1="232" y1="70" x2="360" y2="70" stroke="#0b59f1" strokeWidth="1.5" />
    <line x1="232" y1="80" x2="360" y2="100" stroke="#0b59f1" strokeWidth="1.5" />
    <polygon points="360,36 360,44 370,40" fill="#0b59f1" />
    <polygon points="360,66 360,74 370,70" fill="#0b59f1" />
    <polygon points="360,96 360,104 370,100" fill="#0b59f1" />
  </svg>
);

const GearsViz = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
    <circle cx="28" cy="30" r="14" stroke="#0b59f1" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="28" cy="30" r="5" fill="rgba(11,89,241,0.2)" />
    <circle cx="52" cy="26" r="10" stroke="#0b59f1" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="52" cy="26" r="4" fill="rgba(11,89,241,0.2)" />
    <line x1="20" y1="50" x2="60" y2="50" stroke="#e8eaed" strokeWidth="1.5" />
    <line x1="20" y1="54" x2="50" y2="54" stroke="#e8eaed" strokeWidth="1.5" />
  </svg>
);

const ServerViz = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
    <rect x="15" y="5" width="50" height="16" rx="3" stroke="#0b59f1" strokeWidth="1.5" />
    <circle cx="25" cy="13" r="2" fill="#0b59f1" />
    <circle cx="32" cy="13" r="2" fill="rgba(11,89,241,0.3)" />
    <rect x="15" y="25" width="50" height="16" rx="3" stroke="#0b59f1" strokeWidth="1.5" />
    <circle cx="25" cy="33" r="2" fill="#f2ca50" />
    <circle cx="32" cy="33" r="2" fill="rgba(242,202,80,0.3)" />
    <text x="22" y="55" fill="#4e525e" fontSize="7" fontFamily="monospace">SPF DKIM</text>
  </svg>
);

const TargetViz = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
    <circle cx="40" cy="28" r="22" stroke="#e8eaed" strokeWidth="1.5" />
    <circle cx="40" cy="28" r="15" stroke="rgba(11,89,241,0.3)" strokeWidth="1.5" />
    <circle cx="40" cy="28" r="8" stroke="#0b59f1" strokeWidth="1.5" />
    <circle cx="40" cy="28" r="3" fill="#0b59f1" />
    <circle cx="18" cy="50" r="3" fill="#4e525e" opacity="0.25" />
    <circle cx="28" cy="52" r="3" fill="#4e525e" opacity="0.25" />
    <circle cx="52" cy="52" r="3" fill="#0b59f1" opacity="0.4" />
    <circle cx="62" cy="50" r="3" fill="#0b59f1" opacity="0.4" />
  </svg>
);

const SequenceViz = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
    <circle cx="10" cy="30" r="5" fill="rgba(11,89,241,0.15)" stroke="#0b59f1" strokeWidth="1" />
    <line x1="15" y1="30" x2="25" y2="30" stroke="#0b59f1" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="30" cy="30" r="5" fill="rgba(11,89,241,0.25)" stroke="#0b59f1" strokeWidth="1" />
    <line x1="35" y1="30" x2="45" y2="30" stroke="#0b59f1" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="50" cy="30" r="5" fill="rgba(11,89,241,0.4)" stroke="#0b59f1" strokeWidth="1" />
    <line x1="55" y1="30" x2="65" y2="30" stroke="#0b59f1" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="70" cy="30" r="5" fill="#0b59f1" stroke="#0b59f1" strokeWidth="1" />
    <text x="6" y="48" fill="#4e525e" fontSize="6" fontFamily="sans-serif">D1</text>
    <text x="26" y="48" fill="#4e525e" fontSize="6" fontFamily="sans-serif">D3</text>
    <text x="46" y="48" fill="#4e525e" fontSize="6" fontFamily="sans-serif">D5</text>
    <text x="66" y="48" fill="#4e525e" fontSize="6" fontFamily="sans-serif">D7</text>
  </svg>
);

const FunnelViz = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
    <polygon points="10,8 70,8 55,30 25,30" fill="rgba(11,89,241,0.08)" stroke="#0b59f1" strokeWidth="1" />
    <polygon points="25,30 55,30 48,45 32,45" fill="rgba(11,89,241,0.15)" stroke="#0b59f1" strokeWidth="1" />
    <rect x="35" y="45" width="10" height="10" rx="2" fill="#0b59f1" opacity="0.3" stroke="#0b59f1" strokeWidth="1" />
    <line x1="48" y1="50" x2="65" y2="50" stroke="#f2ca50" strokeWidth="1.5" />
    <polygon points="65,47 65,53 72,50" fill="#f2ca50" />
  </svg>
);

/* ── Check items data ── */
const CHECK_ITEMS = [
  { text: "GTM-aligned outbound revenue systems.", Graphic: GearsViz },
  { text: "Technical deliverability and infrastructure.", Graphic: ServerViz },
  { text: "Targeted lists that match your ICP.", Graphic: TargetViz },
  { text: "Human-sounding, signal-optimized sequences.", Graphic: SequenceViz },
  { text: "Real engagement funnels that feed your CRM.", Graphic: FunnelViz },
];



const BentoSection = () => {

  return (
    <section
      style={{
        background: "#F4F5F7",
        padding: "100px 24px",
        fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto" }}
        className="flex flex-col gap-4"
      >
        {/* ── ROW 1: Large Top Cell ── */}
        <Card className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight"
                style={{
                  color: "#0E141C",
                  fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
                }}
              >
                Modern GTM Needs Predictability
              </h2>
              <p
                className="mt-4 text-base md:text-lg leading-relaxed"
                style={{ color: "#4e525e" }}
              >
                Today&apos;s best GTM teams think in terms of systems — data
                flows, automation, funnel orchestration, and real engagement
                signals — not just campaigns.
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <PipelineViz />
            </div>
          </div>
        </Card>

        {/* ── ROW 2: Central Cell ── */}
        <Card
          className="p-8 md:p-12"
          style={{
            background: "#0E141C",
            border: "1px solid #1e2a38",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <p
                className="text-xl md:text-2xl font-semibold leading-snug"
                style={{ color: "#FFFFFF" }}
              >
                Outbound shouldn&apos;t be an afterthought or hack — it should
                be a{" "}
                <span style={{ color: "#0b59f1" }}>
                  core part of your growth engine.
                </span>
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <EngineViz />
            </div>
          </div>
        </Card>

        {/* ── ROW 3: Five Check Cells (bento grid) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHECK_ITEMS.map((item, i) => (
            <Card
              key={i}
              className={`p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <item.Graphic />
              </div>
              <p
                className="text-sm md:text-base font-medium leading-snug"
                style={{ color: "#0E141C" }}
              >
                <span style={{ color: "#0b59f1", marginRight: 6 }}>✔</span>
                {item.text}
              </p>
            </Card>
          ))}
        </div>

        {/* ── ROW 4: Punchline with ScrollTrigger animation ── */}
        <Card
          className="p-8 md:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, #0b59f1, #2470ff)",
            border: "none",
          }}
        >
          <p
            className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug"
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
            }}
          >
            <span style={{ textDecoration: "line-through", textDecorationColor: "#f2ca50", textDecorationThickness: "3px", opacity: 0.6 }}>
              This isn&apos;t mass spam
            </span>
            {" — this is "}
            <span
              style={{
                color: "#f2ca50",
                textShadow: "0 0 30px rgba(242,202,80,0.3)",
              }}
            >
              engineered revenue activation.
            </span>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default BentoSection;
