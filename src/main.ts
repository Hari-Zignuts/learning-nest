import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Spotify Clone')
    .setDescription('The Spotify Clone API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Get the ConfigService
  const configService = app.get(ConfigService);

  // Get the port from environment variables
  const port = configService.get<number>('port', 3000);
  // enable validation pipe globally
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port ?? 3000);
}
void bootstrap();
