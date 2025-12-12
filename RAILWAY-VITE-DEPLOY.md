# 🚀 Guide de Déploiement Railway - Vite Frontend

## ✅ Configuration Complète

Tout est configuré pour fonctionner sur Railway comme en local !

## 📦 Services Railway

### 1. Service PostgreSQL (Database)
- ✅ Créé automatiquement
- ✅ `DATABASE_URL` générée automatiquement

### 2. Service Backend

#### Configuration Railway Dashboard

**Settings → Root Directory** : `backend`

**Variables d'Environnement** (Railway → Backend → Variables) :
```env
DATABASE_URL=<auto depuis PostgreSQL>
JWT_SECRET=<votre secret JWT>
JWT_EXPIRES_IN=1d
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://votre-frontend.railway.app
```

**Note** : `FRONTEND_URL` doit être mis à jour après avoir obtenu l'URL publique du frontend.

#### Build & Start (automatique via nixpacks.toml)
- ✅ Génère Prisma Client
- ✅ Push le schéma vers la DB
- ✅ Build le backend
- ✅ Démarre sur le port Railway

### 3. Service Frontend Vite

#### Configuration Railway Dashboard

**Settings → Root Directory** : `vite-frontend`

**Variables d'Environnement** (Railway → Frontend → Variables) :
```env
VITE_API_URL=https://votre-backend.railway.app/api
PORT=3000
NODE_ENV=production
```

**Note** : `VITE_API_URL` doit être mis à jour après avoir obtenu l'URL publique du backend.

#### Build & Start (automatique via nixpacks.toml)
- ✅ Installe les dépendances
- ✅ Build le frontend Vite
- ✅ Démarre le serveur preview

## 🔄 Ordre de Déploiement

1. **PostgreSQL** : Déjà créé ✅
2. **Backend** : 
   - Railway détecte automatiquement `backend/nixpacks.toml`
   - Configure `DATABASE_URL` depuis PostgreSQL
   - Build et démarre automatiquement
3. **Frontend Vite** :
   - Railway détecte automatiquement `vite-frontend/nixpacks.toml`
   - Build et démarre automatiquement

## 🌐 Obtenir les URLs

1. Dans chaque service Railway, allez dans **Settings → Networking**
2. Cliquez sur **Generate Domain** pour obtenir une URL publique
3. **Backend URL** : `https://votre-backend.railway.app`
4. **Frontend URL** : `https://votre-frontend.railway.app`

## 🔧 Mettre à Jour les Variables

### Après avoir obtenu les URLs :

1. **Backend → Variables** :
   - Mettre à jour `FRONTEND_URL` avec l'URL du frontend

2. **Frontend → Variables** :
   - Mettre à jour `VITE_API_URL` avec `<BACKEND_URL>/api`

3. **Redéployer** les services (Railway redéploie automatiquement après changement de variables)

## 🌱 Seed la Base de Données

Une fois le backend déployé, exécutez le seed :

### Option 1 : Via Railway CLI
```bash
railway link
railway run --service backend npm run prisma:seed
```

### Option 2 : Via Railway Dashboard
1. Allez dans le service backend
2. **Settings → Deploy → Run Command**
3. Entrez : `npm run prisma:seed`

## ✅ Vérification

1. **Backend** : `https://votre-backend.railway.app/api` doit répondre
2. **Frontend** : `https://votre-frontend.railway.app` doit s'afficher
3. **Login** : Connectez-vous avec `martin.carrier@bzinc.ca` / `$$Banane007`

## 🔄 Mises à Jour

- **Push sur GitHub** → Railway déploie automatiquement
- **Variables** → Railway redéploie automatiquement
- **Code** → Railway rebuild automatiquement

## 🐛 Dépannage

### Backend ne démarre pas
- Vérifiez les logs Railway
- Vérifiez que `DATABASE_URL` est correct
- Vérifiez que Prisma a bien généré le client

### Frontend ne peut pas se connecter
- Vérifiez `VITE_API_URL` dans Railway
- Vérifiez `FRONTEND_URL` dans le backend (CORS)
- Vérifiez que le backend est bien démarré

### Build échoue
- Vérifiez les logs Railway
- Vérifiez que toutes les dépendances sont dans `package.json`

