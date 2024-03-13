import { DateTime } from 'luxon';
import { SexEnum, BloodTypeEnum } from '../../src/types';

export const PATIENT_MOCK = {
  id: 'id',
  firstName: 'William',
  lastName: 'Miller',
  socialSecurityId: '568-93-6214',
  sex: SexEnum.MALE,
  bloodType: BloodTypeEnum['A+'],
  condition: 'Hypertension',
  usualPhysician: {
    firstName: 'Emily',
    lastName: 'Gonzalez',
    title: 'Dr.',
  },
  usualCareSite: {
    name: 'Medical Center North',
    address: '496 Main St, Anytown, AN 49521',
  },
  nextVisitDate: DateTime.utc().toISO(),
};
