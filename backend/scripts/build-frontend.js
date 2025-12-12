#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building frontend...');

// Build frontend
const frontendDir = path.join(__dirname, '..', '..', 'vite-frontend');
const backendPublicDir = path.join(__dirname, '..', 'public');

try {
  // Build frontend
  console.log('📦 Installing frontend dependencies...');
  execSync('npm ci', { cwd: frontendDir, stdio: 'inherit' });
  
  console.log('🔨 Building frontend...');
  execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
  
  // Create public directory if it doesn't exist
  if (!fs.existsSync(backendPublicDir)) {
    fs.mkdirSync(backendPublicDir, { recursive: true });
  }
  
  // Copy dist to public
  const frontendDist = path.join(frontendDir, 'dist');
  console.log('📋 Copying frontend build to backend/public...');
  
  // Use platform-specific copy command
  if (process.platform === 'win32') {
    execSync(`xcopy /E /I /Y "${frontendDist}\\*" "${backendPublicDir}"`, { stdio: 'inherit' });
  } else {
    execSync(`cp -r ${frontendDist}/* ${backendPublicDir}/`, { stdio: 'inherit' });
  }
  
  console.log('✅ Frontend build completed!');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

