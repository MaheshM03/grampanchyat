import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const KunbiContext = createContext();

const initialState = {
  records: [],
  loading: true
};

const kunbiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECORDS':
      return { ...state, records: action.payload, loading: false };
    case 'ADD_RECORD':
      return { ...state, records: [action.payload, ...state.records] };
    case 'UPDATE_RECORD':
      return {
        ...state,
        records: state.records.map(r => r._id === action.payload._id ? action.payload : r)
      };
    case 'DELETE_RECORD':
      return { ...state, records: state.records.filter(r => r._id !== action.payload) };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// API base for local/prod
const normalizeApiBase = (baseUrl) => {
  if (!baseUrl) return '';
  return baseUrl.replace(/\/+$|\/api$/i, '');
};
const API_BASE = normalizeApiBase(process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://grampanchyat1.onrender.com'));
// Helper: safely parse a response as JSON with content-type guard
const safeJson = async (res) => {
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    console.error(`Non-JSON response from ${res.url} (status: ${res.status}):`, text.slice(0, 200));
    throw new Error(`Non-JSON response (status ${res.status}). Backend API available?`);
  }
  return res.json();
};

export const KunbiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(kunbiReducer, initialState);

  const fetchRecords = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch(`${API_BASE}/api/kunbi`);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Fetch kunbi failed:', res.status, errorText.slice(0, 200));
        throw new Error(`HTTP ${res.status}: Network response was not ok`);
      }
      const data = await safeJson(res);
      dispatch({ type: 'SET_RECORDS', payload: data.data || [] });
    } catch (err) {
      console.error('Fetch kunbi records error:', err);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const addRecord = useCallback(async (recordData) => {
    try {
      const res = await fetch(`${API_BASE}/api/kunbi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Add record failed:', res.status, errorText.slice(0, 200));
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await safeJson(res);
      dispatch({ type: 'ADD_RECORD', payload: data.data });
      return data;
    } catch (err) {
      console.error('Add record error:', err);
      return null;
    }
  }, [dispatch]);

  const updateRecord = useCallback(async (id, recordData) => {
    try {
      const res = await fetch(`${API_BASE}/api/kunbi/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Update record failed:', res.status, errorText.slice(0, 200));
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await safeJson(res);
      dispatch({ type: 'UPDATE_RECORD', payload: data.data });
      return data;
    } catch (err) {
      console.error('Update record error:', err);
      return null;
    }
  }, [dispatch]);

  const deleteRecord = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/kunbi/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        console.error('Delete record failed:', res.status);
        return;
      }
      dispatch({ type: 'DELETE_RECORD', payload: id });
    } catch (err) {
      console.error('Delete record error:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRecords();
    const interval = setInterval(fetchRecords, 30000);
    return () => clearInterval(interval);
  }, [fetchRecords]);

  return (
    <KunbiContext.Provider value={{
      records: state.records,
      loading: state.loading,
      fetchRecords,
      addRecord,
      updateRecord,
      deleteRecord
    }}>
      {children}
    </KunbiContext.Provider>
  );
};

export const useKunbi = () => useContext(KunbiContext);
