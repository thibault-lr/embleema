import { Injectable } from '@nestjs/common';
import { CreatePatientDto, Patient } from 'embleema-domain';
import { PatientRepository } from '@src/repository/patient.repository';

@Injectable()
export class PatientCreationService {
  public constructor(private readonly patientRepository: PatientRepository) {}

  public async create(patientInput: CreatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.create(patientInput);

    return patient;
  }
}
