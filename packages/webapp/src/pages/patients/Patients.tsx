import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import 'reflect-metadata';
import { useFetch } from 'use-http';
import { PatientsTable } from './components/PatientsTable';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Patient } from 'embleema-domain';

import { readFromEnv } from '../../utils/env';
import { PatientsDetail } from './components/PatientDetail';

const API_URL = readFromEnv('VITE_EMBLEEMA_API_URL');

export function Patients() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const { get, response, loading } = useFetch<Patient[]>(API_URL, {
    interceptors: {
      request: ({ options }) => {
        if (user?.access_token === undefined) {
          throw new Error('Access token undefined');
        }

        const reqHeaders = new Headers(options.headers);

        reqHeaders.set('Authorization', `Bearer ${user.access_token}`);

        options.headers = reqHeaders;

        return options;
      },
    },
  });

  useEffect(() => {
    initializePatients();
  }, []);

  const initializePatients = async () => {
    const responsePatients = await get('/patients');

    if (response.ok) {
      setPatients(responsePatients);
    }
  };

  const handlePatientSelected = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handlePatientDetailClose = () => {
    setSelectedPatient(null);
  };

  const handleFormOpen = () => {
    navigate('create-patient');
  };

  return (
    <>
      {loading && <Box>Loading...</Box>}

      {!loading && (
        <>
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
      )}
    </>
  );
}
