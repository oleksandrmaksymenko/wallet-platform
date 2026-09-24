import { AccountDTO, CompanyDTO } from "@wallet-platform/contracts";
import { Account, Company} from './domain';

export const toCompanyDTO = (company: Company): CompanyDTO => ({
  id: company.id,
  name: company.name,
  createdAt: company.createdAt.toISOString(),
})

export const toAccountDTO = (account: Account): AccountDTO => ({
  id: account.id,
  companyId: account.companyId,
  currency: account.currency,
  name: account.name,
  createdAt: account.createdAt.toISOString(),
})
