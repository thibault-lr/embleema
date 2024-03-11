import { Test, TestingModule } from '@nestjs/testing';
import { PatientsRetrievalService } from './patients-retrieval.service';

describe('PatientsRetrievalService', () => {
  let service: PatientsRetrievalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsRetrievalService],
    }).compile();

    service = module.get<PatientsRetrievalService>(PatientsRetrievalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
