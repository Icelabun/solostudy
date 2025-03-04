import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from '@mui/material';
import {
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  Description as DocumentIcon,
  Quiz as QuizIcon,
} from '@mui/icons-material';

const MaterialCard = ({ title, icon, description }) => (
  <Card 
    sx={{ 
      height: '100%',
      background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
      border: '1px solid rgba(76, 170, 255, 0.3)',
      boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 0 20px rgba(76, 170, 255, 0.4)',
        '& .MuiSvgIcon-root': {
          transform: 'scale(1.1)',
          filter: 'drop-shadow(0 0 4px rgba(76, 170, 255, 0.8))',
        },
      },
    }}
  >
    <CardActionArea sx={{ height: '100%' }}>
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 2,
          }}
        >
          {icon}
          <Typography 
            variant="h6" 
            sx={{ 
              ml: 1,
              color: '#4CAAFF',
              textShadow: '0 0 10px rgba(76, 170, 255, 0.3)',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const StudyMaterials = () => {
  const materials = [
    {
      title: 'Study Guides',
      icon: <BookIcon sx={{ color: '#4CAAFF', fontSize: 30 }} />,
      description: 'Comprehensive guides and notes for various subjects. Master the fundamentals and advanced concepts.',
    },
    {
      title: 'Video Lectures',
      icon: <VideoIcon sx={{ color: '#4CAAFF', fontSize: 30 }} />,
      description: 'Watch expert instructors explain complex topics in an engaging way.',
    },
    {
      title: 'Practice Problems',
      icon: <QuizIcon sx={{ color: '#4CAAFF', fontSize: 30 }} />,
      description: 'Test your knowledge with a variety of practice problems and solutions.',
    },
    {
      title: 'Reference Materials',
      icon: <DocumentIcon sx={{ color: '#4CAAFF', fontSize: 30 }} />,
      description: 'Quick reference guides, formulas, and important concepts for quick review.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        sx={{ 
          p: 3,
          background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
          border: '1px solid rgba(76, 170, 255, 0.3)',
          boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
          mb: 4,
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            color: '#4CAAFF',
            textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
          }}
        >
          Skill Library
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff' }}>
          Access a vast collection of study materials to enhance your knowledge and skills.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {materials.map((material, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MaterialCard {...material} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudyMaterials;
