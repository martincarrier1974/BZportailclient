"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import api from "@/lib/api"
import { FreePBXInstance, PBXStatus } from "@/types"
import { Server, Plus, Edit, Trash2, Activity } from "lucide-react"

function StatusBadge({ status }: { status: PBXStatus }) {
  const variants = {
    CONNECTED: "bg-green-100 text-green-800",
    DISCONNECTED: "bg-gray-100 text-gray-800",
    ERROR: "bg-red-100 text-red-800",
  }

  return (
    <Badge className={variants[status]}>
      {status}
    </Badge>
  )
}

export default function PBXPage() {
  const [pbxInstances, setPbxInstances] = useState<FreePBXInstance[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    loadPBXInstances()
  }, [router])

  const loadPBXInstances = async () => {
    try {
      const response = await api.get("/pbx-instances")
      setPbxInstances(response.data)
    } catch (error) {
      console.error("Error loading PBX instances:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleHealthCheck = async (id: string) => {
    try {
      await api.post(`/pbx-instances/${id}/health-check`)
      loadPBXInstances()
    } catch (error) {
      console.error("Error checking health:", error)
      alert("Erreur lors du health check")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette instance PBX?")) return

    try {
      await api.delete(`/pbx-instances/${id}`)
      loadPBXInstances()
    } catch (error) {
      console.error("Error deleting PBX instance:", error)
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
          <h1 className="text-3xl font-bold">Instances FreePBX</h1>
          <p className="text-muted-foreground">
            Gestion des serveurs FreePBX connectés
          </p>
        </div>
        <Button onClick={() => router.push("/pbx/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle instance
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pbxInstances.map((pbx) => (
          <Card key={pbx.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Server className="h-5 w-5 text-primary" />
                <StatusBadge status={pbx.status} />
              </div>
              <CardTitle>{pbx.name}</CardTitle>
              <CardDescription>
                {pbx.tenant?.name || "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Host: </span>
                  {pbx.host}:{pbx.port || 443}
                </div>
                <div>
                  <span className="text-muted-foreground">Type API: </span>
                  {pbx.apiType}
                </div>
                {pbx.lastHealthCheck && (
                  <div>
                    <span className="text-muted-foreground">Dernier check: </span>
                    {new Date(pbx.lastHealthCheck).toLocaleString("fr-CA")}
                  </div>
                )}
                {pbx.notes && (
                  <div className="pt-2 border-t">
                    <span className="text-muted-foreground text-xs">{pbx.notes}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleHealthCheck(pbx.id)}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Health Check
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/pbx/${pbx.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(pbx.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pbxInstances.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Aucune instance PBX trouvée. Ajoutez votre première instance FreePBX pour commencer.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

