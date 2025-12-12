# Service d'Intégration FreePBX/Asterisk

Ce service permet de connecter le portail admin aux serveurs FreePBX/Asterisk de manière sécurisée et isolée par tenant.

## Architecture

### Isolation par Tenant

Chaque appel API vérifie automatiquement que :
1. L'instance PBX appartient au tenant de l'utilisateur
2. Les SUPER_ADMIN peuvent accéder à tous les tenants
3. Les TENANT_ADMIN et READ_ONLY ne voient que leur propre tenant

### Adapters

Le service utilise des adapters pour supporter différents types d'API :

- **REST Adapter** : Pour FreePBX REST API / UCP API
- **AMI Adapter** : Pour Asterisk Manager Interface (TCP socket)

## Endpoints API

### Health Check

```bash
POST /api/freepbx/:pbxInstanceId/health-check
```

Vérifie la connectivité avec un serveur PBX.

### IVR

```bash
# Lister les IVR
GET /api/freepbx/:pbxInstanceId/ivr

# Créer un IVR
POST /api/freepbx/:pbxInstanceId/ivr
Body: { name, description, recordingId, options, ... }

# Modifier un IVR
PUT /api/freepbx/:pbxInstanceId/ivr/:ivrId
Body: { ... }

# Supprimer un IVR
DELETE /api/freepbx/:pbxInstanceId/ivr/:ivrId
```

### Routes Entrantes

```bash
# Lister les routes
GET /api/freepbx/:pbxInstanceId/inbound-routes

# Créer une route
POST /api/freepbx/:pbxInstanceId/inbound-routes
Body: { did, cid, destination, ... }
```

### Extensions

```bash
# Lister les extensions
GET /api/freepbx/:pbxInstanceId/extensions
```

### CDR (Call Detail Records)

```bash
# Lister les CDR avec filtres
GET /api/freepbx/:pbxInstanceId/cdr?startDate=2024-01-01&endDate=2024-01-31&src=100&dst=200
```

### Prompts/Recordings

```bash
# Lister les prompts
GET /api/freepbx/:pbxInstanceId/prompts
```

### Ring Groups

```bash
# Lister les ring groups
GET /api/freepbx/:pbxInstanceId/ring-groups
```

## Exemple d'Utilisation

### 1. Créer une instance PBX

```bash
POST /api/pbx-instances
{
  "tenantId": "tenant-uuid",
  "name": "PBX Principal Client A",
  "host": "192.168.1.100",
  "port": 443,
  "apiType": "REST",
  "apiUrl": "https://192.168.1.100/api",
  "apiKey": "your-api-key-here"
}
```

### 2. Vérifier la connexion

```bash
POST /api/freepbx/{pbx-instance-id}/health-check
```

### 3. Lister les IVR du client

```bash
GET /api/freepbx/{pbx-instance-id}/ivr
Authorization: Bearer {token}
```

**Important** : Le système vérifie automatiquement que l'instance PBX appartient au tenant de l'utilisateur connecté.

## Configuration FreePBX

Pour utiliser l'API REST de FreePBX, vous devez :

1. Activer le module UCP (User Control Panel) dans FreePBX
2. Générer un token API dans FreePBX
3. Configurer les permissions du token

Pour AMI :
1. Activer le module Manager dans Asterisk
2. Configurer `manager.conf` avec un utilisateur dédié
3. Utiliser le port 5038 par défaut

## Sécurité

- Les credentials (apiKey, password) sont stockés en base mais devraient être chiffrés (TODO)
- Chaque appel vérifie l'isolation tenant
- Les tokens JWT contiennent le tenantId pour validation
- Les erreurs ne révèlent pas d'informations sensibles

## Prochaines Étapes

- [ ] Chiffrement des credentials (AES-256)
- [ ] Cache des connexions AMI
- [ ] Retry logic avec exponential backoff
- [ ] Webhooks pour événements FreePBX
- [ ] Support pour d'autres types d'API (ARI, etc.)

