import React from 'react';
import { Box } from '@mui/material';

const Content = ({children}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Content;