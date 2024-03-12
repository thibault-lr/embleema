import { Injectable } from '@nestjs/common';
import { Patient } from '@src/endpoints/patients/dto/patient.dto';

import { PrismaService } from '../prisma/prisma.service';
import { PatientMapper } from './mappers/patient.mapper';

@Injectable()
export class PatientRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<Patient[]> {
    const patients = await this.prismaService.patient.findMany();

    return patients.map(PatientMapper.fromPrismaPatient);
  }
}
