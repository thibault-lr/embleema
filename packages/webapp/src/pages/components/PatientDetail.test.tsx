import { PATIENT_MOCK } from '@test/mocks/patient';
import { screen, render, fireEvent } from '@testing-library/react';
import { PatientsDetail } from './PatientDetail';
import { vi } from 'vitest';

describe('PatientsDetail', () => {
  it('renders', () => {
    const container = render(<PatientsDetail patient={PATIENT_MOCK} onPatientDetailClose={vi.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it('calls the onPatientDetailClose handler when close icon is clicked', () => {
    const onPatientDetailCloseMock = vi.fn();

    render(<PatientsDetail patient={PATIENT_MOCK} onPatientDetailClose={onPatientDetailCloseMock} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onPatientDetailCloseMock).toHaveBeenCalled();
  });
});
