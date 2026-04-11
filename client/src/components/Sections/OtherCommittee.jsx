import Navbar from "./Navbar";
import { useTranslator } from "../../context/LanguageContext.js";

const conflictFreeMembers = [
  { sr: 1, position: "Elected by the Gram Sabha", name: "Mr. Vinay Ramchandra Yadav", role: "Secretary" },
  { sr: 2, position: "Sarpanch", name: "Mr. Satish Sayajirao Deshmukh", role: "Member" },
  { sr: 3, position: "Sub-Sarpanch", name: "Mr. Namajirao Nimaji Yadav", role: "Member" },
  { sr: 4, position: "Gram Daftar Sub-Committee", name: "Mr. Abhijit Prabhat Yadav", role: "Member" },
  { sr: 5, position: "Nirman Committee Correspondent", name: "Mr. Vaibhav Pandurang Yadav", role: "Member" },
  { sr: 6, position: "Gram Panchayat P and VC Committee Correspondent", name: "Mr. Deepak Ramchandra Pardeshi", role: "Member" },
  { sr: 7, position: "Prof. Education Committee Representative", name: "Mr. Umar Akhtar Yadav", role: "Member" },
  { sr: 8, position: "Fix employment representative", name: "Mr. Rushikumar Gyaru Yadav", role: "Member" },
];

export default function OtherCommittee() {
  const { t, currentLanguage } = useTranslator();

  return (
    <section style={{ background: "#f8fafc" }}>
      <Navbar />

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#1e3a8a,#2563eb,#1d4ed8)",
        padding: "60px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        borderRadius: "0 0 30px 30px"
      }}>
        <div style={{ maxWidth: 600 }}>
          <span style={{
            background: "rgba(255,255,255,0.2)",
            color: "#e0f2fe",
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600
          }}>
            {t('otherCommittee.badge')}
          </span>

          <h2 style={{
            color: "#fff",
            fontSize: "clamp(22px,5vw,32px)",
            marginTop: 15,
            fontWeight: 800
          }}>
            {t('otherCommittee.heroTitle')}
          </h2>

          <p style={{
            color: "#c7d2fe",
            marginTop: 10,
            lineHeight: 1.6
          }}>
            {t('otherCommittee.heroDesc')}
          </p>

          <button style={{
            marginTop: 20,
            background: "#facc15",
            color: "#1e293b",
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            fontWeight: 600,
            cursor: "pointer"
          }}>
            {t('otherCommittee.search')}
          </button>
        </div>

        <div style={{ fontSize: 80 }}>🏛️</div>
      </div>

      {/* TABLE TITLE */}
      <h3 style={{
        textAlign: "center",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#1e3a8a",
        margin: "30px 0"
      }}>
        {t('otherCommittee.tableTitle')}
      </h3>

      {/* TABLE CARD */}
      <div style={{
        maxWidth: 1000,
        margin: "0 auto 40px",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1e3a8a", color: "#fff" }}>
              {[t('otherCommittee.headers.0'), t('otherCommittee.headers.1'), t('otherCommittee.headers.2'), t('otherCommittee.headers.3')].map(h => (
                <th key={h} style={{ padding: 14, textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {conflictFreeMembers.map((m, i) => (
              <tr key={i} style={{
                background: i % 2 === 0 ? "#fff" : "#f1f5f9",
                transition: "0.2s"
              }}>
                <td style={tdStyle}>{m.sr}</td>

                <td style={tdStyle}>
                  {currentLanguage === 'mr' ? (m.positionMr || m.position) : m.position}
                </td>

                <td style={{ ...tdStyle, fontWeight: 600 }}>
                  {m.name}
                </td>

                <td style={tdStyle}>
                  <span style={{
                    background: "#dbeafe",
                    color: "#1d4ed8",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {currentLanguage === 'mr' ? (m.roleMr || m.role) : m.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: 14,
};