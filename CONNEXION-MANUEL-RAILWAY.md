# Connexion Manuelle Rapide - Railway

## 🎯 Objectif : Connecter "bd Portail" (PostgreSQL) au Backend

### Méthode la Plus Rapide (Interface Web)

1. **Ouvrez Railway Dashboard** : https://railway.app

2. **Dans votre projet, trouvez le service "bd Portail" (PostgreSQL)**
   - Notez le nom exact du service

3. **Cliquez sur le service BACKEND**

4. **Allez dans "Variables"** (menu de gauche)

5. **Railway devrait proposer automatiquement DATABASE_URL**
   - Vous verrez : "Add variable from bd Portail service" ou similaire
   - **Cliquez sur "Add"** ✅

6. **Si l'option automatique n'apparaît pas :**
   - Cliquez sur **"New Variable"**
   - **Name**: `DATABASE_URL`
   - Allez dans **"bd Portail"** service → **Variables**
   - **Copiez** la valeur de `DATABASE_URL`
   - Retournez dans **Backend** → **Variables**
   - **Collez** dans "Value"
   - **Save**

7. **Ajoutez les autres variables** (Backend → Variables → New Variable) :
   ```
   JWT_SECRET = LqjTgJVbq70OBBU3WAWhiNiJLULFAejSpiUEchozIGI=
   JWT_EXPIRES_IN = 1d
   PORT = 3001
   NODE_ENV = production
   FRONTEND_URL = <à ajouter après>
   ```

8. **Vérifiez Settings** :
   - **Root Directory** = `backend` ✅

9. **Railway redéploiera automatiquement** ✅

---

## ⚡ Alternative : Railway CLI

Si vous préférez utiliser la ligne de commande :

```powershell
# 1. Se connecter
railway login

# 2. Lier le projet
railway link

# 3. Exécuter le script automatique
.\connect-bd-portail.ps1
```

---

## ✅ Vérification

Après configuration, vérifiez les logs du Backend :
- ✅ Pas d'erreur `DATABASE_URL not found`
- ✅ Migrations exécutées
- ✅ Serveur démarré

