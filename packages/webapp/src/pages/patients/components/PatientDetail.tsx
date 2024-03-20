import { Box, Typography, Paper, IconButton, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Patient } from 'embleema-domain';
import React from 'react';

interface PatientsDetailProps {
  patient: Patient;
  onPatientDetailClose: () => void;
}
const PatientsDetail: React.FC<PatientsDetailProps> = React.memo(({ patient, onPatientDetailClose }) => {
  const patientFullName = `${patient.firstName} ${patient.lastName}`;

  const patientDetailProperties = [
    { label: 'Gender', value: patient.sex },
    { label: 'First Name', value: patient.firstName },
    { label: 'Last Name', value: patient.lastName },
    { label: 'Social Security Number', value: patient.socialSecurityId },
    { label: 'Blood type', value: patient.bloodType },
    { label: 'Condition', value: patient.condition },
    { label: 'Next Visit Date', value: patient.nextVisitDate },
    {
      label: 'Usual Physician',
      value: `${patient.usualPhysician.title} ${patient.usualPhysician.firstName} ${patient.usualPhysician.lastName}`,
    },
    { label: 'Usual Care Site', value: patient.usualCareSite.name },
    { label: 'Usual Care Address', value: patient.usualCareSite.address },
  ];

  return (
    <Box my={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Patient {patientFullName}
        </Typography>
        <IconButton onClick={onPatientDetailClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {patientDetailProperties.map(({ label, value }) => (
            <Grid item xs={12} key={label}>
              <Typography variant="subtitle1">{label}</Typography>
              <TextField
                value={value}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
});

export { PatientsDetail };
