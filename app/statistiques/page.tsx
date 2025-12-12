"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_STATISTIQUES } from "@/lib/mock-data"
import { Phone, PhoneIncoming, PhoneOutgoing, Clock, Users } from "lucide-react"

export default function StatistiquesPage() {
  const stats = MOCK_STATISTIQUES

  const formatDuree = (secondes: number) => {
    const minutes = Math.floor(secondes / 60)
    const secs = secondes % 60
    return `${minutes}m ${secs}s`
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Statistiques</h1>
          <p className="text-muted-foreground">
            Consultez les statistiques d'utilisation de vos services
          </p>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Période</CardTitle>
              <CardDescription>
                {stats.periode.debut.toLocaleDateString("fr-CA")} -{" "}
                {stats.periode.fin.toLocaleDateString("fr-CA")}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total d'appels
                </CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.appels.total.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Appels ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Appels entrants
                </CardTitle>
                <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.appels.entrants.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.appels.entrants / stats.appels.total) * 100)}% du total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Appels sortants
                </CardTitle>
                <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.appels.sortants.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.appels.sortants / stats.appels.total) * 100)}% du total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Durée moyenne
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatDuree(stats.appels.dureeMoyenne)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Par appel
                </p>
              </CardContent>
            </Card>
          </div>

          {stats.filesAttente && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Files d'attente
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.filesAttente.nombre}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Appels en file d'attente
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Temps d'attente moyen
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuree(stats.filesAttente.tempsMoyen)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Temps moyen en file
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les statistiques sont mises à jour quotidiennement. 
                Pour des données en temps réel ou des rapports détaillés, 
                veuillez contacter le support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

