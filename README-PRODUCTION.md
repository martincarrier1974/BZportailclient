# Déploiement Production - BZ Telecom Admin Portal

## 🚀 Déploiement Rapide sur Railway

### 1. Préparer le Repository

```bash
# Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "Initial commit - Production ready"

# Créer un repository sur GitHub
# Puis push
git remote add origin https://github.com/votre-username/bz-admin-portal.git
git push -u origin main
```

### 2. Déployer sur Railway

1. **Créer un compte Railway** : https://railway.app
2. **Nouveau Projet** → "Deploy from GitHub repo"
3. **Sélectionner votre repository**

### 3. Configurer PostgreSQL

1. Dans Railway : **New** → **Database** → **PostgreSQL**
2. Railway créera automatiquement `DATABASE_URL`

### 4. Configurer le Backend

1. **New Service** → **GitHub Repo**
2. **Root Directory** : `backend`
3. **Variables d'environnement** :
   ```
   DATABASE_URL=<auto depuis PostgreSQL>
   JWT_SECRET=<générer avec: openssl rand -base64 32>
   JWT_EXPIRES_IN=1d
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=<URL du frontend>
   ```

### 5. Configurer le Frontend

1. **New Service** → **GitHub Repo**
2. **Root Directory** : `frontend`
3. **Variables d'environnement** :
   ```
   NEXT_PUBLIC_API_URL=<URL du backend>/api
   NODE_ENV=production
   ```

### 6. Seed la Base de Données

Une fois déployé, exécutez le seed :

```bash
# Via Railway CLI
railway run --service backend npm run prisma:seed

# Ou via SSH dans le container
railway shell --service backend
npm run prisma:seed
```

## 🔐 Comptes par Défaut (après seed)

- **Super Admin**: `admin@bztelecom.com` / `admin123`
- **Tenant Admin**: `admin@democompany.com` / `admin123`
- **Read Only**: `readonly@democompany.com` / `readonly123`

**⚠️ IMPORTANT**: Changez ces mots de passe en production !

## 📝 Structure des Services Railway

```
Projet Railway
├── PostgreSQL (Database)
├── Backend Service
│   └── Root: backend/
│   └── Build: npm install && npm run prisma:generate && npm run build
│   └── Start: npm run prisma:migrate:deploy && npm run start:prod
└── Frontend Service
    └── Root: frontend/
    └── Build: npm install && npm run build
    └── Start: npm run start
```

## 🔄 Mises à Jour

1. **Push sur GitHub** → Railway déploie automatiquement
2. **Migrations** → Exécutées automatiquement au démarrage
3. **Build** → Rebuild automatique

## 🐛 Dépannage

Voir `DEPLOY.md` pour le guide complet de dépannage.

## 📊 Monitoring

- Logs : Disponibles dans Railway Dashboard
- Métriques : CPU, RAM, Network
- Alertes : Configurables dans Railway

