import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CustomButton from '../components/button';

function Sidebar(props) {
  const { description, title, goal, goalTitle } = props;

  return (
    <Grid item xs={12} md={6} sx={{ mb: 2}}>
      <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
        <Typography variant="h4" sx={{ color: '#077341' }} gutterBottom>
          {title}
        </Typography>
        {/* <Paper component={CustomButton} /> */}
        <CustomButton to="/calculator" height="100px" color="#ff4d00" txtColor="#FFFFFF" margin="5px">
            CALCLATE YOUR FOOTPRINT
        </CustomButton>
        {/* </Grid> */}
        {/* <Typography>
            <CustomButton></CustomButton>
        </Typography> */}
        <Grid item>
            <Typography variant="h4" gutterBottom sx={{ mt: 3, color: '#077341' }}>
                {goalTitle}
            </Typography>
            <Typography variant='h6' paragraph sx={{ textAlign: 'left'}}>{description}</Typography>           
            <Typography variant='h6' paragraph sx={{ textAlign: 'left'}}>
                {goal}
            </Typography>
        </Grid>
        
      </Paper>
    </Grid>
  );
}

export default Sidebar;