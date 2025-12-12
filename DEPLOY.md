# Guide de Déploiement sur Railway

Ce guide explique comment déployer le portail admin BZ Telecom sur Railway.

## 🚀 Préparation

### 1. Variables d'Environnement Requises

#### Backend
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=votre-secret-jwt-super-securise
JWT_EXPIRES_IN=1d
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://votre-frontend.railway.app
```

#### Frontend
```
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app/api
NODE_ENV=production
```

## 📦 Déploiement sur Railway

### Option 1: Déploiement Monorepo (Recommandé)

1. **Créer un nouveau projet sur Railway**
   - Allez sur https://railway.app
   - Créez un nouveau projet
   - Connectez votre repository GitHub

2. **Ajouter PostgreSQL**
   - Dans Railway, cliquez sur "New" → "Database" → "PostgreSQL"
   - Railway créera automatiquement une variable `DATABASE_URL`

3. **Déployer le Backend**
   - Créez un nouveau service
   - Sélectionnez "GitHub Repo" et choisissez votre repo
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm run prisma:migrate:deploy && npm run start:prod`
   - Ajoutez les variables d'environnement :
     - `DATABASE_URL` (automatique depuis PostgreSQL)
     - `JWT_SECRET` (générez un secret fort)
     - `JWT_EXPIRES_IN=1d`
     - `PORT=3001`
     - `FRONTEND_URL` (URL de votre frontend)

4. **Déployer le Frontend**
   - Créez un nouveau service
   - Sélectionnez "GitHub Repo" et choisissez votre repo
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - Ajoutez les variables d'environnement :
     - `NEXT_PUBLIC_API_URL` (URL de votre backend)
     - `NODE_ENV=production`

### Option 2: Déploiement avec Docker

1. **Backend**
   - Railway détectera automatiquement le `Dockerfile` dans `backend/`
   - Les variables d'environnement sont les mêmes

2. **Frontend**
   - Railway détectera automatiquement le `Dockerfile` dans `frontend/`

## 🔧 Configuration Railway

### Variables d'Environnement Backend

Dans Railway, allez dans votre service backend → Variables :

```
DATABASE_URL          → (auto depuis PostgreSQL)
JWT_SECRET            → Générer un secret fort (ex: openssl rand -base64 32)
JWT_EXPIRES_IN        → 1d
PORT                  → 3001
NODE_ENV              → production
FRONTEND_URL          → https://votre-frontend.railway.app
```

### Variables d'Environnement Frontend

Dans Railway, allez dans votre service frontend → Variables :

```
NEXT_PUBLIC_API_URL   → https://votre-backend.railway.app/api
NODE_ENV              → production
```

## 🔐 Sécurité en Production

1. **JWT_SECRET** : Utilisez un secret fort et unique
   ```bash
   openssl rand -base64 32
   ```

2. **Database** : Railway gère automatiquement les credentials PostgreSQL

3. **CORS** : Le backend autorise uniquement le `FRONTEND_URL` configuré

4. **HTTPS** : Railway fournit automatiquement HTTPS

## 📝 Première Migration

Lors du premier déploiement, Railway exécutera automatiquement :
```bash
npm run prisma:migrate:deploy
```

Pour créer les comptes initiaux, vous devrez exécuter le seed manuellement :
```bash
# Via Railway CLI ou en SSH dans le container
npm run prisma:seed
```

## 🔄 Mises à Jour

1. **Push sur GitHub** : Railway déploiera automatiquement
2. **Migrations** : S'exécutent automatiquement au démarrage
3. **Build** : Railway rebuild automatiquement

## 🐛 Dépannage

### Backend ne démarre pas
- Vérifiez les logs Railway
- Vérifiez que `DATABASE_URL` est correct
- Vérifiez que les migrations ont réussi

### Frontend ne peut pas se connecter au backend
- Vérifiez `NEXT_PUBLIC_API_URL`
- Vérifiez `FRONTEND_URL` dans le backend (CORS)
- Vérifiez que le backend est accessible publiquement

### Erreurs de migration
- Vérifiez la connexion à la base de données
- Vérifiez que Prisma Client est généré (`npm run prisma:generate`)

## 📊 Monitoring

Railway fournit :
- Logs en temps réel
- Métriques de performance
- Alertes automatiques

## 🔗 URLs de Production

Après le déploiement, Railway vous donnera des URLs comme :
- Backend: `https://backend-production.up.railway.app`
- Frontend: `https://frontend-production.up.railway.app`

Vous pouvez aussi configurer des domaines personnalisés dans Railway.

## ✅ Checklist de Déploiement

- [ ] Repository GitHub créé et poussé
- [ ] Projet Railway créé
- [ ] PostgreSQL ajouté
- [ ] Service Backend créé et configuré
- [ ] Service Frontend créé et configuré
- [ ] Variables d'environnement configurées
- [ ] Backend déployé et accessible
- [ ] Frontend déployé et accessible
- [ ] Seed de la base de données exécuté
- [ ] Test de connexion réussi
- [ ] Domaines personnalisés configurés (optionnel)

