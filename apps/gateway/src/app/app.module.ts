import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ACCOUNTS_SERVICE } from "@wallet-platform/contracts";
import { AccountsClient } from './accounts.client';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ACCOUNTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.ACCOUNTS_HOST ?? '127.0.0.1',
          port: Number(process.env.ACCOUNTS_TCP_PORT ?? 4001),
        }
      }
    ]),
  ],
  controllers: [CompaniesController],
  providers: [AccountsClient]
})
export class AppModule {}
