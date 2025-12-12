# Script pour connecter PostgreSQL au Backend dans Railway

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuration Railway - Connection BD" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifier si Railway CLI est installe
if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "Railway CLI n'est pas installe." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Installation Railway CLI:" -ForegroundColor Cyan
    Write-Host "npm install -g @railway/cli" -ForegroundColor White
    Write-Host ""
    Write-Host "Ensuite, connectez-vous:" -ForegroundColor Cyan
    Write-Host "railway login" -ForegroundColor White
    Write-Host ""
    Write-Host "Puis liez votre projet:" -ForegroundColor Cyan
    Write-Host "railway link" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "Railway CLI detecte!" -ForegroundColor Green
Write-Host ""

# Instructions pour connecter manuellement
Write-Host "ETAPES POUR CONNECTER POSTGRESQL AU BACKEND:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Dans Railway Dashboard:" -ForegroundColor Cyan
Write-Host "   - Allez dans votre projet" -ForegroundColor White
Write-Host "   - Cliquez sur le service BACKEND" -ForegroundColor White
Write-Host "   - Allez dans l'onglet 'Variables'" -ForegroundColor White
Write-Host ""
Write-Host "2. Ajouter DATABASE_URL:" -ForegroundColor Cyan
Write-Host "   - Cliquez sur 'New Variable'" -ForegroundColor White
Write-Host "   - Railway devrait proposer DATABASE_URL depuis PostgreSQL" -ForegroundColor White
Write-Host "   - Si oui, cliquez sur 'Add'" -ForegroundColor White
Write-Host "   - Sinon, allez dans PostgreSQL service -> Variables" -ForegroundColor White
Write-Host "   - Copiez la valeur de DATABASE_URL" -ForegroundColor White
Write-Host "   - Retournez dans Backend -> Variables" -ForegroundColor White
Write-Host "   - Name: DATABASE_URL" -ForegroundColor White
Write-Host "   - Value: (collez la valeur)" -ForegroundColor White
Write-Host ""
Write-Host "3. Ajouter les autres variables:" -ForegroundColor Cyan
Write-Host "   JWT_SECRET = (generez avec la commande ci-dessous)" -ForegroundColor White
Write-Host "   JWT_EXPIRES_IN = 1d" -ForegroundColor White
Write-Host "   PORT = 3001" -ForegroundColor White
Write-Host "   NODE_ENV = production" -ForegroundColor White
Write-Host ""
Write-Host "4. Generer JWT_SECRET:" -ForegroundColor Cyan
$jwtSecret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
Write-Host "   JWT_SECRET = $jwtSecret" -ForegroundColor Green
Write-Host ""
Write-Host "5. Verifier Root Directory:" -ForegroundColor Cyan
Write-Host "   - Backend service -> Settings" -ForegroundColor White
Write-Host "   - Root Directory doit etre: backend" -ForegroundColor White
Write-Host ""
Write-Host "6. Redepoyer:" -ForegroundColor Cyan
Write-Host "   - Railway redepoiera automatiquement" -ForegroundColor White
Write-Host "   - Ou cliquez sur 'Redeploy' manuellement" -ForegroundColor White
Write-Host ""

