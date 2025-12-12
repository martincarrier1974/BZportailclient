# Configuration Networking PostgreSQL dans Railway

## 🔌 Type de Connexion : TCP (pas HTTP)

PostgreSQL utilise le protocole **TCP** sur le port **5432**, pas HTTP.

## 📋 Configuration dans Railway

### Pour le Service PostgreSQL "bd Portail"

1. **Service "bd Portail"** → **Settings** → **Networking**
2. **Generate Domain** (si pas déjà fait)
3. Railway générera automatiquement un domaine public
4. Le protocole sera **TCP** (géré automatiquement par Railway)

### Pour le Service Backend

1. **Service Backend** → **Settings** → **Networking**
2. **Generate Domain** pour obtenir une URL HTTP/HTTPS
3. Le protocole sera **HTTP/HTTPS** (pour l'API REST)

## 🔗 Connexion Backend → PostgreSQL

Le Backend se connecte à PostgreSQL via **TCP** en utilisant `DATABASE_URL` :

```
postgresql://postgres:PASSWORD@HOST-PUBLIC:5432/DATABASE
```

- **Protocole** : `postgresql://` (TCP)
- **Port** : `5432` (TCP)
- **Hostname** : Le domaine public généré par Railway

## ✅ Résumé

- **PostgreSQL** : TCP (port 5432) - Railway gère automatiquement
- **Backend API** : HTTP/HTTPS (port 3001 ou assigné automatiquement)
- **Frontend** : HTTP/HTTPS (port 3000 ou assigné automatiquement)

Le domaine public généré pour PostgreSQL dans Railway sera accessible via TCP, c'est automatique.

