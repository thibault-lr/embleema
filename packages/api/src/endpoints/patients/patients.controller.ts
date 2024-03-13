import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PatientsRetrievalService } from './patients-retrieval.service';
import { Patient } from './dto/patient.dto';

@Controller('patients')
export class PatientsController {
  public constructor(private readonly patientsRetrievalService: PatientsRetrievalService) {}

  @Get('/')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ type: Patient, isArray: true })
  public async findAllPatients(): Promise<Patient[]> {
    const patients = await this.patientsRetrievalService.findAll();

    return patients;
  }
}
