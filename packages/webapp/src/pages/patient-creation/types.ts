import { Patient } from 'embleema-domain';

export type CreatePatientFormDto = Omit<Patient, 'usualPhysician' | 'usualCareSite'> & {
  usualPhysicianFirstName: string;
  usualPhysicianLastName: string;
  usualPhysicianTitle: string;
  usualCareSiteName: string;
  usualCareSiteAddress: string;
};
