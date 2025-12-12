"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, FileText, BarChart3, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    {
      title: "Services actifs",
      value: "12",
      description: "Lignes téléphoniques",
      icon: Phone,
      href: "/services",
    },
    {
      title: "Factures en attente",
      value: "2",
      description: "Total: 1 245,50 $",
      icon: FileText,
      href: "/facturation",
    },
    {
      title: "Appels ce mois",
      value: "1 234",
      description: "+12% vs mois dernier",
      icon: BarChart3,
      href: "/statistiques",
    },
    {
      title: "Tickets ouverts",
      value: "3",
      description: "1 en cours",
      icon: MessageSquare,
      href: "/support",
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de vos services et activités
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <Card className="transition-colors hover:bg-accent">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>
                Vos dernières activités sur le portail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Nouvelle facture disponible</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Ticket #1234 résolu</p>
                    <p className="text-xs text-muted-foreground">Il y a 5 jours</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Service activé : Ligne principale</p>
                    <p className="text-xs text-muted-foreground">Il y a 1 semaine</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>
                Accès rapide aux fonctionnalités principales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/services">
                  <Phone className="mr-2 h-4 w-4" />
                  Gérer mes services
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/facturation">
                  <FileText className="mr-2 h-4 w-4" />
                  Consulter mes factures
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/support">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ouvrir un ticket
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

