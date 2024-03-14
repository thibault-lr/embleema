import { DateTime } from 'luxon';

import { Patient as PrismaPatient } from '@prisma/client';
import { BloodTypeEnum, Patient, SexEnum } from 'embleema-domain';

export namespace PatientMapper {
  export function fromPrismaPatient(patient: PrismaPatient): Patient {
    return {
      ...patient,
      sex: patient.sex as SexEnum,
      bloodType: patient.bloodType as BloodTypeEnum,
      nextVisitDate: patient.nextVisitDate ? DateTime.fromJSDate(patient.nextVisitDate).toISO()! : undefined,
    };
  }
}
