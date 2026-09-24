import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CompaniesService } from './companies.service';
import { COMPANIES_REPOSITORY, ACCOUNTS_REPOSITORY } from "./domain";
import { InMemoryAccountsRepository, InMemoryCompaniesRepository } from "./in-memory.repositories";

@Module({
  controllers: [AccountsController],
  providers: [
    CompaniesService,
    AccountsService,
    {provide: COMPANIES_REPOSITORY, useClass: InMemoryCompaniesRepository},
    {provide: ACCOUNTS_REPOSITORY, useClass: InMemoryAccountsRepository},
  ],
})
export class AccountsModule {}
