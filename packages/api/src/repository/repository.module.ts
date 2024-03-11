import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PatientRepository } from './patient.repository';

@Module({
  imports: [PrismaModule],
  providers: [PatientRepository],
  exports: [PatientRepository],
})
export class RepositoryModule {}
