import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Sections/Navbar';
import Footer from '../components/Sections/Footer';
import { useNews } from '../context/NewsContext';
import { useGrievances } from '../context/GrievanceContext';
import { useTranslator } from '../context/LanguageContext';

const API_BASE = process.env.REACT_APP_API_URL || '';

export default function AdminPanel() {
  const [tab, setTab] = useState('grievances');
  const [loginOpen, setLoginOpen] = useState(true);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslator();
  const { grievances, loading: gLoading } = useGrievances();
  const { news, loading: nLoading, addNews } = useNews();
  const [newNews, setNewNews] = useState({ title: '', desc: '', category: '', img: '' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setLoginOpen(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginCreds)
      });
      if (res.ok) {
        localStorage.setItem('adminToken', 'logged-in');
        setIsAuthenticated(true);
        setLoginOpen(false);
      } else {
        alert('Invalid credentials. Use: admin / admin123');
      }
    } catch (err) {
      alert('Login failed. Is server running?');
    }
    setAuthLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginOpen(true);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.desc) return alert('Title & desc required');
    const saved = await addNews({
      title: newNews.title,
      desc: newNews.desc,
      date: new Date().toISOString().split('T')[0],
      category: newNews.category || 'general',
      img: newNews.img || ''
    });
    if (saved) {
      setNewNews({ title: '', desc: '', category: '', img: '' });
      alert('News added!');
    }
  };

  const isLoggedIn = isAuthenticated && localStorage.getItem('adminToken');

  if (loginOpen && !isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '40px', boxShadow: '0 20px 40px rgba(22,163,74,0.15)', maxWidth: 400, width: '100%' }}>
          <h2 style={{ textAlign: 'center', color: '#14532d', fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Username</label>
              <input
                type="text"
                value={loginCreds.username}
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #d1fae5', borderRadius: 10, fontSize: '1rem' }}
                required
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #d1fae5', borderRadius: 10, fontSize: '1rem' }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #16a34a, #22c55e)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: authLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {authLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.9rem', color: '#6b7280' }}>Demo: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <div style={{ padding: '20px 40px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#14532d', margin: 0 }}>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 24px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          <button
            onClick={() => setTab('grievances')}
            style={{
              padding: '12px 24px',
              border: '2px solid #d1fae5',
              background: tab === 'grievances' ? '#16a34a' : '#f0fdf4',
              color: tab === 'grievances' ? '#fff' : '#14532d',
              borderRadius: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Grievances ({grievances.length})
          </button>
          <button
            onClick={() => setTab('news')}
            style={{
              padding: '12px 24px',
              border: '2px solid #d1fae5',
              background: tab === 'news' ? '#16a34a' : '#f0fdf4',
              color: tab === 'news' ? '#fff' : '#14532d',
              borderRadius: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Manage News
          </button>
        </div>

        {tab === 'grievances' && (
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' }}>All Grievances ({grievances.length})</h2>
            </div>
            {gLoading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading...</div>
            ) : grievances.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>No grievances yet</div>
            ) : (
              <div style={{ maxHeight: 600, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6' }}>
                      <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e5e7eb' }}>Name</th>
                      <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e5e7eb' }}>Mobile</th>
                      <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e5e7eb' }}>Department</th>
                      <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e5e7eb' }}>Status</th>
                      <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e5e7eb' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grievances.slice(0, 50).map((g, i) => (
                      <tr key={g.id || i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '16px 24px', fontWeight: 500 }}>{g.fullName}</td>
                        <td style={{ padding: '16px 24px' }}>{g.mobile}</td>
                        <td style={{ padding: '16px 24px' }}>{g.department}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{
                            background: g.status === 'resolved' ? '#dcfce7' : '#fef3c7',
                            color: g.status === 'resolved' ? '#166534' : '#92400e',
                            padding: '4px 12px',
                            borderRadius: 20,
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}>
                            {g.status?.toUpperCase() || 'PENDING'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: '#6b7280' }}>
                          {new Date(g.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'news' && (
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' }}>Add New News</h2>
            </div>
            <form onSubmit={handleAddNews} style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Title *</label>
                  <input
                    type="text"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #d1fae5', borderRadius: 10 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Category</label>
                  <input
                    type="text"
                    value={newNews.category}
                    onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                    placeholder="e.g. Announcement"
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #d1fae5', borderRadius: 10 }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Description *</label>
                <textarea
                  value={newNews.desc}
                  onChange={(e) => setNewNews({ ...newNews, desc: e.target.value })}
                  rows={4}
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid #d1fae5', borderRadius: 10, fontFamily: 'inherit' }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Image URL (optional)</label>
                <input
                  type="url"
                  value={newNews.img}
                  onChange={(e) => setNewNews({ ...newNews, img: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid #d1fae5', borderRadius: 10 }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #16a34a, #22c55e)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '14px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Add News
              </button>
            </form>
            {nLoading && <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>Loading news...</div>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

