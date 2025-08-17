import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // グローバルバリデーション
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Apollo Studio Sandbox対応のCORS設定
  app.enableCors({
    origin: [
      'https://studio.apollographql.com',
      'https://apollo-server-landing-page.cdn.apollographql.com',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Apollo-Require-Preflight',
    ],
  });

  await app.listen(3000);
  console.log('🚀 GraphQL Server ready at http://localhost:3000/graphql');
  console.log(
    '🌐 Apollo Studio Sandbox: https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql',
  );
}
bootstrap();
