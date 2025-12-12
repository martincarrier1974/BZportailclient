# Architecture - Portail Admin FreePBX BZ Telecom

## 🏗️ Vue d'ensemble

Portail d'administration centralisé pour gérer plusieurs instances FreePBX de manière multi-tenant avec RBAC et audit trail.

## 📐 Architecture High-Level

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                        │
│  - App Router avec TypeScript                                │
│  - shadcn/ui components                                      │
│  - Authentification JWT                                      │
│  - Multi-tenant UI (switch tenant, filtres)                  │
└──────────────────────┬───────────────────────────────────────┘
                       │ REST API (HTTPS)
┌──────────────────────▼───────────────────────────────────────┐
│              Backend API (NestJS)                            │
│  - Controllers (REST endpoints)                              │
│  - Services (business logic)                                 │
│  - Repositories (data access)                                │
│  - Guards (auth, RBAC, multi-tenant)                         │
│  - Interceptors (audit logging)                             │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐ ┌───▼──────────────┐
│  PostgreSQL  │ │  FreePBX #1 │ │  FreePBX #2...N  │
│  - Users     │ │  (API/AMI)  │ │  (API/AMI)       │
│  - Tenants   │ │             │ │                  │
│  - PBX Inst. │ │             │ │                  │
│  - Audit Log │ │             │ │                  │
└──────────────┘ └─────────────┘ └──────────────────┘
```

## 🛠️ Stack Technique

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: React Query (pour cache API)
- **Forms**: React Hook Form + Zod
- **Auth**: JWT stocké en httpOnly cookies

### Backend
- **Framework**: NestJS (choix justifié ci-dessous)
- **Langage**: TypeScript
- **ORM**: TypeORM ou Prisma (recommandé: Prisma pour migrations)
- **Validation**: class-validator + class-transformer
- **Auth**: JWT + Passport
- **Database**: PostgreSQL
- **Logging**: Winston ou Pino

### DevOps
- **Containerisation**: Docker + docker-compose
- **Environnements**: dev, staging, production

## 🎯 Justification: NestJS vs Express

**NestJS choisi car:**
- Architecture modulaire native (modules, controllers, services)
- Décorateurs TypeScript pour métadonnées (Guards, Interceptors)
- Injection de dépendances intégrée
- Support natif pour microservices
- Excellent pour RBAC et multi-tenant (Guards hiérarchiques)
- Écosystème mature (Passport, TypeORM/Prisma, Swagger)
- Meilleure séparation des responsabilités

## 📊 Schéma de Base de Données (ERD)

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │ (hashed)
│ firstName   │
│ lastName    │
│ role        │ (enum: SUPER_ADMIN, TENANT_ADMIN, READ_ONLY)
│ tenantId    │ (FK, nullable pour SUPER_ADMIN)
│ createdAt   │
│ updatedAt   │
└──────┬──────┘
       │
       │ 1:N
┌──────▼──────────┐
│   Tenant        │
├─────────────────┤
│ id (PK)         │
│ name            │
│ companyName     │
│ contactEmail    │
│ contactPhone    │
│ address         │
│ isActive        │
│ createdAt       │
│ updatedAt       │
└──────┬──────────┘
       │
       │ 1:N
┌──────▼──────────────────┐
│   FreePBXInstance       │
├──────────────────────────┤
│ id (PK)                  │
│ tenantId (FK)            │
│ name                     │
│ host (IP/FQDN)           │
│ port                     │
│ apiType                  │ (enum: REST, AMI, UCP)
│ apiUrl                   │
│ apiKey/token             │ (encrypted)
│ username                 │ (si AMI)
│ password                 │ (encrypted, si AMI)
│ status                   │ (enum: CONNECTED, DISCONNECTED, ERROR)
│ lastHealthCheck          │
│ notes                    │
│ createdAt                │
│ updatedAt                │
└──────────────────────────┘

┌──────────────────────┐
│     AuditLog         │
├──────────────────────┤
│ id (PK)              │
│ userId (FK)          │
│ tenantId (FK)        │
│ pbxInstanceId (FK)   │
│ action               │ (CREATE, UPDATE, DELETE, READ)
│ entityType           │ (IVR, ROUTE, USER, etc.)
│ entityId             │
│ changes              │ (JSON: before/after)
│ ipAddress            │
│ userAgent            │
│ createdAt            │
└──────────────────────┘

┌──────────────────────┐
│   IVR (cache/sync)   │
├──────────────────────┤
│ id (PK)              │
│ pbxInstanceId (FK)   │
│ freepbxId            │ (ID dans FreePBX)
│ name                 │
│ description          │
│ recordingId          │
│ options              │ (JSON: { "0": "ext:100", "1": "queue:sales" })
│ timeout              │
│ invalidDestination   │
│ lastSyncedAt         │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

┌──────────────────────┐
│   InboundRoute       │
├──────────────────────┤
│ id (PK)              │
│ pbxInstanceId (FK)   │
│ freepbxId            │
│ did                  │
│ cid                  │
│ destination          │ (JSON)
│ lastSyncedAt         │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

┌──────────────────────┐
│   CDR                │
├──────────────────────┤
│ id (PK)              │
│ pbxInstanceId (FK)   │
│ calldate             │
│ clid                 │
│ src                  │
│ dst                  │
│ duration             │
│ billsec              │
│ disposition          │
│ recordingfile        │
│ createdAt            │
└──────────────────────┘
```

