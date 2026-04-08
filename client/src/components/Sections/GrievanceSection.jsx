import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const departments = [
  "Water Supply", "Road & Infrastructure", "Health Department",
  "Education", "Agriculture", "Revenue", "Sanitation", "Other",
];

const contactInfo = [
  { icon: "📍", label: "Location", value: "Address: 79/07 • VTB, Via – Karad Rd, Kadepur, Maharashtra 415109", bg: "#f0fdf4", iconBg: "#bbf7d0" },
  { icon: "📞", label: "Phone / Fax", value: "+91 7620068056", bg: "#eff6ff", iconBg: "#bfdbfe" },
"Gramgangavarhe@Gmail.Com"
];

const inputBase = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 8,
  border: "1.5px solid #d1fae5",
  fontSize: "0.9rem",
  outline: "none",
  color: "#1e293b",
  background: "#f0fdf4",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "#374151",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

export default function GrievanceSection() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    mobile: "", aadhar: "", email: "", department: "", complaint: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section style={{ background: "#f0fdf4" }}>
        <Navbar/>
      {/* ── Page Header ── */}
      <div
        style={{
          background: "#f8fafb",
          textAlign: "center",
          padding: "48px 20px 32px",
          borderBottom: "2px solid #e5e7eb",
        }}
      >
        <h2
          style={{
            fontSize: "2.4rem",
            fontWeight: 900,
            color: "#1e293b",
            margin: "0 0 12px",
          }}
        >
          Grievance Section
        </h2>
        <button
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 20,
            padding: "6px 18px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          🏠 BACK TO HOME
        </button>
      </div>

      {/* ── Two-Column Layout ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          maxWidth: 1000,
          margin: "0 auto",
          padding: "56px 40px",
          alignItems: "start",
        }}
      >
        {/* ── Form Card ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "40px 36px",
            boxShadow: "0 4px 24px rgba(22,163,74,.10)",
            border: "1.5px solid #d1fae5",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#14532d",
              margin: "0 0 28px",
            }}
          >
            Fill This Form
          </h3>

          {submitted ? (
            /* Success State */
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h4
                style={{
                  color: "#14532d",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  margin: "0 0 8px",
                }}
              >
                Submitted Successfully!
              </h4>
              <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>
                Your grievance has been registered. We'll get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  background: "linear-gradient(90deg,#16a34a,#4ade80)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 32px",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: "1rem",
                  marginTop: 20,
                }}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <>
              {/* Name Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                {[
                  ["firstName", "First Name"],
                  ["middleName", "Middle Name"],
                  ["lastName", "Last Name"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label style={labelStyle}>{label} *</label>
                    <input
                      style={inputBase}
                      name={key}
                      placeholder={`Enter ${label}`}
                      value={form[key]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              {/* Single fields */}
              {[
                ["mobile", "Mobile Number", "Enter Mobile Number", true],
                ["aadhar", "Aadhar Number", "Enter Aadhar Number", true],
                ["email", "Email", "Email Address", false],
              ].map(([key, label, ph, required]) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>
                    {label} {required && "*"}
                  </label>
                  <input
                    style={inputBase}
                    name={key}
                    placeholder={ph}
                    value={form[key]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Department */}
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Select Department *</label>
                <select
                  style={{ ...inputBase, appearance: "none" }}
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                >
                  <option value="">– Select –</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Complaint */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Complaint Details *</label>
                <textarea
                  style={{ ...inputBase, minHeight: 100, resize: "vertical" }}
                  name="complaint"
                  placeholder="Describe your complaint..."
                  value={form.complaint}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={() => setSubmitted(true)}
                style={{
                  background: "linear-gradient(90deg,#16a34a,#4ade80)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 32px",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: "1rem",
                  boxShadow: "0 4px 16px rgba(22,163,74,.25)",
                }}
              >
                Submit Form
              </button>
            </>
          )}
        </div>

        {/* ── Contact Card ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "36px 30px",
            boxShadow: "0 4px 24px rgba(22,163,74,.08)",
            border: "1.5px solid #d1fae5",
          }}
        >
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#14532d",
              margin: "0 0 24px",
            }}
          >
            Get In Touch
          </h3>

          {contactInfo.map((c, i) => (
            <div
              key={i}
              style={{
                background: c.bg,
                borderRadius: 14,
                padding: "16px 18px",
                marginBottom: 14,
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: c.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 2,
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: "0.92rem",
                    color: "#1e293b",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {c.value}
                </div>
              </div>
            </div>
          ))}

          {/* Office illustration */}
          <div
            style={{
              marginTop: 24,
              borderRadius: 14,
              background: "#e2e8f0",
              height: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 44 }}>🏛️</div>
            <div
              style={{ fontSize: "0.9rem", fontWeight: 700, color: "#374151" }}
            >
              ग्रामसचिवालय कडेपूर
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
              Gram Panchayat Kadepur Office
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
}