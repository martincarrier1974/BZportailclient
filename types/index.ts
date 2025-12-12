// Types pour l'authentification
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  clientId: string // ID du client (tenant)
}

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  createdAt: Date
}

// Types pour les services
export interface Service {
  id: string
  clientId: string
  type: 'telephonie' | 'ligne' | 'poste' | 'autre'
  name: string
  status: 'actif' | 'inactif' | 'suspendu'
  details: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface Ligne {
  id: string
  serviceId: string
  numero: string
  type: 'principale' | 'secondaire'
  status: 'actif' | 'inactif'
}

export interface Poste {
  id: string
  ligneId: string
  extension: string
  utilisateur?: string
  status: 'actif' | 'inactif'
}

// Types pour la facturation
export interface Facture {
  id: string
  clientId: string
  numero: string
  date: Date
  dateEcheance: Date
  montant: number
  statut: 'payee' | 'en_attente' | 'en_retard'
  pdfUrl?: string
  items: FactureItem[]
}

export interface FactureItem {
  description: string
  quantite: number
  prixUnitaire: number
  total: number
}

// Types pour les statistiques
export interface Statistiques {
  clientId: string
  periode: {
    debut: Date
    fin: Date
  }
  appels: {
    total: number
    entrants: number
    sortants: number
    dureeMoyenne: number
  }
  filesAttente?: {
    nombre: number
    tempsMoyen: number
  }
}

// Types pour les tickets de support
export interface Ticket {
  id: string
  clientId: string
  numero: string
  sujet: string
  description: string
  statut: 'ouvert' | 'en_cours' | 'resolu' | 'ferme'
  priorite: 'basse' | 'normale' | 'haute' | 'urgente'
  createdAt: Date
  updatedAt: Date
  createdBy: string
  messages: MessageTicket[]
}

export interface MessageTicket {
  id: string
  ticketId: string
  auteur: string
  contenu: string
  createdAt: Date
  estInterne: boolean
}

