import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { AppModule } from './app.module';
import { version } from '../package.json';

async function bootstrap(): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production';

  let app: NestApplication;

  if (isProduction) {
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, './certs/localhost.key')),
      cert: fs.readFileSync(path.join(__dirname, './certs/localhost.crt')),
    };
    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().addBearerAuth().setTitle('Embleema API').setVersion(version).build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
