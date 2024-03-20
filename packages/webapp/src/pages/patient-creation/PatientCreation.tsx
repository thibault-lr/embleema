import React, { useState } from 'react';
import { Box, IconButton, Snackbar, SnackbarProps, Typography } from '@mui/material';
import { CreatePatientDto, Patient } from 'embleema-domain';

import { useNavigate } from 'react-router-dom';

import { PatientCreationForm } from './components/PatientCreationForm';
import { useCustomFetch } from '@src/hooks/custom-fetch';

type SnackbarState = Pick<SnackbarProps, 'open' | 'message'>;

export function PatientCreation() {
  const navigate = useNavigate();
  const { post, response } = useCustomFetch<Patient>();

  const [snackbarState, setSnackbarState] = useState<SnackbarState>({ open: false, message: '' });

  const handleSubmit = async (patient: CreatePatientDto) => {
    try {
      await post('/patients', patient);

      if (response.ok) {
        setSnackbarState({ message: 'Patient created successfully!', open: true });
        navigate('/');
      } else {
        setSnackbarState({ message: 'Failed to create patient.', open: true });
      }
    } catch (error) {
      setSnackbarState({ message: 'Failed to create patient.', open: true });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  const handleCloseButtonClick = () => {
    navigate('/');
  };

  return (
    <Box padding={1}>
      <Box width="100%" display={'inline-flex'} justifyContent={'space-around'}>
        <Typography variant="h2"> New Patient </Typography>
        <IconButton edge="end" color="inherit" onClick={handleCloseButtonClick} aria-label="go back">
          <Typography variant="h4"> X </Typography>
        </IconButton>
      </Box>
      <PatientCreationForm onSubmit={handleSubmit} />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarState.message}
      />
    </Box>
  );
}
