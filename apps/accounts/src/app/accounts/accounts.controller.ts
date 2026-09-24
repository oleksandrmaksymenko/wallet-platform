import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  AccountDTO,
  AccountsPatterns,
  CompanyDTO,
  CreateCompanyInput,
  GetCompanyInput,
  ListAccountsInput,
  OpenAccountInput,
  RpcRequest
} from "@wallet-platform/contracts";
import { CompaniesService } from "./companies.service";
import { AccountsService } from "./accounts.service";
import { toAccountDTO, toCompanyDTO } from "./mappers";

@Controller()
export class AccountsController {
  private readonly logger = new Logger(AccountsController.name);

  constructor(
    private readonly companies: CompaniesService,
    private readonly accounts: AccountsService
  ) {}

  @MessagePattern(AccountsPatterns.CreateCompany)
  async createCompany(@Payload() { meta, data }: RpcRequest<CreateCompanyInput>): Promise<CompanyDTO> {
    this.logger.log(`[${meta.correlationId}] create company "${data.name}"`)
    return toCompanyDTO(await this.companies.create(data))
  }

  @MessagePattern(AccountsPatterns.GetCompany)
  async getCompany(@Payload() { meta, data }: RpcRequest<GetCompanyInput>): Promise<CompanyDTO> {
    this.logger.log(`[${meta.correlationId}] get company "${data.companyId}"`)
    return toCompanyDTO(await this.companies.getOrThrow(data.companyId))
  }

  @MessagePattern(AccountsPatterns.OpenAccount)
  async openAccount(@Payload() { meta, data }: RpcRequest<OpenAccountInput>): Promise<AccountDTO> {
    this.logger.log(`[${meta.correlationId}] open account "${data.name}"`)
    return toAccountDTO(await this.accounts.open(data))
  }

  @MessagePattern(AccountsPatterns.ListAccounts)
  async listAccounts(@Payload() { meta, data }: RpcRequest<ListAccountsInput>): Promise<AccountDTO[]> {
    this.logger.log(`[${meta.correlationId}] list accounts fot ${data.companyId}`)
    const rows = await this.accounts.listForCompany(data.companyId);
    return rows.map(toAccountDTO);
  }
}

// Controller - For DB actions.
