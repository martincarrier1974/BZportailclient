import axios from 'axios';

// Détection automatique de l'URL de l'API
function getApiUrl(): string {
  // 1. Si VITE_API_URL est défini (variable Railway), l'utiliser
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. En développement, utiliser localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }
  
  // 3. En production Railway, essayer de détecter depuis l'URL actuelle
  // Railway utilise des domaines comme: frontend-production-xxxx.up.railway.app
  // On peut essayer de construire l'URL du backend en remplaçant "frontend" par "backend"
  const currentHost = window.location.hostname;
  const currentProtocol = window.location.protocol;
  
  // Si c'est un domaine Railway
  if (currentHost.includes('railway.app') || currentHost.includes('up.railway.app')) {
    // Essayer de construire l'URL du backend
    // Format Railway: service-production-xxxx.up.railway.app
    // On remplace le début du hostname pour pointer vers le backend
    let backendHost = currentHost;
    
    // Si le hostname contient "frontend" ou "vite", le remplacer par "backend"
    if (currentHost.includes('frontend') || currentHost.includes('vite')) {
      backendHost = currentHost.replace(/frontend|vite/i, 'backend');
    } else {
      // Sinon, essayer d'ajouter "backend-" au début
      const parts = currentHost.split('.');
      if (parts.length > 0 && !parts[0].includes('backend')) {
        parts[0] = 'backend-' + parts[0];
        backendHost = parts.join('.');
      }
    }
    
    return `${currentProtocol}//${backendHost}/api`;
  }
  
  // 4. Fallback : utiliser l'URL actuelle avec /api
  return `${currentProtocol}//${currentHost}/api`;
}

const API_URL = getApiUrl();

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

