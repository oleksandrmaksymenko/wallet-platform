import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsApi } from './accounts.api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-company-page',
  imports: [ReactiveFormsModule],
  templateUrl: 'company-page.html',
})
export class CompanyPage {
  private readonly api = inject(AccountsApi);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
  });

  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    this.api.createCompany(this.form.getRawValue()).subscribe({
      next: (company) => this.router.navigate(['/companies', company.id, 'accounts']),
      error: (error: HttpErrorResponse) => {
        this.error.set(error?.message ?? 'Unknown error occurred.');
        this.saving.set(false);
      },
    });
  }
}
