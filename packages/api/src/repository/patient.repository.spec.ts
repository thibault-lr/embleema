import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { client } from '@src/prisma/prisma-client';
import { PATIENT_MOCK } from '@test/mocks/patient';
import { DateTime } from 'luxon';
import { CreatePatientDto } from 'embleema-domain';
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
    await module.close();
  });

  beforeEach(async () => {
    await client.patient.deleteMany();
  });

  describe('#findAll', () => {
    it('returns the list of the patients', async () => {
      await prismaClient.patient.create({ data: { ...PATIENT_MOCK, nextVisitDate: DateTime.utc().toISO() } });

      const patients = await patientRepository.findAll();

      expect(patients).toHaveLength(1);
      expect(patients[0].socialSecurityId).toEqual(PATIENT_MOCK.socialSecurityId);
    });
  });

  describe('#create', () => {
    it('creates a new patient', async () => {
      await prismaClient.patient.create({ data: { ...PATIENT_MOCK, nextVisitDate: DateTime.utc().toISO() } });

      const newPatient = await patientRepository.create(PATIENT_MOCK as CreatePatientDto);

      expect(newPatient).toBeDefined();
      expect(newPatient.id).toBeDefined();
    });
  });
});
