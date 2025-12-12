# Corriger Start Command dans Railway

## 🔴 Problème

Railway utilise encore l'ancienne commande : `npm run prisma:migrate deploy`

## ✅ Solution : Modifier Start Command dans Railway

### Dans Railway Dashboard :

1. **Service Backend** → **Settings**
2. **Scroll down** jusqu'à **"Deploy"** ou **"Start Command"**
3. **Modifiez** le Start Command pour :
   ```
   npm run prisma:db:push --accept-data-loss && npm run start:prod
   ```
4. **OU** si vous êtes à la racine du projet :
   ```
   cd backend && npm run prisma:db:push --accept-data-loss && npm run start:prod
   ```
5. **Save**

### Alternative : Désactiver Temporairement les Migrations

Si les migrations continuent d'échouer, utilisez temporairement :

```
npm run start:prod
```

Puis exécutez les migrations manuellement plus tard.

---

## 🔍 Vérification

Après modification :
1. Railway redéploiera automatiquement
2. Vérifiez les logs : vous devriez voir `Prisma DB Push` au lieu de `Prisma Migrate`
3. Le serveur devrait démarrer sans erreur

