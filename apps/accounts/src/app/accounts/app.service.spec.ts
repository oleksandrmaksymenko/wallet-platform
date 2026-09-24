import { Test } from '@nestjs/testing';
import { RpcException } from '@nestjs/microservices';
import { AccountsModule } from './accounts.module';
import { AccountsService } from './accounts.service';
import { CompaniesService } from './companies.service';
import { AppModule } from '@nestjs/schematics/dist/lib/application/files/ts/src/app.module';

describe('AccountsService', () => {
  let accounts: AccountsService;
  let companies: CompaniesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    accounts = moduleRef.get(AccountsService);
    companies = moduleRef.get(CompaniesService);
  });

  it('Open an account for an existing company', async () => {
    const company = await companies.create({ name: 'Test Company' });
    await accounts.open({ companyId: company.id, currency: 'UAH', name: 'Main' });

    const list = await accounts.listForCompany(company.id);
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({ currency: 'UAH', name: 'Main' });
  });

  it('Reject unknown company', async () => {
    await expect(
      accounts.open({ companyId: 'unknown', currency: 'UAH', name: 'Main' }),
    ).rejects.toBeInstanceOf(RpcException);
  });

  it('Does not leak accounts between companies', async () => {
    const a = await companies.create({ name: 'Test Company A' });
    const b = await companies.create({ name: 'Test Company B' });
    await accounts.open({ companyId: a.id, currency: 'UAH', name: 'A-usd' });

    expect(await accounts.listForCompany(b.id)).toEqual([]);
  });
});
