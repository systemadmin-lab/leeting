"use client";

/* ══════════════════════════════════════════════════════════════
   FOOTER — Premium dark mode, 4-column layout
   ══════════════════════════════════════════════════════════════ */

const FooterSection = () => {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        fontFamily: "var(--font-funnel-sans), 'Funnel Sans', sans-serif",
      }}
    >
      {/* Glowing top separator */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, #0b59f1, transparent)",
          opacity: 0.6,
        }}
      />

      {/* Main footer content */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 24px 48px",
        }}
      >
        {/* ── Column 1: Brand ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* Abstract logo */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="2" width="28" height="28" rx="8" fill="#0b59f1" opacity="0.15" />
              <rect x="6" y="6" width="20" height="20" rx="5" fill="#0b59f1" opacity="0.3" />
              <rect x="10" y="10" width="12" height="12" rx="3" fill="#0b59f1" />
            </svg>
            <span
              className="text-lg font-bold"
              style={{
                color: "#FFFFFF",
                fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
              }}
            >
              GtmReachoutly
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
            Engineered Outbound.
            <br />
            Predictable Revenue.
          </p>
        </div>

        {/* ── Column 2: Links ── */}
        <div>
          <h4
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#4e525e" }}
          >
            Product
          </h4>
          <ul className="flex flex-col gap-3">
            {["Platform", "Infrastructure", "Deliverability", "Integrations"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#D1D5DB", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0b59f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3: Links ── */}
        <div>
          <h4
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#4e525e" }}
          >
            Company
          </h4>
          <ul className="flex flex-col gap-3">
            {["Case Studies", "About", "Blog", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#D1D5DB", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0b59f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 4: System Status ── */}
        <div>
          <h4
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#4e525e" }}
          >
            System
          </h4>
          <div className="flex items-center gap-2.5">
            {/* Pulsing dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "#0b59f1", opacity: 0.4 }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{
                  background: "#0b59f1",
                  boxShadow: "0 0 8px rgba(11,89,241,0.5)",
                }}
              />
            </span>
            <span className="text-sm" style={{ color: "#D1D5DB" }}>
              System Status:{" "}
              <span className="font-semibold" style={{ color: "#0b59f1" }}>
                100% Operational
              </span>
            </span>
          </div>
          <p className="text-xs mt-3" style={{ color: "#4e525e" }}>
            99.99% uptime · Last 90 days
          </p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 24px",
        }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-xs" style={{ color: "#4e525e" }}>
          © {new Date().getFullYear()} GtmReachoutly. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {/* LinkedIn */}
          <a
            href="#"
            className="transition-colors duration-200"
            style={{ color: "#4e525e" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0b59f1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4e525e")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          {/* Twitter / X */}
          <a
            href="#"
            className="transition-colors duration-200"
            style={{ color: "#4e525e" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0b59f1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4e525e")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733-16z" />
              <path d="M4 20l6.768-6.768M20 4l-6.768 6.768" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
