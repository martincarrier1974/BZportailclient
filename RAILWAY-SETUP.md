# Configuration Railway - Guide Étape par Étape

## ⚠️ ERREUR ACTUELLE : DATABASE_URL manquante

L'erreur indique que `DATABASE_URL` n'est pas configurée dans Railway.

## 🔧 Solution : Configurer les Variables d'Environnement

### Étape 1 : Ajouter PostgreSQL au Projet

1. Dans votre projet Railway
2. Cliquez sur **"+ New"**
3. Sélectionnez **"Database"** → **"Add PostgreSQL"**
4. Railway créera automatiquement la variable `DATABASE_URL`

### Étape 2 : Connecter PostgreSQL au Service Backend

1. Dans votre service **Backend**
2. Allez dans **"Variables"**
3. Cliquez sur **"New Variable"**
4. Railway devrait proposer automatiquement `DATABASE_URL` depuis PostgreSQL
5. **Sélectionnez-la** et ajoutez-la

**OU** si elle n'apparaît pas automatiquement :

1. Allez dans votre service **PostgreSQL**
2. Cliquez sur **"Variables"**
3. **Copiez** la valeur de `DATABASE_URL`
4. Retournez dans le service **Backend** → **Variables**
5. Créez une nouvelle variable :
   - **Name**: `DATABASE_URL`
   - **Value**: Collez la valeur copiée

### Étape 3 : Ajouter les Autres Variables

Dans le service **Backend** → **Variables**, ajoutez :

```
DATABASE_URL = <auto depuis PostgreSQL>
JWT_SECRET = <générez un secret fort>
JWT_EXPIRES_IN = 1d
PORT = 3001
NODE_ENV = production
FRONTEND_URL = <à ajouter après création du frontend>
```

**Pour générer JWT_SECRET** (dans PowerShell) :
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Étape 4 : Vérifier la Configuration du Service

Dans le service **Backend** → **Settings** :

- **Root Directory**: `backend` ✅
- **Build Command**: `npm install && npm run prisma:generate && npm run build`
- **Start Command**: `npm run prisma:migrate:deploy && npm run start:prod`

### Étape 5 : Redéployer

1. Une fois les variables configurées
2. Railway redéploiera automatiquement
3. Ou cliquez sur **"Redeploy"** manuellement

## ✅ Vérification

Après le déploiement, vérifiez les logs :
- Les migrations doivent s'exécuter sans erreur
- Le serveur doit démarrer sur le port 3001
- Aucune erreur `DATABASE_URL` ne doit apparaître

## 🐛 Si l'erreur persiste

1. Vérifiez que PostgreSQL est bien créé dans le projet
2. Vérifiez que `DATABASE_URL` est bien dans les variables du backend
3. Vérifiez que le service backend est connecté à PostgreSQL (dans Railway, vous pouvez "link" les services)

