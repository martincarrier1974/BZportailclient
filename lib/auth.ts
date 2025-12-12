// Système d'authentification simplifié pour le développement
// À remplacer par NextAuth ou un système d'auth complet en production

import { User } from "@/types"

// Données mockées pour le développement
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@client1.com",
    name: "Admin Client 1",
    role: "admin",
    clientId: "client-1",
  },
  {
    id: "2",
    email: "user@client1.com",
    name: "Utilisateur Client 1",
    role: "user",
    clientId: "client-1",
  },
  {
    id: "3",
    email: "admin@client2.com",
    name: "Admin Client 2",
    role: "admin",
    clientId: "client-2",
  },
]

export async function authenticate(
  email: string,
  password: string
): Promise<User | null> {
  // Pour le développement : accepte n'importe quel mot de passe
  // En production, vérifier le mot de passe avec votre système d'auth
  const user = MOCK_USERS.find((u) => u.email === email)
  return user || null
}

export async function getUserById(id: string): Promise<User | null> {
  return MOCK_USERS.find((u) => u.id === id) || null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return MOCK_USERS.find((u) => u.email === email) || null
}

