import { useTranslator } from "../../context/LanguageContext.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import { motion } from "framer-motion";

const adminMembersData = [
  { name: "श्री. सतीश सयाजीराव देशमुख", role: "सार्वजनिक नियुक्त सरपंच", img: "https://i.pravatar.cc/150?img=1", enName: "Mr. Satish Sayajirao Deshmukh", enRole: "Publicly appointed Sarpanch" },
  { name: "श्री. हनुमान गणपती गरुडा", role: "उप सरपंच", img: "https://i.pravatar.cc/150?img=2", enName: "Mr. Hanuman Ganpati Garuda", enRole: "Sub-Sarpanch" },
  { name: "श्री. अनिल बापूसो यादव", role: "सभासद", img: "https://i.pravatar.cc/150?img=3", enName: "Mr. Anil Bapuso Yadav", enRole: "Member" },
  { name: "सौ. वैशाली पृथ्वीराज यादव", role: "सभासद", img: "https://i.pravatar.cc/150?img=5", enName: "Mrs. Vaishali Prithviraj Yadav", enRole: "Member" }
];

export default function AdminCommittee() {
  const { t, currentLanguage } = useTranslator();

  const adminMembers = adminMembersData.map(m => ({
    name: currentLanguage === 'mr' ? m.name : m.enName,
    role: currentLanguage === 'mr' ? m.role : m.enRole,
    img: m.img
  }));

  return (
    <section style={{ background: "#f1f5f9" }}>
      <Navbar />

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#1e293b,#1e3a8a,#312e81)",
        padding: "70px 20px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        borderRadius: "0 0 30px 30px"
      }}>
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(22px,5vw,34px)", fontWeight: 800 }}>
            {t('admin.title')}
          </h1>

          <p style={{ color: "#cbd5f5", marginTop: 10 }}>
            {t('admin.desc')}
          </p>
        </div>

        <div style={{ fontSize: 80 }}>🏛️</div>
      </div>

      {/* MEMBERS */}
      <div style={{ padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.9rem", fontWeight: 800, color: "#1e293b", marginBottom: 40 }}>
          {t('admin.heading')}
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 25,
          maxWidth: 1100,
          margin: "0 auto"
        }}>
          {adminMembers.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                cursor: "pointer"
              }}
            >
              <img
                src={m.img}
                alt="profile"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 12,
                  border: "3px solid #6366f1"
                }}
              />

              <p style={{ fontWeight: 700, color: "#1e293b" }}>
                {m.name}
              </p>

              <span style={{
                display: "inline-block",
                marginTop: 8,
                background: "#e0e7ff",
                color: "#3730a3",
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600
              }}>
                {m.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}
