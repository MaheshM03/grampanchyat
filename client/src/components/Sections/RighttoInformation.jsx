import Footer from "./Footer";
import Navbar from "./Navbar";

const tableRows = [
  ["अ.क्र.", "माहिती", "कालावधी", "प्रकरण", "निकाली", "बाकी", "शेरा"],
  ["1", "जन्म दाखले", "2023-24", "45", "42", "3", "-"],
  ["2", "मृत्यू दाखले", "2023-24", "28", "28", "0", "-"],
  ["3", "रहिवास दाखले", "2023-24", "112", "109", "3", "-"],
  ["4", "विवाह दाखले", "2023-24", "18", "18", "0", "-"],
  ["5", "संपत्ती कर", "2023-24", "234", "220", "14", "-"],
];

const toolbarIcons = ["🔍", "📋", "⬇️", "🖨️", "↗️", "📤"];

export default function RTI() {
  return (
    <section style={{ background: "#fefce8" }}>
        <Navbar/>
      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#92400e,#b45309,#d97706)",
          padding: "60px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div>
          <h2
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Right to Information
            <br />
            Gram Panchayat Kadepur
          </h2>
          <button
            style={{
              background: "#fff",
              color: "#92400e",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Find out
          </button>
        </div>
        <div style={{ fontSize: 90 }}>📁🔎</div>
      </div>

      {/* ── Document Viewer ── */}
      <div style={{ padding: "64px 40px", textAlign: "center" }}>
        <h3
          style={{
            fontSize: "1.7rem",
            fontWeight: 800,
            color: "#78350f",
            margin: "0 0 32px",
          }}
        >
          RTI Documents &amp; Records
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {/* Prev */}
          <button
            style={{
              background: "#d97706",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
            ‹
          </button>

          {/* Document Card */}
          <div
            style={{
              background: "#fff",
              border: "2px solid #fcd34d",
              borderRadius: 16,
              padding: 24,
              maxWidth: 480,
              boxShadow: "0 4px 20px rgba(212,160,0,.12)",
            }}
          >
            {/* Preview */}
            <div
              style={{
                background: "#f1f5f9",
                borderRadius: 10,
                padding: "28px 16px",
                minHeight: 260,
                marginBottom: 16,
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.77rem",
                  textAlign: "center",
                }}
              >
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        background:
                          i === 0 ? "#e2e8f0" : i % 2 ? "#f8fafc" : "#fff",
                      }}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          style={{
                            padding: "5px 6px",
                            border: "1px solid #cbd5e1",
                            fontWeight: i === 0 ? 700 : 400,
                            color: "#374151",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.78rem",
                  marginTop: 8,
                }}
              >
                माहिती अधिकार दस्तऐवज - 2023-24
              </p>
            </div>

            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {toolbarIcons.map((icon) => (
                <button
                  key={icon}
                  style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    border: "1px solid #fcd34d",
                    borderRadius: 6,
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            style={{
              background: "#d97706",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
            ›
          </button>
        </div>
      </div>
      <Footer/>
    </section>
  );
}