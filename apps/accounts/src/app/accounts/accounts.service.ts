import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from "node:crypto";
import { OpenAccountInput } from "@wallet-platform/contracts";
import { Account, ACCOUNTS_REPOSITORY, AccountsRepository} from "./domain";
import { CompaniesService } from "./companies.service";

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY) private readonly accounts: AccountsRepository,
    private readonly companies: CompaniesService
  ) {}

  async open(input: OpenAccountInput): Promise<Account> {
    await this.companies.getOrThrow(input.companyId);

    const account: Account = {
      id: randomUUID(),
      companyId: input.companyId,
      currency: input.currency,
      name: input.name.trim(),
      createdAt: new Date()
    }
    await this.accounts.insert(account);

    return account;
  }

  async listForCompany(companyId: string): Promise<Account[]> {
    await this.companies.getOrThrow(companyId);
    return this.accounts.findByCompany(companyId);
  }
}

// Service - For format data from controller
