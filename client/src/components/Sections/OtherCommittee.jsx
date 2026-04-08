import Navbar from "./Navbar";

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
  return (
    <section >
        <Navbar/>
      {/* ── Hero Card ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#0f4c75,#1b6ca8,#118ab2)",
          
          padding: "60px 48px",
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginBottom: 56,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <span
            style={{
              background: "rgba(255,255,255,.15)",
              color: "#bae6fd",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              borderRadius: 20,
              padding: "4px 14px",
              display: "inline-block",
              marginBottom: 14,
            }}
          >
            Grama Sachivalaya Kadepur
          </span>
          <h2
            style={{
              color: "#fff",
              fontSize: "2.1rem",
              fontWeight: 800,
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Gram Panchayat Kadepur Sarva Samiti
          </h2>
          <p
            style={{
              color: "#bae6fd",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            Organization of committees working for the progress of the village.
            These committees contribute to important areas like education, health,
            sanitation, water management, women and child welfare, agricultural
            development and social welfare. All committees are committed to
            fulfilling the expectations of the villagers with transparency, unity,
            and a people-oriented approach.
          </p>
          <button
            style={{
              background: "#f59e0b",
              color: "#1c1c1c",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
        <div style={{ fontSize: 90 }}>🧑‍💻🌱</div>
      </div>

      {/* ── Table ── */}
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.7rem",
          fontWeight: 800,
          color: "#0f4c75",
          margin: "0 0 28px",
        }}
      >
        Conflict-Free Village Committee
      </h3>
      <div
        style={{
          overflowX: "auto",
          maxWidth: 960,
          margin: "0 auto",
          borderRadius: 14,
          boxShadow: "0 4px 24px rgba(15,76,117,.10)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Sr. No.", "Position", "Name", "Committee Designation"].map(
                (h, i) => (
                  <th
                    key={h}
                    style={{
                      background: "#0f4c75",
                      color: "#fff",
                      padding: "14px 18px",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      textAlign: "left",
                      borderRadius:
                        i === 0
                          ? "12px 0 0 0"
                          : i === 3
                          ? "0 12px 0 0"
                          : 0,
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {conflictFreeMembers.map((m, i) => (
              <tr
                key={i}
                style={{ background: i % 2 === 0 ? "#fff" : "#f0f9ff" }}
              >
                <td
                  style={{
                    padding: "14px 18px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "#0f4c75",
                    borderBottom: "1px solid #e0e7ef",
                  }}
                >
                  {m.sr}
                </td>
                <td
                  style={{
                    padding: "14px 18px",
                    fontSize: "0.9rem",
                    color: "#1e293b",
                    borderBottom: "1px solid #e0e7ef",
                  }}
                >
                  {m.position}
                </td>
                <td
                  style={{
                    padding: "14px 18px",
                    fontSize: "0.9rem",
                    color: "#1e293b",
                    fontWeight: 600,
                    borderBottom: "1px solid #e0e7ef",
                  }}
                >
                  {m.name}
                </td>
                <td
                  style={{
                    padding: "14px 18px",
                    fontSize: "0.9rem",
                    borderBottom: "1px solid #e0e7ef",
                  }}
                >
                  <span
                    style={{
                      background: "#dbeafe",
                      color: "#1d4ed8",
                      borderRadius: 12,
                      padding: "3px 12px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {m.role}
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