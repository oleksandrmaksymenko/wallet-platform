/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import {AppModule} from "./app/app.module";

async function bootstrap() {
  const port = Number(process.env.ACCOUNTS_TCP_PORT ?? 4001);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port },
  });

  app.enableShutdownHooks();
  await app.listen();
  Logger.log(`accounts listening on tcp://0.0.0.0:${port}`, 'Bootstrap');
}

bootstrap();
