# Solution : Erreur "Can't reach database server at postgres.railway.internal:5432"

## 🔴 Problème

Le backend essaie de se connecter à `postgres.railway.internal:5432` mais ne peut pas atteindre le serveur.

## ✅ Solutions

### Solution 1 : Vérifier que les services sont liés (Recommandé)

1. **Dans Railway Dashboard** :
   - Allez dans votre **projet**
   - Vérifiez que **"bd Portail"** (PostgreSQL) et **Backend** sont dans le **même projet**
   - Si non, déplacez-les dans le même projet

2. **Lier les services** :
   - Service **Backend** → **Settings** → **Service Dependencies**
   - Ajoutez **"bd Portail"** comme dépendance
   - OU utilisez la référence de variable automatique

### Solution 2 : Utiliser l'URL publique de PostgreSQL

1. **Service "bd Portail"** → **Variables**
2. **Copiez** la valeur de `DATABASE_URL` (l'URL complète)
3. **Service Backend** → **Variables**
4. **Modifiez** `DATABASE_URL` :
   - Supprimez l'ancienne valeur
   - Collez la nouvelle valeur complète depuis "bd Portail"
   - **Save**

### Solution 3 : Vérifier que PostgreSQL est démarré

1. **Service "bd Portail"** → **Settings**
2. Vérifiez que le service est **"Active"** (pas "Paused")
3. Si paused, cliquez sur **"Start"**

### Solution 4 : Utiliser la référence de service (Meilleure méthode)

1. **Service Backend** → **Variables**
2. **Supprimez** `DATABASE_URL` si elle existe
3. Cliquez sur **"New Variable"**
4. **Name**: `DATABASE_URL`
5. Au lieu de coller une valeur, cherchez l'option :
   - **"Reference from service"** ou
   - **"Add from service"** ou
   - **"Connect to service"**
6. Sélectionnez **"bd Portail"**
7. Sélectionnez `DATABASE_URL`
8. **Save**

Cette méthode crée une référence automatique qui se met à jour.

## 🔍 Vérification

Après correction :
1. **Redeploy** le service Backend
2. Vérifiez les logs : l'erreur `Can't reach database server` ne doit plus apparaître
3. Les migrations doivent s'exécuter avec succès

