import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import {
  ACCOUNTS_SERVICE,
  AccountDTO,
  AccountsPatterns,
  CompanyDTO,
  CreateCompanyInput,
  OpenAccountInput,
  RpcRequest
} from "@wallet-platform/contracts";

const FIRST_VALUE_FROM_TIMEOUT = 60 * 1000 * 3

@Injectable()
export class AccountsClient {
  private readonly logger = new Logger(AccountsClient.name);

  constructor(@Inject(ACCOUNTS_SERVICE)private readonly client: ClientProxy) {}

  private async call<T>(pattern: string, data: unknown, correlationId: string): Promise<T> {
    const started = performance.now();
    const req: RpcRequest<unknown> = { meta: { correlationId }, data };

    try {
      return await firstValueFrom(this.client.send<T>(pattern, req).pipe(timeout(FIRST_VALUE_FROM_TIMEOUT)))
    } finally {
      const ms = (performance.now() - started).toFixed(1);
      this.logger.log(`[${correlationId}] ${ms}ms]`)
    }
  }

  createCompany(input: CreateCompanyInput, cid: string) {
    return this.call<CompanyDTO>(AccountsPatterns.CreateCompany, input, cid);
  }

  getCompany(companyId: string, cid: string) {
    return this.call<CompanyDTO>(AccountsPatterns.GetCompany, {companyId}, cid);
  }

  openAccount(input: OpenAccountInput, cid: string) {
    return this.call<AccountDTO>(AccountsPatterns.OpenAccount, input, cid);
  }

  listAccounts(companyId: string, cid: string) {
    return this.call<AccountDTO[]>(AccountsPatterns.ListAccounts, { companyId }, cid);
  }
}
