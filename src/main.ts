import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Prefijo global
  app.setGlobalPrefix('api/v1');

  // CORS para front, mobile e IA
  app.enableCors();

  // Validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro de excepciones global
  app.useGlobalFilters(new AllExceptionsFilter());

  // Logging
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Coaniquem Tiendas Solidarias API')
    .setDescription(
      'API backend para gestion de metas, inventario y recomendaciones de reposicion de las 24 Tiendas Solidarias.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticacion y usuarios')
    .addTag('stores', 'Gestion de tiendas')
    .addTag('bsale-sync', 'Sincronizacion con BSale')
    .addTag('goals', 'Metas diarias')
    .addTag('inventory', 'Gestion de inventario')
    .addTag('replenishment', 'Recomendaciones de reposicion')
    .addTag('forms', 'Formularios diarios')
    .addTag('reports', 'Reportes y dashboards')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Servidor corriendo en http://localhost:${port}`);
  logger.log(`Swagger docs en http://localhost:${port}/api/docs`);
  logger.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
