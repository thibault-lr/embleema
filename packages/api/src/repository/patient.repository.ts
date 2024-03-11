import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<Patient[]> {

    const patients = await this.prismaService.patient.findMany();

    return patients;
  }
}
