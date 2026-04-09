import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGrievances } from "../../context/GrievanceContext";

const departments = [
  "Water Supply", "Road & Infrastructure", "Health Department",
  "Education", "Agriculture", "Revenue", "Sanitation", "Other",
];

const contactInfo = [
  { icon: "📍", label: "Location", value: "गंगावऱ्हे, नाशिक - 422222" },
  { icon: "📞", label: "Phone", value: "+91 7620068056" },
  { icon: "📧", label: "Email", value: "nsk.gangavarhe@gmail.com" },
];

export default function GrievanceSection() {
  const { fetchGrievances } = useGrievances();

  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    mobile: "", aadhar: "", email: "",
    department: "", complaint: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Enter 10 digit mobile";
    if (!/^\d{12}$/.test(form.aadhar)) newErrors.aadhar = "Enter 12 digit aadhar";
    if (!form.department) newErrors.department = "Select department";
    if (form.complaint.length < 20) newErrors.complaint = "Minimum 20 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d{0,10}$/.test(value)) return;
    if (name === "aadhar" && !/^\d{0,12}$/.test(value)) return;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await fetch(`${API_BASE}/api/grievance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setSubmitted(true);
      fetchGrievances();

      setForm({
        firstName: "", middleName: "", lastName: "",
        mobile: "", aadhar: "", email: "",
        department: "", complaint: "",
      });

    } catch {
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ background: "#f0fdf4" }}>
      <Navbar />

      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Grievance Section</h2>
      </div>

      {/* MAIN GRID */}
      <div className="grid-container" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 30,
        maxWidth: 1100,
        margin: "0 auto",
        padding: 20
      }}>

        {/* FORM */}
        <div style={card}>
          <h3>Submit Complaint</h3>

          {submitted ? (
            <h4>✅ Submitted Successfully</h4>
          ) : (
            <form onSubmit={handleSubmit}>

              <div className="name-row" style={{ display: "flex", gap: 10 }}>
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} style={input} />
                <input name="middleName" placeholder="Middle Name" value={form.middleName} onChange={handleChange} style={input} />
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} style={input} />
              </div>

              <input name="mobile" value={form.mobile} placeholder="Mobile" onChange={handleChange} style={input} />
              {errors.mobile && <p style={error}>{errors.mobile}</p>}

              <input name="aadhar" value={form.aadhar} placeholder="Aadhar" onChange={handleChange} style={input} />
              {errors.aadhar && <p style={error}>{errors.aadhar}</p>}

              <input name="email" value={form.email} placeholder="Email" onChange={handleChange} style={input} />

              <select name="department" value={form.department} onChange={handleChange} style={input}>
                <option value="">Select Department</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
              {errors.department && <p style={error}>{errors.department}</p>}

              <textarea name="complaint" value={form.complaint} placeholder="Complaint" onChange={handleChange} style={{ ...input, minHeight: 100 }} />
              {errors.complaint && <p style={error}>{errors.complaint}</p>}

              <button type="submit" style={btn}>
                {loading ? "Submitting..." : "Submit"}
              </button>

            </form>
          )}
        </div>

        {/* CONTACT (UPDATED DESIGN) */}
        <div style={contactCard}>
          <h3 style={contactHeading}>Get In Touch</h3>

          {contactInfo.map((c, i) => (
            <div key={i} style={contactItem}>
              <div style={iconBox}>{c.icon}</div>
              <div>
                <div style={label}>{c.label}</div>
                <div style={value}>{c.value}</div>
              </div>
            </div>
          ))}

          <div style={officeBox}>
            <div style={{ fontSize: 40 }}>🏛️</div>
            <div style={{ fontWeight: "600" }}>Gram Panchayat Office</div>
            <div style={{ fontSize: 13 }}>Gangavarhe, Nashik</div>
          </div>
        </div>

      </div>

      {/* RESPONSIVE */}
      <style>
        {`
          @media (max-width: 768px) {
            .grid-container {
              grid-template-columns: 1fr !important;
            }
            .name-row {
              flex-direction: column !important;
            }
          }
        `}
      </style>

      <Footer />
    </section>
  );
}

/* STYLES */
const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const btn = {
  background: "#16a34a",
  color: "#fff",
  padding: 10,
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};

const error = {
  color: "red",
  fontSize: 12
};

/* CONTACT UI */
const contactCard = {
  background: "#fff",
  padding: 24,
  borderRadius: 16,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
};

const contactHeading = {
  marginBottom: 20,
  fontSize: 20,
  fontWeight: "600"
};

const contactItem = {
  display: "flex",
  gap: 12,
  padding: 12,
  background: "#f8fafc",
  borderRadius: 10,
  marginBottom: 10
};

const iconBox = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "#dcfce7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const label = {
  fontSize: 12,
  color: "#64748b"
};

const value = {
  fontSize: 14,
  fontWeight: "500"
};

const officeBox = {
  marginTop: 20,
  padding: 20,
  textAlign: "center",
  borderRadius: 12,
  background: "#eef2ff"
};