import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { PatientsTable } from './PatientsTable';

import { PATIENT_MOCK } from '@test/mocks/patient';

describe('PatientsTable', () => {
  it('displays the full name of the patients', () => {
    render(<PatientsTable onPatientSelected={() => {}} patients={[PATIENT_MOCK]} patientSelected={false} />);

    expect(screen.getByText('William Miller')).toBeInTheDocument();
    console.log(screen.queryAllByText('usualPhysicianName'));
  });

  it('displays the additional columns', () => {
    render(<PatientsTable onPatientSelected={() => {}} patients={[PATIENT_MOCK]} patientSelected={false} />);

    expect(screen.getByText('Next Visit Date')).toBeInTheDocument();
    expect(screen.getByText('Medical Center')).toBeInTheDocument();
  });

  describe('when a patient has been selected', () => {
    it('hides the additional columns', () => {
      render(<PatientsTable onPatientSelected={() => {}} patients={[PATIENT_MOCK]} patientSelected={true} />);

      expect(screen.queryAllByText('Next Visit Date')).toEqual([]);
      expect(screen.queryAllByText('Medical Center')).toEqual([]);
    });

    it('hides the pagination', () => {
      render(<PatientsTable onPatientSelected={() => {}} patients={[PATIENT_MOCK]} patientSelected={true} />);

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  it('calls onPatientSelected when a row is clicked', () => {
    const handlePatientSelected = vi.fn();
    render(
      <PatientsTable onPatientSelected={handlePatientSelected} patients={[PATIENT_MOCK]} patientSelected={false} />,
    );

    const firstRow = screen.getAllByRole('row')[1];
    fireEvent.click(firstRow);

    expect(handlePatientSelected).toHaveBeenCalledWith(PATIENT_MOCK);
  });
});
