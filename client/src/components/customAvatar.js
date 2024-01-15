import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';

export default function CustomAvatar({ image, text, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Avatar alt={text} src={image} />
      <Typography variant='h6' sx={{ pl: 2, width: '150px'}}>{label}</Typography>
    </Box>
      
  );
}