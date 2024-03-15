import { CreatePatientDto } from 'embleema-domain';

export type CreatePatientFormDto = Omit<CreatePatientDto, 'usualPhysician' | 'usualCareSite'> & {
  usualPhysicianFirstName: string;
  usualPhysicianLastName: string;
  usualPhysicianTitle: string;
  usualCareSiteName: string;
  usualCareSiteAddress: string;
};

export interface CreatePatientFormError {
  target: unknown; 
  value: unknown; 
  property: string;
  children: CreatePatientFormError[];
  constraints?: {
     [key: string]: string;
  };
 }
