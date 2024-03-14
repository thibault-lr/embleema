import { Injectable } from '@nestjs/common';
import { CreatePatientDto, Patient } from 'embleema-domain';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

import { PrismaService } from '../prisma/prisma.service';
import { PatientMapper } from './mappers/patient.mapper';

@Injectable()
export class PatientRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<Patient[]> {
    const patients = await this.prismaService.patient.findMany();

    return patients.map(PatientMapper.fromPrismaPatient);
  }

  public async create(patient: CreatePatientDto): Promise<Patient> {
    const prismaNewPatient: Prisma.PatientCreateInput = {
      ...patient,
      nextVisitDate: patient.nextVisitDate ? DateTime.fromFormat(patient.nextVisitDate, 'YYYY-MM-DD').toISO()! : null,
    };

    const newPatient = await this.prismaService.patient.create({ data: prismaNewPatient });

    return PatientMapper.fromPrismaPatient(newPatient);
  }
}
