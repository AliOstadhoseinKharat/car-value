import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    let reqBody = {
      firstName: 'ali',
      lastName: 'ostad',
      email: 'ali115@gmail.com',
      password: '12345678',
      isActive: true,
    };
    let resBody = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      isActive: null,
    };
    return await request(app.getHttpServer())
      .post('/auth/signup')
      .send(reqBody)
      .expect(201)
      .then(async (res) => {
        resBody = await res.body;
        expect(resBody.id).toBeDefined();
        expect(resBody.email).toEqual(reqBody.email);
      });
  });
});
