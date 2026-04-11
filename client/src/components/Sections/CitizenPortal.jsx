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
    <section style={{ background: "#f8fafc" }}>
      <Navbar />

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}>
        <div>
          <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 800 }}>
            Citizen Service Facility Center
          </h2>
          <button style={{
            marginTop: 10,
            background: "#facc15",
            padding: "8px 18px",
            borderRadius: 6,
            border: "none"
          }}>
            Find out
          </button>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: 20 }}>

        {/* SEARCH */}
        <div style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          maxWidth: 700,
          margin: "0 auto 20px"
        }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find your service..."
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc"
            }}
          />
          <button style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: 8,
            border: "none"
          }}>
            Search
          </button>
        </div>

        {/* CATEGORY */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          marginBottom: 20
        }}>
          {categories.map((c) => (
            <span key={c} style={{
              background: "#e0e7ff",
              color: "#1e3a8a",
              padding: "5px 10px",
              borderRadius: 20,
              fontSize: 12
            }}>
              {c}
            </span>
          ))}
        </div>

        {/* TABS */}
        <div style={{
          display: "flex",
          maxWidth: 1000,
          margin: "auto",
          border: "1px solid #2563eb",
          borderRadius: 8,
          overflow: "hidden"
        }}>
          {[
            ["csc", "CSC Services"],
            ["dept", "Department-wise Services"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1,
                padding: 10,
                background: tab === key ? "#2563eb" : "#fff",
                color: tab === key ? "#fff" : "#000",
                border: "none"
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div style={{
          maxWidth: 1000,
          margin: "20px auto",
          overflowX: "auto",
          borderRadius: 10
        }}>
          <table style={{
            width: "100%",
            minWidth: "700px",
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr style={{ background: "#1e3a8a", color: "#fff" }}>
                {["No.", "Scheme name", "Department", "Service details", "Portal", "Website"].map((h) => (
                  <th key={h} style={{ padding: 10 }}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((s, i) => (
                <tr key={i} style={{
                  background: i % 2 === 0 ? "#fff" : "#f1f5f9"
                }}>
                  <td style={td}>{s.no}</td>
                  <td style={td}>{s.scheme}</td>
                  <td style={td}>{s.dept}</td>
                  <td style={td}>{s.service}</td>
                  <td style={td}>{s.portal}</td>
                  <td style={{ ...td, color: "#2563eb" }}>{s.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <Footer />
    </section>
  );
}

const td = {
  padding: 10,
  borderBottom: "1px solid #ddd"
};