import 'reflect-metadata';
import React, { useCallback, useState } from 'react';
import { Grid, Typography, TextField, MenuItem, Button, CardContent, Card } from '@mui/material';
import { BloodTypeEnum, CreatePatientDto, PatientValidator, SexEnum } from 'embleema-domain';

import { CreatePatientFormDtoMapper } from '../mappers/create-patient-form-dto.mapper';
import { CreatePatientFormDto, CreatePatientFormErrorDto } from '../types';
import { CreatePatientFormErrorDtoMapper } from '../mappers/create-patient-form-error-dto.mapper';

type PatientCreationProps = {
  onSubmit: (patient: CreatePatientDto) => void;
};

const PATIENT_CREATION_FORM_INITIAL_STATE = {
  firstName: '',
  lastName: '',
  socialSecurityId: '',
  sex: SexEnum.MALE,
  bloodType: BloodTypeEnum['A+'],
  condition: '',
  usualPhysicianTitle: '',
  usualPhysicianFirstName: '',
  usualPhysicianLastName: '',
  usualCareSiteName: '',
  usualCareSiteAddress: '',
  nextVisitDate: '',
};

export const PATIENT_CREATION_FORM_ERRORS_INITIAL_STATE: CreatePatientFormErrorDto = {
  firstName: false,
  lastName: false,
  socialSecurityId: false,
  sex: false,
  bloodType: false,
  condition: false,
  usualPhysicianTitle: false,
  usualPhysicianFirstName: false,
  usualPhysicianLastName: false,
  usualCareSiteName: false,
  usualCareSiteAddress: false,
  nextVisitDate: false,
};

