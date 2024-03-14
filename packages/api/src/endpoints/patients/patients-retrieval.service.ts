import { Injectable } from '@nestjs/common';
import { Patient } from 'embleema-domain';
import { PatientRepository } from '@src/repository/patient.repository';

@Injectable()
export class PatientsRetrievalService {
  public constructor(private readonly patientRepository: PatientRepository) {}

  public async findAll(): Promise<Patient[]> {
    const patients = await this.patientRepository.findAll();

    return patients;
  }
}
