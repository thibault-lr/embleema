import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

function App() {
  const { isLoading, isAuthenticated, signinRedirect, user } = useAuth();

  useEffect(() => {
    if (isLoading === false && isAuthenticated === false) {
      signinRedirect();
    }
  }, [isLoading, isAuthenticated, user]);

  return (
    <>
      <h1>Embleema</h1>

      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {isAuthenticated && <h1> Connected </h1>}
    </>
  );
}

export default App;
