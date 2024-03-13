import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useFetch } from 'use-http';
import { PatientsTable } from './components/PatientsTable';
import { Box, Grid } from '@mui/material';
import { PatientsDetail } from './components/PatientDetail';
import { PatientEntityMapper } from '../entities/patient.entity-mapper';
import { Patient } from '../types';

export function Home() {
  const { user } = useAuth();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const { get, response, loading } = useFetch('http://localhost:3000', {
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

  async function initializePatients() {
    const responsePatients = await get('/patients');

    if (response.ok) {
      const patients = PatientEntityMapper.fromFindPatientsResponse(responsePatients);
      setPatients(patients);
    }
  }

  const handlePatientSelected = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handlePatientDetailClose = () => {
    setSelectedPatient(null);
  };

  return (
    <>
      {loading && <Box>Loading...</Box>}

      {!loading && (
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
      )}
    </>
  );
}
