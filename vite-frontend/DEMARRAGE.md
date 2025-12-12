# 🚀 Guide de Démarrage - Vite Frontend

## ✅ Projet créé avec succès !

Votre nouveau frontend Vite + React + Tailwind est prêt.

## 📦 Installation

Les dépendances sont déjà installées. Si vous devez réinstaller :

```bash
cd vite-frontend
npm install
```

## 🎯 Démarrage

### 1. Démarrer le backend (dans un terminal séparé)

```bash
cd backend
npm run start:dev
```

Le backend doit être accessible sur `http://localhost:3001`

### 2. Démarrer le frontend Vite

```bash
cd vite-frontend
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 🔐 Connexion

Une fois les deux serveurs démarrés :

1. Ouvrez `http://localhost:3000` dans votre navigateur
2. Connectez-vous avec :
   - **Email**: `martin.carrier@bzinc.ca`
   - **Mot de passe**: `$$Banane007`

## ✨ Fonctionnalités

- ✅ Page de login fonctionnelle
- ✅ Authentification JWT avec le backend
- ✅ Page d'accueil après connexion
- ✅ Protection des routes (redirection si non connecté)
- ✅ Déconnexion
- ✅ Design moderne avec Tailwind CSS (même style que l'ancien)

## 🛠️ Structure du projet

```
vite-frontend/
├── src/
│   ├── pages/
│   │   ├── Login.tsx      # Page de connexion
│   │   └── Home.tsx        # Page d'accueil
│   ├── components/
│   │   └── ProtectedRoute.tsx  # Protection des routes
│   ├── lib/
│   │   └── api.ts          # Configuration axios
│   ├── App.tsx             # Routeur principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles Tailwind
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Personnalisation

Les couleurs et le style sont configurés dans :
- `src/index.css` - Variables CSS
- `tailwind.config.js` - Configuration Tailwind

## 📝 Prochaines étapes

1. Assurez-vous que le backend est démarré
2. Créez les tables dans la base de données Railway (si pas déjà fait)
3. Créez l'utilisateur martin.carrier@bzinc.ca dans la DB
4. Démarrez le frontend Vite
5. Testez la connexion !

