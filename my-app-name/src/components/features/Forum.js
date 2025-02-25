import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Box,
} from '@mui/material';

const Forum = () => {
  const discussions = [
    {
      title: 'Tips for Effective Study Habits',
      author: 'Sarah Johnson',
      replies: 15,
      views: 234,
      tags: ['Study Tips', 'Productivity'],
      lastActive: '2 hours ago',
    },
    {
      title: 'Programming Project Help Needed',
      author: 'Mike Chen',
      replies: 8,
      views: 156,
      tags: ['Programming', 'Help'],
      lastActive: '4 hours ago',
    },
    {
      title: 'Math Study Group Formation',
      author: 'Emily Brown',
      replies: 23,
      views: 345,
      tags: ['Math', 'Study Group'],
      lastActive: '1 day ago',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Discussion Forum
        </Typography>
        <Button variant="contained" color="primary">
          New Discussion
        </Button>
      </Box>

      <Grid container spacing={3}>
        {discussions.map((discussion, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                      {discussion.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      {discussion.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        {discussion.author[0]}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {discussion.author}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: { xs: 'start', md: 'end' },
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {`${discussion.replies} replies • ${discussion.views} views`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Last active ${discussion.lastActive}`}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Forum;