export function PatientCreationForm({ onSubmit }: PatientCreationProps) {
  const [patient, setPatient] = useState<CreatePatientFormDto>(PATIENT_CREATION_FORM_INITIAL_STATE);
  const [errors, setErrors] = useState<CreatePatientFormErrorDto>(PATIENT_CREATION_FORM_ERRORS_INITIAL_STATE);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPatient((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (value.length > 0) {
        setErrors((prevState) => ({
          ...prevState,
          [name]: false,
        }));
      }
    },
    [patient, errors],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const inputPatient = CreatePatientFormDtoMapper.fromCreatePatientFormDto(patient);
        const validatedPatient = PatientValidator.validatePatientEntity(CreatePatientDto, inputPatient);
        onSubmit(validatedPatient);
      } catch (formErrors) {
        if (Array.isArray(formErrors)) {
          const errors = CreatePatientFormErrorDtoMapper.fromFormErrors(formErrors);

          setErrors((prevState) => ({ ...prevState, ...errors }));
        } else {
          throw formErrors;
        }
      }
    },
    [patient, errors],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Patient Information</Typography>
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            id="form-field-sex"
            data-testid="form-field-sex"
            select
            fullWidth
            label="Sex"
            name="sex"
            value={patient.sex}
            onChange={handleChange}
            error={errors.sex}
            helperText={errors.sex ? 'Sex is required' : undefined}
          >
            {Object.values(SexEnum).map((sex) => (
              <MenuItem key={sex} value={sex}>
                {sex}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} sm={5}>
          <TextField
            inputProps={{ id: 'form-field-firstName', 'data-testid': 'form-field-firstName' }}
            fullWidth
            label="First Name"
            name="firstName"
            value={patient.firstName}
            onChange={handleChange}
            error={errors.firstName}
            helperText={errors.firstName ? 'First name is required' : undefined}
          />
        </Grid>
        <Grid item xs={4} sm={5}>
          <TextField
            inputProps={{ id: 'form-field-lastName', 'data-testid': 'form-field-lastName' }}
            fullWidth
            label="Last Name"
            name="lastName"
            value={patient.lastName}
            onChange={handleChange}
            error={errors.lastName}
            helperText={errors.lastName ? 'Last name is required' : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ id: 'form-field-socialSecurityId', 'data-testid': 'form-field-socialSecurityId' }}
            fullWidth
            label="Social Security ID"
            name="socialSecurityId"
            value={patient.socialSecurityId}
            onChange={handleChange}
            error={errors.socialSecurityId}
            helperText={errors.socialSecurityId ? 'Social Security ID is required and format XXX-XX-XXXX' : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ id: 'form-field-bloodType', 'data-testid': 'form-field-bloodType' }}
            select
            fullWidth
            label="Blood Type"
            name="bloodType"
            value={patient.bloodType}
            onChange={handleChange}
            error={errors.bloodType}
            helperText={errors.bloodType ? 'Blood type is required' : undefined}
          >
            {Object.values(BloodTypeEnum).map((bloodType) => (
              <MenuItem key={bloodType} value={bloodType}>
                {bloodType}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputProps={{ id: 'form-field-condition', 'data-testid': 'form-field-condition' }}
            fullWidth
            label="Condition"
            name="condition"
            value={patient.condition}
            onChange={handleChange}
            error={errors.condition}
            helperText={errors.condition ? 'Condition is required' : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ marginTop: 3 }}>
            <CardContent>
              <Typography variant="h6">Physician Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    inputProps={{
                      id: 'form-field-usualPhysicianTitle',
                      'data-testid': 'form-field-usualPhysicianTitle',
                    }}
                    fullWidth
                    label="Physician Title"
                    name="usualPhysicianTitle"
                    value={patient.usualPhysicianTitle}
                    onChange={handleChange}
                    error={errors.usualPhysicianTitle}
                    helperText={errors.usualPhysicianTitle ? 'Physician title is required' : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    inputProps={{
                      id: 'form-field-usualPhysicianFirstName',
                      'data-testid': 'form-field-usualPhysicianFirstName',
                    }}
                    fullWidth
                    label="Physician First Name"
                    name="usualPhysicianFirstName"
                    value={patient.usualPhysicianFirstName}
                    onChange={handleChange}
                    error={errors.usualPhysicianFirstName}
                    helperText={errors.usualPhysicianFirstName ? 'Physician first name is required' : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    inputProps={{
                      id: 'form-field-usualPhysicianLastName',
                      'data-testid': 'form-field-usualPhysicianLastName',
                    }}
                    fullWidth
                    label="Physician Last Name"
                    name="usualPhysicianLastName"
                    value={patient.usualPhysicianLastName}
                    onChange={handleChange}
                    error={errors.usualPhysicianLastName}
                    helperText={errors.usualPhysicianLastName ? 'Physician last name is required' : undefined}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ marginTop: 3 }}>
            <CardContent>
              <Typography variant="h6">Usual Care Site</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    inputProps={{ id: 'form-field-usualCareSiteName', 'data-testid': 'form-field-usualCareSiteName' }}
                    fullWidth
                    label="Care Site Name"
                    name="usualCareSiteName"
                    value={patient.usualCareSiteName}
                    onChange={handleChange}
                    error={errors.usualCareSiteName}
                    helperText={errors.usualCareSiteName ? 'Care site name is required' : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    inputProps={{
                      id: 'form-field-usualCareSiteAddress',
                      'data-testid': 'form-field-usualCareSiteAddress',
                    }}
                    label="Care Site Address"
                    name="usualCareSiteAddress"
                    value={patient.usualCareSiteAddress}
                    onChange={handleChange}
                    error={errors.usualCareSiteAddress}
                    helperText={errors.usualCareSiteAddress ? 'Care site address is required' : undefined}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="form-field-nextVisitDate"
            data-testid="form-field-nextVisitDate"
            fullWidth
            type="date"
            label="Next Visit Date"
            name="nextVisitDate"
            value={patient.nextVisitDate}
            onChange={handleChange}
            error={errors.nextVisitDate}
            helperText={errors.nextVisitDate ? 'Next visit date is required' : undefined}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
