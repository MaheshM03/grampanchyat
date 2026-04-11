import React from "react";
import { useTranslator } from "../../context/LanguageContext.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import { motion } from "framer-motion";
import { Droplet, Building2, Gem, Zap, BookOpen } from "lucide-react";

const pillars = [
  {
    icon: Droplet,
    titleKey: "smart.pillars.water",
    descKey: "smart.waterDesc",
    color: "#0891b2",
  },
  {
    icon: Building2,
    titleKey: "smart.pillars.management",
    descKey: "smart.managementDesc",
    color: "#7c3aed",
  },
  {
    icon: Gem,
    titleKey: "smart.pillars.liability",
    descKey: "smart.liabilityDesc",
    color: "#16a34a",
  },
  {
    icon: Zap,
    titleKey: "smart.pillars.energy",
    descKey: "smart.energyDesc",
    color: "#d97706",
  },
  {
    icon: BookOpen,
    titleKey: "smart.pillars.education",
    descKey: "smart.educationDesc",
    color: "#dc2626",
  },
];

export default function SmartVillage() {
  const { t } = useTranslator();

  return (
    <section style={{ background: "#f8fafc" }}>
      <Navbar />

      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
          padding: "80px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          borderRadius: "0 0 40px 40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ flex: 1, minWidth: 260, maxWidth: 520 }}>
          <div
            style={{
              color: "#93c5fd",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            GRAM PANCHAYAT PORTAL
          </div>

          <h2
            style={{
              fontSize: "clamp(24px,5vw,38px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {t("smart.title")}
          </h2>

          <p
            style={{
              color: "#cbd5f5",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            {t("smart.desc")}
          </p>

          {/* BUTTONS IN ONE LINE */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              style={{
                background: "#facc15",
                color: "#1e293b",
                borderRadius: 8,
                padding: "10px 20px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              {t("smart.cta")}
            </button>

            <button
              style={{
                background: "transparent",
                color: "#fff",
                border: "1.5px solid #cbd5f5",
                borderRadius: 8,
                padding: "10px 20px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        <div style={{ fontSize: 90 }}>🏡</div>
      </div>

      {/* PILLARS */}
      <div style={{ padding: "70px 20px" }}>
        <h3
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: 10,
          }}
        >
          {t("smart.journey")}
        </h3>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            maxWidth: 700,
            margin: "0 auto 50px",
            lineHeight: 1.7,
          }}
        >
          {t("smart.journeyDesc")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 30,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: "#ffffff",
                  borderRadius: 18,
                  padding: "28px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    padding: 12,
                    borderRadius: 12,
                    background: p.color + "20",
                    marginBottom: 15,
                  }}
                >
                  <Icon size={28} color={p.color} />
                </div>

                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: 10,
                  }}
                >
                  {t(p.titleKey)}
                </h4>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#475569",
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  {t(p.descKey)}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: p.color,
                    color: "#fff",
                    borderRadius: 6,
                    padding: "8px 16px",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t("smart.more")}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </section>
  );
}
