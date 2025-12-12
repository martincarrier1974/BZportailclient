// Données mockées pour le développement
import { Service, Ligne, Poste, Facture, Statistiques, Ticket } from "@/types"

export const MOCK_SERVICES: Service[] = [
  {
    id: "svc-1",
    clientId: "client-1",
    type: "telephonie",
    name: "Service téléphonique principal",
    status: "actif",
    details: {
      nombreLignes: 5,
      nombrePostes: 12,
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "svc-2",
    clientId: "client-1",
    type: "ligne",
    name: "Ligne secondaire",
    status: "actif",
    details: {},
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
]

export const MOCK_LIGNES: Ligne[] = [
  {
    id: "ligne-1",
    serviceId: "svc-1",
    numero: "418-555-0100",
    type: "principale",
    status: "actif",
  },
  {
    id: "ligne-2",
    serviceId: "svc-1",
    numero: "418-555-0101",
    type: "secondaire",
    status: "actif",
  },
  {
    id: "ligne-3",
    serviceId: "svc-1",
    numero: "418-555-0102",
    type: "secondaire",
    status: "actif",
  },
]

export const MOCK_POSTES: Poste[] = [
  {
    id: "poste-1",
    ligneId: "ligne-1",
    extension: "100",
    utilisateur: "Jean Dupont",
    status: "actif",
  },
  {
    id: "poste-2",
    ligneId: "ligne-1",
    extension: "101",
    utilisateur: "Marie Martin",
    status: "actif",
  },
  {
    id: "poste-3",
    ligneId: "ligne-2",
    extension: "200",
    utilisateur: "Pierre Lavoie",
    status: "actif",
  },
]

export const MOCK_FACTURES: Facture[] = [
  {
    id: "fact-1",
    clientId: "client-1",
    numero: "FAC-2024-001",
    date: new Date("2024-03-01"),
    dateEcheance: new Date("2024-03-31"),
    montant: 1245.5,
    statut: "en_attente",
    pdfUrl: "#",
    items: [
      {
        description: "Service téléphonique - Mars 2024",
        quantite: 1,
        prixUnitaire: 1200,
        total: 1200,
      },
      {
        description: "Frais de configuration",
        quantite: 1,
        prixUnitaire: 45.5,
        total: 45.5,
      },
    ],
  },
  {
    id: "fact-2",
    clientId: "client-1",
    numero: "FAC-2024-002",
    date: new Date("2024-02-01"),
    dateEcheance: new Date("2024-02-28"),
    montant: 1200,
    statut: "payee",
    pdfUrl: "#",
    items: [
      {
        description: "Service téléphonique - Février 2024",
        quantite: 1,
        prixUnitaire: 1200,
        total: 1200,
      },
    ],
  },
]

export const MOCK_STATISTIQUES: Statistiques = {
  clientId: "client-1",
  periode: {
    debut: new Date("2024-03-01"),
    fin: new Date("2024-03-31"),
  },
  appels: {
    total: 1234,
    entrants: 856,
    sortants: 378,
    dureeMoyenne: 245, // secondes
  },
  filesAttente: {
    nombre: 45,
    tempsMoyen: 120, // secondes
  },
}

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "ticket-1",
    clientId: "client-1",
    numero: "TKT-2024-001",
    sujet: "Problème de qualité audio",
    description: "La qualité audio est mauvaise lors des appels sortants",
    statut: "en_cours",
    priorite: "normale",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-18"),
    createdBy: "user-1",
    messages: [
      {
        id: "msg-1",
        ticketId: "ticket-1",
        auteur: "Jean Dupont",
        contenu: "La qualité audio est mauvaise lors des appels sortants",
        createdAt: new Date("2024-03-15"),
        estInterne: false,
      },
      {
        id: "msg-2",
        ticketId: "ticket-1",
        auteur: "Support BZ Telecom",
        contenu: "Nous avons reçu votre demande. Un technicien va vérifier votre configuration.",
        createdAt: new Date("2024-03-16"),
        estInterne: false,
      },
    ],
  },
  {
    id: "ticket-2",
    clientId: "client-1",
    numero: "TKT-2024-002",
    sujet: "Demande d'ajout de ligne",
    description: "Nous souhaitons ajouter une nouvelle ligne téléphonique",
    statut: "ouvert",
    priorite: "basse",
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
    createdBy: "user-1",
    messages: [
      {
        id: "msg-3",
        ticketId: "ticket-2",
        auteur: "Marie Martin",
        contenu: "Nous souhaitons ajouter une nouvelle ligne téléphonique",
        createdAt: new Date("2024-03-20"),
        estInterne: false,
      },
    ],
  },
  {
    id: "ticket-3",
    clientId: "client-1",
    numero: "TKT-2024-003",
    sujet: "Question sur la facturation",
    description: "Je ne comprends pas un élément de ma dernière facture",
    statut: "resolu",
    priorite: "basse",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-12"),
    createdBy: "user-1",
    messages: [
      {
        id: "msg-4",
        ticketId: "ticket-3",
        auteur: "Jean Dupont",
        contenu: "Je ne comprends pas un élément de ma dernière facture",
        createdAt: new Date("2024-03-10"),
        estInterne: false,
      },
      {
        id: "msg-5",
        ticketId: "ticket-3",
        auteur: "Support BZ Telecom",
        contenu: "Nous avons clarifié votre facture. Le montant correspond aux services actifs.",
        createdAt: new Date("2024-03-11"),
        estInterne: false,
      },
    ],
  },
]

