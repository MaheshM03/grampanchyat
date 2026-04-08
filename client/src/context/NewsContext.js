import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const NewsContext = createContext();

const initialState = {
  news: [],
  loading: true
};

const newsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return { ...state, news: action.payload, loading: false };
    case 'ADD_NEWS':
      return { ...state, news: [action.payload, ...state.news] };
    case 'UPDATE_NEWS':
      return {
        ...state,
        news: state.news.map(n => n.id === action.payload.id ? action.payload : n)
      };
    case 'DELETE_NEWS':
      return { ...state, news: state.news.filter(n => n.id !== action.payload) };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// API base for local/prod
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// Helper: safely parse a response as JSON with content-type guard
const safeJson = async (res) => {
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    console.error('Non-JSON response received:', text.slice(0, 200));
    throw new Error('Server returned non-JSON response. Backend API available?');
  }
  return res.json();
};

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  const fetchNews = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch(`${API_BASE}/api/news`);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('News fetch failed:', res.status, errorText.slice(0, 200));
        throw new Error(`HTTP ${res.status}: Network response was not ok`);
      }
      const json = await safeJson(res);
      dispatch({ type: 'SET_NEWS', payload: json.data || [] });
    } catch (err) {
      console.error('News fetch error:', err);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const addNews = useCallback(async (newsData) => {
    try {
      const res = await fetch(`${API_BASE}/api/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify(newsData)
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Add news failed:', res.status, errorText.slice(0, 200));
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await safeJson(res);
      dispatch({ type: 'ADD_NEWS', payload: data.data });
      return data;
    } catch (err) {
      console.error('Add news error:', err);
      return null;
    }
  }, [dispatch]);

  const updateNews = useCallback(async (id, newsData) => {
    try {
      const res = await fetch(`${API_BASE}/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Update news failed:', res.status, errorText.slice(0, 200));
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await safeJson(res);
      dispatch({ type: 'UPDATE_NEWS', payload: data.data });
      return data;
    } catch (err) {
      console.error('Update news error:', err);
      return null;
    }
  }, [dispatch]);

  const deleteNews = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/news/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        console.error('Delete news failed:', res.status);
        return;
      }
      dispatch({ type: 'DELETE_NEWS', payload: id });
    } catch (err) {
      console.error('Delete news error:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 30000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <NewsContext.Provider value={{
      news: state.news,
      loading: state.loading,
      fetchNews,
      addNews,
      updateNews,
      deleteNews
    }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
