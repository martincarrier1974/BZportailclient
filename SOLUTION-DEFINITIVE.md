# Solution Définitive - Erreur Railway

## 🔴 Le Problème

Railway utilise toujours `postgres.railway.internal:5432` même après modification de DATABASE_URL.

## ✅ Solution Étape par Étape

### 1. Supprimer COMPLÈTEMENT DATABASE_URL

1. **Service Backend** → **Variables**
2. **Trouvez** `DATABASE_URL`
3. **Cliquez sur les 3 points** → **Delete**
4. **Confirmez** la suppression

### 2. Obtenir la VRAIE URL depuis "bd Portail"

1. **Service "bd Portail"** → **Variables**
2. **Ouvrez** `DATABASE_URL`
3. **Copiez** TOUTE la valeur
4. **Vérifiez** qu'elle contient un hostname PUBLIC (pas `railway.internal`)

### 3. Re-créer DATABASE_URL dans Backend

1. **Service Backend** → **Variables**
2. **New Variable**
3. **Name**: `DATABASE_URL` (exactement, en majuscules)
4. **Value**: Collez la valeur complète depuis "bd Portail"
5. **Save**

### 4. Modifier Start Command

1. **Service Backend** → **Settings**
2. **Start Command** → Modifiez pour :
   ```
   npm run prisma:db:push --accept-data-loss && npm run start:prod
   ```
3. **Save**

### 5. Forcer Redéploiement

1. **Service Backend** → **Settings**
2. **Redeploy** → **Clear Build Cache** → **Redeploy**

---

## 🔍 Comment Vérifier que DATABASE_URL est Correcte

Dans Backend → Variables → `DATABASE_URL` :

**Doit contenir :**
- `postgresql://` au début
- Un hostname avec `.railway.app` ou `containers-` (ex: `containers-us-west-123.railway.app`)
- Le port `:5432`
- Le nom de la base de données

**Ne doit PAS contenir :**
- `postgres.railway.internal`
- `railway.internal`

---

## ⚠️ Si l'URL dans "bd Portail" est aussi interne

Si même dans "bd Portail" l'URL est interne :

1. **Service "bd Portail"** → **Settings** → **Networking**
2. **Generate Domain** pour obtenir un domaine public
3. **Construisez** l'URL manuellement :
   ```
   postgresql://postgres:PASSWORD@DOMAINE-PUBLIC:5432/railway
   ```
4. Utilisez cette URL dans Backend

---

## 🎯 Test Final

Après toutes ces étapes :
1. Vérifiez les logs : plus d'erreur `Can't reach database server`
2. Vous devriez voir : `Prisma DB Push` ou `Backend API running`

