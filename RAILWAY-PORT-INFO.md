# 🔌 Configuration des Ports sur Railway

## ⚠️ IMPORTANT : Ne pas définir PORT manuellement

**Railway gère automatiquement les ports !**

### ✅ Ce qui est correct :

1. **Backend** : Le code utilise `process.env.PORT || 3001`
   - Railway injecte automatiquement `PORT` (ex: 8080, 3000, etc.)
   - Le `3001` est seulement un fallback pour le développement local
   - **Ne définissez PAS `PORT=3001` dans les variables Railway**

2. **Frontend** : Le code utilise `process.env.PORT || 3000`
   - Railway injecte automatiquement `PORT`
   - **Ne définissez PAS `PORT` dans les variables Railway**

### 🚫 Ce qu'il ne faut PAS faire :

- ❌ Définir `PORT=3001` dans Railway Backend
- ❌ Définir `PORT=3000` dans Railway Frontend
- ❌ Essayer de forcer un port spécifique

### ✅ Ce qu'il faut faire :

1. **Supprimez toute variable `PORT`** dans Railway (si elle existe)
2. **Laissez Railway gérer automatiquement** les ports
3. Railway mappe automatiquement le port interne vers l'URL publique (sans port visible)

### 📝 Variables minimales requises :

**Backend :**
- `DATABASE_URL` (auto depuis PostgreSQL)
- `JWT_SECRET`
- `JWT_EXPIRES_IN=1d`
- `NODE_ENV=production`
- ~~`PORT`~~ ❌ **NE PAS DÉFINIR**

**Frontend :**
- `NODE_ENV=production`
- ~~`PORT`~~ ❌ **NE PAS DÉFINIR**
- ~~`VITE_API_URL`~~ ✅ Détection automatique (optionnel)

### 🔍 Comment vérifier :

1. Allez dans Railway → Service → Variables
2. Cherchez `PORT`
3. Si elle existe, **supprimez-la**
4. Railway injectera automatiquement le port au démarrage

