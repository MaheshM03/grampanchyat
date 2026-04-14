import React, { useState, useEffect } from "react";
import { LayoutDashboard, MessageSquare, Newspaper, Sun, Moon, Edit, Trash2 } from "lucide-react";
import { useNews } from "../context/NewsContext";
import { useGrievances } from "../context/GrievanceContext";


export default function AdminPanel() {
  const [tab, setTab] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const { news, loading: newsLoading, addNews, updateNews, deleteNews, fetchNews } = useNews();
  const { grievances, loading: grievanceLoading, fetchGrievances } = useGrievances();

  const [form, setForm] = useState({ 
    title: "", 
    desc: "", 
    excerpt: "", 
    date: new Date().toISOString().split('T')[0], 
    category: "News",
    img: "", 
    imageFile: null 
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }

    fetchGrievances();
    fetchNews();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bg = darkMode ? "#0f172a" : "#f1f5f9";
  const card = darkMode ? "#1e293b" : "white";
  const text = darkMode ? "white" : "black";

  const baseButton = {
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: 600
  };

  const styles = {
    page: {
      display: "flex",
      minHeight: "100vh",
      background: bg,
      color: text,
      fontFamily: "Inter, Arial, sans-serif"
    },
    toast: {
      position: "fixed",
      top: 20,
      right: 20,
      background: "#22c55e",
      color: "white",
      padding: "12px 20px",
      borderRadius: 10,
      zIndex: 1000,
      boxShadow: "0 12px 30px rgba(0,0,0,0.18)"
    },
    mobileTopBar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "#0f172a",
      color: "white",
      padding: 12,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1000
    },
    sidebar: {
      width: isMobile ? (sidebarOpen ? 240 : 0) : 240,
      background: "#0f172a",
      color: "white",
      padding: isMobile ? (sidebarOpen ? "24px" : "0") : "24px",
      overflow: "hidden",
      transition: "width 0.25s ease, padding 0.25s ease",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: isMobile ? "fixed" : "relative",
      left: 0,
      top: 0,
      zIndex: isMobile ? 1100 : "auto",
      boxShadow: isMobile && sidebarOpen ? "3px 0 20px rgba(0,0,0,0.18)" : "none"
    },
    sidebarButton: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      background: "transparent",
      color: "white",
      border: "none",
      padding: 14,
      borderRadius: 12,
      marginBottom: 10,
      textAlign: "left",
      fontSize: 14,
      cursor: "pointer",
      transition: "background 0.2s ease"
    },
    sidebarFooter: {
      marginTop: "auto",
      paddingTop: 20
    },
    card: {
      background: card,
      padding: 28,
      borderRadius: 18,
      boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
      minWidth: 0
    },
    cardRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: 20
    },
    cardItem: {
      flex: "1 1 280px",
      minWidth: 260
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    },
    formInput: {
      display: "block",
      width: "100%",
      marginBottom: 14,
      padding: 14,
      borderRadius: 12,
      border: "1px solid #d1d5db",
      background: darkMode ? "#0f172a" : "#fff",
      color: darkMode ? "#f8fafc" : "#111827"
    },
    primaryBtn: {
      ...baseButton,
      background: "#22c55e",
      color: "white",
      padding: "14px 18px",
      width: "100%"
    },
    secondaryBtn: {
      ...baseButton,
      background: "#3b82f6",
      color: "white",
      padding: "12px 16px"
    },
    dangerBtn: {
      ...baseButton,
      background: "#ef4444",
      color: "white",
      padding: "12px 16px"
    },
    itemCard: {
      border: "1px solid #e5e7eb",
      padding: 18,
      marginBottom: 14,
      borderRadius: 14,
      background: darkMode ? "#111827" : "#f9fafb"
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 700,
      margin: 0
    }
  };

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
    if (!form.title || !form.desc || !form.excerpt || !form.date || !form.category) {
      return showToast("Please fill all required fields", "error");
    }

    const newsData = {
      title: form.title,
      excerpt: form.excerpt,
      date: new Date(form.date + 'T00:00:00'),
      category: form.category,
      content: form.desc,
      imageUrl: form.img,
      hasImage: !!form.img
    };

    try {
      if (editingId) {
        await updateNews(editingId, newsData);
        showToast("News updated");
      } else {
        await addNews(newsData);
        showToast("News added");
      }
      setForm({ 
        title: "", 
        desc: "", 
        excerpt: "",
        date: new Date().toISOString().split('T')[0],
        category: "News",
        img: "", 
        imageFile: null 
      });
      setEditingId(null);
    } catch (err) {
      showToast("Operation failed", "error");
    }
  };

  const editNews = (n) => {
    setForm({ 
      title: n.title || "",
      desc: n.content || "",
      excerpt: n.excerpt || "",
      date: n.date ? n.date.split('T')[0] : new Date().toISOString().split('T')[0],
      category: n.category || "News",
      img: n.imageUrl || "",
      imageFile: null
    });
    setEditingId(n._id);
  };

  const updateStatus = async (id) => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://grampanchyat1.onrender.com');
      const res = await fetch(`${API_BASE}/api/grievance/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' })
      });
      if (res.ok) {
        fetchGrievances();
        showToast("Status updated to resolved");
      } else {
        showToast("Update failed", "error");
      }
    } catch (err) {
      showToast("Update failed", "error");
    }
  };

  return (
    <div style={styles.page}>

      {/* TOAST */}
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === "error" ? "#ef4444" : "#22c55e" }}>
          {toast.msg}
        </div>
      )}

      {/* MOBILE TOP BAR */}
      {isMobile && (
        <div style={styles.mobileTopBar}>
          <span style={{ fontWeight: 700 }}>Admin Panel</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
      )}

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: 30, fontSize: 20, letterSpacing: 1, fontWeight: 700 }}>ADMIN PANEL</h2>

        {[ 
          { key: "dashboard", icon: "📊", label: "Dashboard" },
          { key: "grievances", icon: "💬", label: "Grievances" },
          { key: "news", icon: <Newspaper size={16} />, label: "News" }
        ].map(item => (
          <button key={item.key} onClick={() => { setTab(item.key); setSidebarOpen(false); }} 
                  style={{ 
                    ...styles.sidebarButton,
                    background: tab === item.key ? "#22c55e" : "transparent",
                    opacity: tab === item.key ? 1 : 0.88
                  }}>
            {item.icon} {item.label}
          </button>
        ))}

        {/* Dark Mode Toggle */}
        <div style={styles.sidebarFooter}>
          <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 12}}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ 
              background: darkMode ? "#eab308" : "#6b7280", border: "none", padding: 10, borderRadius: "50%", cursor: "pointer" 
            }}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <span style={{fontSize: 12}}>Dark Mode</span>
          </div>

          <button
            onClick={async () => {
              try {
                const API_BASE = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://grampanchyat1.onrender.com');
                await fetch(`${API_BASE}/api/logout`, {
                  method: 'POST',
                  credentials: 'include'
                });
              } catch {}
              localStorage.removeItem("adminToken");
              window.location.href = '/';
            }}
            style={{ ...styles.dangerBtn, width: '100%', padding: '14px 0' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: isMobile ? "90px 16px 16px" : "32px", overflowY: "auto" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div style={styles.cardRow}>
            <div style={{ ...styles.cardItem, ...styles.card }}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={{ margin: 0 }}>Total Grievances</h3>
                  <p style={{ margin: 0, color: '#6b7280' }}>Overview of current cases</p>
                </div>
                <MessageSquare size={20} />
              </div>
              <p style={{ fontSize: 32, fontWeight: "bold", color: "#3b82f6", margin: "0 0 10px 0" }}>
                {grievances.length}
              </p>
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <div>Pending: {grievances.filter(g => g.status === 'pending').length}</div>
                <div>Processed: {grievances.filter(g => g.status === 'processed').length}</div>
                <div>Resolved: {grievances.filter(g => g.status === 'resolved').length}</div>
              </div>
            </div>

            <div style={{ ...styles.cardItem, ...styles.card }}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={{ margin: 0 }}>News Items</h3>
                  <p style={{ margin: 0, color: '#6b7280' }}>Published updates</p>
                </div>
                📰
              </div>
              <p style={{ fontSize: 32, fontWeight: "bold", color: "#22c55e", margin: "0 0 10px 0" }}>
                {news.length}
              </p>
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <div>Loading: {newsLoading ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        )}

        {/* GRIEVANCES TAB */}
        {tab === "grievances" && (
          <div style={styles.card}>
            <h3 style={{ marginBottom: 18 }}>Manage Grievances ({grievances.length})</h3>
            {grievanceLoading ? (
              <p>Loading grievances...</p>
            ) : grievances.length === 0 ? (
              <p>No grievances yet</p>
            ) : (
              grievances.map(g => (
                <div key={g._id} style={styles.itemCard}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 10}}>
                    <h4 style={{margin: 0, fontSize: 16}}>{g.fullName}</h4>
                    <span style={{ 
                      fontSize: 12, 
                      fontWeight: 700,
                      padding: '6px 10px',
                      borderRadius: 999,
                      background: g.status === 'resolved' ? '#dcfce7' : g.status === 'processed' ? '#fef3c7' : '#fee2e2',
                      color: g.status === 'resolved' ? '#166534' : g.status === 'processed' ? '#a16207' : '#991b1b'
                    }}>
                      {g.status || 'pending'}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 10 }}>
                    <p style={{margin: 0, fontSize: 14}}><strong>Department:</strong> {g.department}</p>
                    <p style={{margin: 0, fontSize: 14}}><strong>Mobile:</strong> {g.mobile}</p>
                  </div>
                  <p style={{margin: 0, color: '#6b7280', lineHeight: 1.75}}>{g.details}</p>
                  <div style={{marginTop: 16}}>
                    <button onClick={() => updateStatus(g._id)} style={{...styles.secondaryBtn, marginRight: 8}}>
                      {g.status === 'resolved' ? 'Reopen' : 'Mark Resolved'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* NEWS TAB */}
        {tab === "news" && (
          <div style={styles.card}>
            <h3 style={{ marginBottom: 22 }}>{editingId ? "Edit News Item" : "Add New News"}</h3>

            <input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={styles.formInput} />
            <textarea placeholder="Description *" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{ ...styles.formInput, height: 120, resize: 'vertical' }} />
            <input placeholder="Excerpt (short summary) *" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} style={styles.formInput} />
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={styles.formInput} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={styles.formInput}>
              <option value="News">News</option>
              <option value="Public Work">Public Work</option>
              <option value="Development works">Development works</option>
              <option value="Antharman">Antharman</option>
              <option value="Festival">Festival</option>
            </select>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.formInput} />

            {form.img && <img src={form.img} alt="Preview" style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 12, marginTop: 10 }} />}

            <button onClick={addOrUpdateNews} style={styles.primaryBtn} disabled={newsLoading}>
              {editingId ? "Update News" : "Add News"}
            </button>

            <h4 style={{ marginTop: 32, marginBottom: 16 }}>Existing News ({news.length})</h4>
            {news.map(n => (
              <div key={n._id} style={styles.itemCard}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12}}>
                  <div style={{flex: 1}}>
                    <h4 style={{margin: '0 0 8px 0'}}>{n.title}</h4>
                    <p style={{margin: '0 0 8px 0', color: '#6b7280'}}>{n.excerpt}</p>
                    <div style={{fontSize: 12, color: '#9ca3af'}}>
                      <span>Category: {n.category}</span> | <span>Date: {new Date(n.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {n.imageUrl && <img src={n.imageUrl} alt="" style={{width: 72, height: 48, objectFit: 'cover', borderRadius: 10}} />}
                </div>
                <div style={{marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
                  <button onClick={() => editNews(n)} style={styles.secondaryBtn}>
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={async () => {
                    try {
                      await deleteNews(n._id);
                      showToast("News deleted", "success");
                    } catch (err) {
                      showToast("Delete failed", "error");
                    }
                  }} style={styles.dangerBtn}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
