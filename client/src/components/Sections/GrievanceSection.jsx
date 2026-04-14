import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGrievances } from "../../context/GrievanceContext";

export default function GrievanceSection() {

  const { fetchGrievances } = useGrievances();

  const departments = [
    { name: "Water Supply", icon: "💧" },
    { name: "Road & Infrastructure", icon: "🛣️" },
    { name: "Health Department", icon: "🏥" },
    { name: "Education", icon: "📖" },
    { name: "Agriculture", icon: "🌾" },
    { name: "Revenue", icon: "📊" },
    { name: "Sanitation", icon: "🗑️" },
    { name: "Electricity", icon: "⚡" }
  ];

  const contactInfo = [
    { icon: "📍", label: "Location", value: "Gangavarhe, Nashik - 422222" },
    { icon: "📞", label: "Phone", value: "+917620068056", action: "call" },
    { icon: "✉️", label: "Email", value: "nsk.gangavarhe@gmail.com", action: "email" }
  ];

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    aadhaar: "",
    email: "",
    department: "",
    details: ""
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const e = {};
    if (!form.fullName) e.fullName = "Required";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Invalid mobile";
    if (!/^\d{12}$/.test(form.aadhaar)) e.aadhaar = "Invalid Aadhaar";
    if (!form.department) e.department = "Select department";
    if (!form.details) e.details = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return showToast("Fix errors", "error");

    await fetch("https://grampanchyat1.onrender.com/api/grievance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    showToast("Submitted Successfully ✅");
    fetchGrievances();
  };

  const handleAction = (item) => {
    if (item.action === "call") window.location.href = `tel:${item.value}`;
    if (item.action === "email") window.location.href = `mailto:${item.value}`;
  };

  return (
    <section className="page">
      <Navbar />

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      {/* HERO */}
      <div className="hero">
        <h2>Grievance Portal</h2>
        <p>Submit your complaint easily</p>
      </div>

      {/* MAIN */}
      <div className="main-grid">

        {/* FORM */}
        <div className="card">
          <h3>Submit Complaint</h3>

          <form onSubmit={handleSubmit}>

            <input placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}

            <input placeholder="Mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '') })}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}

            <input placeholder="Aadhaar"
              value={form.aadhaar}
              onChange={(e) => setForm({ ...form, aadhaar: e.target.value.replace(/\D/g, '') })}
            />
            {errors.aadhaar && <p className="error">{errors.aadhaar}</p>}

            <input placeholder="Email (optional)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* DEPARTMENT */}
            <p className="label">Select Department</p>
            <div className="dept-grid">
              {departments.map((d, i) => (
                <div key={i}
                  className={`dept ${form.department === d.name ? "active" : ""}`}
                  onClick={() => setForm({ ...form, department: d.name })}
                >
                  {d.icon}
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
            {errors.department && <p className="error">{errors.department}</p>}

            <textarea placeholder="Details"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
            {errors.details && <p className="error">{errors.details}</p>}

            <button className="submit-btn">Submit Grievance</button>
          </form>
        </div>

        {/* CONTACT OFFICE */}
        <div className="contact">
          <h3 className="contact-title">📍 Contact Office</h3>

          <div className="contact-grid">
            {contactInfo.map((item, i) => (
              <div key={i} className="contact-card">

                <div className="contact-left">
                  <div className="contact-icon">{item.icon}</div>

                  <div className="contact-content">
                    <span className="label">{item.label}</span>
                    <span className="value">{item.value}</span>
                  </div>
                </div>

                {item.action && (
                  <button
                    className="contact-btn"
                    onClick={() => handleAction(item)}
                  >
                    {item.action === "call" ? "Call" : "Email"}
                  </button>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />

      {/* CSS */}
      <style>{`

      .page { background:#f8fafc; padding-bottom:40px; }

      .hero {
        background: linear-gradient(135deg,#1e3a8a,#2563eb);
        color:#fff;
        text-align:center;
        padding:50px 20px;
      }

      .main-grid {
        display:grid;
        grid-template-columns:1fr;
        gap:25px;
        max-width:1100px;
        margin:30px auto;
        padding:0 16px;
      }

      @media(min-width:768px){
        .main-grid { grid-template-columns:1fr 1fr; }
      }

      .card, .contact {
        background:#fff;
        padding:24px;
        border-radius:16px;
        box-shadow:0 10px 25px rgba(0,0,0,0.08);
      }

      h3 { margin-bottom:20px; }

      input, textarea {
        width:100%;
        padding:14px;
        margin-bottom:12px;
        border-radius:10px;
        border:1px solid #e2e8f0;
      }

      input:focus, textarea:focus {
        border-color:#2563eb;
        box-shadow:0 0 0 3px rgba(37,99,235,0.15);
        outline:none;
      }

      .label {
        margin:10px 0 8px;
        font-weight:600;
      }

      .dept-grid {
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
        gap:12px;
        margin-bottom:15px;
      }

      .dept {
        padding:14px;
        border-radius:12px;
        text-align:center;
        border:1px solid #ddd;
        cursor:pointer;
      }

      .dept.active {
        border:2px solid #2563eb;
        background:#eff6ff;
      }

      textarea { height:110px; }

      .submit-btn {
        width:100%;
        padding:14px;
        margin-top:10px;
        background:#2563eb;
        color:#fff;
        border:none;
        border-radius:10px;
        font-weight:600;
      }

      @media(max-width:600px){
        .submit-btn { position:sticky; bottom:10px; }
      }

      /* CONTACT */
      .contact-grid {
        display:flex;
        flex-direction:column;
        gap:15px;
      }

      .contact-card {
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:16px 18px;
        border-radius:14px;
        background:linear-gradient(135deg,#eef2f7,#e2ecf7);
      }

      .contact-left {
        display:flex;
        align-items:center;
        gap:14px;
      }

      .contact-icon {
        width:44px;
        height:44px;
        background:#2563eb;
        color:#fff;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .contact-content .label {
        font-size:12px;
        color:#64748b;
      }

      .contact-content .value {
        font-weight:600;
      }

      .contact-btn {
        padding:8px 14px;
        background:#2563eb;
        color:#fff;
        border:none;
        border-radius:8px;
      }

      @media(max-width:600px){
        .contact-card {
          flex-direction:column;
          align-items:flex-start;
          gap:10px;
        }

        .contact-btn {
          width:100%;
        }
      }

      .error { color:#ef4444; font-size:12px; }

      .toast {
        position:fixed;
        top:20px;
        right:20px;
        padding:12px;
        color:#fff;
        border-radius:8px;
      }

      .toast.success { background:#16a34a; }
      .toast.error { background:#ef4444; }

      `}</style>
    </section>
  );
}