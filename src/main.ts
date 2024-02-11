import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import chalk from 'chalk';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import { AppModule } from './app.module';
import { LoggerService } from './core/logger/logger.service';
import { AllExceptionFilter } from './core/filter/exception.filter';
import { EnvironmentConfigService } from './core/config/environment-config/environment-config.service';

/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript
 * exception bubbles all the way back to the event loop.
 * By default, Node.js handles such exceptions by printing the
 * stack trace to stderr and exiting with code 1.
 */
process.on('uncaughtException', (error, origin) => {
  console.error(`Caught exception: ${error}. \n Exception origin: ${origin}.`);
});

/**
 * The 'unhandledRejection' event is emitted whenever a Promise
 * is rejected and no error handler is attached to the promise
 * within a turn of the event loop.
 * The 'unhandledRejection' event is useful for detecting and
 * keeping track of promises that were rejected whose rejections
 * have not yet been handled.
 */
process.on('unhandledRejection', (reason, promise) => {
  console.warn(`Unhandled Rejection at: ${promise}, reason: ${reason}.`);
});

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule, {
    // Default text-based logger.
    logger: new LoggerService(),
  });

  const configService = app.get(ConfigService);
  const HOST = configService.get('HOST', 'localhost');
  const PORT = configService.get('PORT');

  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60,
      max: 1000, // 1000 requests por windowMs
      message:
        '⚠️  Too many request created from this IP, please try again after an hour',
    })
  );

  // Global prefix for all routes.
  app.setGlobalPrefix('api/v1');

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // Handle all user input validation globally.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Enables the API docs auto-generation.
  if (env !== 'production') {
    setupSwagger(app);
  }
  // Use helmet for security.
  app.use(helmet());
  // Enable CORS.
  app.enableCors();

  await app.listen(port);

  process.env.NODE_ENV !== 'production'
    ? Logger.log(
        `🚀  Server ready at http://${HOST}:${chalk
          .hex('#87e8de')
          .bold(`${PORT}`)}`,
        'Bootstrap',
        false
      )
    : Logger.log(
        `🚀  Server is listening on port ${chalk
          .hex('#87e8de')
          .bold(`${PORT}`)}`,
        'Bootstrap',
        false
      );
}

bootstrap();
