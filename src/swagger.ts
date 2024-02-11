import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger creates a UI for each of app's endpoints to easy consumption.
 */
export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Basic API Unt')
    .setDescription('Nest + sequelize + JWT + Jest + Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
}

/**
 * Reference: https://docs.nestjs.com/openapi/introduction
 */
