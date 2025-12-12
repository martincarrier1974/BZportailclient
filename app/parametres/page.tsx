"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { User } from "@/types"

export default function ParametresPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Erreur lors de la récupération de l'utilisateur", e)
      }
    }
  }, [])

  if (!user) {
    return (
      <MainLayout>
        <div>Chargement...</div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez vos préférences et vos informations de compte
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
              <CardDescription>
                Vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" defaultValue={user.name} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Input id="role" defaultValue={user.role} disabled />
              </div>
              <Button disabled>Enregistrer les modifications</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Préférences</CardTitle>
              <CardDescription>
                Personnalisez votre expérience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Les préférences seront disponibles dans une future version.
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations système</CardTitle>
            <CardDescription>
              Détails techniques de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>ID Client</Label>
              <div className="rounded-md border bg-muted p-2 font-mono text-sm">
                {user.clientId}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>ID Utilisateur</Label>
              <div className="rounded-md border bg-muted p-2 font-mono text-sm">
                {user.id}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

