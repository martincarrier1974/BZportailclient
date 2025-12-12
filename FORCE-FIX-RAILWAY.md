# 🔴 Solution URGENTE - Railway utilise encore l'ancienne config

## Problème

Railway utilise encore `prisma migrate dev deploy` et l'URL interne `postgres.railway.internal`.

## ✅ Solution en 3 Étapes

### Étape 1 : Vérifier et Forcer la Mise à Jour de DATABASE_URL

1. **Service Backend** → **Variables**
2. **Trouvez** `DATABASE_URL`
3. **Supprimez-la complètement**
4. **Attendez 10 secondes**
5. **New Variable** → **Name**: `DATABASE_URL`
6. **Allez dans "bd Portail"** → **Variables** → **Copiez** la valeur complète
7. **Collez** dans Backend → **Save**

**IMPORTANT** : La valeur doit contenir un hostname PUBLIC (ex: `containers-xxx.railway.app`), PAS `railway.internal`

### Étape 2 : Vérifier Start Command

1. **Service Backend** → **Settings**
2. **Start Command** doit être :
   ```
   npm run prisma:db:push --accept-data-loss && npm run start:prod
   ```
3. Si ce n'est pas ça, **modifiez-le** et **Save**

### Étape 3 : Forcer un Redéploiement Complet

1. **Service Backend** → **Settings**
2. **Delete Service** (ou **Pause** puis **Resume**)
3. **OU** **Redeploy** → **Clear Build Cache** → **Redeploy**

---

## 🔍 Vérification de DATABASE_URL

Dans Backend → Variables → `DATABASE_URL` :

**✅ CORRECT (URL publique) :**
```
postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway
```

**❌ INCORRECT (URL interne) :**
```
postgresql://postgres:password@postgres.railway.internal:5432/railway
```

---

## ⚡ Alternative : Désactiver Temporairement les Migrations

Si rien ne fonctionne, modifiez le **Start Command** pour ignorer les migrations :

```
npm run start:prod
```

Puis exécutez les migrations manuellement plus tard via Railway CLI ou l'interface.

