import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const ImageCard = ({ image, title, content }) => {
  return (
    <Grid item xs={12} md={6} sx={{ mb: 2}}>
      <Card sx={{ height: '100%'}}>
        <CardMedia component="img"
          image={image} // Image passed as a prop
        />
        <CardContent>
          <Typography sx={{ color: '#077341'}} gutterBottom variant="h4">
            {title} {/* Title passed as a prop */}
          </Typography>
          <Typography variant="h6" paragraph sx={{ textAlign: 'left'}}>
            {content} {/* Content passed as a prop */}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    
  );
};

export default ImageCard;