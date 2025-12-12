# Script automatique pour configurer Railway

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuration Automatique Railway" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Generer JWT_SECRET
$jwtSecret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
Write-Host "JWT_SECRET genere: $jwtSecret" -ForegroundColor Green
Write-Host ""

# Verifier si Railway CLI est installe
if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

Write-Host "ETAPES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Connectez-vous a Railway:" -ForegroundColor Cyan
Write-Host "   railway login" -ForegroundColor White
Write-Host "   (Cela ouvrira votre navigateur pour l'authentification)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Liez votre projet:" -ForegroundColor Cyan
Write-Host "   railway link" -ForegroundColor White
Write-Host "   (Selectionnez votre projet Railway)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Une fois lie, executez:" -ForegroundColor Cyan
Write-Host "   .\connect-db.ps1" -ForegroundColor White
Write-Host ""

# Creer le script de connexion DB
$connectScript = @"
# Script pour connecter PostgreSQL au Backend

Write-Host "Connexion de PostgreSQL au Backend..." -ForegroundColor Cyan

# Lister les services
Write-Host "Services disponibles:" -ForegroundColor Yellow
railway status

Write-Host ""
Write-Host "Pour connecter DATABASE_URL automatiquement:" -ForegroundColor Cyan
Write-Host "railway variables set DATABASE_URL=`$(railway variables --service <postgres-service-id> DATABASE_URL)" -ForegroundColor White
Write-Host ""
Write-Host "OU manuellement dans Railway Dashboard:" -ForegroundColor Yellow
Write-Host "1. Backend service -> Variables" -ForegroundColor White
Write-Host "2. Railway devrait proposer DATABASE_URL depuis PostgreSQL" -ForegroundColor White
Write-Host "3. Cliquez sur 'Add'" -ForegroundColor White
Write-Host ""
Write-Host "Variables a ajouter dans Backend:" -ForegroundColor Yellow
Write-Host "DATABASE_URL = <auto depuis PostgreSQL>" -ForegroundColor White
Write-Host "JWT_SECRET = $jwtSecret" -ForegroundColor Green
Write-Host "JWT_EXPIRES_IN = 1d" -ForegroundColor White
Write-Host "PORT = 3001" -ForegroundColor White
Write-Host "NODE_ENV = production" -ForegroundColor White
Write-Host "FRONTEND_URL = <a ajouter apres creation du frontend>" -ForegroundColor White
"@

$connectScript | Out-File -FilePath "connect-db.ps1" -Encoding utf8

Write-Host "Script 'connect-db.ps1' cree!" -ForegroundColor Green
Write-Host ""

