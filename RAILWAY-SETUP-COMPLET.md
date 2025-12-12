# 🚀 Configuration Railway Complète - De A à Z

## ⚠️ IMPORTANT : Recréer le Service Backend

**OUI, il faut recréer le service Backend sur Railway** pour que le port dynamique fonctionne correctement.

## 📋 Étapes Complètes

### 1. Supprimer l'Ancien Service Backend

1. Railway → Projet → Service "BZportailclient" (ou nom actuel)
2. Settings → Danger Zone → Delete Service
3. Confirmez la suppression

### 2. Créer un Nouveau Service Backend

1. Railway → Projet → "+ New" → "GitHub Repo"
2. Sélectionnez votre repository
3. **Root Directory** : `backend`
4. Railway détectera automatiquement `nixpacks.toml`

### 3. Configurer les Variables d'Environnement

Railway → Nouveau Service → Variables :

```env
DATABASE_URL=<auto depuis PostgreSQL - cliquez sur "Add Reference">
JWT_SECRET=<générez un secret fort>
JWT_EXPIRES_IN=1d
NODE_ENV=production
```

**⚠️ NE DÉFINISSEZ PAS `PORT`** - Railway l'injecte automatiquement

### 4. Attendre le Déploiement

- Railway va builder et déployer automatiquement
- Vérifiez les logs : `🚀 Backend API started successfully`

### 5. Générer le Domaine Public

1. Railway → Service Backend → Settings → Networking
2. Cliquez sur "Generate Domain"
3. **Railway assignera automatiquement un port dynamique** (8080, 3000, etc.)
4. Le port ne sera **PAS** 3001

### 6. Créer le Service Frontend Vite

1. Railway → Projet → "+ New" → "GitHub Repo"
2. Sélectionnez votre repository
3. **Root Directory** : `vite-frontend`
4. Railway détectera automatiquement `nixpacks.toml`

### 7. Variables Frontend

```env
NODE_ENV=production
```

**⚠️ NE DÉFINISSEZ PAS `PORT` ni `VITE_API_URL`** - Détection automatique

### 8. Générer le Domaine Frontend

1. Railway → Service Frontend → Settings → Networking
2. Cliquez sur "Generate Domain"
3. Railway assignera un port dynamique

## ✅ Vérification

- Backend : `https://votre-backend.railway.app/api` → Devrait répondre
- Frontend : `https://votre-frontend.railway.app` → Devrait s'afficher
- Ports : Devraient être différents de 3001 (8080, 3000, etc.)

## 🎯 Pourquoi Recréer le Service ?

L'ancien service a été créé avec le port 3001 en cache. En créant un nouveau service :
- Railway n'a aucune référence à 3001
- Railway assignera automatiquement un port disponible
- La configuration est propre dès le départ