## 🔌 Stratégie d'Intégration FreePBX

### Options d'API FreePBX

1. **FreePBX REST API (UCP/ARI)** (Recommandé)
   - Endpoint: `https://pbx.example.com/api/`
   - Auth: Token-based ou Basic Auth
   - Documentation: FreePBX API docs
   - Avantages: REST natif, bien documenté
   - Limitations: Nécessite module UCP activé

2. **AMI (Asterisk Manager Interface)**
   - Port: 5038 (par défaut)
   - Auth: username/password
   - Protocole: TCP socket
   - Avantages: Accès complet à Asterisk
   - Limitations: Plus complexe, nécessite parsing de réponses

3. **FreePBX Database Direct** (Non recommandé)
   - Accès direct à MySQL de FreePBX
   - Risque: corruption si mal utilisé
   - Utiliser uniquement en lecture si nécessaire

### Mapping Fonctionnalités → FreePBX

| Fonctionnalité | FreePBX Module | API Endpoint / AMI Action |
|----------------|----------------|---------------------------|
| Prompts/Recordings | System Recordings | `/api/system/recordings` ou AMI `CoreShowChannels` |
| IVR | IVR Module | `/api/ivr` ou AMI `QueueStatus` |
| Users/Extensions | User Management | `/api/users` ou AMI `SIPpeers` |
| Ring Groups | Ring Groups | `/api/ringgroups` |
| Calendars | Calendar Module | `/api/calendars` |
| Time Conditions | Time Conditions | `/api/timeconditions` |
| Firewall | Firewall Module | `/api/firewall` (si disponible) |
| Inbound Routes | Inbound Routes | `/api/inboundroutes` |
| Outbound Routes | Outbound Routes | `/api/outboundroutes` |
| CDR | CDR Module | Lecture DB ou `/api/cdr` |

### Service d'Intégration

Créer un service `FreePBXIntegrationService` qui:
- Gère la connexion (pool de connexions)
- Cache les credentials (chiffrés)
- Gère les timeouts et retries
- Log toutes les interactions
- Normalise les réponses FreePBX vers notre modèle

## 🔐 Sécurité

### Authentification
- JWT avec refresh tokens
- Passwords hashés avec bcrypt (salt rounds: 12)
- Rate limiting sur login
- Session timeout configurable

### Multi-tenant
- Guard NestJS vérifie `tenantId` dans JWT
- Filtrage automatique des requêtes par tenant
- SUPER_ADMIN peut accéder à tous les tenants
- Isolation stricte des données

