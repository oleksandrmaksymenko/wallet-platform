import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateCompanyInput, OpenAccountInput } from "@wallet-platform/contracts";
import { AccountsClient } from './accounts.client';
import { CorrelationId } from './correlation-id';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly accounts: AccountsClient) {}

  @Post()
  create(@Body() body: CreateCompanyInput, @CorrelationId() cid: string) {
    return this.accounts.createCompany(body, cid);
  }

  @Get(':companyId')
  get(@Param('companyId') companyId: string, @CorrelationId() cid: string) {
    return  this.accounts.getCompany(companyId, cid);
  }

  @Post(':companyId/accounts')
  open(
    @Param('companyId') companyId: string,
    @Body() body: Omit<OpenAccountInput, 'companyId'>,
    @CorrelationId() cid: string,
  ) {
    return this.accounts.openAccount({ ...body, companyId }, cid);
  }

  @Get(':companyId/accounts')
  list(@Param('companyId') companyId: string, @CorrelationId() cid: string) {
    return this.accounts.listAccounts(companyId, cid);
  }
}
