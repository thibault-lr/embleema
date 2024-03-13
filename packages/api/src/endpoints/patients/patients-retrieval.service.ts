import { Injectable } from '@nestjs/common';
import { PatientRepository } from '@src/repository/patient.repository';
import { Patient } from './dto/patient.dto';

@Injectable()
export class PatientsRetrievalService {
  public constructor(private readonly patientRepository: PatientRepository) {}

  public async findAll(): Promise<Patient[]> {
    const patients = await this.patientRepository.findAll();

    return patients;
  }
}
