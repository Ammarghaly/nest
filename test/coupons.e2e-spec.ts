import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Coupons (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  it('/coupons (POST) - Reject invalid discount (100%)', () => {
    return request(app.getHttpServer())
      .post('/coupons')
      .send({
        code: 'TOO_MUCH',
        discountPercent: 100,
        expiresAt: '2026-12-31',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBeDefined();
      });
  });

  it('/coupons (POST) - Reject empty code', () => {
    return request(app.getHttpServer())
      .post('/coupons')
      .send({
        code: '',
        discountPercent: 10,
        expiresAt: '2026-12-31',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
