import { DateTime } from 'luxon';

import { Patient as PrismaPatient } from '@prisma/client';
import { Patient } from '@src/endpoints/patients/dto/patient.dto';

export namespace PatientMapper {
  export function fromPrismaPatient(patient: PrismaPatient): Patient {
    return {
      ...patient,
      nextVisitDate: patient.nextVisitDate ? DateTime.fromJSDate(patient.nextVisitDate).toISO() : null,
    };
  }
}
