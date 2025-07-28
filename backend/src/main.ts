import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend connection
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log(`🚀 Server running on http://localhost:${port}/graphql`);
}

bootstrap();
