import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { version } from '../package.json';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Embleema API').setVersion(version).build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  app.enableCors({ origin: process.env.WEBAPP_ORIGIN_URL });
  await app.listen(3000);
}
bootstrap();
