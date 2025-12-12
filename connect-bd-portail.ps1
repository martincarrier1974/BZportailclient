# Connexion automatique de "bd Portail" au Backend

Write-Host "Recherche du service PostgreSQL 'bd Portail'..." -ForegroundColor Cyan

# Lister tous les services
$services = railway status --json | ConvertFrom-Json

# Trouver PostgreSQL
$postgresService = $services.services | Where-Object { $_.name -like "*Portail*" -or $_.name -like "*postgres*" -or $_.name -like "*PostgreSQL*" }

if ($postgresService) {
    Write-Host "Service PostgreSQL trouve: $($postgresService.name)" -ForegroundColor Green
    
    # Recuperer DATABASE_URL
    Write-Host "Recuperation de DATABASE_URL..." -ForegroundColor Cyan
    $dbUrl = railway variables --service $postgresService.id DATABASE_URL
    
    if ($dbUrl) {
        Write-Host "DATABASE_URL recupere!" -ForegroundColor Green
        
        # Trouver le service Backend
        $backendService = $services.services | Where-Object { $_.name -like "*backend*" -or $_.name -like "*Backend*" }
        
        if ($backendService) {
            Write-Host "Service Backend trouve: $($backendService.name)" -ForegroundColor Green
            
            # Ajouter DATABASE_URL au Backend
            Write-Host "Ajout de DATABASE_URL au Backend..." -ForegroundColor Cyan
            railway variables set DATABASE_URL=$dbUrl --service $backendService.id
            
            Write-Host "Ajout des autres variables..." -ForegroundColor Cyan
            railway variables set JWT_SECRET=LqjTgJVbq70OBBU3WAWhiNiJLULFAejSpiUEchozIGI= --service $backendService.id
            railway variables set JWT_EXPIRES_IN=1d --service $backendService.id
            railway variables set PORT=3001 --service $backendService.id
            railway variables set NODE_ENV=production --service $backendService.id
            
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
