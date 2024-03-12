import { Controller, Get } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PatientsRetrievalService } from './patients-retrieval.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('patients')
export class PatientsController {
  public constructor(private readonly patientsRetrievalService: PatientsRetrievalService) {}

  @Get('/')
  @ApiOkResponse()
  public async findAllPatients(): Promise<Patient[]> {
    const patients = await this.patientsRetrievalService.findAll();

    return patients;
  }
}
