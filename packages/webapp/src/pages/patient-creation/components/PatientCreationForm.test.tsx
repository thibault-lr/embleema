import 'reflect-metadata';
import { PATIENT_MOCK } from '@test/mocks/patient';
import { screen, render, fireEvent } from '@testing-library/react';
import { PatientCreationForm } from './PatientCreationForm';
import userEvent from '@testing-library/user-event';

import { vi } from 'vitest';
import 'reflect-metadata';

import * as EmbleemaDomainModule from 'embleema-domain';

describe('PatientCreationForm', () => {
  it.only('does not submit the form if invalid', () => {
    const onSubmitMock = vi.fn();
    const validatorSpy = vi.spyOn(EmbleemaDomainModule.PatientValidator, 'validatePatientEntity');
    render(<PatientCreationForm onSubmit={onSubmitMock} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(validatorSpy).toHaveBeenCalled();
  });

  it('displays a window error message if invalid', () => {
    const onSubmitMock = vi.fn();
    const windowSpy = vi.spyOn(window, 'alert');
    render(<PatientCreationForm onSubmit={onSubmitMock} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(windowSpy).toHaveBeenCalled();
  });

  it('submits the form ', async () => {
    const onSubmitMock = vi.fn();
    const validatorSpy = vi.spyOn(EmbleemaDomainModule.PatientValidator, 'validatePatientEntity');

    const { findByTestId } = render(<PatientCreationForm onSubmit={onSubmitMock} />);
    const firstName = await findByTestId('form-field-firstName');
    const lastName = await findByTestId('form-field-lastName');
    const socialSecurityId = await findByTestId('form-field-socialSecurityId');
    const condition = await findByTestId('form-field-condition');
    const usualPhysicianTitle = await findByTestId('form-field-usualPhysicianTitle');
    const usualPhysicianFirstName = await findByTestId('form-field-usualPhysicianFirstName');
    const usualPhysicianLastName = await findByTestId('form-field-usualPhysicianLastName');
    const usualCareSiteName = await findByTestId('form-field-usualCareSiteName');
    const usualCareSiteAddress = await findByTestId('form-field-usualCareSiteAddress');
    const nextVisitDateParent = await findByTestId('form-field-nextVisitDate'); // Data-test-id is not spread to input
    const nextVisitDate = nextVisitDateParent.querySelector('input')!;

    await userEvent.type(firstName, PATIENT_MOCK.firstName);
    await userEvent.type(lastName, PATIENT_MOCK.lastName);
    await userEvent.type(socialSecurityId, PATIENT_MOCK.socialSecurityId);
    await userEvent.type(condition, PATIENT_MOCK.condition);
    await userEvent.type(usualPhysicianTitle, PATIENT_MOCK.usualPhysician.title);
    await userEvent.type(usualPhysicianFirstName, PATIENT_MOCK.usualPhysician.firstName);
    await userEvent.type(usualPhysicianLastName, PATIENT_MOCK.usualPhysician.lastName);
    await userEvent.type(usualCareSiteName, PATIENT_MOCK.usualCareSite.name);
    await userEvent.type(usualCareSiteAddress, PATIENT_MOCK.usualCareSite.address);
    await userEvent.type(nextVisitDate, PATIENT_MOCK.nextVisitDate);

    fireEvent.click(screen.getByRole('button'));

    expect(onSubmitMock).toHaveBeenCalled();
    expect(validatorSpy).toHaveBeenCalled();
  });
});
