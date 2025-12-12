# Portail Client BZ Telecom

Portail web moderne pour les clients PME de BZ Telecom permettant la gestion de leurs services de téléphonie IP hébergée.

## 🚀 Fonctionnalités

- **Authentification sécurisée** : Système de connexion multi-tenant
- **Gestion des services** : Consultation et gestion des services téléphoniques, lignes et postes
- **Facturation** : Consultation des factures et suivi des paiements
- **Statistiques** : Visualisation des statistiques d'appels et d'utilisation
- **Support** : Création et suivi des tickets de support

## 🛠️ Technologies

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Composants UI** : shadcn/ui (Radix UI)
- **Authentification** : Système simplifié (à remplacer par NextAuth en production)

## 📦 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 🔐 Comptes de démonstration

Pour tester l'application, utilisez l'un de ces comptes :

- **Admin Client 1** : `admin@client1.com` (n'importe quel mot de passe)
- **Utilisateur Client 1** : `user@client1.com` (n'importe quel mot de passe)
- **Admin Client 2** : `admin@client2.com` (n'importe quel mot de passe)

## 📁 Structure du projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── dashboard/         # Tableau de bord
│   ├── services/          # Gestion des services
│   ├── facturation/       # Factures
│   ├── statistiques/      # Statistiques
│   ├── support/           # Tickets de support
│   ├── parametres/        # Paramètres utilisateur
│   └── login/             # Page de connexion
├── components/            # Composants React
│   ├── ui/                # Composants UI (shadcn/ui)
│   └── layout/            # Layout et navigation
├── lib/                   # Utilitaires et helpers
│   ├── auth.ts           # Authentification (mock)
│   └── mock-data.ts      # Données de démonstration
└── types/                 # Types TypeScript
    └── index.ts          # Définitions de types
```

## 🔒 Architecture multi-tenant

Le système est conçu pour être multi-tenant :
- Chaque utilisateur est associé à un `clientId`
- Les données sont filtrées automatiquement par client
- L'isolation des données est gérée au niveau de l'application

## 🚧 Prochaines étapes

- [ ] Intégrer NextAuth pour l'authentification réelle
- [ ] Connecter les APIs backend pour les données réelles
- [ ] Ajouter la gestion des permissions utilisateur
- [ ] Implémenter les notifications en temps réel
- [ ] Ajouter des tests unitaires et d'intégration
- [ ] Optimiser les performances et le SEO

## 📝 Notes

- Le système d'authentification actuel est simplifié pour le développement
- Les données sont mockées dans `lib/mock-data.ts`
- En production, remplacer par des appels API réels
- L'application est prête à être connectée à un backend REST ou GraphQL

## 📄 Licence

Propriétaire - BZ Telecom

