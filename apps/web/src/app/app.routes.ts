import { Route } from '@angular/router';
import { CompanyPage } from './companies/create-company.page';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'companies/new',
  },
  {
    path: 'companies/new',
    title: 'New Company',
    loadComponent: () => import('./companies/create-company.page').then((m) => m.CompanyPage),
  },
  {
    path: 'companies/:companyId/accounts',
    title: 'Account Details',
    loadComponent: () =>
      import('./companies/company-accounts.page').then((m) => m.CompanyAccountsPage),
  },
  {
    path: '**',
    redirectTo: 'companies/new',
  },
];
