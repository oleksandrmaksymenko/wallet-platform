import { Currency } from '@wallet-platform/contracts';

enum REPOSITORY {
  COMPANIES = 'COMPANIES_REPOSITORY',
  ACCOUNTS = 'ACCOUNTS_REPOSITORY',
}

export interface Company {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Account {
  id: string;
  companyId: string;
  currency: Currency;
  name: string;
  createdAt: Date;
}

export interface CompaniesRepository {
  insert(company: Company): Promise<void>;
  findById(id: string): Promise<Company | null>;
}

export interface AccountsRepository {
  insert(company: Company): Promise<void>;
  findByCompany(companyId: string): Promise<Account[]>;
}

export const COMPANIES_REPOSITORY = Symbol(REPOSITORY.COMPANIES);
export const ACCOUNTS_REPOSITORY = Symbol(REPOSITORY.ACCOUNTS);
