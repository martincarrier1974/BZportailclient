# Dépannage Railway - Erreurs Communes

## 🔴 Crash après configuration DATABASE_URL

### Vérifications à faire :

#### 1. Vérifier que DATABASE_URL est bien configurée

Dans **Backend** → **Variables** :
- `DATABASE_URL` doit être présent
- La valeur doit commencer par `postgresql://`
- La valeur ne doit PAS être vide

#### 2. Vérifier les autres variables requises

Dans **Backend** → **Variables**, assurez-vous d'avoir :

```
DATABASE_URL = postgresql://... (non vide!)
JWT_SECRET = <votre-secret>
JWT_EXPIRES_IN = 1d
PORT = 3001
NODE_ENV = production
```

#### 3. Vérifier Root Directory

Dans **Backend** → **Settings** :
- **Root Directory** doit être exactement : `backend` (pas `./backend` ou autre)

#### 4. Vérifier Start Command

Dans **Backend** → **Settings** :
- **Start Command** doit être : `npm run prisma:migrate:deploy && npm run start:prod`

#### 5. Vérifier les Logs

Dans **Backend** → **Deploy Logs**, cherchez :
- ❌ `DATABASE_URL resolved to an empty string` → Variable mal configurée
- ❌ `Can't reach database server` → Problème de connexion
- ❌ `Port 3001 already in use` → Changez le PORT
- ❌ `Module not found` → Problème de build
- ❌ `Migration failed` → Problème de schéma Prisma

## 🔧 Solutions selon l'erreur

### Erreur : "DATABASE_URL resolved to an empty string"

**Solution :**
1. Allez dans **Backend** → **Variables**
2. Supprimez `DATABASE_URL` si elle existe
3. Re-ajoutez-la depuis **"bd Portail"** service
4. Vérifiez que la valeur n'est pas vide
5. **Redeploy**

### Erreur : "Can't reach database server"

**Solution :**
1. Vérifiez que **"bd Portail"** est bien démarré
2. Vérifiez que les services sont dans le même projet Railway
3. Vérifiez que `DATABASE_URL` pointe vers le bon service

### Erreur : "Port already in use"

**Solution :**
1. Changez `PORT = 3002` dans les variables
2. Ou laissez Railway assigner automatiquement le port

### Erreur : "Migration failed"

**Solution :**
1. Vérifiez que `DATABASE_URL` est correcte
2. Vérifiez que la base de données est accessible
3. Essayez de créer une migration vide puis redéployez

## 📋 Checklist de Vérification

- [ ] `DATABASE_URL` est présent et non vide
- [ ] `JWT_SECRET` est configuré
- [ ] `PORT` est configuré (3001 ou laissé vide)
- [ ] `NODE_ENV = production`
- [ ] Root Directory = `backend`
- [ ] Start Command correct
- [ ] Service "bd Portail" est démarré
- [ ] Les services sont dans le même projet

## 🆘 Si rien ne fonctionne

1. **Supprimez toutes les variables** du Backend
2. **Re-ajoutez-les une par une** :
   - D'abord `DATABASE_URL`
   - Puis les autres
3. **Redeploy**
4. **Vérifiez les logs** à chaque étape

