import {ExecutionContext, INestApplication} from '@nestjs/common';
import { correlationId } from './correlation-id';

export const configureApp = (app: INestApplication): void => {
  app.setGlobalPrefix('api');
  app.use(correlationId);
  app.enableShutdownHooks();
}
