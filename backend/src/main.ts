import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Azmera Bet API') // Your API name
    .setDescription('API documentation for Azmera Bet backend')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT Auth in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api-docs', app, document); // Swagger UI available at /api-docs
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
