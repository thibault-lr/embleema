import { Patient } from '../types';

export namespace PatientEntityMapper {
  export function fromFindPatientsResponse(response: unknown): Patient[] {
    return response as Patient[];
  }
}
