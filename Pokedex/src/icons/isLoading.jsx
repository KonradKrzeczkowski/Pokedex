import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const IsLoading = ({ size = 40, message = 'Ładowanie...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      padding="20px"
    >
      <CircularProgress size={size} />
      <span style={{ marginTop: '10px', color: '#555' }}>{message}</span>
    </Box>
  );
};

export default IsLoading;