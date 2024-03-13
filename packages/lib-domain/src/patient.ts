export enum SexEnum {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum BloodTypeEnum {
  'A+' = 'A+',
  'A-' = 'A-',
  'B-' = 'B-',
  'B+' = 'B+',
  'AB+' = 'AB+',
  'AB-' = 'AB-',
  'O+' = 'O+',
  'O-' = 'O-',
}

type Physician = {
  firstName: string;
  lastName: string;
  title: string;
};

type CareSite = {
  name: string;
  address: string;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  socialSecurityId: string;
  sex: SexEnum;
  bloodType: BloodTypeEnum;
  condition: string;
  usualPhysician: Physician;
  usualCareSite: CareSite;
  nextVisitDate: string; // YYYY-MM-DD format
};
