import { CreatePatientDto } from 'embleema-domain';

export type CreatePatientFormDto = Omit<CreatePatientDto, 'usualPhysician' | 'usualCareSite'> & {
  usualPhysicianFirstName: string;
  usualPhysicianLastName: string;
  usualPhysicianTitle: string;
  usualCareSiteName: string;
  usualCareSiteAddress: string;
};

export type CreatePatientFormErrorDto = { [K in keyof Required<CreatePatientFormDto>]: boolean };
