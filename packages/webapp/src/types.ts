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

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  socialSecurityId: string;
  sex: SexEnum;
  bloodType: BloodTypeEnum;
  condition: string;
  usualPhysician: {
    firstName: string;
    lastName: string;
    title: string;
  };
  usualCareSite: {
    name: string;
    address: string;
  };
  nextVisitDate: string; // YYYY-MM-DD format
};
