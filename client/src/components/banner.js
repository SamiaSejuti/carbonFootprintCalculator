import React from "react";
import { Box, createTheme, Grid, Paper, responsiveFontSizes, ThemeProvider, Typography } from "@mui/material";
import images from '../assets/images';

export default function Banner() {

  const bannerTheme = createTheme({
    typography: {
      fontFamily: 'Playlist-Script, arial, sans-serif',
    },
    palette: {
      primary: {
        main: '#077341',
      },
      secondary: {
        main: '#E7E9E4',
      }
    },
  });
  const theme = responsiveFontSizes(bannerTheme);

  const title = "Carbone-Zéro";
  const motto = "Calculate your carbon emission now";
  const imageText = "Carbone Zero banner";

  return (
    <ThemeProvider theme={theme}>
      <Paper 
        sx={{ 
          position: 'relative', 
          // backgroundColor: 'grey.800',
          color: '#fff',
          mt: 1,
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${images.banner})`,
        }}
      >
        {<img style={{ display: 'none'}} src={images.banner} alt={imageText} />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,

          }}
        />
          <Grid container>
            <Grid item md={6}>
              <Box sx={{ position: 'relative', p: {xs: 3, md: 6 }, pr: { md: 0 },}}>
                <Typography variant="h1" color="primary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h4" color="secondary" paragraph>
                  {motto}
                </Typography>
              </Box>
            </Grid>
          </Grid>      
      </Paper>
    </ThemeProvider>   
  );
}
