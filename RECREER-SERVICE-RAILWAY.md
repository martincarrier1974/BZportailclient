# 🔧 Guide Complet - Recréer le Service Railway

## ⚠️ Pourquoi Recréer ?

L'ancien service a le port 3001 en cache. Même en changeant le code, Railway garde cette référence. **Il faut recréer le service** pour que Railway assigne un port dynamique.

## ✅ Vérification Avant de Commencer

**Les builds fonctionnent :**
- ✅ Backend build : OK
- ✅ Frontend Vite build : OK
- ✅ Code prêt pour Railway

## 📋 Étapes Détaillées

### ÉTAPE 1 : Supprimer l'Ancien Service Backend

1. Allez sur Railway.app
2. Ouvrez votre projet
3. Trouvez le service "BZportailclient" (ou le nom actuel)
4. Cliquez sur le service
5. Allez dans **Settings** (onglet en haut)
6. Descendez jusqu'à **"Danger Zone"** (tout en bas)
7. Cliquez sur **"Delete Service"**
8. Confirmez la suppression

### ÉTAPE 2 : Créer un Nouveau Service Backend

1. Dans votre projet Railway, cliquez sur **"+ New"**
2. Sélectionnez **"GitHub Repo"**
3. Choisissez votre repository `BZportailclient`
4. **IMPORTANT** : Dans les settings qui apparaissent :
   - **Root Directory** : `backend`
   - Laissez les autres options par défaut
5. Railway va commencer à builder automatiquement

### ÉTAPE 3 : Configurer les Variables d'Environnement

**Pendant que Railway build**, configurez les variables :

1. Allez dans **Variables** (onglet en haut)
2. Cliquez sur **"+ New Variable"**
3. Ajoutez ces variables **UNE PAR UNE** :

   **Variable 1 : DATABASE_URL**
   - Nom : `DATABASE_URL`
   - Valeur : Cliquez sur **"Add Reference"** → Sélectionnez votre service PostgreSQL → Sélectionnez `DATABASE_URL`
   - ✅ Cliquez sur "Add"

   **Variable 2 : JWT_SECRET**
   - Nom : `JWT_SECRET`
   - Valeur : Générez un secret fort (ex: `LqjTgJVbq70OBBU3WAWhiNiJLULFAejSpiUEchozIGI=`)
   - ✅ Cliquez sur "Add"

   **Variable 3 : JWT_EXPIRES_IN**
   - Nom : `JWT_EXPIRES_IN`
   - Valeur : `1d`
   - ✅ Cliquez sur "Add"

   **Variable 4 : NODE_ENV**
   - Nom : `NODE_ENV`
   - Valeur : `production`
   - ✅ Cliquez sur "Add"

**⚠️ NE DÉFINISSEZ PAS `PORT`** - Railway l'injecte automatiquement

### ÉTAPE 4 : Attendre le Déploiement

1. Allez dans **Deployments** (onglet en haut)
2. Attendez que le déploiement soit **"Completed"** (vert)
3. Vérifiez les logs : Vous devriez voir `🚀 Backend API started successfully`

### ÉTAPE 5 : Générer le Domaine Public

1. Allez dans **Settings** → **Networking**
2. Dans la section **"Public Networking"**
3. Cliquez sur **"Generate Domain"**
4. **Railway assignera automatiquement un port dynamique** (8080, 3000, etc.)
5. Le port ne sera **PAS** 3001

### ÉTAPE 6 : Vérifier le Port

1. Dans **Settings** → **Networking**
2. Regardez le domaine généré
3. Il devrait afficher : `→ Port 8080` (ou autre, mais PAS 3001)

### ÉTAPE 7 : Créer le Service Frontend Vite

1. Railway → Projet → **"+ New"** → **"GitHub Repo"**
2. Sélectionnez votre repository
3. **Root Directory** : `vite-frontend`
4. Variables :
   - `NODE_ENV` = `production`
   - **C'est tout !** (Pas de PORT, pas de VITE_API_URL)

### ÉTAPE 8 : Générer le Domaine Frontend

1. Settings → Networking → Generate Domain
2. Railway assignera un port dynamique

## ✅ Vérification Finale

- Backend : `https://votre-backend.railway.app/api` → Devrait répondre
- Frontend : `https://votre-frontend.railway.app` → Devrait s'afficher
- Ports : Différents de 3001

## 🆘 Si Ça Ne Fonctionne Toujours Pas

1. Vérifiez les logs Railway (Deploy Logs)
2. Vérifiez que `PORT` n'est PAS dans les variables
3. Vérifiez que le Root Directory est bien `backend` (pas la racine)

