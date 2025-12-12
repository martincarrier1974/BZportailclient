# Script pour recuperer et configurer DATABASE_URL

Write-Host "Recuperation de DATABASE_URL depuis 'bd Portail'..." -ForegroundColor Cyan
Write-Host ""

# Lister les services
Write-Host "Services disponibles:" -ForegroundColor Yellow
railway status

Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Trouvez l'ID du service 'bd Portail' dans la liste ci-dessus" -ForegroundColor White
Write-Host "2. Executez la commande suivante (remplacez SERVICE_ID):" -ForegroundColor White
Write-Host ""
Write-Host "   `$dbUrl = railway variables --service SERVICE_ID DATABASE_URL" -ForegroundColor Cyan
Write-Host "   railway variables set DATABASE_URL=`$dbUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "OU manuellement dans Railway Dashboard:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Service 'bd Portail' -> Variables" -ForegroundColor White
Write-Host "2. Copiez la valeur de DATABASE_URL" -ForegroundColor White
Write-Host "3. Service Backend -> Variables -> New Variable" -ForegroundColor White
Write-Host "4. Name: DATABASE_URL" -ForegroundColor White
Write-Host "5. Value: (collez la valeur)" -ForegroundColor White
Write-Host "6. Save" -ForegroundColor White
Write-Host ""

