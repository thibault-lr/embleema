import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreatePatientDto, Patient } from 'embleema-domain';

import { PatientsRetrievalService } from './patients-retrieval.service';
import { DocumentedCreatePatientDto, DocumentedPatient } from './dto/patient.dto';
import { PatientCreationService } from './patient-creation.service';

@Controller('patients')
@ApiBearerAuth()
export class PatientsController {
  public constructor(
    private readonly patientsRetrievalService: PatientsRetrievalService,
    private readonly patientsCreationService: PatientCreationService,
  ) {}

  @Get('/')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ type: DocumentedPatient, isArray: true })
  public async findAllPatients(): Promise<Patient[]> {
    const patients = await this.patientsRetrievalService.findAll();

    return patients;
  }

  @Post('/')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: DocumentedCreatePatientDto })
  @ApiCreatedResponse({ type: DocumentedPatient })
  public async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = await this.patientsCreationService.create(createPatientDto);

    return patient;
  }
}
