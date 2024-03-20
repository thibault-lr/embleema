import { ValidationError } from 'class-validator';
import { PATIENT_CREATION_FORM_ERRORS_INITIAL_STATE } from '../components/PatientCreationForm';
import { CreatePatientFormErrorDto } from '../types';
import { plainToClass } from 'class-transformer';

export namespace CreatePatientFormErrorDtoMapper {
  export function fromFormErrors(errors: Record<string, unknown>[]): CreatePatientFormErrorDto {
    const defaultErrors = PATIENT_CREATION_FORM_ERRORS_INITIAL_STATE;
    const fieldKeys = Object.keys(PATIENT_CREATION_FORM_ERRORS_INITIAL_STATE);

    return errors.reduce<CreatePatientFormErrorDto>((allErrors, error) => {
      const validationError = plainToClass(ValidationError, error);

      if (validationError.children?.length === 0 && fieldKeys.includes(validationError.property)) {
        allErrors[validationError.property as keyof CreatePatientFormErrorDto] = true;
      }

      if (validationError.property === 'usualPhysician') {
        if (validationError.children && validationError.children.length > 0) {
          for (const childrenError of validationError.children) {
            if (childrenError.property === 'title') {
              allErrors.usualPhysicianTitle = true;
            }

            if (childrenError.property === 'firstName') {
              allErrors.usualPhysicianFirstName = true;
            }

            if (childrenError.property === 'lastName') {
              allErrors.usualPhysicianLastName = true;
            }
          }
        }
      }

      if (validationError.property === 'usualCareSite') {
        if (validationError.children && validationError.children.length > 0) {
          for (const childrenError of validationError.children) {
            if (childrenError.property === 'name') {
              allErrors.usualCareSiteName = true;
            }

            if (childrenError.property === 'address') {
              allErrors.usualCareSiteAddress = true;
            }
          }
        }
      }

      return allErrors;
    }, defaultErrors);
  }
}
