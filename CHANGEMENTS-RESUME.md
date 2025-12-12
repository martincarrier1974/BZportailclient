# 📋 Résumé des Changements - Un Seul Service Railway

## ✅ Fichiers Modifiés (Commit: 926a879)

### 1. **backend/src/main.ts** ✨
- ✅ Ajout de `NestExpressApplication` pour servir les fichiers statiques
- ✅ Ajout de `useStaticAssets()` pour servir le frontend buildé
- ✅ Ajout du routing SPA (toutes les routes non-API servent `index.html`)
- ✅ Le backend sert maintenant `/api/*` (API) ET `/*` (Frontend React)

### 2. **backend/package.json** ✨
- ✅ Script `build` modifié : `node scripts/build-frontend.js && nest build`
- ✅ Nouveau script `build:frontend` : build le frontend automatiquement

### 3. **backend/scripts/build-frontend.js** 🆕
- ✅ Nouveau script Node.js cross-platform (Windows/Linux)
- ✅ Build le frontend (`vite-frontend`)
- ✅ Copie les fichiers dans `backend/public/`

### 4. **backend/nixpacks.toml** ✨
- ✅ Build le frontend AVANT le backend
- ✅ Copie les fichiers dans `backend/public/`
- ✅ Build le backend ensuite

### 5. **vite-frontend/src/lib/api.ts** ✨
- ✅ Simplifié pour un seul service
- ✅ En production : utilise `/api` (même hostname)
- ✅ En développement : utilise `localhost:3001/api`

### 6. **GUIDE-UN-SEUL-SERVICE-RAILWAY.md** 🆕
- ✅ Guide complet pour déployer sur Railway avec un seul service

## 🎯 Résultat

**AVANT** : 2 services Railway (Backend + Frontend séparés)
**MAINTENANT** : 1 seul service Railway (Backend sert aussi le Frontend)

## 📦 Ce qui se passe sur Railway

1. Railway clone le repo
2. `nixpacks.toml` détecté dans `backend/`
3. **Install** : Installe dépendances frontend + backend
4. **Build** : 
   - Build frontend → `vite-frontend/dist/`
   - Copie dans `backend/public/`
   - Build backend → `backend/dist/`
5. **Start** : 
   - Prisma generate + db push
   - Démarre NestJS
   - NestJS sert `/api/*` ET `/*`

## 🔍 Vérification

Pour vérifier que tout est bien poussé :

```bash
git log --oneline -1
# Devrait afficher : 926a879 Refactor: Configuration pour un seul service Railway...

git show HEAD --stat
# Devrait afficher 7 fichiers modifiés
```

## 🚀 Prochaines Étapes sur Railway

1. **Créer/Modifier le service** :
   - Root Directory : `backend`
   - Railway détecte automatiquement `nixpacks.toml`

2. **Variables d'environnement** :
   ```
   DATABASE_URL=...
   JWT_SECRET=...
   NODE_ENV=production
   ```

3. **Générer URL publique** :
   - Settings → Networking → Generate Domain
   - Railway assigne un port dynamique

4. **Déployer** :
   - Railway build automatiquement
   - Le frontend est servi par le backend
   - Tout fonctionne sur une seule URL !

## ✅ Tout est prêt !

Tous les changements sont commités et poussés sur GitHub.
Railway va automatiquement détecter les changements et rebuild.

