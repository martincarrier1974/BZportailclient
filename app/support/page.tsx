"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_TICKETS } from "@/lib/mock-data"
import { MessageSquare, Plus, CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react"

function StatutBadge({ statut }: { statut: string }) {
  const variants: Record<string, { label: string; icon: any; className: string }> = {
    ouvert: {
      label: "Ouvert",
      icon: Circle,
      className: "bg-blue-100 text-blue-800",
    },
    en_cours: {
      label: "En cours",
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800",
    },
    resolu: {
      label: "Résolu",
      icon: CheckCircle2,
      className: "bg-green-100 text-green-800",
    },
    ferme: {
      label: "Fermé",
      icon: AlertCircle,
      className: "bg-gray-100 text-gray-800",
    },
  }

  const variant = variants[statut] || variants.ouvert
  const Icon = variant.icon

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variant.className}`}
    >
      <Icon className="h-3 w-3" />
      {variant.label}
    </span>
  )
}

function PrioriteBadge({ priorite }: { priorite: string }) {
  const variants: Record<string, { label: string; className: string }> = {
    basse: { label: "Basse", className: "bg-gray-100 text-gray-800" },
    normale: { label: "Normale", className: "bg-blue-100 text-blue-800" },
    haute: { label: "Haute", className: "bg-orange-100 text-orange-800" },
    urgente: { label: "Urgente", className: "bg-red-100 text-red-800" },
  }

  const variant = variants[priorite] || variants.normale

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variant.className}`}
    >
      {variant.label}
    </span>
  )
}

export default function SupportPage() {
  const [tickets] = useState(MOCK_TICKETS)
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [sujet, setSujet] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, on ajouterait le ticket via une API
    alert("Ticket créé avec succès! (Fonctionnalité à implémenter)")
    setShowNewTicket(false)
    setSujet("")
    setDescription("")
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Support</h1>
            <p className="text-muted-foreground">
              Gérez vos tickets de support et contactez notre équipe
            </p>
          </div>
          <Button onClick={() => setShowNewTicket(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau ticket
          </Button>
        </div>

        {showNewTicket && (
          <Card>
            <CardHeader>
              <CardTitle>Créer un nouveau ticket</CardTitle>
              <CardDescription>
                Décrivez votre problème ou votre demande
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sujet">Sujet</Label>
                  <Input
                    id="sujet"
                    value={sujet}
                    onChange={(e) => setSujet(e.target.value)}
                    placeholder="Résumé du problème"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez votre problème en détail..."
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Créer le ticket</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewTicket(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="tous" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tous">Tous ({tickets.length})</TabsTrigger>
            <TabsTrigger value="ouverts">
              Ouverts ({tickets.filter((t) => t.statut === "ouvert").length})
            </TabsTrigger>
            <TabsTrigger value="en_cours">
              En cours ({tickets.filter((t) => t.statut === "en_cours").length})
            </TabsTrigger>
            <TabsTrigger value="resolus">
              Résolus ({tickets.filter((t) => t.statut === "resolu").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tous" className="space-y-4">
            <TicketList tickets={tickets} />
          </TabsContent>
          <TabsContent value="ouverts" className="space-y-4">
            <TicketList tickets={tickets.filter((t) => t.statut === "ouvert")} />
          </TabsContent>
          <TabsContent value="en_cours" className="space-y-4">
            <TicketList tickets={tickets.filter((t) => t.statut === "en_cours")} />
          </TabsContent>
          <TabsContent value="resolus" className="space-y-4">
            <TicketList tickets={tickets.filter((t) => t.statut === "resolu")} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

function TicketList({ tickets }: { tickets: typeof MOCK_TICKETS }) {
  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Aucun ticket trouvé
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{ticket.sujet}</CardTitle>
                </div>
                <CardDescription>
                  #{ticket.numero} • Créé le{" "}
                  {ticket.createdAt.toLocaleDateString("fr-CA")}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <StatutBadge statut={ticket.statut} />
                <PrioriteBadge priorite={ticket.priorite} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">{ticket.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {ticket.messages.length} message(s) • Dernière mise à jour:{" "}
                {ticket.updatedAt.toLocaleDateString("fr-CA")}
              </div>
              <Button variant="outline" size="sm">
                Voir les détails
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

