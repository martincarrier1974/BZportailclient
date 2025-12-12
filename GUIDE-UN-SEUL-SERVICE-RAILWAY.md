# 🚀 Guide Déploiement Railway - UN SEUL SERVICE

## ✅ Configuration Complète

Le backend sert maintenant **AUSSI** le frontend buildé. Un seul service Railway suffit !

## 📋 Configuration Railway

### Étape 1 : Créer le Service

1. Railway → Votre Projet → **"+ New"** → **"GitHub Repo"**
2. Sélectionnez votre repository
3. **Root Directory** : `backend` ⚠️ **IMPORTANT**
4. Railway va automatiquement détecter `nixpacks.toml` dans le dossier backend

### Étape 2 : Variables d'Environnement

Dans Railway → Settings → Variables, ajoutez :

```
DATABASE_URL=postgresql://...
JWT_SECRET=votre-secret-jwt
NODE_ENV=production
PORT= (NE PAS DÉFINIR - Railway l'injecte automatiquement)
```

⚠️ **IMPORTANT** : Ne définissez **PAS** `PORT` manuellement. Railway l'injecte automatiquement.

### Étape 3 : Générer l'URL Publique

1. Railway → Settings → Networking
2. Cliquez sur **"Generate Domain"**
3. Railway assignera un port dynamique (ex: 8080, 3000, etc.)
4. **C'EST CETTE URL QUE VOUS UTILISEZ POUR ACCÉDER À L'APPLICATION**

### Étape 4 : Déploiement

Railway va automatiquement :
1. Installer les dépendances du frontend (`vite-frontend`)
2. Builder le frontend (`npm run build`)
3. Copier les fichiers dans `backend/public`
4. Installer les dépendances du backend
5. Générer Prisma Client
6. Builder le backend NestJS
7. Démarrer le serveur

## 🎯 Comment ça fonctionne

### En Production (Railway)

1. **Frontend** : Buildé dans `vite-frontend/dist`
2. **Copie** : Fichiers copiés dans `backend/public`
3. **Backend** : NestJS sert :
   - `/api/*` → API endpoints
   - `/*` → Fichiers statiques du frontend (React SPA)
4. **SPA Routing** : Toutes les routes non-API servent `index.html`

### En Développement Local

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

Le frontend utilise `http://localhost:3001/api` pour l'API.

## 🔧 Structure des Fichiers

```
BZT_PortailClient/
├── backend/
│   ├── src/
│   │   └── main.ts          # Sert les fichiers statiques en production
│   ├── public/              # Frontend buildé (créé automatiquement)
│   ├── scripts/
│   │   └── build-frontend.js # Script de build cross-platform
│   ├── nixpacks.toml        # Configuration Railway
│   ├── railway.json         # Configuration Railway
│   └── package.json         # Scripts de build
├── vite-frontend/
│   ├── src/
│   │   └── lib/
│   │       └── api.ts       # Détection API: /api en production
│   └── package.json
└── package.json             # Scripts dev local
```

## 🚨 Problèmes Courants

### "Port 3001 assigné automatiquement"
- **Solution** : Supprimez le service et recréez-le
- Assurez-vous que `networking.port: null` est dans `backend/railway.json`
- Railway cache parfois les anciens ports

### "ERR_CONNECTION_REFUSED"
- **Solution** : Vérifiez que le service est bien déployé
- Vérifiez les logs Railway pour voir si le build a réussi
- Vérifiez que `backend/public` contient les fichiers du frontend

### "Page blanche"
- **Solution** : Vérifiez que le frontend a été buildé
- Vérifiez les logs Railway pour voir les erreurs de build
- Vérifiez que `backend/public/index.html` existe

### "API ne répond pas"
- **Solution** : Vérifiez que le backend est démarré
- Vérifiez les logs Railway
- Testez `/api/auth/login` directement

## 📝 Checklist Déploiement

- [ ] Service créé avec Root Directory = `backend`
- [ ] Variables d'environnement définies (DATABASE_URL, JWT_SECRET, NODE_ENV)
- [ ] `PORT` **N'EST PAS** défini (Railway l'injecte)
- [ ] URL publique générée
- [ ] Service déployé et "Running"
- [ ] Test : Ouvrir l'URL → Page de login s'affiche
- [ ] Test : Login avec `martin.carrier@bzinc.ca` / `$$Banane007`
- [ ] Test : Redirection vers page d'accueil

## 🎉 Résultat Attendu

1. Ouvrir l'URL Railway → Page de login React s'affiche
2. Entrer `martin.carrier@bzinc.ca` / `$$Banane007`
3. Connexion réussie → Redirection vers la page d'accueil
4. Tout fonctionne sur **UN SEUL SERVICE** ! 🎉

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. **Frontend** : Ouvrir l'URL Railway → Page React
2. **API** : Ouvrir `https://votre-url.railway.app/api/auth/login` → Devrait retourner une erreur (pas de body), mais pas 404
3. **Static Files** : Ouvrir `https://votre-url.railway.app/assets/...` → Devrait servir les fichiers JS/CSS

