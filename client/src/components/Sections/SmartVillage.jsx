import { useTranslator } from "../../context/LanguageContext.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const pillars = [
  {
    icon: "💧",
    titleKey: "smart.pillars.water",
    descKey: "smart.waterDesc",
    bg: "linear-gradient(145deg,#0891b2,#06b6d4)",
  },
  {
    icon: "🏗️",
    titleKey: "smart.pillars.management",
    descKey: "smart.managementDesc",
    bg: "linear-gradient(145deg,#7c3aed,#a855f7)",
  },
  {
    icon: "💎",
    titleKey: "smart.pillars.liability",
    descKey: "smart.liabilityDesc",
    bg: "linear-gradient(145deg,#16a34a,#22c55e)",
  },
  {
    icon: "⚡",
    titleKey: "smart.pillars.energy",
    descKey: "smart.energyDesc",
    bg: "linear-gradient(145deg,#d97706,#f59e0b)",
  },
  {
    icon: "📚",
    titleKey: "smart.pillars.education",
    descKey: "smart.educationDesc",
    bg: "linear-gradient(145deg,#dc2626,#f87171)",
  },
];

export default function SmartVillage() {
  const { t } = useTranslator();

  return (
    <section style={{ background: "#f8faff" }}>
      <Navbar/>
      {/* ── Hero ── */}
      <div
        style={{
          background: "#fff",
          padding: "72px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 40,
          borderBottom: "2px solid #e0e7ef",
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <div
            style={{
              color: "#7c3aed",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Grama Sachivalaya Kadepur  {/* Static brand - can add t if needed */}
          </div>
          <h2
            style={{
              fontSize: "2.4rem",
              fontWeight: 800,
              color: "#1e1b4b",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            {t('smart.title')}
          </h2>
          <p
            style={{
              color: "#475569",
              fontSize: "0.97rem",
              lineHeight: 1.7,
              marginBottom: 24,
              maxWidth: 420,
            }}
          >
            {t('smart.desc')}
          </p>
          <button
            style={{
              background: "transparent",
              color: "#7c3aed",
              border: "2px solid #7c3aed",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            {t('smart.cta')}
          </button>
        </div>
        <div style={{ fontSize: 90 }}>🌿💻🏘️</div>
      </div>

      {/* ── Pillars ── */}
      <div style={{ padding: "72px 40px" }}>
        <h3
          style={{
            textAlign: "center",
            fontSize: "1.9rem",
            fontWeight: 800,
            color: "#1e1b4b",
            margin: "0 0 8px",
          }}
        >
          {t('smart.journey')}
        </h3>
        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "0.97rem",
            lineHeight: 1.7,
            maxWidth: 800,
            margin: "0 auto 48px",
          }}
        >
          {t('smart.journeyDesc')}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: 24,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                background: p.bg,
                borderRadius: 20,
                padding: "36px 28px",
                color: "#fff",
                boxShadow: "0 6px 30px rgba(0,0,0,.13)",
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 18 }}>{p.icon}</div>
              <h4
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  margin: "0 0 12px",
                  color: "#fff",
                }}
              >
                {t(p.titleKey)}
              </h4>
              <p
                style={{
                  fontSize: "0.87rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,.88)",
                  margin: "0 0 20px",
                }}
              >
                {t(p.descKey)}
              </p>
              <button
                style={{
                  background: "rgba(255,255,255,.2)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,.5)",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                {t('smart.more')}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </section>
  );
}

