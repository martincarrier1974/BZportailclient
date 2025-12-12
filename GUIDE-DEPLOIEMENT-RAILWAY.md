# 🚀 Guide de Déploiement Railway - COMPLET

## ✅ Ce qui a été corrigé

1. **Package.json racine** : Nettoyé, seulement `concurrently` pour le dev local
2. **Package.json frontend** : Script `preview` qui gère le PORT dynamique
3. **Package.json backend** : Déjà correct
4. **Vite config** : Gère le PORT pour Railway
5. **Script preview.js** : Script Node.js qui démarre Vite avec le bon PORT
6. **Railway.json** : `networking.port: null` pour port dynamique
7. **Nixpacks.toml** : Configurations correctes pour build et start

## 🔧 Configuration Railway - IMPORTANT

### ⚠️ VOUS DEVEZ AVOIR 2 SERVICES SÉPARÉS

Railway doit avoir **DEUX services distincts** :

1. **Service Backend** (NestJS API)
2. **Service Frontend** (Vite React)

### 📋 Étape 1 : Service Backend

1. Railway → Votre Projet → **"+ New"** → **"GitHub Repo"**
2. Sélectionnez votre repository
3. **Root Directory** : `backend`
4. **Variables d'environnement** :
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=votre-secret
   NODE_ENV=production
   PORT= (NE PAS DÉFINIR - Railway l'injecte automatiquement)
   ```
5. **Settings** → **Networking** → **Generate Domain**
   - Railway assignera un port dynamique (ex: 8080, 3000, etc.)
   - URL exemple : `https://backend-xxxxx.railway.app`
6. **Settings** → **Deploy** → Vérifiez que `startCommand` est :
   ```
   npm run prisma:generate && npm run prisma:db:push --accept-data-loss && npm run start:prod
   ```

### 📋 Étape 2 : Service Frontend

1. Railway → Votre Projet → **"+ New"** → **"GitHub Repo"**
2. Sélectionnez votre repository (le même)
3. **Root Directory** : `vite-frontend`
4. **Variables d'environnement** :
   ```
   NODE_ENV=production
   VITE_API_URL=https://backend-xxxxx.railway.app/api
   PORT= (NE PAS DÉFINIR - Railway l'injecte automatiquement)
   ```
   ⚠️ **IMPORTANT** : Remplacez `backend-xxxxx` par l'URL réelle de votre service backend
5. **Settings** → **Networking** → **Generate Domain**
   - URL exemple : `https://frontend-xxxxx.railway.app`
   - **C'EST CETTE URL QUE VOUS UTILISEZ POUR ACCÉDER À L'APPLICATION**
6. **Settings** → **Deploy** → Vérifiez que `startCommand` est :
   ```
   npm run preview
   ```

### 🔗 Connexion Frontend → Backend

Le frontend détecte automatiquement le backend via :
1. Variable `VITE_API_URL` (si définie)
2. Détection automatique basée sur l'URL Railway

**Si vous définissez `VITE_API_URL`**, le frontend utilisera cette URL directement.

**Si vous ne définissez PAS `VITE_API_URL`**, le frontend essaiera de deviner l'URL du backend en remplaçant "frontend" par "backend" dans l'URL.

## 🧪 Test Local

```bash
# Terminal 1 : Backend
cd backend
npm run start:dev

# Terminal 2 : Frontend
cd vite-frontend
npm run dev

# Ou tout en un (racine)
npm run dev
```

## 🚨 Problèmes Courants

### "Port 3001 assigné automatiquement"
- **Solution** : Supprimez le service et recréez-le
- Railway cache parfois les anciens ports
- Assurez-vous que `networking.port: null` est dans `railway.json`

### "Frontend ne trouve pas le backend"
- **Solution** : Définissez `VITE_API_URL=https://votre-backend-url.railway.app/api`
- Vérifiez que le backend est bien déployé et accessible

### "ERR_CONNECTION_REFUSED"
- **Solution** : Vérifiez que le backend est démarré
- Vérifiez les logs Railway pour voir si le backend écoute bien

### "Page blanche sur l'URL publique"
- **Solution** : Vous utilisez probablement l'URL du backend au lieu du frontend
- Le backend sert seulement `/api`, pas de page HTML
- Utilisez l'URL du **service Frontend**

## 📝 Checklist Déploiement

- [ ] Service Backend créé avec Root Directory = `backend`
- [ ] Service Frontend créé avec Root Directory = `vite-frontend`
- [ ] Variables d'environnement définies (DATABASE_URL, JWT_SECRET, etc.)
- [ ] `VITE_API_URL` défini dans le service Frontend
- [ ] URL publique générée pour le Frontend
- [ ] URL publique générée pour le Backend
- [ ] Les deux services sont déployés et "Running"
- [ ] Test de connexion : Ouvrir l'URL Frontend → Page de login s'affiche

## 🎯 Résultat Attendu

1. Ouvrir l'URL Frontend → Page de login React
2. Entrer `martin.carrier@bzinc.ca` / `$$Banane007`
3. Connexion réussie → Redirection vers la page d'accueil
4. Tout fonctionne ! 🎉

