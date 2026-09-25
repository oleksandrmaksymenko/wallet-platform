import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type {
  AccountDTO,
  CompanyDTO,
  CreateCompanyInput,
  OpenAccountInput,
} from '@wallet-platform/contracts';

@Injectable({ providedIn: 'root' })
export class AccountsApi {
  private readonly http = inject(HttpClient);

  createCompany(body: CreateCompanyInput) {
    return this.http.post<CompanyDTO>('/api/companies', body);
  }

  listAccounts(companyId: string) {
    return this.http.get<AccountDTO[]>(`/api/companies/${companyId}/accounts`);
  }

  openAccount(companyId: string, body: Omit<OpenAccountInput, 'companyId'>) {
    return this.http.post<AccountDTO>(`/api/companies/${companyId}/accounts`, body);
  }
}
