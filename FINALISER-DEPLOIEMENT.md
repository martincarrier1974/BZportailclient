# Finaliser le Déploiement - Checklist

## ✅ Étape 1 : Vérifier le Backend

Dans Railway → Backend → Deploy Logs :
- [ ] Pas d'erreur `Can't reach database server`
- [ ] Voir `Backend API running`
- [ ] Status = "Active" (pas "Crashed")

## ✅ Étape 2 : Obtenir l'URL du Backend

1. Backend → Settings → Networking
2. Generate Domain (si pas déjà fait)
3. Notez l'URL : `https://xxx.up.railway.app`

## ✅ Étape 3 : Configurer le Frontend

1. Frontend → Variables
2. Ajoutez/modifiez :
   ```
   NEXT_PUBLIC_API_URL = https://votre-backend-url.up.railway.app/api
   NODE_ENV = production
   ```
3. Vérifiez Root Directory = `frontend`

## ✅ Étape 4 : Seed la Base de Données

1. Backend → Settings → Deploy → Run Command
2. Commande : `npm run prisma:seed`
3. Vérifiez les logs pour confirmer

## ✅ Étape 5 : Tester

1. Ouvrez l'URL du Frontend
2. Connectez-vous : `admin@bztelecom.com` / `admin123`
3. Vérifiez que le dashboard s'affiche

## 🔐 Sécurité (Important!)

Après le premier test :
- [ ] Changez les mots de passe par défaut
- [ ] Vérifiez que JWT_SECRET est fort
- [ ] Configurez un domaine personnalisé (optionnel)

