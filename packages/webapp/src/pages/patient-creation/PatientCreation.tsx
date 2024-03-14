import React, { useState } from 'react';
import { Snackbar, Typography } from '@mui/material';
import { CreatePatientDto, Patient } from 'embleema-domain';
import { PatientCreationForm } from './components/PatientCreationForm';

import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import useFetch from 'use-http';
import { readFromEnv } from '@src/utils/env';

const API_URL = readFromEnv('VITE_EMBLEEMA_API_URL');

export function PatientCreation() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { post, response } = useFetch<Patient[]>(API_URL, {
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (patient: CreatePatientDto) => {
    console.log('post', patient);
    await post('/patients', patient);

    if (response.ok) {
      setSnackbarMessage('Patient created successfully!');
      setOpenSnackbar(true);
    }

    try {
      setSnackbarMessage('Patient created successfully!');
      setOpenSnackbar(true);
      navigate('/');
    } catch (error) {
      setSnackbarMessage('Failed to create patient.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Typography variant="h2"> New Patient </Typography>
      <PatientCreationForm onSubmit={handleSubmit} />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
    </>
  );
}
