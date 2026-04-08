import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const categories = [
  "Gram Panchayat Office Services", "Telecom and exchange service",
  "Billing and Insurance service", "Financial related services",
  "Aadhaar related services", "PAN card related services",
  "Voting card related service", "DTD, BA and judiciary ward facility",
  "Department of Motor Vehicle", "Industry related services",
  "GST related services", "Agricultural services",
  "Other government services", "Custom Service", "Clothing service",
  "Department of Food Safety Services", "PM Kisan Samm",
  "Subsidization and other services", "Housing and Premises Services", "Loan service",
];

const services = [
  { no: 1, scheme: "Ayushman Bharat Yojana", dept: "Health Department", service: "Beneficiary registration", portal: "PMJAY", color: "#fde68a", website: "beneficiary.nha.gov.in" },
  { no: 2, scheme: "Ayushman Bharat Yojana", dept: "Health Department", service: "Ayushman Bharat Print", portal: "PMJAY", color: "#fde68a", website: "beneficiary.nha.gov.in" },
  { no: 3, scheme: "PM Kisan Maandhan Yojana", dept: "Department of Agriculture", service: "Farmer Registration", portal: "PMKMY", color: "#bbf7d0", website: "maandhan.in" },
  { no: 4, scheme: "PM Kisan Maandhan Yojana", dept: "Department of Agriculture", service: "Honorarium", portal: "PMKMY", color: "#bbf7d0", website: "maandhan.in" },
  { no: 5, scheme: "Pradhan Mantri Awas Yojana", dept: "Housing Department", service: "Housing Application", portal: "PMAY", color: "#bfdbfe", website: "pmaymis.gov.in" },
  { no: 6, scheme: "Mahatma Gandhi NREGA", dept: "Rural Development", service: "Job Card Registration", portal: "MGNREGA", color: "#ddd6fe", website: "nrega.nic.in" },
];

export default function CitizenPortal() {
  const [tab, setTab] = useState("csc");
  const [search, setSearch] = useState("");

  const filtered = services.filter(
    (s) =>
      !search ||
      s.scheme.toLowerCase().includes(search.toLowerCase()) ||
      s.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
        <Navbar/>
      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#78350f,#b45309,#d97706)",
          padding: "64px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div style={{ maxWidth: 440 }}>
          <h2
            style={{
              color: "#fff",
              fontSize: "2.1rem",
              fontWeight: 800,
              margin: "0 0 20px",
              lineHeight: 1.2,
            }}
          >
            Citizen Service Facility Center
            <br />
            Gram Panchayat Kadepur
          </h2>
          <button
            style={{
              background: "#fff",
              color: "#78350f",
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
        <div style={{ fontSize: 90 }}>🏛️💻</div>
      </div>

      {/* ── Body ── */}
      <div style={{ background: "#fff", padding: "48px 40px" }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            gap: 10,
            maxWidth: 700,
            margin: "0 auto 28px",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find your service..."
            style={{
              flex: 1,
              padding: "12px 20px",
              borderRadius: 8,
              border: "1.5px solid #e5e7eb",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
          <button
            style={{
              background: "#d97706",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 20px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            🔍
          </button>
        </div>

        {/* Category Chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            maxWidth: 1000,
            margin: "0 auto 32px",
            justifyContent: "center",
          }}
        >
          {categories.map((c) => (
            <span
              key={c}
              style={{
                background: "#fef3c7",
                color: "#92400e",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid #fcd34d",
              }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            margin: "0 auto 20px",
            borderRadius: 10,
            overflow: "hidden",
            border: "1.5px solid #d97706",
          }}
        >
          {[
            ["csc", "📋 CSC Services"],
            ["dept", "🏢 Department-wise Services"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1,
                padding: 13,
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                border: "none",
                background: tab === key ? "#d97706" : "#fff",
                color: tab === key ? "#fff" : "#78350f",
                transition: "all .2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(180,83,9,.10)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["No.", "Scheme name", "Department", "Service details", "Portal", "Website"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        background: "#78350f",
                        color: "#fff",
                        padding: "14px 16px",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        textAlign: "left",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={i}
                  style={{ background: i % 2 === 0 ? "#fff" : "#fef9f0" }}
                >
                  <td style={{ padding: "13px 16px", textAlign: "center", fontWeight: 700, fontSize: "0.88rem", borderBottom: "1px solid #fef3c7" }}>{s.no}</td>
                  <td style={{ padding: "13px 16px", fontSize: "0.88rem", borderBottom: "1px solid #fef3c7" }}>
                    <span style={{ background: s.color, borderRadius: 6, padding: "2px 8px", fontSize: "0.83rem" }}>{s.scheme}</span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.88rem", borderBottom: "1px solid #fef3c7" }}>{s.dept}</td>
                  <td style={{ padding: "13px 16px", fontSize: "0.88rem", borderBottom: "1px solid #fef3c7" }}>{s.service}</td>
                  <td style={{ padding: "13px 16px", fontSize: "0.88rem", borderBottom: "1px solid #fef3c7" }}>
                    <span style={{ background: s.color, borderRadius: 6, padding: "3px 10px", fontWeight: 700, fontSize: "0.8rem" }}>{s.portal}</span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.82rem", borderBottom: "1px solid #fef3c7", color: "#d97706", textDecoration: "underline", cursor: "pointer" }}>{s.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </section>
  );
}