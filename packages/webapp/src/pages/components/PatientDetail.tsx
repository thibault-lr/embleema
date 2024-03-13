import { Box, Typography, Paper, IconButton, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Patient } from '../../types';

interface PatientsDetailProps {
  patient: Patient;
  onPatientDetailClose: () => void;
}

export function PatientsDetail({ patient, onPatientDetailClose }: PatientsDetailProps) {
  const patientFullName = `${patient.firstName} ${patient.lastName}`;

  const patientDetailProperties = [
    { label: 'Gender', value: patient.sex },
    { label: 'First Name', value: patient.firstName },
    { label: 'Last Name', value: patient.lastName },
    { label: 'Social Security Number', value: patient.firstName },
    { label: 'Blood type', value: patient.bloodType },
    { label: 'Condition', value: patient.condition },
    { label: 'Next Visit Date', value: patient.nextVisitDate },
    {
      label: 'Usual Physicial',
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
            <Grid item xs={12}>
              <Typography variant="subtitle1"> {label} </Typography>
              <TextField
                value={value}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField label="First Name" value={patient.firstName} fullWidth InputProps={{ readOnly: true }} />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Last Name" value={patient.lastName} fullWidth InputProps={{ readOnly: true }} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Social Security Number"
              value={patient.socialSecurityId}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Sex" value={patient.sex} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Blood Type" value={patient.bloodType} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Condition" value={patient.condition} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Next Visit Date"
              value={patient.nextVisitDate}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Usual Physician"
              value={`${patient.usualPhysician.title} ${patient.usualPhysician.firstName} ${patient.usualPhysician.lastName}`}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Usual Care Site"
              value={patient.usualCareSite.name}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Care Site Address"
              value={patient.usualCareSite.address}
              fullWidth
              multiline
              minRows={2}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
