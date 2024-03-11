import { Controller, Get } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PatientsRetrievalService } from './patients-retrieval.service';

@Controller('patients')
export class PatientsController {
  public constructor(private readonly patientsRetrievalService: PatientsRetrievalService) {}

  @Get('/')
  public async findAllPatients(): Promise<Patient[]> {
    const patients = await this.patientsRetrievalService.findAll();

    return patients;
  }
}
