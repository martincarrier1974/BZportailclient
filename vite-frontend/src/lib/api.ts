import axios from 'axios';

// Détection automatique de l'URL de l'API - fonctionne avec n'importe quelle URL Railway
function getApiUrl(): string {
  // 1. Si VITE_API_URL est défini (variable Railway), l'utiliser
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. En développement, utiliser localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }
  
  // 3. En production Railway, détection automatique intelligente
  const currentHost = window.location.hostname;
  const currentProtocol = window.location.protocol;
  
  // Si c'est un domaine Railway
  if (currentHost.includes('railway.app')) {
    // Essayer plusieurs stratégies pour trouver le backend
    
    // Stratégie 1: Remplacer "frontend" ou "vite" par "backend"
    if (currentHost.includes('frontend') || currentHost.includes('vite')) {
      const backendHost = currentHost.replace(/frontend|vite/i, 'backend');
      return `${currentProtocol}//${backendHost}/api`;
    }
    
    // Stratégie 2: Si le nom contient le nom du projet, essayer backend-{nom}
    // Ex: bzportailclient-production -> backend-bzportailclient-production
    const hostParts = currentHost.split('.');
    const firstPart = hostParts[0];
    
    // Si le premier segment ne contient pas "backend", l'ajouter
    if (!firstPart.includes('backend')) {
      // Enlever les suffixes comme -production, -main, etc.
      const baseName = firstPart.replace(/-production$|-main$|-develop$/, '');
      hostParts[0] = `backend-${baseName}`;
      const backendHost = hostParts.join('.');
      return `${currentProtocol}//${backendHost}/api`;
    }
    
    // Stratégie 3: Essayer avec le même hostname (si backend et frontend sont sur le même service)
    // Railway peut parfois mettre plusieurs services sur le même domaine
    return `${currentProtocol}//${currentHost}/api`;
  }
  
  // 4. Fallback : utiliser l'URL actuelle avec /api (pour autres plateformes)
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

