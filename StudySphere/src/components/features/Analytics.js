import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
  border: '1px solid rgba(76, 170, 255, 0.3)',
  boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'linear-gradient(45deg, #1a365d 30%, #1e4976 90%)',
  border: '1px solid rgba(76, 170, 255, 0.2)',
  height: '100%',
}));

const GlowingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
}));

// Mock data - replace with real data from your backend
const mockStudyData = {
  dailyProgress: [
    { day: 'Mon', hours: 2, exp: 150 },
    { day: 'Tue', hours: 3, exp: 220 },
    { day: 'Wed', hours: 1.5, exp: 100 },
    { day: 'Thu', hours: 4, exp: 300 },
    { day: 'Fri', hours: 2.5, exp: 180 },
    { day: 'Sat', hours: 3.5, exp: 250 },
    { day: 'Sun', hours: 2, exp: 160 },
  ],
  subjectDistribution: [
    { name: 'Mathematics', value: 30 },
    { name: 'Physics', value: 25 },
    { name: 'Chemistry', value: 20 },
    { name: 'Biology', value: 15 },
    { name: 'History', value: 10 },
  ],
  skillProgress: [
    { skill: 'Intelligence', current: 75, target: 100 },
    { skill: 'Focus', current: 60, target: 100 },
    { skill: 'Memory', current: 45, target: 100 },
    { skill: 'Comprehension', current: 80, target: 100 },
    { skill: 'Persistence', current: 65, target: 100 },
  ],
};

const COLORS = ['#4CAAFF', '#FF4C4C', '#52FF52', '#FFD700', '#FF00FF'];

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <GlowingText variant="h4" gutterBottom>
          Study Analytics
        </GlowingText>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Track your progress and identify areas for improvement
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
              Total Study Time
            </Typography>
            <Typography variant="h4">18.5h</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              +2.5h from last week
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
              EXP Gained
            </Typography>
            <Typography variant="h4">1,360</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              +220 from last week
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
              Dungeons Cleared
            </Typography>
            <Typography variant="h4">12</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              +3 from last week
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
              Current Rank
            </Typography>
            <Typography variant="h4">C</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              75% to Rank B
            </Typography>
          </StatCard>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Daily Progress Chart */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
                Daily Progress
              </Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  sx={{ color: '#fff', bgcolor: 'rgba(76, 170, 255, 0.1)' }}
                >
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockStudyData.dailyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis yAxisId="left" stroke="#4CAAFF" />
                <YAxis yAxisId="right" orientation="right" stroke="#FF4C4C" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#132F4C',
                    border: '1px solid rgba(76, 170, 255, 0.3)',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hours"
                  stroke="#4CAAFF"
                  name="Study Hours"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="exp"
                  stroke="#FF4C4C"
                  name="EXP Gained"
                />
              </LineChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Subject Distribution */}
        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#4CAAFF', mb: 2 }}>
              Subject Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockStudyData.subjectDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {mockStudyData.subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#132F4C',
                    border: '1px solid rgba(76, 170, 255, 0.3)',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Skill Progress */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" sx={{ color: '#4CAAFF', mb: 3 }}>
              Skill Progress
            </Typography>
            <Grid container spacing={2}>
              {mockStudyData.skillProgress.map((skill) => (
                <Grid item xs={12} key={skill.skill}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ color: '#fff' }}>
                        {skill.skill}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {skill.current}/{skill.target}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(skill.current / skill.target) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        bgcolor: 'rgba(76, 170, 255, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(45deg, #4CAAFF 30%, #60B6FF 90%)',
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
