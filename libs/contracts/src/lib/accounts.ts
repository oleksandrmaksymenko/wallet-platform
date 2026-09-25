export const ACCOUNTS_SERVICE = 'ACCOUNTS_SERVICE';

export const AccountsPatterns = {
  CreateCompany: 'accounts.company.create',
  GetCompany: 'accounts.company.get',
  OpenAccount: 'accounts.account.open',
  ListAccounts: 'accounts.account.list',
};

export enum CurrencyEnum {
  USD = 'USD',
  UAH = 'UAH',
  EUR = 'EUR',
}

export type Currency = keyof typeof CurrencyEnum;

export interface CompanyDTO {
  id: string;
  name: string;
  createdAt: string;
}

export interface AccountDTO {
  id: string;
  companyId: string;
  currency: Currency;
  name: string;
  createdAt: string;
}

export interface CreateCompanyInput {
  name: string;
}
export interface GetCompanyInput {
  companyId: string;
}
export interface OpenAccountInput {
  companyId: string;
  currency: Currency;
  name: string;
}
export interface ListAccountsInput {
  companyId: string;
}
