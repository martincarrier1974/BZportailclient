# 🔍 Vérification Configuration Railway

## ⚠️ PROBLÈME : Railway ne détecte pas les changements

Si Railway ne détecte pas les changements, voici ce qu'il faut vérifier :

## ✅ 1. Vérifier le Root Directory sur Railway

**IMPORTANT** : Le Root Directory doit être `backend` (pas la racine !)

1. Railway → Votre Service → **Settings** → **Source**
2. Vérifiez que **Root Directory** = `backend`
3. Si ce n'est pas le cas, changez-le et redéployez

## ✅ 2. Vérifier que nixpacks.toml est détecté

Railway devrait détecter automatiquement `backend/nixpacks.toml` si le Root Directory est `backend`.

**Si Railway n'utilise pas nixpacks.toml** :
- Vérifiez les logs de build Railway
- Cherchez "Using Nixpacks" dans les logs
- Si vous voyez "Using Dockerfile", Railway n'a pas détecté nixpacks.toml

## ✅ 3. Forcer un nouveau déploiement

1. Railway → Votre Service → **Deployments**
2. Cliquez sur **"Redeploy"** sur le dernier déploiement
3. Ou créez un commit vide pour forcer un rebuild :
   ```bash
   git commit --allow-empty -m "Force Railway rebuild"
   git push
   ```

## ✅ 4. Vérifier les logs Railway

Dans Railway → Deployments → Logs, vous devriez voir :

```
[phases.setup] Installing nix packages...
[phases.install] Installing dependencies...
[phases.build] Building frontend...
[phases.build] Building backend...
[start] Starting application...
```

Si vous ne voyez pas ces étapes, Railway n'utilise pas nixpacks.toml.

## ✅ 5. Solution : Supprimer et recréer le service

Si rien ne fonctionne :

1. **Sauvegarder les variables d'environnement** :
   - Railway → Settings → Variables
   - Copiez toutes les variables

2. **Supprimer le service** :
   - Railway → Settings → Danger Zone → Delete Service

3. **Recréer le service** :
   - Railway → "+ New" → "GitHub Repo"
   - Sélectionnez votre repo
   - **Root Directory** : `backend` ⚠️ IMPORTANT
   - Railway devrait détecter `nixpacks.toml` automatiquement

4. **Remettre les variables** :
   - Railway → Settings → Variables
   - Ajoutez toutes les variables sauvegardées

5. **Générer l'URL publique** :
   - Settings → Networking → Generate Domain

## 🔍 Vérification des fichiers dans Git

Tous ces fichiers DOIVENT être dans git :

```bash
✅ backend/nixpacks.toml
✅ backend/railway.json
✅ backend/package.json (avec script build modifié)
✅ backend/scripts/build-frontend.js
✅ backend/src/main.ts (avec useStaticAssets)
✅ vite-frontend/ (tout le dossier)
```

Vérifiez avec :
```bash
git ls-files | grep -E "(nixpacks|railway|build-frontend|main.ts)"
```

## 🚨 Problème courant : Root Directory incorrect

**Si Root Directory = racine (vide)** :
- Railway cherche `nixpacks.toml` à la racine
- Il ne le trouve pas dans `backend/nixpacks.toml`
- Railway utilise Dockerfile ou détection automatique (qui ne fonctionne pas)

**Solution** : Changez Root Directory = `backend`

## 📝 Checklist

- [ ] Root Directory = `backend` sur Railway
- [ ] `backend/nixpacks.toml` existe et est dans git
- [ ] `backend/railway.json` existe et est dans git
- [ ] Tous les fichiers modifiés sont commités et poussés
- [ ] Railway montre "Using Nixpacks" dans les logs
- [ ] Les logs montrent le build du frontend puis du backend