### Secrets
- Credentials FreePBX stockés chiffrés (AES-256)
- Variables d'environnement pour secrets
- Rotation des tokens possible

### Audit Trail
- Toutes les modifications loggées
- Qui, quoi, quand, depuis où
- Immutable (append-only)
- Exportable pour compliance

## 📦 Structure du Projet

```
bz-telecom-admin-portal/
├── backend/
│   ├── src/
│   │   ├── auth/              # Module auth (JWT, guards)
│   │   ├── users/              # Gestion utilisateurs
│   │   ├── tenants/            # Gestion tenants
│   │   ├── pbx-instances/      # Gestion instances FreePBX
│   │   ├── ivr/                # Gestion IVR
│   │   ├── prompts/            # Gestion prompts/recordings
│   │   ├── routes/             # Inbound/Outbound routes
│   │   ├── cdr/                # CDR management
│   │   ├── firewall/           # Firewall management
│   │   ├── freepbx/            # Service d'intégration FreePBX
│   │   ├── audit/              # Audit logging
│   │   ├── common/             # Guards, interceptors, decorators
│   │   └── main.ts
│   ├── prisma/                 # Schéma Prisma + migrations
│   ├── test/
│   ├── docker-compose.yml
│   └── package.json
│
├── frontend/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Routes auth (login)
│   │   ├── (admin)/            # Routes protégées
│   │   │   ├── dashboard/
│   │   │   ├── tenants/
│   │   │   ├── pbx/
│   │   │   ├── ivr/
│   │   │   ├── routes/
│   │   │   ├── cdr/
│   │   │   └── settings/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui
│   │   ├── layout/             # Sidebar, Header
│   │   └── features/           # Composants métier
│   ├── lib/
│   │   ├── api/                # Client API (fetch wrapper)
│   │   └── auth/               # Helpers auth
│   └── package.json
│
├── docker-compose.yml           # Orchestration complète
├── .env.example
└── README.md
```

## 🚀 Plan de Développement (10 Étapes)

### Step 1: Project Scaffolding ✅
- Structure monorepo ou séparée
- Docker Compose (backend, frontend, postgres)
- Configuration de base (TS, ESLint, Prettier)

### Step 2: Auth + Multi-tenant Base
- Modèles User, Tenant, Role
- JWT auth (login/logout)
- Guards multi-tenant
- Seed admin user

### Step 3: CRUD Tenants & FreePBXInstances
- API CRUD tenants
- API CRUD PBX instances
- UI pour lister/créer/éditer
- Health check des PBX

### Step 4: IVR & Prompts Management
- Service FreePBX integration
- API IVR CRUD
- API Prompts (list, upload, delete)
- UI avec formulaires

### Step 5: Users / Ring Groups
- API Extensions CRUD
- API Ring Groups CRUD
- UI de gestion

### Step 6: Calendars / Time Groups / Time Conditions
- API Calendars
- API Time Groups
- API Time Conditions
- UI avec visualisation

### Step 7: Inbound / Outbound Routes
- API Routes CRUD
- UI avec tableaux et formulaires
- Validation des patterns

### Step 8: Firewall Abstraction
- API Firewall (read/update)
- Validation stricte (pas de "allow all")
- UI avec whitelist/blacklist

### Step 9: CDR UI + Export
- API CDR avec filtres
- Export CSV/Excel
- UI avec tableaux, pagination, filtres

### Step 10: RBAC + Audit + Polish
- Permissions granulaires
- Audit trail complet
- Tests, documentation, optimisations

## ❓ Questions à Clarifier

1. **Authentification FreePBX**: Comment authentifiez-vous actuellement? (API key, username/password AMI, autre?)
2. **Version FreePBX**: Quelle version utilisez-vous? (affecte les APIs disponibles)
3. **Déploiement**: Cloud (AWS/GCP) ou on-premise?
4. **Volume**: Combien de clients/PBX environ?
5. **Priorités**: Quelles fonctionnalités en premier? (IVR, Routes, CDR?)

---

**Prêt à commencer le scaffolding!** 🚀

