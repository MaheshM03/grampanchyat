import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGrievances } from "../../context/GrievanceContext";
import {
  Droplet, Road, Hospital, BookOpen,
  Wheat, BarChart3, Trash2, Zap, MapPin, Phone, Mail
} from "lucide-react";

export default function GrievanceSection() {

  const { fetchGrievances } = useGrievances();

  const departments = [
    { name: "Water Supply", icon: <Droplet size={18} /> },
    { name: "Road & Infrastructure", icon: <Road size={18} /> },
    { name: "Health Department", icon: <Hospital size={18} /> },
    { name: "Education", icon: <BookOpen size={18} /> },
    { name: "Agriculture", icon: <Wheat size={18} /> },
    { name: "Revenue", icon: <BarChart3 size={18} /> },
    { name: "Sanitation", icon: <Trash2 size={18} /> },
    { name: "Electricity", icon: <Zap size={18} /> }
  ];

  const contactInfo = [
    { icon: <MapPin size={18} />, label: "Location", value: "Gangavarhe, Nashik - 422222" },
    { icon: <Phone size={18} />, label: "Phone", value: "+917620068056", action: "call" },
    { icon: <Mail size={18} />, label: "Email", value: "nsk.gangavarhe@gmail.com", action: "email" }
  ];

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    aadhaar: "",
    email: "",
    department: "",
    details: "",
    type: "complaint",
    image: ""
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (form.fullName.length > 50) newErrors.fullName = "Name too long (max 50 chars)";

    if (!form.mobile) newErrors.mobile = "Mobile is required";
    else if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Enter valid 10-digit mobile";
    
    if (!form.aadhaar) newErrors.aadhaar = "Aadhaar is required";
    else if (!/^\d{12}$/.test(form.aadhaar)) newErrors.aadhaar = "Enter valid 12-digit Aadhaar";

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid email";

    if (!form.department) newErrors.department = "Select department";

    if (!form.details.trim()) newErrors.details = "Details required";
    else if (form.details.length > 500) newErrors.details = "Max 500 chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("Please select an image file", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return showToast("Please fix errors", "error");

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/grievance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      showToast(data.message || "Submitted Successfully ✅");
      fetchGrievances();
      setForm({ fullName: "", mobile: "", aadhaar: "", email: "", department: "", details: "", type: "complaint", image: "" });
      setErrors({});
    } catch (error) {
      console.error('Submit error:', error);
      showToast(error.message || "Error ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (item) => {
    if (item.action === "call") window.location.href = `tel:${item.value}`;
    if (item.action === "email") window.location.href = `mailto:${item.value}`;
  };

  const isValidMobile = form.mobile.length === 10 && /^\d{10}$/.test(form.mobile);
  const isValidAadhaar = form.aadhaar.length === 12 && /^\d{12}$/.test(form.aadhaar);

  return (
    <section style={{ background: "#f8fafc" }}>
      <Navbar />

      {/* TOAST */}
      {toast && (
        <div style={{
          position: "fixed",
          top: 20,
          right: 20,
          background: toast.type === "error" ? "#ef4444" : "#16a34a",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: 8
        }}>
          {toast.msg}
        </div>
      )}

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: 50,
        textAlign: "center",
        color: "#fff"
      }}>
        <h2 style={{ fontWeight: 800 }}>Grievance Portal</h2>
      </div>

      {/* MAIN */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: 25,
        maxWidth: 1100,
        margin: "40px auto",
        padding: 20
      }}>

        {/* FORM */}
        <div style={card}>
          <h3 style={heading}>Submit Complaint</h3>

          <form onSubmit={handleSubmit}>

            <div>
              <input 
                placeholder="Full Name *" 
                style={{...input, ...(errors.fullName && inputError)}}
                value={form.fullName}
                onChange={(e) => setForm({...form, fullName: e.target.value})}
                maxLength={50}
              />
              {errors.fullName && <p style={errorText}>{errors.fullName} ({form.fullName.length}/50)</p>}
            </div>

            <div>
              <input 
                placeholder="Mobile (10 digits) *" 
                style={{...input, ...(errors.mobile && inputError)}}
                value={form.mobile}
                onChange={(e) => setForm({...form, mobile: e.target.value.replace(/\D/g,'')})}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                maxLength={10}
              />
              {errors.mobile ? <p style={errorText}>{errors.mobile}</p> : <p style={counterText}>{form.mobile.length}/10</p>}
            </div>

            <div>
              <input 
                placeholder="Aadhaar (12 digits) *" 
                style={{...input, ...(errors.aadhaar && inputError)}}
                value={form.aadhaar}
                onChange={(e) => setForm({...form, aadhaar: e.target.value.replace(/\D/g,'')})}
                maxLength={12}
              />
              {errors.aadhaar ? <p style={errorText}>{errors.aadhaar}</p> : <p style={counterText}>{form.aadhaar.length}/12</p>}
            </div>

            <input 
              placeholder="Email (optional)" 
              style={{...input, ...(errors.email && inputError)}}
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              type="email"
            />
            {errors.email && <p style={errorText}>{errors.email}</p>}

            {/* DEPARTMENT GRID */}
            <div style={{ marginBottom: 15 }}>
              <p style={{ fontWeight: 600 }}>Select Department *</p>
              {errors.department && <p style={errorText}>{errors.department}</p>}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
                gap: 10
              }}>
                {departments.map((d, i) => (
                  <div
                    key={i}
                    onClick={() => setForm({ ...form, department: d.name })}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      cursor: "pointer",
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      border: form.department === d.name
                        ? "2px solid #2563eb"
                        : "1px solid #ccc"
                    }}
                  >
                    {d.icon}
                    <span style={{ fontSize: 12 }}>{d.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TYPE SELECTOR */}
            <div style={{marginBottom: 15}}>
              <p style={{ fontWeight: 600 }}>Type</p>
              <div style={{display: 'flex', gap: 10}}>
                <label>
                  <input 
                    type="radio" 
                    value="complaint" 
                    checked={form.type === "complaint"}
                    onChange={(e) => setForm({...form, type: e.target.value})}
                  /> Complaint
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="suggestion" 
                    checked={form.type === "suggestion"}
                    onChange={(e) => setForm({...form, type: e.target.value})}
                  /> Suggestion
                </label>
              </div>
            </div>

            <div>
              <textarea 
                placeholder="Details *" 
                style={{ ...input, height: 100, ...(errors.details && inputError)}}
                value={form.details}
                onChange={(e) => setForm({...form, details: e.target.value})}
                maxLength={500}
              />
              {errors.details ? <p style={errorText}>{errors.details}</p> : <p style={counterText}>{form.details.length}/500</p>}
            </div>

            <input type="file" onChange={handleImageUpload} style={input} accept="image/*" />
            {form.image && (
              <img src={form.image} alt="Preview" style={{ width: 80, borderRadius: 8, margin: '10px 0' }} />
            )}

            <button type="submit" style={btn} disabled={loading}>
              {loading ? "Submitting..." : "Submit Grievance"}
            </button>

          </form>
        </div>

        {/* CONTACT */}
        <div style={contactCard}>
          <h3 style={heading}>Contact Office</h3>

          {contactInfo.map((item, i) => (
            <div key={i} style={contactItem}>

              <div style={iconBox}>{item.icon}</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{item.label}</div>
                <div style={{ fontWeight: 600 }}>{item.value}</div>
              </div>

              {item.action && (
                <button
                  onClick={() => handleAction(item)}
                  style={actionBtn}
                >
                  {item.action === "call" ? "Call" : "Email"}
                </button>
              )}

            </div>
          ))}

        </div>

      </div>

      <Footer />
    </section>
  );
}

/* STYLES */
const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 5,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14
};

const inputError = {
  borderColor: "#ef4444 !important",
  boxShadow: "0 0 0 3px rgba(239,68,68,0.1)"
};

const errorText = {
  color: "#ef4444",
  fontSize: 12,
  margin: "-5px 0 10px 0"
};

const counterText = {
  fontSize: 11,
  color: "#6b7280",
  margin: "-5px 0 10px 0",
  fontFamily: "monospace"
};

const btn = {
  background: "#2563eb",
  color: "#fff",
  padding: "12px 20px",
  width: "100%",
  borderRadius: 8,
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
  ":disabled": {
    opacity: 0.7,
    cursor: "not-allowed"
  }
};

const heading = {
  marginBottom: 20,
  fontWeight: 700,
  color: "#1f2937"
};

const contactCard = {
  background: "#fff",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
};

const contactItem = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 15,
  paddingBottom: 15,
  borderBottom: "1px solid #f3f4f6"
};

const iconBox = {
  width: 40,
  height: 40,
  background: "#eff6ff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
};

const actionBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 12
};
