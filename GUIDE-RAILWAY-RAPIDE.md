# Guide Rapide - Connecter PostgreSQL au Backend dans Railway

## 🚀 Méthode Rapide (Interface Railway)

### Étape 1 : Dans Railway Dashboard

1. **Ouvrez votre projet Railway**
2. **Cliquez sur le service BACKEND**
3. **Allez dans l'onglet "Variables"** (à gauche)

### Étape 2 : Ajouter DATABASE_URL

**Option A - Automatique (Recommandé) :**
- Railway devrait **automatiquement proposer** `DATABASE_URL` depuis PostgreSQL
- Vous verrez une suggestion comme : "Add variable from PostgreSQL service"
- **Cliquez sur "Add"** ✅

**Option B - Manuel :**
1. Cliquez sur **"New Variable"**
2. **Name**: `DATABASE_URL`
3. Allez dans votre service **PostgreSQL** → **Variables**
4. **Copiez** la valeur de `DATABASE_URL`
5. Retournez dans **Backend** → **Variables**
6. **Collez** la valeur dans le champ "Value"
7. **Save**

### Étape 3 : Ajouter les Autres Variables

Dans **Backend** → **Variables**, ajoutez :

```
JWT_SECRET = <générez avec la commande ci-dessous>
JWT_EXPIRES_IN = 1d
PORT = 3001
NODE_ENV = production
FRONTEND_URL = <à ajouter après création du frontend>
```

**Pour générer JWT_SECRET** (dans PowerShell) :
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Étape 4 : Vérifier Root Directory

Dans **Backend** → **Settings** :
- **Root Directory** doit être : `backend` ✅

### Étape 5 : Redéployer

Railway redéploiera automatiquement, ou cliquez sur **"Redeploy"**.

---

## ✅ Vérification

Après le redéploiement, vérifiez les logs :
- ✅ Pas d'erreur `DATABASE_URL not found`
- ✅ Migrations exécutées avec succès
- ✅ Serveur démarré sur le port 3001

---

## 🎯 Résumé en 3 Étapes

1. **Backend** → **Variables** → Ajouter `DATABASE_URL` (proposé automatiquement)
2. Ajouter les autres variables (JWT_SECRET, etc.)
3. **Redeploy** → C'est fait ! ✅

