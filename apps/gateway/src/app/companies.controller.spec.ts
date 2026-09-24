import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { of } from 'rxjs';
import { ACCOUNTS_SERVICE, AccountsPatterns } from '@wallet-platform/contracts';
import { AppModule } from './app.module';
import { configureApp } from './configure-app';

describe('gateway /api/companies', () => {
  let app: INestApplication;
  const send = jest.fn();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ACCOUNTS_SERVICE)
      .useValue({ send })
      .compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(() => app.close());
  beforeEach(() => send.mockReset());

  it('Propagates incoming correlation id to accounts', async () => {
    send.mockReturnValue(of({ id: 'a1', name: 'Test', createdAt: '2026-01-01T00:00:00.000Z' }));

    const res = await request(app.getHttpServer())
      .post('/api/companies')
      .set('x-correction-id', 'test-cid-123')
      .send({ name: 'Test' })
      .expect(201);

    expect(res.headers['x-correction-id']).toBe('test-cid-123');
    expect(send).toHaveBeenCalledWith(AccountsPatterns.CreateCompany, {
      meta: { correlationId: 'test-cid-123' },
      data: { name: 'Test' },
    });
  });

  it('Generates correlation id when header is missing or unsafe', async () => {
    send.mockReturnValue(of([]));

    const res = await request(app.getHttpServer())
      .get('/api/companies/a1/accounts')
      .set('x-correction-id', 'bad id INJECTED')
      .expect(200);

    expect(res.headers['x-correction-id']).toMatch(/^[0-9a-f-]{36}$/);
  });
});
