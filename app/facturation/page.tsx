"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_FACTURES } from "@/lib/mock-data"
import { FileText, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react"

function StatutBadge({ statut }: { statut: string }) {
  const variants: Record<string, { label: string; icon: any; className: string }> = {
    payee: {
      label: "Payée",
      icon: CheckCircle2,
      className: "bg-green-100 text-green-800",
    },
    en_attente: {
      label: "En attente",
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800",
    },
    en_retard: {
      label: "En retard",
      icon: AlertCircle,
      className: "bg-red-100 text-red-800",
    },
  }

  const variant = variants[statut] || variants.en_attente
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

export default function FacturationPage() {
  const factures = MOCK_FACTURES

  const totalEnAttente = factures
    .filter((f) => f.statut === "en_attente")
    .reduce((sum, f) => sum + f.montant, 0)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Facturation</h1>
          <p className="text-muted-foreground">
            Consultez vos factures et suivez vos paiements
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total en attente</CardDescription>
              <CardTitle className="text-2xl">
                {totalEnAttente.toLocaleString("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                })}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Factures payées ce mois</CardDescription>
              <CardTitle className="text-2xl">
                {factures.filter((f) => f.statut === "payee").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total factures</CardDescription>
              <CardTitle className="text-2xl">{factures.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historique des factures</CardTitle>
            <CardDescription>
              Liste de toutes vos factures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {factures.map((facture) => (
                <div
                  key={facture.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{facture.numero}</span>
                        <StatutBadge statut={facture.statut} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Émise le {facture.date.toLocaleDateString("fr-CA")} • 
                        Échéance: {facture.dateEcheance.toLocaleDateString("fr-CA")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {facture.montant.toLocaleString("fr-CA", {
                          style: "currency",
                          currency: "CAD",
                        })}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

