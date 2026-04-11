import React, { useState, useEffect } from "react";
import { useNews } from "../context/NewsContext";
import { useGrievances } from "../context/GrievanceContext";

import { Menu, X, Newspaper, MessageSquare, LayoutDashboard, Trash2, Edit, Sun, Moon } from "lucide-react";

export default function AdminPanel() {
  const [tab, setTab] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

const [darkMode, setDarkMode] = useState(false);
  const { news, loading: newsLoading, addNews, updateNews, deleteNews, fetchNews } = useNews();
  const { grievances, loading: grievanceLoading, fetchGrievances } = useGrievances();

  const [form, setForm] = useState({ title: "", desc: "", img: "", imageFile: null });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Style constants
  const inputStyle = { display: "block", width: "100%", marginBottom: 10, padding: 10, borderRadius: 8, border: "1px solid #ccc" };
  const btnStyle = { background: "#22c55e", color: "white", padding: 10, border: "none", borderRadius: 8, width: "100%" };
  const editBtn = { background: "#3b82f6", color: "white", border: "none", padding: "6px 10px", borderRadius: 6 };
  const delBtn = { background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: 6 };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, img: reader.result, imageFile: file });
    reader.readAsDataURL(file);
  };

  const addOrUpdateNews = async () => {
    if (!form.title || !form.desc) return showToast("Fill all fields", "error");

    try {
      if (editingId) {
        await updateNews(editingId, form);
        showToast("News updated");
      } else {
        await addNews(form);
        showToast("News added");
      }
      setForm({ title: "", desc: "", img: "", imageFile: null });
      setEditingId(null);
    } catch (err) {
      showToast("Operation failed", "error");
    }
  };

  const editNews = (n) => {
    setForm({ title: n.title, desc: n.desc, img: n.img });
    setEditingId(n.id);
  };

  const updateStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/grievance/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({ status: 'Resolved' })
      });
      if (res.ok) {
        fetchGrievances();
        showToast("Status updated");
      } else {
        showToast("Update failed", "error");
      }
    } catch (err) {
      showToast("Update failed", "error");
    }
  };

  const bg = darkMode ? "#0f172a" : "#f1f5f9";
  const card = darkMode ? "#1e293b" : "white";
  const text = darkMode ? "white" : "black";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bg, color: text }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: toast.type === "error" ? "#ef4444" : "#22c55e", color: "white", padding: "10px 20px", borderRadius: 8 }}>
          {toast.msg}
        </div>
      )}

      {/* MOBILE TOP BAR */}
      {isMobile && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#0f172a", color: "white", padding: 12, display: "flex", justifyContent: "space-between", zIndex: 1000 }}>
          <span>Admin</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "white" }}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      )}

      {/* SIDEBAR */}
      <div style={{
        width: isMobile ? (sidebarOpen ? "200px" : "0") : "220px",
        background: "#0f172a",
        color: "white",
        padding: isMobile ? (sidebarOpen ? "20px" : "0") : "20px",
        overflow: "hidden",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}>
        <h2>ADMIN</h2>

        {[{ key: "dashboard", icon: <LayoutDashboard size={16} /> }, { key: "grievances", icon: <MessageSquare size={16} /> }, { key: "news", icon: <Newspaper size={16} /> }].map(item => (
          <button key={item.key} onClick={() => { setTab(item.key); setSidebarOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", background: tab === item.key ? "#22c55e" : "transparent", color: "white", border: "none", padding: 10, borderRadius: 8, marginBottom: 10 }}>
            {item.icon} {item.key}
          </button>
        ))}

        {/* LOGOUT */}
        <div style={{ marginTop: "auto" }}>
          <button
            onClick={async () => {
              try {
                await fetch('/api/logout', {
                  method: 'POST',
                  credentials: 'include'
                });
              } catch {}
              localStorage.removeItem("adminToken");
              window.location.href = '/';
            }}
            style={{ width: "100%", background: "#ef4444", color: "white", border: "none", padding: 10, borderRadius: 8 }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: isMobile ? "70px 10px" : "20px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h1>Admin Panel</h1>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: "#e5e7eb", border: "none", padding: 8, borderRadius: 8 }}>
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>

            {/* Grievances Card */}
            <div style={{ flex: "1 1 220px", background: card, padding: 20, borderRadius: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Grievances</h3>
                <MessageSquare />
              </div>
              <p style={{ fontSize: 24, fontWeight: "bold" }}>{grievances.length}</p>

              <div style={{ fontSize: 12, marginTop: 8 }}>
                <div>Pending: {grievances.filter(g => g.status !== "Resolved").length}</div>
                <div>Resolved: {grievances.filter(g => g.status === "Resolved").length}</div>
              </div>
            </div>

            {/* News Card */}
            <div style={{ flex: "1 1 220px", background: card, padding: 20, borderRadius: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>News</h3>
                <Newspaper />
              </div>
              <p style={{ fontSize: 24, fontWeight: "bold" }}>{news.length}</p>
            </div>

          </div>
        )}


        {/* GRIEVANCES */}
        {tab === "grievances" && (
          <div style={{ background: card, padding: 15, borderRadius: 12 }}>
            <h3>Grievances</h3>
            {grievances.map(g => (
              <div key={g.id} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10, borderRadius: 8 }}>
                <h4>{g.name}</h4>
                <p>{g.issue}</p>
                <span style={{ fontSize: 12, color: g.status === "Resolved" ? "green" : "orange" }}>{g.status}</span>
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => updateStatus(g.id)} style={editBtn}>Resolve</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NEWS */}
        {tab === "news" && (
          <div style={{ background: card, padding: 15, borderRadius: 12 }}>
            <h3>{editingId ? "Edit News" : "Add News"}</h3>

            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
            <textarea placeholder="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{ ...inputStyle, height: 80 }} />
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {form.img && <img src={form.img} alt="preview" style={{ width: 100, marginTop: 10, borderRadius: 8 }} />}

            <button onClick={addOrUpdateNews} style={btnStyle}>{editingId ? "Update" : "Add"}</button>

            {news.map(n => (
              <div key={n.id} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10, borderRadius: 8 }}>
                <h4>{n.title}</h4>
                <p>{n.desc}</p>
                {n.img && <img src={n.img} style={{ width: 80 }} />}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => editNews(n)} style={editBtn}><Edit size={14} /> Edit</button>
                  <button onClick={async () => {
                    await deleteNews(n.id);
                    showToast("News deleted", "success");
                  }} style={delBtn}><Trash2 size={14} /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
 }

const inputStyle = { display: "block", width: "100%", marginBottom: 10, padding: 10, borderRadius: 8, border: "1px solid #ccc" };
const btnStyle = { background: "#22c55e", color: "white", padding: 10, border: "none", borderRadius: 8, width: "100%" };
const editBtn = { background: "#3b82f6", color: "white", border: "none", padding: "6px 10px", borderRadius: 6 };
const delBtn = { background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: 6 };
