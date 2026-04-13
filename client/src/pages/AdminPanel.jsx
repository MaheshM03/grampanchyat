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

  // Style constants inside component
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

  const bg = darkMode ? "#0f172a" : "#f1f5f9";
  const card = darkMode ? "#1e293b" : "white";
  const text = darkMode ? "white" : "black";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bg, color: text }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: toast.type === "error" ? "#ef4444" : "#22c55e", color: "white", padding: "10px 20px", borderRadius: 8, zIndex: 1000 }}>
          {toast.msg}
        </div>
      )}

      {/* MOBILE TOP BAR */}
      {isMobile && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#0f172a", color: "white", padding: 12, display: "flex", justifyContent: "space-between", zIndex: 1000 }}>
          <span>Admin Panel</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "white" }}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
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
        <h2 style={{marginBottom: 30}}>ADMIN PANEL</h2>

        {[
          { key: "dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
          { key: "grievances", icon: <MessageSquare size={16} />, label: "Grievances" },
          { key: "news", icon: <Newspaper size={16} />, label: "News" }
        ].map(item => (
          <button key={item.key} onClick={() => { setTab(item.key); setSidebarOpen(false); }} 
                  style={{ 
                    display: "flex", alignItems: "center", gap: 8, width: "100%", 
                    background: tab === item.key ? "#22c55e" : "transparent", 
                    color: "white", border: "none", padding: 12, borderRadius: 8, marginBottom: 10,
                    textAlign: "left", fontSize: 14
                  }}>
            {item.icon} {item.label}
          </button>
        ))}

        {/* Dark Mode Toggle */}
        <div style={{marginTop: "auto", paddingTop: 20}}>
          <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 10}}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ 
              background: darkMode ? "#eab308" : "#6b7280", border: "none", padding: 8, borderRadius: "50%", cursor: "pointer" 
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
            style={{ width: "100%", background: "#ef4444", color: "white", border: "none", padding: 12, borderRadius: 8, fontWeight: 500 }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: isMobile ? "80px 15px 15px" : "30px", overflowY: "auto" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            
            {/* Grievances Card */}
            <div style={{ flex: "1 1 250px", minWidth: 220, background: card, padding: 25, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                <h3 style={{margin: 0}}>Grievances ({grievances.length})</h3>
                <MessageSquare size={20} />
              </div>
              <p style={{ fontSize: 32, fontWeight: "bold", color: "#3b82f6", margin: "0 0 10px 0" }}>
                {grievances.length}
              </p>
              <div style={{ fontSize: 13 }}>
                <div>Pending: {grievances.filter(g => g.status === 'pending').length}</div>
                <div>Processed: {grievances.filter(g => g.status === 'processed').length}</div>
                <div>Resolved: {grievances.filter(g => g.status === 'resolved').length}</div>
              </div>
            </div>

            {/* News Card */}
            <div style={{ flex: "1 1 250px", minWidth: 220, background: card, padding: 25, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                <h3 style={{margin: 0}}>News Items</h3>
                <Newspaper size={20} />
              </div>
              <p style={{ fontSize: 32, fontWeight: "bold", color: "#22c55e", margin: "0 0 10px 0" }}>
                {news.length}
              </p>
              <div style={{ fontSize: 13 }}>
                <div>Loading: {newsLoading ? 'Yes' : 'No'}</div>
              </div>
            </div>

          </div>
        )}

        {/* GRIEVANCES TAB */}
        {tab === "grievances" && (
          <div style={{ background: card, padding: 25, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h3>Manage Grievances ({grievances.length})</h3>
            {grievanceLoading ? (
              <p>Loading grievances...</p>
            ) : grievances.length === 0 ? (
              <p>No grievances yet</p>
            ) : (
              grievances.map(g => (
                <div key={g._id} style={{ 
                  border: "1px solid #e5e7eb", 
                  padding: 15, 
                  marginBottom: 12, 
                  borderRadius: 8,
                  background: text === 'white' ? '#f9fafb' : '#334155'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
                    <h4 style={{margin: 0, fontSize: 16}}>{g.fullName}</h4>
                    <span style={{ 
                      fontSize: 12, 
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: 12,
                      background: g.status === 'resolved' ? '#dcfce7' : g.status === 'processed' ? '#fef3c7' : '#fee2e2',
                      color: g.status === 'resolved' ? '#166534' : g.status === 'processed' ? '#a16207' : '#991b1b'
                    }}>
                      {g.status || 'pending'}
                    </span>
                  </div>
                  <p style={{margin: '4px 0', fontSize: 14}}><strong>Department:</strong> {g.department}</p>
                  <p style={{margin: '4px 0', fontSize: 14}}><strong>Mobile:</strong> {g.mobile}</p>
                  <p style={{margin: 0, color: '#6b7280'}}>{g.details}</p>
                  <div style={{marginTop: 12}}>
                    <button onClick={() => updateStatus(g._id)} style={{...editBtn, marginRight: 8}}>
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
          <div style={{ background: card, padding: 25, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h3>{editingId ? "Edit News Item" : "Add New News"}</h3>

            <input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
            <textarea placeholder="Description *" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{ ...inputStyle, height: 100 }} />
            
            <input 
              placeholder="Excerpt (short summary) *" 
              value={form.excerpt} 
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })} 
              style={inputStyle} 
            />
            
            <input 
              type="date" 
              value={form.date} 
              onChange={(e) => setForm({ ...form, date: e.target.value })} 
              style={inputStyle} 
            />
            
            <select 
              value={form.category} 
              onChange={(e) => setForm({ ...form, category: e.target.value })} 
              style={inputStyle}
            >
              <option value="News">News</option>
              <option value="Public Work">Public Work</option>
              <option value="Development works">Development works</option>
              <option value="Antharman">Antharman</option>
              <option value="Festival">Festival</option>
            </select>
            
            <input type="file" accept="image/*" onChange={handleImageUpload} style={inputStyle} />

            {form.img && <img src={form.img} alt="Preview" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 10 }} />}

            <button onClick={addOrUpdateNews} style={btnStyle} disabled={newsLoading}>
              {editingId ? "Update News" : "Add News"}
            </button>

            <h4 style={{marginTop: 30, marginBottom: 15}}>Existing News ({news.length})</h4>
            
            {news.map(n => (
              <div key={n._id} style={{ 
                border: "1px solid #e5e7eb", 
                padding: 15, 
                marginBottom: 12, 
                borderRadius: 8,
                background: text === 'white' ? '#f9fafb' : '#334155'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div style={{flex: 1}}>
                    <h4 style={{margin: '0 0 8px 0'}}>{n.title}</h4>
                    <p style={{margin: '0 0 8px 0', color: '#6b7280'}}>{n.excerpt}</p>
                    <div style={{fontSize: 12, color: '#9ca3af'}}>
                      <span>Category: {n.category}</span> | <span>Date: {new Date(n.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {n.imageUrl && <img src={n.imageUrl} alt="" style={{width: 60, height: 40, objectFit: 'cover', borderRadius: 4, marginLeft: 12}} />}
                </div>
                <div style={{marginTop: 12, display: 'flex', gap: 8}}>
                  <button onClick={() => editNews(n)} style={editBtn}>
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={async () => {
                    try {
                      await deleteNews(n._id);
                      showToast("News deleted", "success");
                    } catch (err) {
                      showToast("Delete failed", "error");
                    }
                  }} style={delBtn}>
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
