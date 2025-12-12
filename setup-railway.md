# Guide de Déploiement Railway - Étapes Détaillées

## 📋 Checklist de Déploiement

### Étape 1: Créer le Repository GitHub

1. **Aller sur GitHub**: https://github.com/new
2. **Repository name**: `bz-admin-portal` (ou autre nom)
3. **Description**: "Portail d'administration FreePBX pour BZ Telecom"
4. **Visibilité**: Private (recommandé) ou Public
5. **NE PAS cocher**: "Add a README file", "Add .gitignore", "Choose a license"
6. **Cliquer**: "Create repository"

### Étape 2: Pousser le Code sur GitHub

Dans votre terminal PowerShell (à la racine du projet):

```powershell
# Si vous n'avez pas encore exécuté setup-git.ps1
.\setup-git.ps1

# Ajouter le remote GitHub (remplacez VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/bz-admin-portal.git

# Renommer la branche en main
git branch -M main

# Pousser le code
git push -u origin main
```

### Étape 3: Créer le Projet Railway

1. **Aller sur Railway**: https://railway.app
2. **S'inscrire/Se connecter** avec GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Sélectionner** votre repository `bz-admin-portal`
5. Railway va détecter automatiquement le projet

### Étape 4: Ajouter PostgreSQL

1. Dans votre projet Railway, cliquer sur **"+ New"**
2. Sélectionner **"Database"** → **"Add PostgreSQL"**
3. Railway créera automatiquement la variable `DATABASE_URL`
4. **Notez l'URL** de la base de données (pour référence)

### Étape 5: Configurer le Service Backend

1. Railway devrait avoir détecté automatiquement le backend
2. Si non, **"+ New"** → **"GitHub Repo"** → Sélectionner votre repo
3. **Settings** du service backend:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm run prisma:migrate:deploy && npm run start:prod`

4. **Variables** du service backend:
   ```
   DATABASE_URL = <auto depuis PostgreSQL>
   JWT_SECRET = <générer un secret fort>
   JWT_EXPIRES_IN = 1d
   PORT = 3001
   NODE_ENV = production
   FRONTEND_URL = <URL du frontend - à ajouter après création>
   ```

   **Pour générer JWT_SECRET**:
   ```powershell
   # Dans PowerShell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

### Étape 6: Configurer le Service Frontend

1. **"+ New"** → **"GitHub Repo"** → Sélectionner votre repo
2. **Settings** du service frontend:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

3. **Variables** du service frontend:
   ```
   NEXT_PUBLIC_API_URL = <URL du backend>/api
   NODE_ENV = production
   ```

   **Note**: L'URL du backend sera quelque chose comme:
   `https://backend-production-xxxx.up.railway.app`

### Étape 7: Obtenir les URLs

1. Dans chaque service, cliquer sur **"Settings"** → **"Networking"**
2. **Generate Domain** pour obtenir une URL publique
3. **Backend URL**: Copiez cette URL
4. **Frontend URL**: Copiez cette URL

### Étape 8: Mettre à Jour les Variables

1. **Backend**: Mettre à jour `FRONTEND_URL` avec l'URL du frontend
2. **Frontend**: Mettre à jour `NEXT_PUBLIC_API_URL` avec `<BACKEND_URL>/api`

### Étape 9: Seed la Base de Données

Une fois les services déployés:

1. **Installer Railway CLI** (optionnel mais recommandé):
   ```powershell
   npm install -g @railway/cli
   railway login
   ```

2. **Exécuter le seed**:
   ```powershell
   railway link  # Lier au projet
   railway run --service backend npm run prisma:seed
   ```

   **OU** via l'interface Railway:
   - Aller dans le service backend
   - **Settings** → **Deploy** → **Run Command**
   - Entrer: `npm run prisma:seed`

### Étape 10: Tester

1. Ouvrir l'URL du frontend
2. Se connecter avec:
   - Email: `admin@bztelecom.com`
   - Password: `admin123`

## 🔐 Sécurité en Production

⚠️ **IMPORTANT**: Après le premier déploiement:

1. **Changer les mots de passe** des comptes par défaut
2. **Vérifier** que `JWT_SECRET` est fort et unique
3. **Configurer** un domaine personnalisé (optionnel)
4. **Activer** les backups automatiques de PostgreSQL dans Railway

## 🐛 Dépannage

### Backend ne démarre pas
- Vérifier les logs dans Railway
- Vérifier que `DATABASE_URL` est correct
- Vérifier que les migrations ont réussi

### Frontend ne peut pas se connecter
- Vérifier `NEXT_PUBLIC_API_URL` dans le frontend
- Vérifier `FRONTEND_URL` dans le backend (CORS)
- Vérifier que le backend est accessible publiquement

### Erreurs de build
- Vérifier les logs de build dans Railway
- Vérifier que Node.js 20 est utilisé
- Vérifier que toutes les dépendances sont installées

## 📊 Monitoring

Railway fournit:
- **Logs** en temps réel
- **Métriques** (CPU, RAM, Network)
- **Alertes** configurables

## ✅ Checklist Finale

- [ ] Repository GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Projet Railway créé
- [ ] PostgreSQL ajouté
- [ ] Service Backend configuré
- [ ] Service Frontend configuré
- [ ] Variables d'environnement configurées
- [ ] URLs générées
- [ ] Variables mises à jour avec les URLs
- [ ] Services déployés
- [ ] Seed exécuté
- [ ] Test de connexion réussi
- [ ] Mots de passe changés

