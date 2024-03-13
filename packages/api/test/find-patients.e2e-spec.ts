import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { client as prismaClient } from '@src/prisma/prisma-client';

import { AppModule } from '../src/app.module';
import { generateAuthToken } from './utils/generate-token';
import { PATIENT_MOCK } from './mocks/patient';

// const prismaClient = new PrismaClient().$extends(fieldEncryptionExtension());

describe('/GET /patients', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await prismaClient.patient.deleteMany();
  });

  it('throws an authentication error when the token is not provided', async () => {
    const { status } = await request(app.getHttpServer()).get('/patients');

    expect(status).toEqual(401);
  });

  it('/returns the list of patients', async () => {
    const authToken = await generateAuthToken();
    await prismaClient.patient.create({ data: PATIENT_MOCK });

    const { body, status } = await request(app.getHttpServer()).get('/patients').auth(authToken, { type: 'bearer' });

    expect(status).toEqual(200);
    expect(body).toHaveLength(1);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          socialSecurityId: PATIENT_MOCK.socialSecurityId,
        }),
      ]),
    );
  });
});
