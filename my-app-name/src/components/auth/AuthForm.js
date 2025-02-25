import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Slide,
  Alert,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { styled } from '@mui/material/styles';

const GlowingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4CAAFF 30%, #60B6FF 90%)',
  border: 0,
  borderRadius: 8,
  boxShadow: '0 3px 5px 2px rgba(76, 170, 255, .3)',
  color: 'white',
  padding: '10px 30px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #60B6FF 30%, #4CAAFF 90%)',
    boxShadow: '0 3px 8px 2px rgba(76, 170, 255, .5)',
    transform: 'translateY(-2px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: 'rgba(76, 170, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(76, 170, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4CAAFF',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#4CAAFF',
    },
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: 'rgba(76, 170, 255, 0.7)',
  },
}));

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/');
      } else {
        await register(formData.email, formData.password, formData.displayName);
        navigate('/character-creation');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="sm" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Paper
          elevation={24}
          sx={{
            width: '100%',
            background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
            border: '1px solid rgba(76, 170, 255, 0.3)',
            boxShadow: '0 0 20px rgba(76, 170, 255, 0.2)',
            p: { xs: 2, sm: 4 },
            mt: { xs: 2, sm: 4 },
            mb: { xs: 2, sm: 4 },
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant={isMobile ? "h5" : "h4"}
              sx={{
                color: '#4CAAFF',
                textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
                mb: 3,
                textAlign: 'center',
              }}
            >
              {isLogin ? 'Hunter Login' : 'Register as Hunter'}
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%', 
                  mb: 2,
                  backgroundColor: 'rgba(255, 76, 76, 0.1)',
                  color: '#FF4C4C',
                  border: '1px solid rgba(255, 76, 76, 0.3)',
                  '& .MuiAlert-icon': {
                    color: '#FF4C4C',
                  },
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                {!isLogin && (
                  <Grid item xs={12}>
                    <StyledTextField
                      required
                      fullWidth
                      name="displayName"
                      label="Hunter Name"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'rgba(76, 170, 255, 0.7)' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <GlowingButton
                type="submit"
                fullWidth
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {isLogin ? 'Login' : 'Register'}
              </GlowingButton>

              <Button
                fullWidth
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  color: '#4CAAFF',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 170, 255, 0.1)',
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : 'Already have an account? Login'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Slide>
    </Container>
  );
};

export default AuthForm;
