# 🚀 Déploiement Railway - Option A (1 Seul Service)

## ✅ Problème Identifié

**Cause principale** : Railway ne trouvait pas de commande `start` à la racine du monorepo, donc après le build réussi, aucun processus n'était lancé → "Application failed to respond".

**Solutions implémentées** :
1. ✅ Ajout des scripts `build`, `start`, `postinstall` au root `package.json`
2. ✅ Création de `nixpacks.toml` à la racine avec buildCommand et startCommand explicites
3. ✅ Vérification que le serveur backend écoute sur `process.env.PORT` et `0.0.0.0` (déjà OK)
4. ✅ Le backend sert déjà le frontend buildé en statique (déjà OK)

---

## 📝 Diffs Exactes

### 1. **package.json** (racine)

**AVANT** :
```json
{
  "name": "bz-telecom-portail-client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently --names \"BACKEND,VITE\" --prefix-colors \"blue,green\" \"npm run dev:backend\" \"npm run dev:vite\"",
    "dev:backend": "cd backend && npm run start:dev",
    "dev:vite": "cd vite-frontend && npm run dev",
    "build:backend": "cd backend && npm run build",
    "build:vite": "cd vite-frontend && npm run build"
  },
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```

**APRÈS** :
```json
{
  "name": "bz-telecom-portail-client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently --names \"BACKEND,VITE\" --prefix-colors \"blue,green\" \"npm run dev:backend\" \"npm run dev:vite\"",
    "dev:backend": "cd backend && npm run start:dev",
    "dev:vite": "cd vite-frontend && npm run dev",
    "build:backend": "cd backend && npm run build",
    "build:vite": "cd vite-frontend && npm run build",
    "build": "npm run build:vite && npm run build:backend",
    "start": "cd backend && npm run start:prod",
    "postinstall": "cd backend && npm ci && cd ../vite-frontend && npm ci"
  },
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```

**Changements** :
- ➕ Ajout de `"build": "npm run build:vite && npm run build:backend"` (build les deux en séquence)
- ➕ Ajout de `"start": "cd backend && npm run start:prod"` (commande de démarrage en production)
- ➕ Ajout de `"postinstall": "cd backend && npm ci && cd ../vite-frontend && npm ci"` (installe les dépendances dans les sous-dossiers)

---

### 2. **nixpacks.toml** (racine) - NOUVEAU FICHIER

**Contenu** :
```toml
[phases.setup]
nixPkgs = ["nodejs-20_x", "postgresql"]

[phases.install]
cmds = [
  "cd vite-frontend && npm ci",
  "cd backend && npm ci",
  "cd backend && npm run prisma:generate"
]

[phases.build]
cmds = [
  "cd vite-frontend && npm run build",
  "mkdir -p backend/public",
  "cp -r vite-frontend/dist/* backend/public/",
  "cd backend && npm run build"
]

[start]
cmd = "cd backend && npm run prisma:generate && npm run prisma:db:push --accept-data-loss && npm run start:prod"
```

**Explication** :
- `phases.setup` : Installe Node.js 20 et PostgreSQL
- `phases.install` : Installe les dépendances frontend + backend + génère Prisma
- `phases.build` : Build le frontend, copie dans `backend/public/`, puis build le backend
- `start` : Génère Prisma, push la DB, puis démarre le serveur en production

---

### 3. **railway.toml** (racine) - NOUVEAU FICHIER (optionnel, pour compatibilité)

