import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: [
      frontendUrl, 
      'http://localhost:3000', 
      'https://f25-cisc474-individual-2.onrender.com',
      'https://f25-cisc474-individual.jacobwhi.workers.dev'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  const port = process.env.PORT || 3001;
  const host = process.env.HOST || undefined;
  await app.listen(port, host);
}

void bootstrap();
