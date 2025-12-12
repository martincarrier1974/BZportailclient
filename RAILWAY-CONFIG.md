# Configuration Railway - Guide Complet

## 🎯 Vue d'Ensemble

Railway gère les services **séparément**. Chaque service (Backend, Frontend, Database) a sa propre configuration.

## 📦 Services Railway

### 1. Service PostgreSQL (Database)

- **Nom** : "bd Portail" (ou similaire)
- **Type** : PostgreSQL
- **Configuration** : Automatique par Railway
- **Variables** : `DATABASE_URL` générée automatiquement

### 2. Service Backend

#### Configuration dans Railway Dashboard

**Settings → Root Directory** : `backend`

**Settings → Build Command** : (automatique via nixpacks.toml)
```
npm ci
npm run prisma:generate
npm run build
```

**Settings → Start Command** : (automatique via nixpacks.toml)
```
npm run prisma:db:push --accept-data-loss && npm run start:prod
```

#### Variables d'Environnement (Railway → Backend → Variables)

```env
DATABASE_URL=<auto depuis PostgreSQL>
JWT_SECRET=<générer un secret fort>
JWT_EXPIRES_IN=1d
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://votre-frontend.railway.app
```

**Note** : `FRONTEND_URL` doit être mis à jour après avoir obtenu l'URL publique du frontend.

### 3. Service Frontend

#### Configuration dans Railway Dashboard

**Settings → Root Directory** : `frontend`

**Settings → Build Command** : (automatique via nixpacks.toml)
```
npm ci
npm run build
```

**Settings → Start Command** : (automatique via nixpacks.toml)
```
npm run start
```

#### Variables d'Environnement (Railway → Frontend → Variables)

```env
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app/api
NODE_ENV=production
```

**Note** : `NEXT_PUBLIC_API_URL` doit être mis à jour après avoir obtenu l'URL publique du backend.

## 🔄 Ordre de Déploiement

1. **PostgreSQL** : Créé automatiquement, génère `DATABASE_URL`
2. **Backend** : 
   - Configure `DATABASE_URL` depuis PostgreSQL
   - Ajoute les autres variables
   - Déploie → Obtient l'URL publique
3. **Frontend** :
   - Configure `NEXT_PUBLIC_API_URL` avec l'URL du backend
   - Déploie → Obtient l'URL publique
4. **Backend (mise à jour)** :
   - Met à jour `FRONTEND_URL` avec l'URL du frontend
   - Redéploie

## 📝 Fichiers de Configuration

### backend/nixpacks.toml
Définit la configuration de build et de démarrage pour Railway.

### frontend/nixpacks.toml
Définit la configuration de build et de démarrage pour Railway.

### backend/railway.json
Configuration supplémentaire Railway (optionnel).

### frontend/railway.json
Configuration supplémentaire Railway (optionnel).

## ✅ Vérification

Après déploiement, vérifiez :

1. **Backend** :
   - Logs : Pas d'erreur de connexion à la base de données
   - Logs : Migrations exécutées avec succès
   - Logs : Serveur démarré

2. **Frontend** :
   - Logs : Build réussi
   - Logs : Serveur démarré
   - Test : Accès à l'URL publique

3. **Connexion** :
   - Frontend peut appeler l'API backend
   - CORS fonctionne correctement

## 🔧 Mise à Jour des Variables

Si vous changez l'URL d'un service :

1. **Frontend change** :
   - Mettre à jour `FRONTEND_URL` dans Backend
   - Redéployer Backend

2. **Backend change** :
   - Mettre à jour `NEXT_PUBLIC_API_URL` dans Frontend
   - Redéployer Frontend

