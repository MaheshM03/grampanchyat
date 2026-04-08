import { useTranslator } from "../../context/LanguageContext.js";

const ministers = [
  { name: "देवेंद्र फडणवीस", role: "मा. मुख्यमंत्री", emoji: "👨‍💼" },
  { name: "एकनाथ शिंदे", role: "मा. उपमुख्यमंत्री", emoji: "👨‍💼" },
  { name: "सुनेत्रा अजित पवार", role: "मा. उपमुख्यमंत्री", emoji: "👩‍💼" },
  { name: "जयकुमार गोरे", role: "मा. मंत्री", emoji: "👨‍💼" },
  { name: "गणेश कदम", role: "मा. आमदार", emoji: "👨‍💼" },
  { name: "दयानंद ढवळे", role: "उप सभापती", emoji: "👨‍💼" },
  { name: "डॉ. पंकजा पुणेकर", role: "जिल्हाधिकारी अहमदनगर", emoji: "👩‍💼" },
  { name: "विशाल नरसाळे", role: "मुख्य कार्यकारी अधिकारी", emoji: "👨‍💼" },
  { name: "शासिकांत सिंह", role: "तहसीलदार", emoji: "👨‍💼" },
  { name: "प्रशांत राठव", role: "सभापती", emoji: "👨‍💼" },
];

const gpOfficials = [
  { name: "सरपंच", role: "हरिदास गणक", emoji: "🧑‍💼" },
  { name: "उपसरपंच", role: "हनुमान गणक", emoji: "🧑‍💼" },
  { name: "ग्रामपंचायत अधिकारी", role: "श्री. डी. पुजारी", emoji: "🧑‍💼" },
];

export default function Hero() {
  const { t } = useTranslator();

  return (
    <section>
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #0f1f3d 0%, #1a2a4a 60%, #2d4a7a 100%)",
        minHeight: 320, position: "relative", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "60px 20px 40px"
      }}>
        {/* Decorative dots */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%", opacity: 0.07,
            width: Math.random() * 80 + 20, height: Math.random() * 80 + 20,
            background: "#fff", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`
          }} />
        ))}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700 }}>
          <div style={{  color: "#fff", display: "inline-block", padding: "3px 16px", borderRadius: 20, fontSize: 50, marginBottom: 12, fontFamily: "sans-serif" }}>
            {t('hero.welcome')}
          </div>
          <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 800, margin: "0 0 14px", fontFamily: "'Noto Sans Devanagari', sans-serif", textShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
            {t('hero.title')}
          </h1>
         
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "11px 26px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif" }}>
              {t('hero.citizenLogin')}
            </button>
            <button style={{ background: "transparent", color: "#fff", border: "2px solid #fff", padding: "11px 26px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif" }}>
              {t('hero.moreKnow')}
            </button>
          </div>
        </div>
      </div>

      {/* Officials card */}
      <div style={{ background: "#fff", maxWidth: 900, margin: "-10px auto 0", borderRadius: 16, padding: "36px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.10)", position: "relative", zIndex: 5 }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#1a2a4a", marginBottom: 28, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          {t('hero.ministers')}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginBottom: 32 }}>
          {ministers.map((m, i) => (
            <div key={i} style={{ textAlign: "center", width: 90 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 8px",
                background: `linear-gradient(135deg, ${["#2563eb","#16a34a","#e8a020","#dc2626","#7c3aed","#0891b2","#c2410c","#0f172a","#b91c1c","#065f46"][i % 10]}, ${["#60a5fa","#4ade80","#fbbf24","#f87171","#a78bfa","#38bdf8","#fb923c","#334155","#fca5a5","#34d399"][i % 10]})`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
              }}>{m.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", fontFamily: "sans-serif" }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "#64748b", fontFamily: "sans-serif", lineHeight: 1.3 }}>{m.role}</div>
            </div>
          ))}
        </div>

        <h2 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: "#1a2a4a", marginBottom: 20, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          {t('hero.gpOfficials')}
        </h2>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {gpOfficials.map((o, i) => (
            <div key={i} style={{ textAlign: "center", width: 110 }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", margin: "0 auto 8px", background: `linear-gradient(135deg,#1a2a4a,#2563eb)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{o.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", fontFamily: "sans-serif" }}>{o.name}</div>
              <div style={{ fontSize: 12, color: "#64748b", fontFamily: "sans-serif" }}>{o.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

