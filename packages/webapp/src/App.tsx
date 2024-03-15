import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from 'react-oidc-context';
import { Patients } from './pages/patients/Patients';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PatientCreation } from './pages/patient-creation/PatientCreation';
import useFetch from 'use-http';

function AppLoader({ children }: { children: React.ReactElement }) {
  const { isLoading, isAuthenticated, signinRedirect, user } = useAuth();
  const [redirectInitiated, setRedirectInitiated] = useState(false);
  
  useEffect(() => {
    if (isLoading === false && isAuthenticated === false && !redirectInitiated) {
      setRedirectInitiated(true);
      signinRedirect();
    }
  }, [isLoading, isAuthenticated, user, signinRedirect]);

  if (isLoading || !isAuthenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw">
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6" marginTop={2}>
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <AppLoader>
        <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/create-patient" element={<PatientCreation />} />
        </Routes>
      </AppLoader>
    </Router>
  );
}

export default App;
