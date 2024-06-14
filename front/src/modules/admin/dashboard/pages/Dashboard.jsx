import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';
import InfoIcon from '@mui/icons-material/Info';

const Dashboard = () => {
  const cards = [
    { icon: <LightbulbIcon sx={{ fontSize: 40, color: '#FFC107' }} />, text: 'Design a fun coding game' },
    { icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#F50057' }} />, text: 'Create a workout plan' },
    { icon: <SpaIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, text: 'Plan a relaxing day' }
  ];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', backgroundColor: '#ffffff' }}>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item key={index}>
            <Card sx={{ width: 270, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 3 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {card.icon}
                <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                  {card.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
