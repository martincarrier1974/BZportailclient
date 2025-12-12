# Portail Admin FreePBX - BZ Telecom

Portail d'administration centralisé pour gérer plusieurs instances FreePBX de manière multi-tenant avec RBAC et audit trail.

## 🏗️ Architecture

- **Backend**: NestJS + Prisma + PostgreSQL
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL
- **Containerisation**: Docker Compose

## 🚀 Démarrage Rapide

### Prérequis

- Docker & Docker Compose
- Node.js 20+ (pour développement local sans Docker)

### Option 1: Docker Compose (Recommandé)

```bash
# 1. Cloner/configurer le projet
cd "POrtail usager"

# 2. Créer les fichiers .env (optionnel, les valeurs par défaut fonctionnent)
# Backend
echo "DATABASE_URL=postgresql://bzadmin:bzadmin123@postgres:5432/bzadmin_portal" > backend/.env
echo "JWT_SECRET=your-super-secret-jwt-key-change-in-production" >> backend/.env
echo "JWT_EXPIRES_IN=1d" >> backend/.env
echo "PORT=3001" >> backend/.env

# Frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > frontend/.env.local

# 3. Démarrer tous les services
docker-compose up -d

# 4. Initialiser la base de données (dans le container backend)
docker-compose exec backend npm run prisma:generate
docker-compose exec backend npm run prisma:migrate
docker-compose exec backend npm run prisma:seed
```

### Option 2: Développement Local

#### Backend

```bash
cd backend

# Installer les dépendances
npm install

# Configurer .env
cp .env.example .env
# Éditer .env avec vos valeurs

# Générer Prisma Client
npm run prisma:generate

# Lancer les migrations
npm run prisma:migrate

# Seed la base de données
npm run prisma:seed

# Démarrer en mode dev
npm run start:dev
```

#### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Configurer .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Démarrer en mode dev
npm run dev
```

#### PostgreSQL

Assurez-vous d'avoir PostgreSQL en cours d'exécution localement ou utilisez Docker:

```bash
docker run -d \
  --name bz-admin-postgres \
  -e POSTGRES_USER=bzadmin \
  -e POSTGRES_PASSWORD=bzadmin123 \
  -e POSTGRES_DB=bzadmin_portal \
  -p 5432:5432 \
  postgres:16-alpine
```

## 🔐 Comptes par Défaut

Après le seed, vous pouvez vous connecter avec:

- **Super Admin**: `admin@bztelecom.com` / `admin123`
- **Tenant Admin**: `admin@democompany.com` / `admin123`
- **Read Only**: `readonly@democompany.com` / `readonly123`

## 📡 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Prisma Studio**: `npm run prisma:studio` (dans backend/)

## 📁 Structure du Projet

```
.
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/            # Authentification JWT
│   │   ├── users/           # Gestion utilisateurs
│   │   ├── tenants/         # Gestion tenants
│   │   ├── pbx-instances/   # Gestion instances FreePBX
│   │   ├── audit/           # Audit logging
│   │   └── prisma/          # Service Prisma
│   ├── prisma/
│   │   ├── schema.prisma    # Schéma de base de données
│   │   └── seed.ts          # Données de seed
│   └── package.json
│
├── frontend/                # Application Next.js
│   ├── app/                 # Pages (App Router)
│   │   ├── login/           # Page de connexion
│   │   ├── dashboard/       # Tableau de bord
│   │   ├── tenants/         # Gestion tenants
│   │   └── pbx/             # Gestion PBX instances
│   ├── components/          # Composants React
│   │   ├── ui/              # Composants shadcn/ui
│   │   └── layout/           # Layout et navigation
│   └── lib/                 # Utilitaires
│
└── docker-compose.yml       # Orchestration Docker
```

## 🔧 Commandes Utiles

### Backend

```bash
# Générer Prisma Client
npm run prisma:generate

# Créer une migration
npm run prisma:migrate

# Seed la base de données
npm run prisma:seed

# Ouvrir Prisma Studio
npm run prisma:studio

# Lancer les tests
npm run test
```

### Frontend

```bash
# Build de production
npm run build

# Lancer en production
npm run start

# Linter
npm run lint
```

## 🎯 Fonctionnalités Implémentées

### ✅ Step 1-3: Base
- [x] Structure du projet (backend + frontend + Docker)
- [x] Authentification JWT
- [x] Multi-tenant avec RBAC
- [x] CRUD Tenants
- [x] CRUD FreePBX Instances
- [x] Health check des PBX

### 🚧 À Implémenter (Steps 4-10)
- [ ] IVR & Prompts Management
- [ ] Users / Extensions / Ring Groups
- [ ] Calendars / Time Groups / Time Conditions
- [ ] Inbound / Outbound Routes
- [ ] Firewall Management
- [ ] CDR avec filtres et export
- [ ] Audit Trail complet dans l'UI

## 🔌 Intégration FreePBX

L'intégration avec FreePBX se fera via:

1. **FreePBX REST API** (recommandé)
   - Endpoint: `https://pbx.example.com/api/`
   - Auth: Token-based

2. **AMI (Asterisk Manager Interface)**
   - Port: 5038
   - Auth: username/password

Le service `FreePBXIntegrationService` sera créé dans `backend/src/freepbx/` pour gérer toutes les interactions.

## 📝 Exemples d'API

### Authentification

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bztelecom.com","password":"admin123"}'

# Response
{
  "access_token": "eyJhbGc...",
  "user": { ... }
}
```

### Tenants

```bash
# Liste des tenants (nécessite JWT)
curl http://localhost:3001/api/tenants \
  -H "Authorization: Bearer YOUR_TOKEN"

# Créer un tenant
curl -X POST http://localhost:3001/api/tenants \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nouveau Client",
    "companyName": "Nouveau Client Inc.",
    "contactEmail": "contact@nouveauclient.com"
  }'
```

### PBX Instances

```bash
# Liste des instances PBX
curl http://localhost:3001/api/pbx-instances \
  -H "Authorization: Bearer YOUR_TOKEN"

# Créer une instance
curl -X POST http://localhost:3001/api/pbx-instances \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "tenant-uuid",
    "name": "PBX Principal",
    "host": "192.168.1.100",
    "port": 443,
    "apiType": "REST",
    "apiUrl": "https://192.168.1.100/api",
    "apiKey": "your-api-key"
  }'

# Health check
curl -X POST http://localhost:3001/api/pbx-instances/{id}/health-check \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔒 Sécurité

- **JWT**: Tokens avec expiration
- **Passwords**: Hashés avec bcrypt (12 rounds)
- **Multi-tenant**: Isolation stricte des données
- **RBAC**: Guards NestJS pour permissions
- **Audit**: Toutes les actions loggées

## 🚀 Prochaines Étapes

1. Implémenter le service d'intégration FreePBX
2. Créer les modules IVR, Routes, CDR
3. Ajouter l'interface utilisateur complète
4. Implémenter l'audit trail dans l'UI
5. Tests unitaires et d'intégration
6. Documentation API (Swagger)

## 📄 Licence

Propriétaire - BZ Telecom

