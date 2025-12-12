# Script automatique pour connecter PostgreSQL "bd Portail" au Backend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuration Automatique Railway" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifier Railway CLI
if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "Installation Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

Write-Host "ETAPES AUTOMATIQUES:" -ForegroundColor Green
Write-Host ""

# Generer JWT_SECRET
$jwtSecret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
Write-Host "JWT_SECRET genere: $jwtSecret" -ForegroundColor Green
Write-Host ""

Write-Host "1. Authentification Railway..." -ForegroundColor Cyan
Write-Host "   Executez: railway login" -ForegroundColor White
Write-Host "   (Appuyez sur Y pour ouvrir le navigateur)" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Lier le projet..." -ForegroundColor Cyan
Write-Host "   Executez: railway link" -ForegroundColor White
Write-Host "   (Selectionnez votre projet)" -ForegroundColor Gray
Write-Host ""

Write-Host "3. Une fois authentifie et lie, executez:" -ForegroundColor Cyan
Write-Host "   .\connect-bd-portail.ps1" -ForegroundColor White
Write-Host ""

# Creer le script de connexion specifique
$connectScript = @"
# Connexion automatique de "bd Portail" au Backend

Write-Host "Recherche du service PostgreSQL 'bd Portail'..." -ForegroundColor Cyan

# Lister tous les services
`$services = railway status --json | ConvertFrom-Json

# Trouver PostgreSQL
`$postgresService = `$services.services | Where-Object { `$_.name -like "*Portail*" -or `$_.name -like "*postgres*" -or `$_.name -like "*PostgreSQL*" }

if (`$postgresService) {
    Write-Host "Service PostgreSQL trouve: `$(`$postgresService.name)" -ForegroundColor Green
    
    # Recuperer DATABASE_URL
    Write-Host "Recuperation de DATABASE_URL..." -ForegroundColor Cyan
    `$dbUrl = railway variables --service `$postgresService.id DATABASE_URL
    
    if (`$dbUrl) {
        Write-Host "DATABASE_URL recupere!" -ForegroundColor Green
        
        # Trouver le service Backend
        `$backendService = `$services.services | Where-Object { `$_.name -like "*backend*" -or `$_.name -like "*Backend*" }
        
        if (`$backendService) {
            Write-Host "Service Backend trouve: `$(`$backendService.name)" -ForegroundColor Green
            
            # Ajouter DATABASE_URL au Backend
            Write-Host "Ajout de DATABASE_URL au Backend..." -ForegroundColor Cyan
            railway variables set DATABASE_URL=`$dbUrl --service `$backendService.id
            
            Write-Host "Ajout des autres variables..." -ForegroundColor Cyan
            railway variables set JWT_SECRET=LqjTgJVbq70OBBU3WAWhiNiJLULFAejSpiUEchozIGI= --service `$backendService.id
            railway variables set JWT_EXPIRES_IN=1d --service `$backendService.id
            railway variables set PORT=3001 --service `$backendService.id
            railway variables set NODE_ENV=production --service `$backendService.id
            
            Write-Host ""
            Write-Host "Configuration terminee!" -ForegroundColor Green
            Write-Host "Railway va redepoyer automatiquement." -ForegroundColor Yellow
        } else {
            Write-Host "Service Backend non trouve. Verifiez le nom du service." -ForegroundColor Red
        }
    } else {
        Write-Host "Impossible de recuperer DATABASE_URL." -ForegroundColor Red
    }
} else {
    Write-Host "Service PostgreSQL 'bd Portail' non trouve." -ForegroundColor Red
    Write-Host "Services disponibles:" -ForegroundColor Yellow
    railway status
}
"@

$connectScript | Out-File -FilePath "connect-bd-portail.ps1" -Encoding utf8

Write-Host "Script 'connect-bd-portail.ps1' cree!" -ForegroundColor Green
Write-Host ""
Write-Host "PROCHAINES ETAPES:" -ForegroundColor Yellow
Write-Host "1. railway login" -ForegroundColor White
Write-Host "2. railway link" -ForegroundColor White
Write-Host "3. .\connect-bd-portail.ps1" -ForegroundColor White
Write-Host ""

