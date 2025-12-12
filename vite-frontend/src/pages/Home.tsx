import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Server, User } from 'lucide-react'

interface UserData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: string
}

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userStr))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">BZ Telecom Admin</h1>
              <p className="text-sm text-muted-foreground">Portail d'administration</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-2">
              Bienvenue !
            </h2>
            <p className="text-muted-foreground">
              Vous êtes connecté avec succès au portail d'administration.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-md bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Rôle: {user.role}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-md bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground">
                🎉 Votre système d'authentification fonctionne parfaitement !
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Vous pouvez maintenant développer les fonctionnalités de votre portail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