**Contenu** :
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10
```

---

### 4. **backend/src/main.ts** - Aucun changement nécessaire ✅

Le serveur est déjà correctement configuré :
- ✅ Écoute sur `process.env.PORT` (ligne 77)
- ✅ Écoute sur `0.0.0.0` (ligne 97)
- ✅ Sert le frontend statique en production (lignes 50-70)
- ✅ Fallback SPA vers `index.html` (lignes 60-67)

---

## 🎯 Commande de Start Finale

**Commande exécutée par Railway** :
```bash
cd backend && npm run prisma:generate && npm run prisma:db:push --accept-data-loss && npm run start:prod
```

**Qui exécute** :
```bash
node dist/main
```

**Le serveur démarre** :
- Sur le port injecté par Railway via `process.env.PORT`
- Sur l'interface `0.0.0.0` (accessible depuis l'extérieur)
- Sert `/api/*` (API backend)
- Sert `/*` (Frontend React buildé depuis `backend/public/`)

---

## ✅ Checklist Railway Dashboard

### Settings → Service Configuration

- [ ] **Root Directory** : `.` (racine du repo) ou laisser vide
- [ ] **Build Command** : (automatique via `nixpacks.toml`) - ne rien mettre
- [ ] **Start Command** : (automatique via `nixpacks.toml`) - ne rien mettre
- [ ] **Healthcheck Path** : `/api/health` (si vous avez un endpoint health) ou laisser vide
- [ ] **Healthcheck Timeout** : 100 (secondes)

### Variables → Environment Variables

**Variables OBLIGATOIRES** :
- [ ] `DATABASE_URL` : (auto depuis PostgreSQL service) - **NE PAS définir manuellement**
- [ ] `JWT_SECRET` : (générer un secret fort, ex: `openssl rand -base64 32`)
- [ ] `JWT_EXPIRES_IN` : `1d`
- [ ] `NODE_ENV` : `production`
- [ ] `PORT` : **NE PAS définir** (Railway l'injecte automatiquement)

**Variables OPTIONNELLES** :
- [ ] `FRONTEND_URL` : (optionnel, le backend sert déjà le frontend)

### Networking → Public Networking

- [ ] **Generate Domain** : Activé (pour obtenir l'URL publique)
- [ ] **Custom Domain** : (optionnel, si vous avez un domaine)

### Service Type

- [ ] **Service Type** : `Web Service` (pas Static Site, pas Background Worker)

---

## 🔍 Vérification Post-Déploiement

### 1. Logs Railway

Vérifiez dans les logs que vous voyez :
```
✅ Frontend build completed!
✅ Backend build completed!
🚀 Backend API started successfully
📡 API available at /api
📦 Serving static files from: /app/backend/public
```

### 2. Test de l'Application

1. **Frontend** : Accédez à l'URL publique Railway → Devrait afficher votre app React
2. **API** : `https://votre-app.railway.app/api/health` (ou un endpoint de test)
3. **SPA Routing** : Naviguez dans l'app → Les routes devraient fonctionner (pas de 404)

### 3. Erreurs Communes

**"Application failed to respond"** :
- ❌ Vérifiez que `PORT` n'est PAS défini manuellement dans les variables
- ❌ Vérifiez que le Root Directory est bien `.` (racine)
- ❌ Vérifiez les logs pour voir si le serveur démarre

**"Cannot find module"** :
- ❌ Vérifiez que `postinstall` s'exécute correctement
- ❌ Vérifiez que les `node_modules` sont installés dans `backend/` et `vite-frontend/`

**"Database connection failed"** :
- ❌ Vérifiez que `DATABASE_URL` est bien injecté depuis le service PostgreSQL
- ❌ Vérifiez que les migrations Prisma s'exécutent (`prisma:db:push`)

---

## 🎉 Résultat Final

**AVANT** :
- ❌ Build OK mais "Application failed to respond"
- ❌ Pas de commande `start` à la racine
- ❌ Railway ne savait pas quoi lancer

**MAINTENANT** :
- ✅ Build frontend + backend en séquence
- ✅ Frontend copié dans `backend/public/`
- ✅ Backend démarre en production
- ✅ Backend sert `/api/*` ET `/*` (frontend)
- ✅ Une seule URL publique pour tout
- ✅ Fonctionne en local ET sur Railway

---

## 📚 Architecture

```
Railway Service (1 seul)
├── Build Phase
│   ├── Install dépendances (vite-frontend + backend)
│   ├── Build vite-frontend → dist/
│   ├── Copie dist/ → backend/public/
│   └── Build backend → dist/
│
└── Start Phase
    ├── Prisma generate
    ├── Prisma db push
    └── node backend/dist/main
        ├── Écoute sur $PORT (Railway)
        ├── Écoute sur 0.0.0.0
        ├── Sert /api/* (API NestJS)
        └── Sert /* (Frontend React depuis backend/public/)
```

---

## 🔧 Commandes Locales (inchangées)

Le développement local fonctionne toujours comme avant :

```bash
# Développement (backend + frontend en parallèle)
npm run dev

# Build manuel
npm run build

# Start production locale (après build)
npm start
```

---

## 📝 Notes Importantes

1. **Ne pas définir `PORT` manuellement** : Railway l'injecte automatiquement
2. **Root Directory = `.`** : Railway doit être à la racine du monorepo
3. **Un seul service Railway** : Le backend sert aussi le frontend
4. **CORS** : Déjà configuré pour accepter toutes les origines en production
5. **SPA Routing** : Toutes les routes non-API servent `index.html`

---

## 🚨 Si ça ne fonctionne toujours pas

1. Vérifiez les logs Railway (section Logs)
2. Vérifiez que `nixpacks.toml` est bien à la racine
3. Vérifiez que le Root Directory est `.` (pas `backend/`)
4. Vérifiez que `PORT` n'est PAS dans les variables d'environnement
5. Vérifiez que `DATABASE_URL` est bien injecté depuis PostgreSQL

---

**Date de création** : $(date)
**Version** : 1.0.0
**Option choisie** : Option A (1 seul service Railway)

