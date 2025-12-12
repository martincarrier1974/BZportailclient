# Comment Obtenir l'URL Publique de PostgreSQL dans Railway

## 🎯 Objectif : Remplacer l'URL interne par l'URL publique

### Étape 1 : Obtenir l'URL Publique depuis "bd Portail"

**Option A : Via les Variables (Recommandé)**

1. **Service "bd Portail"** → **Variables**
2. **Trouvez** `DATABASE_URL`
3. **Cliquez dessus** pour voir la valeur complète
4. **Copiez** toute la valeur
5. Cette valeur devrait contenir un hostname public (ex: `containers-us-west-xxx.railway.app`)

**Option B : Via Networking (Si Option A ne fonctionne pas)**

1. **Service "bd Portail"** → **Settings** → **Networking**
2. **Generate Domain** (si pas déjà fait)
3. Vous obtiendrez une URL publique comme : `xxx.railway.app`
4. **Notez** cette URL

### Étape 2 : Construire l'URL Complète (Si Option B)

Si vous avez seulement l'URL publique du domaine, vous devez construire l'URL complète :

Format : `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

1. **Service "bd Portail"** → **Variables**
2. Notez :
   - `PGUSER` ou `POSTGRES_USER` (généralement `postgres`)
   - `PGPASSWORD` ou `POSTGRES_PASSWORD`
   - `PGDATABASE` ou `POSTGRES_DB`
   - Port (généralement `5432`)
3. **Construisez** l'URL :
   ```
   postgresql://postgres:PASSWORD@xxx.railway.app:5432/railway
   ```

### Étape 3 : Remplacer dans Backend

1. **Service Backend** → **Variables**
2. **Trouvez** `DATABASE_URL`
3. **Cliquez pour modifier**
4. **Supprimez** l'ancienne valeur (celle avec `postgres.railway.internal`)
5. **Collez** la nouvelle valeur (URL publique complète)
6. **Save**

### Étape 4 : Vérifier le Format

L'URL doit ressembler à :
```
postgresql://postgres:VOTRE_PASSWORD@containers-us-west-xxx.railway.app:5432/railway
```

**PAS** :
```
postgresql://postgres:password@postgres.railway.internal:5432/railway
```

---

## 🔍 Comment Identifier l'URL Publique

L'URL publique contient généralement :
- `containers-` ou `*.railway.app` dans le hostname
- **PAS** `railway.internal`

L'URL interne contient :
- `postgres.railway.internal` ou `*.railway.internal`

---

## ✅ Vérification

Après modification :
1. **Save** la variable
2. Railway redéploiera automatiquement
3. Vérifiez les logs : l'erreur `Can't reach database server at postgres.railway.internal` ne doit plus apparaître

