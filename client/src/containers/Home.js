import React from "react";
import './Home.css';
// import CustomButton from "../components/button";
import ImageCard from "../components/imageCard";
import images from "../assets/images";
// import { Box } from "@mui/material";
import Sidebar from "../layouts/Sidebar";
import { Grid } from "@mui/material";

const callToAction = {
  title: 'Contribute to a Greener Victoria',
  description: 'Raise awareness about energy consumption among Victorian households by enabling users to calculate their carbon.',
  goalTitle: 'Our Goal',
  goal: 'By informing users about their energy consumption habits, we home to empower them to develop stustainable habits to reduce their carbon footprint. By adopting more sustainable practices, users not only contribute to a greener Victoria but also stand to benefit from lower energy costs.'
}

const image = images.home_graph;
  const title = 'Did You Know?';
  const content = " Victoria stands out as one the largest carbon-emitting states despite its relatively small land size, contributing to 16.7% of Australia's total carbon emissions.";

export default function Home() {
  
  return (
    <Grid container spacing={1} sx={{ mt: 3, fontFamily: 'Monserrat'}}>
      <ImageCard image={image} title={title} content={content} />
      <Sidebar title={callToAction.title} description={callToAction.description} goal={callToAction.goal} goalTitle={callToAction.goalTitle} />
    </Grid>   
  );
}
