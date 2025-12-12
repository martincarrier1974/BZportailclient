import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for frontend
  // En production Railway, permet TOUTES les origines pour que ça fonctionne peu importe l'URL
  const frontendUrl = process.env.FRONTEND_URL;
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // En production Railway, permet toutes les origines Railway
    // Peu importe l'URL que Railway assigne, ça fonctionnera
    app.enableCors({
      origin: true, // Permet toutes les origines (Railway gère les domaines)
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    console.log('🌐 CORS configuré pour toutes les origines (production Railway)');
  } else {
    // En développement, utilise l'URL spécifique
    app.enableCors({
      origin: frontendUrl || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    console.log('🌐 CORS configuré pour:', frontendUrl || 'http://localhost:3000');
  }

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  // Serve static files from frontend build in production
  if (isProduction) {
    const frontendPath = join(__dirname, '..', 'public');
    
    // Serve static assets (JS, CSS, images, etc.)
    app.useStaticAssets(frontendPath, {
      index: false,
    });
    
    // SPA fallback: serve index.html for all non-API routes
    const express = app.getHttpAdapter().getInstance();
    express.get('*', (req, res, next) => {
      // Skip API routes
      if (req.url.startsWith('/api')) {
        return next();
      }
      // Serve index.html for all other routes (SPA routing)
      res.sendFile(join(frontendPath, 'index.html'));
    });
    
    console.log('📦 Serving static files from:', frontendPath);
  }

  // Winston logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Railway injecte automatiquement PORT - utiliser uniquement cette variable
  // Ne JAMAIS définir PORT manuellement dans Railway
  const port = process.env.PORT;
  
  if (!port) {
    // En développement local seulement, utiliser un port par défaut
    if (process.env.NODE_ENV !== 'production') {
      const devPort = '3001';
      await app.listen(parseInt(devPort, 10), '0.0.0.0');
      console.log(`🚀 Backend API running on port ${devPort} (développement local)`);
      console.log(`📡 API available at /api`);
      return;
    }
    
    // En production, PORT est obligatoire (injecté par Railway)
    console.error('❌ PORT environment variable is required in production');
    console.error('💡 Railway doit injecter PORT automatiquement');
    process.exit(1);
  }
  
  // En production Railway, utiliser le port injecté
  const portNumber = parseInt(port, 10);
  await app.listen(portNumber, '0.0.0.0');
  console.log(`🚀 Backend API started successfully`);
  console.log(`📡 API available at /api`);
}

bootstrap();

