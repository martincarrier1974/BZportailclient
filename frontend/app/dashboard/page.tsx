"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Server, Building2, Activity } from "lucide-react"
import api from "@/lib/api"
import { User, Tenant, FreePBXInstance } from "@/types"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [pbxInstances, setPbxInstances] = useState<FreePBXInstance[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const loadData = async () => {
      try {
        const [userRes, tenantsRes, pbxRes] = await Promise.all([
          api.get("/users/me"),
          api.get("/tenants"),
          api.get("/pbx-instances"),
        ])

        setUser(userRes.data)
        setTenants(Array.isArray(tenantsRes.data) ? tenantsRes.data : [tenantsRes.data])
        setPbxInstances(pbxRes.data)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

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

  const connectedPbx = pbxInstances.filter((p) => p.status === "CONNECTED").length
  const totalTenants = tenants.length
  const totalPbx = pbxInstances.length

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble du portail d'administration
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              Tenants actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instances PBX</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPbx}</div>
            <p className="text-xs text-muted-foreground">
              {connectedPbx} connectées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              À implémenter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connectedPbx > 0 ? "✅" : "⚠️"}
            </div>
            <p className="text-xs text-muted-foreground">
              Système opérationnel
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Clients récents</CardTitle>
            <CardDescription>
              Liste des derniers clients ajoutés
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tenants.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun client</p>
            ) : (
              <div className="space-y-2">
                {tenants.slice(0, 5).map((tenant) => (
                  <div key={tenant.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{tenant.name}</p>
                      <p className="text-xs text-muted-foreground">{tenant.companyName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instances PBX</CardTitle>
            <CardDescription>
              Statut des serveurs FreePBX
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pbxInstances.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune instance PBX</p>
            ) : (
              <div className="space-y-2">
                {pbxInstances.slice(0, 5).map((pbx) => (
                  <div key={pbx.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{pbx.name}</p>
                      <p className="text-xs text-muted-foreground">{pbx.host}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        pbx.status === "CONNECTED"
                          ? "bg-green-100 text-green-800"
                          : pbx.status === "ERROR"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {pbx.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

