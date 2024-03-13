import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { client } from '@src/prisma/prisma-client';
import { PATIENT_MOCK } from '@test/mocks/patient';
import { PatientRepository } from './patient.repository';

describe('PatientRepository', () => {
  let patientRepository: PatientRepository;
  let module: TestingModule;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [],
      providers: [PatientRepository, PrismaService],
    }).compile();

    patientRepository = module.get<PatientRepository>(PatientRepository);
    prismaClient = new PrismaClient();
  });

  afterAll(async () => {
    await client.patient.deleteMany();

    await module.close();
  });

  describe('#findAll', () => {
    it('returns the list of the patients', async () => {
      await prismaClient.patient.count();
      await prismaClient.patient.create({ data: PATIENT_MOCK });

      const patients = await patientRepository.findAll();

      expect(patients).toHaveLength(1);
      expect(patients[0].socialSecurityId).toEqual(PATIENT_MOCK.socialSecurityId);
    });
  });
});
