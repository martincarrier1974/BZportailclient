# Solution Rapide - Erreur Connexion PostgreSQL

## ⚡ Solution en 3 Étapes

### Étape 1 : Vérifier que "bd Portail" est démarré

Dans Railway :
- Service **"bd Portail"** → Vérifiez qu'il est **"Active"** (pas "Paused")
- Si paused, cliquez sur **"Start"**

### Étape 2 : Reconfigurer DATABASE_URL avec référence de service

1. **Service Backend** → **Variables**
2. **Supprimez** `DATABASE_URL` (si elle existe)
3. Cliquez sur **"New Variable"**
4. **Name**: `DATABASE_URL`
5. **Cherchez l'option "Reference" ou "Add from service"**
   - Si vous voyez cette option, utilisez-la pour référencer "bd Portail"
6. **OU** manuellement :
   - Allez dans **"bd Portail"** → **Variables**
   - **Copiez** la valeur complète de `DATABASE_URL`
   - Retournez dans **Backend** → **Variables**
   - **Collez** la valeur
7. **Save**

### Étape 3 : Vérifier que les services sont dans le même projet

- Les deux services doivent être dans le **même projet Railway**
- Si non, déplacez-les dans le même projet

### Étape 4 : Redéployer

- Railway redéploiera automatiquement
- OU cliquez sur **"Redeploy"** dans le service Backend

---

## ✅ Vérification

Dans les logs du Backend, vous devriez voir :
- ✅ `Prisma Migrate applied` (au lieu de l'erreur)
- ✅ `Backend API running on port 3001`

