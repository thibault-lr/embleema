import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { client as prismaClient } from '@src/prisma/prisma-client';

import { AppModule } from '../src/app.module';
import { generateAuthToken } from './utils/generate-token';
import { PATIENT_MOCK } from './mocks/patient';

describe('/POST /patients', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  beforeEach(async () => {
    await prismaClient.patient.deleteMany();
  });

  it('throws an authentication error when the token is not provided', async () => {
    const { status } = await request(app.getHttpServer()).post('/patients');

    expect(status).toEqual(401);
  });

  it('throws a bad request error when the payload is not valid', async () => {
    const authToken = await generateAuthToken();
    const { status } = await request(app.getHttpServer())
      .post('/patients')
      .send({})
      .auth(authToken, { type: 'bearer' });

    expect(status).toEqual(400);
  });

  it('/returns the created patient', async () => {
    const authToken = await generateAuthToken();

    const { body, status } = await request(app.getHttpServer())
      .post('/patients')
      .send(PATIENT_MOCK)
      .auth(authToken, { type: 'bearer' });

    expect(status).toEqual(201);
    expect(body).toEqual(
      expect.objectContaining({
        socialSecurityId: PATIENT_MOCK.socialSecurityId,
        id: expect.any(String),
      }),
    );
  });
});
