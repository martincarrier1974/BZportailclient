"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import api from "@/lib/api"
import { Tenant } from "@/types"
import { Building2, Plus, Edit, Trash2 } from "lucide-react"

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    loadTenants()
  }, [router])

  const loadTenants = async () => {
    try {
      const response = await api.get("/tenants")
      setTenants(Array.isArray(response.data) ? response.data : [response.data])
    } catch (error) {
      console.error("Error loading tenants:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce client?")) return

    try {
      await api.delete(`/tenants/${id}`)
      loadTenants()
    } catch (error) {
      console.error("Error deleting tenant:", error)
      alert("Erreur lors de la suppression")
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Gestion des clients (tenants)
          </p>
        </div>
        <Button onClick={() => router.push("/tenants/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tenants.map((tenant) => (
          <Card key={tenant.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Building2 className="h-5 w-5 text-primary" />
                <Badge variant={tenant.isActive ? "default" : "secondary"}>
                  {tenant.isActive ? "Actif" : "Inactif"}
                </Badge>
              </div>
              <CardTitle>{tenant.name}</CardTitle>
              <CardDescription>{tenant.companyName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {tenant.contactEmail && (
                  <div>
                    <span className="text-muted-foreground">Email: </span>
                    {tenant.contactEmail}
                  </div>
                )}
                {tenant.contactPhone && (
                  <div>
                    <span className="text-muted-foreground">Téléphone: </span>
                    {tenant.contactPhone}
                  </div>
                )}
                {tenant._count && (
                  <div className="pt-2 border-t">
                    <span className="text-muted-foreground">
                      {tenant._count.users} utilisateur(s), {tenant._count.pbxInstances} PBX
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/tenants/${tenant.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(tenant.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tenants.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Aucun client trouvé. Créez votre premier client pour commencer.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

