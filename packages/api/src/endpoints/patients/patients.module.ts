import { Module } from '@nestjs/common';
import { RepositoryModule } from '@src/repository/repository.module';
import { PatientsController } from './patients.controller';
import { PatientsRetrievalService } from './patients-retrieval.service';
import { PatientCreationService } from './patient-creation.service';

@Module({
  imports: [RepositoryModule],
  controllers: [PatientsController],
  providers: [PatientsRetrievalService, PatientCreationService],
})
export class PatientsModule {}
