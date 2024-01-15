import React from 'react';
import DrawerAppBar from './DrawerAppBar';
import Banner from '../components/banner';
import { Container, CssBaseline, Grid, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
// import Content from './Content';
// import Footer from './Footer';

const defaultTheme = createTheme({
    palette: {
        background: {
          default: '#e5e5e5', // Set your desired background color here
        },
      },
      typography: {
        fontFamily: 'Montserrat'
      }
});

const Layout =({children}) =>{
    return(
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ backgroundColor: 'background.default' }}>
            <DrawerAppBar />
            <Grid item xs={12} md={6}>
              <Banner />
              {/* <Content>{children}</Content> */}
              <main>{children}</main>
              {/* <Footer /> */}
            </Grid>
            
        </Container>          
    </ThemeProvider>       
    );
}

export default Layout;