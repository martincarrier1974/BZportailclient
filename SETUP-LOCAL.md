# Configuration Locale - BZ Portail Client

## ✅ Installation Complétée

Toutes les dépendances ont été installées et le projet est configuré pour utiliser la base de données Railway en local.

## 📁 Structure du Projet

```
BZT_PortailClient/
├── app/                    # Application Next.js principale (racine)
├── backend/                # Backend NestJS + Prisma
│   ├── .env               # Variables d'environnement (DATABASE_URL Railway)
│   ├── prisma/            # Schéma Prisma
│   └── src/               # Code source NestJS
├── frontend/               # Frontend Next.js séparé
│   └── .env.local         # Variables d'environnement frontend
└── .env                   # Variables d'environnement racine
```

## 🔧 Configuration

### Variables d'Environnement

#### Backend (`backend/.env`)
- `DATABASE_URL` : Connexion à la base de données Railway PostgreSQL
- `PORT` : Port du serveur backend (3001)
- `JWT_SECRET` : Secret pour les tokens JWT
- `JWT_EXPIRES_IN` : Durée de validité des tokens (1d)
- `FRONTEND_URL` : URL du frontend pour CORS (http://localhost:3000)

#### Frontend (`frontend/.env.local`)
- `NEXT_PUBLIC_API_URL` : URL de l'API backend (http://localhost:3001/api)

## 🚀 Démarrage du Projet

### Option 1 : Démarrer le Backend uniquement

```powershell
cd backend
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3001`

### Option 2 : Démarrer le Frontend uniquement

```powershell
cd frontend
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

### Option 3 : Démarrer l'Application à la racine

```powershell
npm run dev
```

### Option 4 : Démarrer Backend + Frontend (Terminaux séparés)

**Terminal 1 - Backend:**
```powershell
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## 🗄️ Base de Données Railway

### Connexion Testée ✅

La connexion à la base de données Railway a été testée avec succès.

### Initialiser le Schéma de la Base de Données

Pour créer les tables dans la base de données Railway :

```powershell
cd backend
npm run prisma:db:push
```

**⚠️ Attention :** Cette commande va créer/pousser le schéma Prisma vers la base de données Railway. Assurez-vous que c'est bien ce que vous voulez faire.

### Autres Commandes Prisma Utiles

```powershell
# Générer le client Prisma
npm run prisma:generate

# Ouvrir Prisma Studio (interface graphique)
npm run prisma:studio

# Exécuter les migrations
npm run prisma:migrate

# Seed la base de données (données de test)
npm run prisma:seed

# Tester la connexion à la base de données
npm run test:db
```

## 🔍 Vérification

### Tester la Connexion à la Base de Données

```powershell
cd backend
npm run test:db
```

Vous devriez voir :
```
✅ Successfully connected to database!
✅ Database query successful
📊 Existing tables: [...]
```

### Vérifier que le Backend démarre

```powershell
cd backend
npm run start:dev
```

Vous devriez voir :
```
🚀 Backend API running on port 3001
📡 API available at /api
```

## 📝 Notes Importantes

1. **Base de Données Railway** : Le projet est configuré pour utiliser la base de données Railway même en développement local. Toutes les modifications seront faites directement sur la base de données de production.

2. **Variables d'Environnement** : Les fichiers `.env` sont déjà configurés avec les valeurs de Railway. Ne les commitez pas dans Git.

3. **Prisma Client** : Le client Prisma est généré automatiquement lors de `npm install` dans le backend grâce au script `postinstall`.

4. **CORS** : Le backend est configuré pour accepter les requêtes depuis `http://localhost:3000` (frontend).

## 🐛 Dépannage

### Erreur de connexion à la base de données

1. Vérifiez que `DATABASE_URL` dans `backend/.env` est correcte
2. Vérifiez votre connexion internet (Railway est accessible publiquement)
3. Testez la connexion avec : `npm run test:db`

### Erreur "Module not found"

1. Assurez-vous d'avoir installé les dépendances : `npm install`
2. Pour le backend : `cd backend && npm install`
3. Pour le frontend : `cd frontend && npm install`

### Port déjà utilisé

Si le port 3001 est déjà utilisé :
1. Modifiez `PORT` dans `backend/.env`
2. Mettez à jour `NEXT_PUBLIC_API_URL` dans `frontend/.env.local`

## 🎯 Prochaines Étapes

1. Initialiser le schéma de la base de données : `cd backend && npm run prisma:db:push`
2. Seed la base de données avec des données de test (optionnel) : `npm run prisma:seed`
3. Démarrer le backend : `npm run start:dev`
4. Démarrer le frontend : `cd frontend && npm run dev`
5. Accéder à l'application : `http://localhost:3000`

