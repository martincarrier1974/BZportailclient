# Variables d'Environnement - Configuration Complète

## 📋 Variables Requises

### Backend (Railway et Local)

Ces variables doivent être configurées dans :
- `backend/.env` (pour le développement local)
- Railway → Service Backend → Variables (pour la production)

```env
# Database Configuration (Railway)
DATABASE_URL=postgresql://postgres:PASSWORD@HOST:PORT/railway

# Server Configuration
PORT=3001
NODE_ENV=development  # ou 'production' sur Railway

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000  # ou URL Railway en production
```

### Frontend (Railway et Local)

Ces variables doivent être configurées dans :
- `frontend/.env.local` (pour le développement local)
- Railway → Service Frontend → Variables (pour la production)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api  # ou URL Railway en production

# Environment
NODE_ENV=development  # ou 'production' sur Railway
```

## 🚀 Configuration Railway

### Service Backend

Dans Railway → Service Backend → Variables :

1. **DATABASE_URL** : Automatiquement proposé depuis le service PostgreSQL
2. **JWT_SECRET** : Générer un secret fort (voir ci-dessous)
3. **JWT_EXPIRES_IN** : `1d`
4. **PORT** : `3001` (ou laisser Railway assigner automatiquement)
5. **NODE_ENV** : `production`
6. **FRONTEND_URL** : URL publique du service frontend (ex: `https://votre-frontend.railway.app`)

### Service Frontend

Dans Railway → Service Frontend → Variables :

1. **NEXT_PUBLIC_API_URL** : URL publique du service backend + `/api` (ex: `https://votre-backend.railway.app/api`)
2. **NODE_ENV** : `production`

## 🔐 Génération de JWT_SECRET

### PowerShell
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Bash/Linux
```bash
openssl rand -base64 32
```

## ✅ Vérification

### Local
- Backend : `backend/.env` doit contenir toutes les variables
- Frontend : `frontend/.env.local` doit contenir toutes les variables

### Railway
- Vérifiez dans Railway Dashboard → Variables pour chaque service
- Les variables doivent être identiques à celles listées ci-dessus

## 📝 Notes

1. **DATABASE_URL** : Railway génère automatiquement cette variable depuis PostgreSQL. Il suffit de l'ajouter au service backend.

2. **FRONTEND_URL** : Doit correspondre à l'URL publique du frontend sur Railway pour que CORS fonctionne.

3. **NEXT_PUBLIC_API_URL** : Doit correspondre à l'URL publique du backend + `/api`.

4. **Variables sensibles** : Ne jamais commiter les fichiers `.env` dans Git. Ils sont déjà dans `.gitignore`.

