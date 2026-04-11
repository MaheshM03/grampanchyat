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
    firstName: "",
    mobile: "",
    department: "",
    complaint: "",
    image: ""
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.mobile || !form.department || !form.complaint) {
      return showToast("Please fill all fields", "error");
    }

    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/grievance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          mobile: form.mobile,
          department: form.department,
          complaint: form.complaint,
          image: form.image,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      const data = await response.json();
      showToast(data.message || "Submitted Successfully ✅");
      fetchGrievances();
      setForm({ firstName: "", mobile: "", department: "", complaint: "", image: "" });
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

            <input placeholder="Name" style={input} />

            <input placeholder="Mobile" style={input} />

            {/* DEPARTMENT GRID */}
            <div style={{ marginBottom: 15 }}>
              <p style={{ fontWeight: 600 }}>Select Department</p>

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

            <textarea placeholder="Complaint" style={{ ...input, height: 100 }} />

            <input type="file" onChange={handleImageUpload} style={input} />

            {form.image && (
              <img src={form.image} style={{ width: 80, borderRadius: 8 }} />
            )}

            <button style={btn}>
              {loading ? "Submitting..." : "Submit"}
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
                <div style={{ fontSize: 12 }}>{item.label}</div>
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
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #ccc"
};

const btn = {
  background: "#2563eb",
  color: "#fff",
  padding: 12,
  width: "100%",
  borderRadius: 8,
  border: "none"
};

const heading = {
  marginBottom: 15,
  fontWeight: 700
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
  gap: 10,
  marginBottom: 10
};

const iconBox = {
  width: 35,
  height: 35,
  background: "#e0e7ff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const actionBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "pointer"
};