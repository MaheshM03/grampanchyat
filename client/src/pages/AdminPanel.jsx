import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, MessageSquare, Newspaper,
  FileText, Sun, Moon, Edit, Trash2
} from "lucide-react";

import { useNews } from "../context/NewsContext";
import { useGrievances } from "../context/GrievanceContext";
import { useCertificates } from "../context/CertificateContext";

export default function AdminPanel() {

  const [tab, setTab] = useState("dashboard");
const [darkMode, setDarkMode] = useState(false);

  // News form state
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'News',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    imageUrl: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

const { news = [], addNews, updateNews, deleteNews, fetchNews } = useNews();
  const { grievances = [], fetchGrievances } = useGrievances();
  const { certs = { birth: [], death: [], residence: [] }, updateCertStatus } = useCertificates();

  useEffect(() => {
    fetchGrievances();
  }, []);

  return (
    <div className={darkMode ? "admin dark" : "admin"}>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>

        <button className={tab==="dashboard" ? "active":""} onClick={()=>setTab("dashboard")}>
          <LayoutDashboard size={16}/> Dashboard
        </button>

        <button className={tab==="grievances" ? "active":""} onClick={()=>setTab("grievances")}>
          <MessageSquare size={16}/> Grievances
        </button>

        <button className={tab==="news" ? "active":""} onClick={()=>setTab("news")}>
          <Newspaper size={16}/> News
        </button>

        <button className={tab==="certificates" ? "active":""} onClick={()=>setTab("certificates")}>
          <FileText size={16}/> Certificates
        </button>

        <div className="sidebar-bottom">
          <button onClick={()=>setDarkMode(!darkMode)}>
            {darkMode ? <Sun/> : <Moon/>}
          </button>

          <button className="logout-btn" onClick={()=>{
            localStorage.removeItem("adminToken");
            window.location.href="/";
          }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="content">

        {/* DASHBOARD */}
        {tab==="dashboard" && (
          <div className="dashboard-grid">
            <div className="stat blue">
              <h3>{grievances.length}</h3>
              <p>Total Grievances</p>
            </div>

            <div className="stat green">
              <h3>{news.length}</h3>
              <p>News</p>
            </div>

            <div className="stat orange">
              <h3>{certs.birth.length}</h3>
              <p>Birth Certificates</p>
            </div>
          </div>
        )}

        {/* GRIEVANCES */}
        {tab==="grievances" && (
          <div className="card">
            <h2>Grievances</h2>

            {grievances.map(g=>(
              <div key={g._id} className="item-card">
                <div>
                  <h4>{g.fullName}</h4>
                  <p>{g.details}</p>
                </div>

                <span className={`status ${g.status || "pending"}`}>
                  {g.status || "pending"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* NEWS */}
{tab==="news" && (
          <div className="card">
            <h2>News Management</h2>
            
            {/* Add News Button */}
            <button 
              className="add-btn mb-4"
              onClick={() => {
                setShowForm(true);
                setEditingNews(null);
                setFormData({
                  title: '',
                  category: 'News',
                  date: new Date().toISOString().split('T')[0],
                  excerpt: '',
                  content: '',
                  imageUrl: ''
                });
                setFormError('');
              }}
            >
              ➕ Add New News
            </button>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="news-form">
                <h3>{editingNews ? 'Edit News' : 'Add News'}</h3>
                
                {formError && (
                  <div className="error">{formError}</div>
                )}

                <div className="form-grid">
                  <input
                    placeholder="News Title *"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="News">News</option>
                    <option value="Public Work">Public Work</option>
                    <option value="Development works">Development works</option>
                    <option value="Antharman">Antharman</option>
                    <option value="Festival">Festival</option>
                  </select>

                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />

                  <textarea
                    placeholder="Excerpt * (short description)"
                    rows="2"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  />

                  <textarea
                    placeholder="Full Content"
                    rows="4"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />

                  <input
                    placeholder="Image URL (optional)"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>

                <div className="form-actions">
                  <button 
                    className="cancel-btn"
                    onClick={() => {
                      setShowForm(false);
                      setEditingNews(null);
                      setFormError('');
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button 
                    className="save-btn"
                    disabled={isSubmitting}
                    onClick={async () => {
                      // Validation
                      if (!formData.title || !formData.excerpt || !formData.category || !formData.date) {
                        setFormError('Title, excerpt, category and date are required');
                        return;
                      }

                      setIsSubmitting(true);
                      setFormError('');

                      try {
                        const newsData = {
                          title: formData.title,
                          category: formData.category,
                          date: formData.date,
                          excerpt: formData.excerpt,
                          content: formData.content || '',
                          imageUrl: formData.imageUrl || '',
                          hasImage: !!formData.imageUrl
                        };

                        let result;
                        if (editingNews) {
                          result = await updateNews(editingNews._id, newsData);
                        } else {
                          result = await addNews(newsData);
                        }

                        if (result) {
                          await fetchNews();
                          setShowForm(false);
                          setEditingNews(null);
                          setFormError('');
                        }
                      } catch (err) {
                        setFormError('Failed to save news. Check console.');
                        console.error(err);
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    {isSubmitting ? 'Saving...' : (editingNews ? 'Update' : 'Add News')}
                  </button>
                </div>
              </div>
            )}

            {/* News List */}
            <div className="news-list">
              {news.length === 0 ? (
                <p>No news yet. <button className="link-btn" onClick={() => setShowForm(true)}>Add first news</button></p>
              ) : (
                news.map(n => (
                  <div key={n._id} className="news-card">
                    <div className="news-content">
                      <h4>{n.title}</h4>
                      <p className="category">{n.category}</p>
                      <p>{n.excerpt}</p>
                      {n.content && <p className="content-preview">{n.content.substring(0, 100)}...</p>}
                      {n.imageUrl && <img src={n.imageUrl} alt="news" className="news-thumb" />}
                      <small>{new Date(n.date).toLocaleDateString()}</small>
                    </div>

                    <div className="news-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => {
                          setEditingNews(n);
                          setFormData({
                            title: n.title,
                            category: n.category,
                            date: new Date(n.date).toISOString().split('T')[0],
                            excerpt: n.excerpt,
                            content: n.content || '',
                            imageUrl: n.imageUrl || ''
                          });
                          setShowForm(true);
                        }}
                      >
                        <Edit size={14}/>
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={async () => {
                          if (window.confirm(`Delete "${n.title}"?`)) {
                            await deleteNews(n._id);
                            await fetchNews();
                          }
                        }}
                      >
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* CERTIFICATES */}
        {tab==="certificates" && (
          <div className="cert-container">

            {["birth","death","residence"].map(type=>(
              <div key={type} className="cert-column">

                <h4>{type.toUpperCase()} ({certs[type].length})</h4>

                {certs[type].map(cert=>(
                  <div key={cert.id} className="cert-card">

                    <div className="cert-header">
                      <span className="token">#{cert.token}</span>

                      <span className={`status ${cert.status || "pending"}`}>
                        {cert.status || "pending"}
                      </span>
                    </div>

                    <p className="cert-info">
                      📱 {cert.mobile}
                    </p>

                    <button
                      className={`cert-btn ${
                        cert.status==="approved" ? "reopen":"approve"
                      }`}
                      onClick={()=>updateCertStatus(
                        type,
                        cert.id,
                        cert.status==="approved"?"pending":"approved"
                      )}
                    >
                      {cert.status==="approved"?"Reopen":"Approve"}
                    </button>

                  </div>
                ))}

              </div>
            ))}

          </div>
        )}

      </main>

      {/* CSS */}
      <style>{`

      .admin {
        display:flex;
        height:100vh;
        background:#f1f5f9;
        font-family:Inter;
      }

      .dark { background:#0f172a; color:white; }

      /* SIDEBAR */
      .sidebar {
        width:240px;
        background:#0f172a;
        color:white;
        padding:20px;
        display:flex;
        flex-direction:column;
      }

      .sidebar button {
        padding:12px;
        border:none;
        background:none;
        color:white;
        border-radius:10px;
        margin-bottom:10px;
        text-align:left;
        transition:0.3s;
      }

      .sidebar button:hover {
        background:#1e293b;
      }

      .sidebar button.active {
        background:#2563eb;
      }

      .sidebar-bottom { margin-top:auto; }

      .logout-btn {
        background:linear-gradient(135deg,#ef4444,#dc2626);
        padding:12px;
        border-radius:10px;
        color:white;
        width:100%;
      }

      /* CONTENT */
      .content {
        flex:1;
        padding:25px;
        overflow:auto;
      }

      /* DASHBOARD */
      .dashboard-grid {
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
        gap:20px;
      }

      .stat {
        padding:20px;
        border-radius:16px;
        color:white;
        text-align:center;
      }

      .blue { background:#3b82f6; }
      .green { background:#10b981; }
      .orange { background:#f59e0b; }

      /* CARD */
      .card {
        background:white;
        padding:24px;
        border-radius:16px;
      }

      .dark .card { background:#1e293b; }

      /* NEWS FORM */
      .news-form {
        background:#f0f9ff;
        padding:20px;
        border-radius:12px;
        margin-bottom:20px;
        border:2px solid #0ea5e9;
      }

      .dark .news-form { background:#0c4a6e; }

      .form-grid {
        display:grid;
        gap:12px;
        grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
      }

      .form-grid input, .form-grid select, .form-grid textarea {
        padding:10px;
        border:1px solid #d1d5db;
        border-radius:8px;
        font-size:14px;
      }

      .dark .form-grid input, .dark .form-grid select, .dark .form-grid textarea {
        background:#1e293b;
        color:white;
        border-color:#475569;
      }

      .form-actions {
        display:flex;
        gap:10px;
        margin-top:16px;
      }

      .save-btn, .cancel-btn {
        padding:10px 20px;
        border:none;
        border-radius:8px;
        font-weight:500;
      }

      .save-btn {
        background:#10b981;
        color:white;
      }

      .save-btn:hover { background:#059669; }
      .save-btn:disabled { opacity:0.6; }

      .cancel-btn {
        background:#6b7280;
        color:white;
      }

      .cancel-btn:hover { background:#4b5563; }

      .error {
        background:#fee2e2;
        color:#dc2626;
        padding:10px;
        border-radius:8px;
        margin-bottom:12px;
      }

      .add-btn {
        background:#3b82f6;
        color:white;
        padding:12px 20px;
        border-radius:10px;
        border:none;
      }

      .add-btn:hover { background:#2563eb; }

      .mb-4 { margin-bottom:16px; }

      .news-list { min-height:200px; }

      .category {
        background:#dbeafe;
        color:#1e40af;
        padding:4px 8px;
        border-radius:20px;
        font-size:12px;
        font-weight:600;
        display:inline-block;
        margin-bottom:8px;
      }

      .content-preview {
        font-style:italic;
        color:#64748b;
        margin:8px 0;
      }

      .news-thumb {
        width:60px;
        height:40px;
        object-fit:cover;
        border-radius:6px;
        margin:4px 0;
      }

      .link-btn {
        color:#3b82f6;
        background:none;
        border:none;
        cursor:pointer;
        text-decoration:underline;
      }

      /* GRIEVANCE ITEMS */
      .item-card {
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:16px;
        margin-bottom:12px;
        border-radius:12px;
        background:#f9fafb;
      }

      /* NEWS UI */
      .news-card {
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:16px;
        margin-bottom:12px;
        border-radius:12px;
        background:#f9fafb;
      }

      .news-actions button {
        margin-left:8px;
        padding:8px;
        border:none;
        border-radius:8px;
      }

      .edit-btn { background:#3b82f6; color:white; }
      .delete-btn { background:#ef4444; color:white; }

      /* CERTIFICATES */
      .cert-container {
        display:grid;
        gap:20px;
      }

      .cert-column {
        background:white;
        padding:20px;
        border-radius:16px;
      }

      .cert-card {
        background:#f8fafc;
        padding:16px;
        border-radius:12px;
        margin-bottom:12px;
      }

      .cert-header {
        display:flex;
        justify-content:space-between;
        margin-bottom:10px;
      }

      .cert-btn {
        width:100%;
        padding:10px;
        border:none;
        border-radius:8px;
      }

      .approve { background:#10b981; color:white; }
      .reopen { background:#6b7280; color:white; }

      @media(min-width:768px){
        .cert-container {
          grid-template-columns:repeat(3,1fr);
        }
      }

      .status.pending { background:#fee2e2; padding:5px 10px; border-radius:10px; }
      .status.resolved { background:#dcfce7; padding:5px 10px; border-radius:10px; }

      `}</style>
    </div>
  );
}