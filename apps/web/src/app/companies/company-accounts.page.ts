import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountsApi } from './accounts.api';
import { Currency, CurrencyEnum } from '@wallet-platform/contracts';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company-accounts-page',
  templateUrl: './accounts-page.html',
  imports: [ReactiveFormsModule, RouterLink],
})
export class CompanyAccountsPage {
  readonly companyId = input.required<string>();

  private readonly api = inject(AccountsApi);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly currencies: Currency[] = [CurrencyEnum.EUR, CurrencyEnum.UAH, CurrencyEnum.USD];

  readonly accounts = rxResource({
    params: () => this.companyId(),
    stream: ({ params }) => this.api.listAccounts(params),
  });

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    currency: [CurrencyEnum.UAH as Currency, [Validators.required]],
  });

  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  open() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    this.saving.set(true);

    this.api.openAccount(this.companyId(), this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
        this.accounts.reload();
        this.saving.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set(error.error?.message ?? 'Unable to reload.');
        this.saving.set(false);
      },
    });
  }
}
