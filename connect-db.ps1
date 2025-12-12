# Script pour connecter PostgreSQL au Backend

Write-Host "Connexion de PostgreSQL au Backend..." -ForegroundColor Cyan

# Lister les services
Write-Host "Services disponibles:" -ForegroundColor Yellow
railway status

Write-Host ""
Write-Host "Pour connecter DATABASE_URL automatiquement:" -ForegroundColor Cyan
Write-Host "railway variables set DATABASE_URL=$(railway variables --service <postgres-service-id> DATABASE_URL)" -ForegroundColor White
Write-Host ""
Write-Host "OU manuellement dans Railway Dashboard:" -ForegroundColor Yellow
Write-Host "1. Backend service -> Variables" -ForegroundColor White
Write-Host "2. Railway devrait proposer DATABASE_URL depuis PostgreSQL" -ForegroundColor White
Write-Host "3. Cliquez sur 'Add'" -ForegroundColor White
Write-Host ""
Write-Host "Variables a ajouter dans Backend:" -ForegroundColor Yellow
Write-Host "DATABASE_URL = <auto depuis PostgreSQL>" -ForegroundColor White
Write-Host "JWT_SECRET = LqjTgJVbq70OBBU3WAWhiNiJLULFAejSpiUEchozIGI=" -ForegroundColor Green
Write-Host "JWT_EXPIRES_IN = 1d" -ForegroundColor White
Write-Host "PORT = 3001" -ForegroundColor White
Write-Host "NODE_ENV = production" -ForegroundColor White
Write-Host "FRONTEND_URL = <a ajouter apres creation du frontend>" -ForegroundColor White
