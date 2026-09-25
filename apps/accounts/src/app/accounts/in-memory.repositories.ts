import { Injectable  } from '@nestjs/common';
import { Account, AccountsRepository, CompaniesRepository, Company} from "./domain";

@Injectable()
export class InMemoryCompaniesRepository implements CompaniesRepository {
  private readonly rows = new Map<string, Company>()

  async insert(company: Company) {
    this.rows.set(company.id, company);
  }

  async findById(id: string) {
    return this.rows.get(id) ?? null;
  }
}

@Injectable()
export class InMemoryAccountsRepository implements AccountsRepository {
  private readonly rows = new Map<string, Account>();

  async insert(account: Account) {
    this.rows.set(account.id, account);
  }

  async findByCompany(companyId: string) {
    return [...this.rows.values()].filter((account) => account.companyId === companyId);
  }
}
