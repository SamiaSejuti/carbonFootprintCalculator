import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import './button.css';
import { CardActionArea, CardContent, Grid, Paper, Typography, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const CustomButton = ({ to, height, color, txtColor, margin }) => {
  const btnTheme = createTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: '#FFFFFF',
      }
    }
  });

  return (
    <ThemeProvider theme={btnTheme}>
      
        <Paper elevation={2} sx={{ bgcolor: color, height: height, color: txtColor, m: margin}}>
          
            <CardActionArea component={NavLink} to={to} >
              <Grid item xs={12} md={12} >
                <CardContent>
                  <Typography variant='h5' gutterBottom>
                    CALCULATE YOUR FOOTPRINT
                  </Typography>
                </CardContent>
                </Grid>       
            </CardActionArea>
          
        </Paper>
        
      
    </ThemeProvider>
    
  );
};

export default CustomButton;
