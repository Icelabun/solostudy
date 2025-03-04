import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Social = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper 
        sx={{ 
          p: 3,
          background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
          border: '1px solid rgba(76, 170, 255, 0.3)',
          boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
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
          Shadow Exchange
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff' }}>
          Connect with fellow hunters and share your knowledge. This feature is coming soon...
        </Typography>
      </Paper>
    </Container>
  );
};

export default Social;
