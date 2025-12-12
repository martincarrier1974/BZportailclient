# Vérification du Déploiement Railway

## ✅ Vérifications à Faire

### 1. Vérifier les Logs du Backend

Dans Railway → Service Backend → Deploy Logs :

**✅ Succès - Vous devriez voir :**
- `Prisma Migrate applied` ou `Prisma DB Push`
- `🚀 Backend API running on http://localhost:3001/api`
- Pas d'erreur `Can't reach database server`

**❌ Si erreur :**
- Copiez les dernières lignes d'erreur
- Vérifiez que DATABASE_URL est bien publique

### 2. Vérifier que le Backend est Accessible

1. **Service Backend** → **Settings** → **Networking**
2. **Generate Domain** (si pas déjà fait)
3. Vous obtiendrez une URL comme : `backend-production-xxx.up.railway.app`
4. Testez dans le navigateur : `https://votre-url/api` (devrait retourner une erreur 404 ou JSON, pas d'erreur de connexion)

### 3. Configurer le Frontend

Une fois le Backend accessible :

1. **Service Frontend** → **Variables**
2. Ajoutez/modifiez :
   ```
   NEXT_PUBLIC_API_URL = https://votre-backend-url.up.railway.app/api
   NODE_ENV = production
   ```
3. Railway redéploiera automatiquement

### 4. Seed la Base de Données

Une fois le Backend démarré :

1. **Service Backend** → **Settings** → **Deploy** → **Run Command**
2. Entrez : `npm run prisma:seed`
3. Cela créera les comptes par défaut

### 5. Tester la Connexion

1. Ouvrez l'URL du Frontend
2. Connectez-vous avec :
   - Email: `admin@bztelecom.com`
   - Password: `admin123`

## 🎯 Prochaines Étapes

- [ ] Backend accessible et fonctionnel
- [ ] Frontend configuré avec l'URL du Backend
- [ ] Base de données seedée
- [ ] Test de connexion réussi
- [ ] Changer les mots de passe par défaut (important en production!)

