import { createContext, useContext, useState, useCallback } from 'react';

const CertificateContext = createContext();

export const useCertificates = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificates must be used within CertificateProvider');
  }
  return context;
};

export const CertificateProvider = ({ children }) => {
  const [certs, setCerts] = useState({
    birth: [],
    death: [],
    residence: []
  });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://grampanchyat1.onrender.com');

  const fetchCertificates = useCallback(async (type) => {
    if (!['birth', 'death', 'residence'].includes(type)) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/${type}-certificates`);
      if (res.ok) {
        const data = await res.json();
        setCerts(prev => ({ ...prev, [type]: data.data || [] }));
      }
    } catch (err) {
      console.error(`Fetch ${type} certs error:`, err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  const fetchAllCertificates = useCallback(async () => {
    await Promise.all(['birth', 'death', 'residence'].map(fetchCertificates));
  }, [fetchCertificates]);

  const fetchDocuments = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No admin token');
      const res = await fetch(`${API_BASE}/api/admin/certificates`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.data || []);
      } else {
        console.error('Fetch documents error:', res.status);
      }
    } catch (err) {
      console.error('Fetch documents error:', err);
    }
  }, [API_BASE]);

  const updateCertStatus = useCallback(async (type, id, status) => {
    if (!['birth', 'death', 'residence'].includes(type)) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/${type}-certificates/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, approvedBy: localStorage.getItem('adminName') || 'Admin' })
      });
      if (res.ok) {
        await fetchCertificates(type);
        return true;
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
    return false;
  }, [API_BASE, fetchCertificates]);

  return (
    <CertificateContext.Provider value={{
      certs,
      documents,
      loading,
      fetchCertificates,
      fetchAllCertificates,
      fetchDocuments,
      updateCertStatus
    }}>
      {children}
    </CertificateContext.Provider>
  );
};
