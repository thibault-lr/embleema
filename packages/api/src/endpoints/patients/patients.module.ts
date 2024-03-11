import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { PatientsController } from './patients.controller';
import { PatientsRetrievalService } from './patients-retrieval.service';

@Module({
  imports: [RepositoryModule],
  controllers: [PatientsController],
  providers: [PatientsRetrievalService],
})
export class PatientsModule {}
