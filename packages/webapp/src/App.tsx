import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from 'react-oidc-context';
import { Home } from './pages/Home';

function App() {
  const { isLoading, isAuthenticated, signinRedirect, user } = useAuth();

  useEffect(() => {
    if (isLoading === false && isAuthenticated === false) {
      signinRedirect();
    }
  }, [isLoading, isAuthenticated, user]);

  return (
    <div>
      {(isLoading || !isAuthenticated) && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw">
          <Box textAlign="center">
            <CircularProgress />
            <Typography variant="h6" marginTop={2}>
              Loading...
            </Typography>
          </Box>
        </Box>
      )}

      {isAuthenticated && <Home />}
    </div>
  );
}

export default App;
