import { useTranslator } from "../../context/LanguageContext.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const adminMembersData = [
  { name: "श्री. सतीश सयाजीराव देशमुख", role: "सार्वजनिक नियुक्त सरपंच", emoji: "👨‍💼", enName: "Mr. Satish Sayajirao Deshmukh", enRole: "Publicly appointed Sarpanch" },
  { name: "श्री. हनुमान गणपती गरुडा", role: "उप सरपंच", emoji: "👴", enName: "Mr. Hanuman Ganpati Garuda", enRole: "Sub-Sarpanch" },
  { name: "श्री. अनिल बापूसो यादव", role: "सभासद", emoji: "👨", enName: "Mr. Anil Bapuso Yadav", enRole: "Member" },
  { name: "श्री. वैभव पांडुरंग यादव", role: "सभासद", emoji: "👨‍🦱", enName: "Mr. Vaibhav Pandurang Yadav", enRole: "Member" },
  { name: "श्री. पटंगराव शिवाजी यादव", role: "सभासद", emoji: "👨‍🦳", enName: "Mr. Patangrao Shivaji Yadav", enRole: "Member" },
  { name: "श्री. दीपक रामचंद्र परदेशी", role: "सभासद", emoji: "🧑", enName: "Mr. Deepak Ramchandra Pardeshi", enRole: "Member" },
  { name: "श्री. विकास राजाराम कारकटे", role: "सभासद", emoji: "👨‍🦰", enName: "Mr. Vikas Rajaram Karkate", enRole: "Member" },
  { name: "सौ. वैशाली पृथ्वीराज यादव", role: "सभासद", emoji: "👩", enName: "Mrs. Vaishali Prithviraj Yadav", enRole: "Member" },
  { name: "सौ. भारती धनंजय यादव", role: "सभासद", emoji: "👩‍🦱", enName: "Mrs. Bharti Dhananjay Yadav", enRole: "Member" },
  { name: "सौ. लता विकास यादव", role: "सभासद", emoji: "👩‍🦳", enName: "Mrs. Lata Vikas Yadav", enRole: "Member" },
  { name: "सौ. अनुजा मनोज यादव", role: "सभासद", emoji: "👩‍🦰", enName: "Mrs. Anuja Manoj Yadav", enRole: "Member" },
  { name: "सौ. सुनीता माधुकर पिंगले", role: "सभासद", emoji: "🧕", enName: "Mrs. Sunita Madhukar Pingle", enRole: "Member" },
  { name: "सौ. मीनाक्षी संतोष कोली", role: "सभासद", emoji: "👩‍💼", enName: "Mrs. Meenakshi Santosh Koli", enRole: "Member" },
  { name: "सौ. उषा यशवंत वाघमारे", role: "सभासद", emoji: "👩‍🏫", enName: "Mrs. Usha Yashwant Waghmare", enRole: "Member" },
];

export default function AdminCommittee() {
  const { t, currentLanguage, translations } = useTranslator();

  const adminMembers = adminMembersData.map(m => ({
    name: currentLanguage === 'mr' ? m.name : m.enName,
    role: currentLanguage === 'mr' ? m.role : m.enRole,
    emoji: m.emoji
  }));

  return (
    
    <section>
      <Navbar/>
      {/* ── Hero ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#3b0764 0%,#1e1b4b 60%,#0f172a 100%)",
          padding: "80px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 40,
          minHeight: 320,
        }}
      >
        <div style={{ fontSize: 100, opacity: 0.85 }}>🔍📋</div>
        <div style={{ maxWidth: 460 }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "2.3rem",
              fontWeight: 800,
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            {t('admin.title')}
          </h1>
          <p
            style={{
              color: "#c4b5fd",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              margin: "0 0 28px",
            }}
          >
            {t('admin.desc')}
          </p>
          <button
            style={{
              background: "linear-gradient(90deg,#f59e0b,#f97316)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {t('admin.cta')}
          </button>
        </div>
      </div>

      {/* ── Member Grid ── */}
      <div style={{ background: "#f8f5ff", padding: "60px 40px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 800,
            color: "#1e1b4b",
            margin: "0 0 48px",
          }}
        >
          {t('admin.heading')}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
            gap: 22,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {adminMembers.map((m, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(145deg,#312e81,#4c1d95)",
                borderRadius: 16,
                padding: "28px 20px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(76,29,149,.25)",
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 12 }}>{m.emoji}</div>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.97rem",
                  margin: "0 0 8px",
                }}
              >
                {m.name}
              </p>
              <span
                style={{
                  color: "#c4b5fd",
                  fontSize: "0.8rem",
                  background: "rgba(255,255,255,.1)",
                  borderRadius: 20,
                  padding: "4px 14px",
                }}
              >
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </section>
  );
}

