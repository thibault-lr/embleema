import { Patient } from '../types';

export namespace PatientEntityMapper {
  export function fromFindPatientsResponse(response: unknown): Patient[] {

    // TODO: Validation mapping
    return response as Patient[];
  }
}
