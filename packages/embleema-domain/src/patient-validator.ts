import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export namespace PatientValidator {
  // Generic validator since the InputDto are similar
  export function validatePatientEntity<Entity extends object>(
    entity: ClassConstructor<Entity>,
    patientInput: unknown,
  ): Entity {
    const instance = plainToInstance(entity, patientInput);

    const errors = validateSync(instance);

    if (errors.length) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw errors;
    }

    return instance;
  }
}
