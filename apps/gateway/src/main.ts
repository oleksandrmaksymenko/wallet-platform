/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { configureApp } from "./app/configure-app";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const port= Number(process.env.GATEWAY_PORT ?? 3000);
  await app.listen(port);
  Logger.log(`Gateway server started on port ${port}`);
}

bootstrap();
