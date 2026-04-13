import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 20 
    }}>
      <div style={{ 
        background: 'white', 
        padding: 40, 
        borderRadius: 16, 
        boxShadow: '0 20px 25px -5px rgba(0, 0,0,0.1)',
        width: '100%', 
        maxWidth: 400 
      }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ fontSize: 28, fontWeight: 'bold', color: '#1f2937' }}>Admin Login</h1>
          <p style={{ color: '#6b7280', marginTop: 8 }}>Enter credentials to access panel</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151' }}>Username</label>
            <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: 8, padding: 12 }}>
              <Mail size={20} style={{ color: '#6b7280', marginRight: 12 }} />
              <input 
                type="text" 
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="admin"
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 16 }}
                required 
              />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151' }}>Password</label>
            <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: 8, padding: 12 }}>
              <Lock size={20} style={{ color: '#6b7280', marginRight: 12 }} />
              <input 
                type="password" 
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="admin123"
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 16 }}
                required 
              />
            </div>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: 12, borderRadius: 8, marginBottom: 20, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              background: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              padding: 14, 
              borderRadius: 8, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
