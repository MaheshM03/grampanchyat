import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const GrievanceContext = createContext();

const initialState = {
  grievances: [],
  loading: true
};

const grievanceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRAVIANCES':
      return { ...state, grievances: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const normalizeApiBase = (baseUrl) => {
  if (!baseUrl) return '';
  return baseUrl.replace(/\/+$|\/api$/i, '');
};
const API_BASE = normalizeApiBase(import.meta.env.VITE_API_URL || 'http://localhost:5000');

const safeJson = async (res) => {
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    console.error('Non-JSON response:', text.slice(0, 200));
    throw new Error('Server returned non-JSON response');
  }
  return res.json();
};

export const GrievanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(grievanceReducer, initialState);

  const fetchGrievances = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch(`${API_BASE}/api/grievance`, {
        credentials: 'omit'
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Grievances fetch failed:', res.status, errorText.slice(0, 200));
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await safeJson(res);
      dispatch({ type: 'SET_GRAVIANCES', payload: json.data || [] });
    } catch (err) {
      console.error('Grievances fetch error:', err);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  useEffect(() => {
    fetchGrievances();
    const interval = setInterval(fetchGrievances, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetchGrievances]);

  return (
    <GrievanceContext.Provider value={{
      grievances: state.grievances,
      loading: state.loading,
      fetchGrievances
    }}>
      {children}
    </GrievanceContext.Provider>
  );
};

export const useGrievances = () => useContext(GrievanceContext);

