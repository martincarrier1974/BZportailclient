import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Winston logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Railway injecte automatiquement PORT via variable d'environnement
  // Ne JAMAIS définir PORT manuellement dans Railway - laisser Railway gérer
  const port = process.env.PORT;
  
  if (!port) {
    console.error('❌ PORT environment variable is required');
    console.error('💡 Railway injecte automatiquement PORT - ne pas le définir manuellement');
    process.exit(1);
  }
  
  await app.listen(parseInt(port, 10), '0.0.0.0');
  console.log(`🚀 Backend API running on port ${port} (injecté par Railway)`);
  console.log(`📡 API available at /api`);
}

bootstrap();

