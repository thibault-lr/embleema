import { useEffect, useState } from 'react';
import 'reflect-metadata';
import { PatientsTable } from './components/PatientsTable';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Patient } from 'embleema-domain';

import { PatientsDetail } from './components/PatientDetail';
import { useCustomFetch } from '@src/hooks/custom-fetch';

export function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { get, response, loading } = useCustomFetch<Patient[]>();

  useEffect(() => {
    const initializePatients = async () => {
      const responsePatients = await get('/patients');

      if (response.ok) {
        setPatients(responsePatients);
      }
    };

    initializePatients();
  }, [get, response]);

  const handlePatientSelected = (patient: Patient) => setSelectedPatient(patient);
  const handlePatientDetailClose = () => setSelectedPatient(null);
  const handleFormOpen = () => navigate('create-patient');

  if (loading) return <Box>Loading...</Box>;

  return (
    <>
      <Typography variant="h3"> Patients </Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={handleFormOpen} id="btn-create-patient">
          Create a new patient
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={selectedPatient !== null ? 3 : 12}>
          <PatientsTable
            patientSelected={selectedPatient !== null}
            patients={patients}
            onPatientSelected={handlePatientSelected}
          />
        </Grid>
        {selectedPatient !== null && (
          <Grid item xs={9}>
            <PatientsDetail patient={selectedPatient} onPatientDetailClose={handlePatientDetailClose} />
          </Grid>
        )}
      </Grid>
    </>
  );
}
