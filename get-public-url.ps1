# Script pour obtenir l'URL publique de PostgreSQL

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Obtenir URL Publique PostgreSQL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "METHODE 1 - Via Railway Dashboard (Recommandee):" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Service 'bd Portail' -> Variables" -ForegroundColor White
Write-Host "2. Cliquez sur DATABASE_URL pour voir la valeur" -ForegroundColor White
Write-Host "3. Si l'URL contient 'railway.internal', elle est interne" -ForegroundColor Red
Write-Host "4. Si l'URL contient 'railway.app' ou 'containers-', elle est publique" -ForegroundColor Green
Write-Host ""
Write-Host "5. Si interne, allez dans:" -ForegroundColor Yellow
Write-Host "   Service 'bd Portail' -> Settings -> Networking" -ForegroundColor White
Write-Host "   Generate Domain pour obtenir l'URL publique" -ForegroundColor White
Write-Host ""
Write-Host "6. Construisez l'URL complete:" -ForegroundColor Yellow
Write-Host "   postgresql://postgres:PASSWORD@DOMAINE-PUBLIC:5432/DATABASE" -ForegroundColor Cyan
Write-Host ""
Write-Host "METHODE 2 - Via Railway CLI:" -ForegroundColor Yellow
Write-Host ""
Write-Host "railway variables --service <bd-portail-service-id>" -ForegroundColor Cyan
Write-Host ""
Write-Host "Puis copiez DATABASE_URL et verifiez qu'elle contient un hostname public" -ForegroundColor White
Write-Host ""

