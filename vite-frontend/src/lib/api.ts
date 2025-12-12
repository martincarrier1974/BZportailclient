import axios from 'axios';

// Détection automatique de l'URL de l'API
// En production: même service = même hostname, donc /api
// En développement: backend sur localhost:3001
function getApiUrl(): string {
  // 1. Si VITE_API_URL est défini (variable Railway), l'utiliser
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. En développement, utiliser localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }
  
  // 3. En production: même service = même hostname, API sur /api
  const currentProtocol = window.location.protocol;
  const currentHost = window.location.host;
  return `${currentProtocol}//${currentHost}/api`;
}

const API_URL = getApiUrl();

// Log pour debug (seulement en développement)
if (import.meta.env.DEV) {
  console.log('🔗 API URL détectée:', API_URL);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

