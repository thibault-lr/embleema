import { CreatePatientDto } from 'embleema-domain';
import { pick } from 'lodash';
import { CreatePatientFormDto } from '../pages/patient-creation/types';

export namespace CreatePatientFormDtoMapper {
  export function fromCreatePatientFormDto(patientDto: CreatePatientFormDto): CreatePatientDto {
    return {
      ...pick(patientDto, [
        'sex',
        'firstName',
        'lastName',
        'condition',
        'socialSecurityId',
        'bloodType',
        'nextVisitDate',
      ]),
      usualPhysician: {
        title: patientDto.usualPhysicianTitle,
        firstName: patientDto.usualPhysicianFirstName,
        lastName: patientDto.usualPhysicianLastName,
      },
      usualCareSite: { name: patientDto.usualCareSiteName, address: patientDto.usualCareSiteAddress },
    };
  }
}
