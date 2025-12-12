# 🚀 Guide de Démarrage Rapide

## ✅ Configuration Complétée

Tout est maintenant configuré pour fonctionner en local ET sur Railway !

## 📍 Démarrage Local

### Option 1 : Démarrage Automatique (Recommandé)

À la racine du projet, exécutez :

```powershell
npm run dev
```

Cette commande démarre **automatiquement** :
- ✅ Backend sur `http://localhost:3001`
- ✅ Frontend sur `http://localhost:3000`

### Option 2 : Démarrage Manuel (Terminaux séparés)

**Terminal 1 - Backend :**
```powershell
cd backend
npm run start:dev
```

**Terminal 2 - Frontend :**
```powershell
cd frontend
npm run dev
```

## 🌐 Démarrage sur Railway

Railway démarre **automatiquement** les services lors du déploiement :

1. **Backend** : Démarre automatiquement avec `nixpacks.toml`
2. **Frontend** : Démarre automatiquement avec `nixpacks.toml`

### Configuration Railway

Les fichiers suivants sont déjà configurés :
- ✅ `backend/nixpacks.toml` - Configuration build/démarrage backend
- ✅ `frontend/nixpacks.toml` - Configuration build/démarrage frontend
- ✅ `backend/railway.json` - Configuration Railway backend
- ✅ `frontend/railway.json` - Configuration Railway frontend

### Variables d'Environnement Railway

Assurez-vous d'avoir configuré les variables dans Railway Dashboard :

**Backend → Variables :**
- `DATABASE_URL` (auto depuis PostgreSQL)
- `JWT_SECRET`
- `JWT_EXPIRES_IN=1d`
- `PORT=3001`
- `NODE_ENV=production`
- `FRONTEND_URL` (URL publique du frontend)

**Frontend → Variables :**
- `NEXT_PUBLIC_API_URL` (URL publique du backend + `/api`)
- `NODE_ENV=production`

Voir `VARIABLES-ENV.md` pour plus de détails.

## 🗄️ Base de Données

### Schéma Initialisé ✅

Le schéma de la base de données Railway a été initialisé avec succès.

### Commandes Prisma Utiles

```powershell
# Générer le client Prisma
cd backend
npm run prisma:generate

# Pousser le schéma vers la DB
npm run prisma:db:push

# Ouvrir Prisma Studio (interface graphique)
npm run prisma:studio

# Tester la connexion
npm run test:db
```

## 📝 Fichiers de Configuration

### Local
- `backend/.env` - Variables backend (déjà configuré ✅)
- `frontend/.env.local` - Variables frontend (déjà configuré ✅)
- `.env` - Variables racine (déjà configuré ✅)

### Railway
- `backend/nixpacks.toml` - Build/démarrage backend
- `frontend/nixpacks.toml` - Build/démarrage frontend
- `backend/railway.json` - Config Railway backend
- `frontend/railway.json` - Config Railway frontend

## 🔍 Vérification

### Local

1. **Backend** : `http://localhost:3001/api` doit répondre
2. **Frontend** : `http://localhost:3000` doit s'afficher
3. **Base de données** : Connexion testée avec succès ✅

### Railway

1. **Backend** : Vérifiez les logs Railway → Backend
2. **Frontend** : Vérifiez les logs Railway → Frontend
3. **URLs publiques** : Obtenez-les dans Railway → Settings → Networking

## 🎯 Prochaines Étapes

1. **Local** : `npm run dev` pour démarrer les deux services
2. **Railway** : Push sur GitHub → Railway déploie automatiquement
3. **Variables Railway** : Configurez les variables d'environnement (voir `VARIABLES-ENV.md`)

## 📚 Documentation

- `SETUP-LOCAL.md` - Guide d'installation locale détaillé
- `VARIABLES-ENV.md` - Liste complète des variables d'environnement
- `RAILWAY-CONFIG.md` - Configuration Railway détaillée

## ✨ Résumé

- ✅ Toutes les dépendances installées
- ✅ Base de données Railway connectée et initialisée
- ✅ Variables d'environnement configurées (local)
- ✅ Scripts npm configurés pour démarrer frontend + backend
- ✅ Configuration Railway prête (nixpacks.toml)
- ✅ Prêt pour le développement local ET le déploiement Railway !

**Pour démarrer : `npm run dev`** 🚀

