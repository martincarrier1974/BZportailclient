# Script de diagnostic Railway

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Diagnostic Railway Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "VERIFICATIONS A FAIRE DANS RAILWAY:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Service Backend -> Variables:" -ForegroundColor Cyan
Write-Host "   - DATABASE_URL doit etre present et non vide" -ForegroundColor White
Write-Host "   - JWT_SECRET doit etre present" -ForegroundColor White
Write-Host "   - PORT = 3001" -ForegroundColor White
Write-Host "   - NODE_ENV = production" -ForegroundColor White
Write-Host ""
Write-Host "2. Service Backend -> Settings:" -ForegroundColor Cyan
Write-Host "   - Root Directory = backend" -ForegroundColor White
Write-Host "   - Start Command = npm run prisma:migrate:deploy && npm run start:prod" -ForegroundColor White
Write-Host ""
Write-Host "3. Vérifier les logs d'erreur:" -ForegroundColor Cyan
Write-Host "   - Service Backend -> Deploy Logs" -ForegroundColor White
Write-Host "   - Copiez les dernières erreurs" -ForegroundColor White
Write-Host ""
Write-Host "ERREURS COMMUNES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "- DATABASE_URL vide -> Vérifiez que la variable est bien ajoutée" -ForegroundColor Red
Write-Host "- Port déjà utilisé -> Changez PORT si nécessaire" -ForegroundColor Red
Write-Host "- Build failed -> Vérifiez Root Directory = backend" -ForegroundColor Red
Write-Host "- Migration failed -> Vérifiez DATABASE_URL et connexion DB" -ForegroundColor Red
Write-Host ""

