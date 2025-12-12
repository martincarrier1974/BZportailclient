# Script de preparation Git pour BZ Admin Portal

Write-Host "Preparation du projet pour GitHub..." -ForegroundColor Green

# Verifier si Git est installe
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git n'est pas installe. Veuillez installer Git d'abord." -ForegroundColor Red
    Write-Host "Telechargez depuis: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Verifier si on est deja dans un repo Git
if (Test-Path .git) {
    Write-Host "Un repository Git existe deja." -ForegroundColor Yellow
    $continue = Read-Host "Voulez-vous continuer? (o/n)"
    if ($continue -ne "o") {
        exit 0
    }
} else {
    Write-Host "Initialisation du repository Git..." -ForegroundColor Cyan
    git init
}

# Ajouter tous les fichiers
Write-Host "Ajout des fichiers..." -ForegroundColor Cyan
git add .

# Creer le commit initial
Write-Host "Creation du commit initial..." -ForegroundColor Cyan
$commitMessage = "Initial commit - BZ Telecom Admin Portal - Production ready"
git commit -m $commitMessage

Write-Host "Projet prepare pour Git!" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Yellow
Write-Host "1. Creez un nouveau repository sur GitHub: https://github.com/new" -ForegroundColor White
Write-Host "2. Nommez-le: bz-admin-portal" -ForegroundColor White
Write-Host "3. NE cochez PAS Initialize with README" -ForegroundColor White
Write-Host "4. Copiez l'URL du repository" -ForegroundColor White
Write-Host "5. Executez les commandes suivantes:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/VOTRE-USERNAME/bz-admin-portal.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
