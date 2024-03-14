import 'reflect-metadata';
import React, { useState } from 'react';
import { Grid, Typography, TextField, MenuItem, Button, CardContent, Card } from '@mui/material';
import { BloodTypeEnum, CreatePatientDto, Patient, PatientValidator, SexEnum } from 'embleema-domain';
import { CreatePatientFormDtoMapper } from '../../../mappers/create-patient-form-dto.mapper';

type PatientCreationProps = {
  onSubmit: (patient: CreatePatientDto) => void;
};

export type CreatePatientFormDto = Omit<Patient, 'id' | 'usualPhysician' | 'usualCareSite'> & {
  usualPhysicianFirstName: string;
  usualPhysicianLastName: string;
  usualPhysicianTitle: string;
  usualCareSiteName: string;
  usualCareSiteAddress: string;
};

export function PatientCreationForm({ onSubmit }: PatientCreationProps) {
  const [patient, setPatient] = useState<CreatePatientFormDto>({
    firstName: '',
    lastName: '',
    socialSecurityId: '',
    sex: SexEnum.MALE, // Default value
    bloodType: BloodTypeEnum['A+'], // Default value
    condition: '',
    usualPhysicianTitle: '',
    usualPhysicianFirstName: '',
    usualPhysicianLastName: '',
    usualCareSiteName: '',
    usualCareSiteAddress: '',
    nextVisitDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const inputPatient = CreatePatientFormDtoMapper.fromCreatePatientFormDto(patient);

      // Act likes form validation
      const validatedPatient = PatientValidator.validatePatientEntity(CreatePatientDto, inputPatient);

      // console.log(validatedPatient, patient)
      onSubmit(validatedPatient);
    } catch (formErrors) {
      console.log(formErrors);

      // Ideally it should be redered to UI
      alert('Errors in the form, check the console for the details');
    }
  };

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
            InputLabelProps={{
              shrink: true,
            }}
            value={patient.nextVisitDate}
            onChange={handleChange}
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
