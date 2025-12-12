"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_SERVICES, MOCK_LIGNES, MOCK_POSTES } from "@/lib/mock-data"
import { Phone, CheckCircle2, XCircle, Clock } from "lucide-react"

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; className: string }> = {
    actif: { label: "Actif", className: "bg-green-100 text-green-800" },
    inactif: { label: "Inactif", className: "bg-gray-100 text-gray-800" },
    suspendu: { label: "Suspendu", className: "bg-red-100 text-red-800" },
  }

  const variant = variants[status] || variants.inactif

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variant.className}`}>
      {status === "actif" && <CheckCircle2 className="mr-1 h-3 w-3" />}
      {status === "inactif" && <XCircle className="mr-1 h-3 w-3" />}
      {status === "suspendu" && <Clock className="mr-1 h-3 w-3" />}
      {variant.label}
    </span>
  )
}

export default function ServicesPage() {
  const services = MOCK_SERVICES
  const lignes = MOCK_LIGNES
  const postes = MOCK_POSTES

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mes services</h1>
          <p className="text-muted-foreground">
            Gérez vos services téléphoniques, lignes et postes
          </p>
        </div>

        <Tabs defaultValue="services" className="space-y-4">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="lignes">Lignes</TabsTrigger>
            <TabsTrigger value="postes">Postes</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        {service.name}
                      </CardTitle>
                      <StatusBadge status={service.status} />
                    </div>
                    <CardDescription>
                      Type: {service.type} • ID: {service.id}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {service.details.nombreLignes && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lignes:</span>
                          <span className="font-medium">{service.details.nombreLignes}</span>
                        </div>
                      )}
                      {service.details.nombrePostes && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Postes:</span>
                          <span className="font-medium">{service.details.nombrePostes}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Créé le:</span>
                        <span className="font-medium">
                          {service.createdAt.toLocaleDateString("fr-CA")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lignes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lignes téléphoniques</CardTitle>
                <CardDescription>
                  Liste de toutes vos lignes téléphoniques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lignes.map((ligne) => (
                    <div
                      key={ligne.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{ligne.numero}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Type: {ligne.type} • Service: {ligne.serviceId}
                        </div>
                      </div>
                      <StatusBadge status={ligne.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="postes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Postes téléphoniques</CardTitle>
                <CardDescription>
                  Liste de tous vos postes et extensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {postes.map((poste) => (
                    <div
                      key={poste.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Extension {poste.extension}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {poste.utilisateur || "Non assigné"} • Ligne: {poste.ligneId}
                        </div>
                      </div>
                      <StatusBadge status={poste.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

