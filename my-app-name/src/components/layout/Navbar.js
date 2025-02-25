import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
  Badge,
  Container,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Dashboard,
  Book,
  Forum,
  Person,
  School,
  LocalLibrary,
  SmartToy,
  Analytics,
  EmojiEvents,
  Group,
  Assignment,
  Notifications,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

import { useStats } from '../../contexts/StatsContext';
import { useAuth } from '../../contexts/AuthContext';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FF4C4C',
    color: '#fff',
    boxShadow: '0 0 10px rgba(255, 76, 76, 0.5)',
  },
}));

const GlowingIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiSvgIcon-root': {
    filter: 'drop-shadow(0 0 2px rgba(76, 170, 255, 0.5))',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '4px 8px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(76, 170, 255, 0.1)',
    '& .MuiListItemIcon-root': {
      '& .MuiSvgIcon-root': {
        transform: 'scale(1.1)',
        filter: 'drop-shadow(0 0 4px rgba(76, 170, 255, 0.8))',
      },
    },
  },
  transition: 'all 0.3s ease',
}));

const RankBadge = styled(Box)(({ theme }) => ({
  padding: '4px 12px',
  borderRadius: '16px',
  background: 'linear-gradient(45deg, #FF4C4C 30%, #FF8E53 90%)',
  color: '#fff',
  boxShadow: '0 0 10px rgba(255, 76, 76, 0.5)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '6px 12px',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(76, 170, 255, 0.1)',
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
      filter: 'drop-shadow(0 0 4px rgba(76, 170, 255, 0.8))',
    },
  },
  '& .MuiSvgIcon-root': {
    transition: 'all 0.3s ease',
  },
  [theme.breakpoints.down('lg')]: {
    minWidth: 'auto',
    padding: '6px 8px',
    '& .MuiButton-startIcon': {
      margin: 0,
    },
    '& .MuiButton-endIcon': {
      margin: 0,
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiButton-startIcon': {
      margin: 0,
    },
    '& .MuiTypography-root': {
      display: 'none',
    },
  },
}));

const mainMenuItems = [
  { text: 'Study Dungeon', icon: <School />, path: '/study-dungeon' },
  { text: 'System AI', icon: <SmartToy />, path: '/ai-tutor' },
  { text: 'Quest Analytics', icon: <Analytics />, path: '/analytics' },
];

const allMenuItems = [
  { text: 'Hunter Profile', icon: <Person />, path: '/profile', category: 'Profile' },
  { text: 'Status Window', icon: <Dashboard />, path: '/dashboard', category: 'Profile' },
  { text: 'Study Dungeon', icon: <School />, path: '/study-dungeon', category: 'Training' },
  { text: 'Skill Library', icon: <Book />, path: '/study-materials', category: 'Training' },
  { text: 'Training Ground', icon: <LocalLibrary />, path: '/flashcards', category: 'Training' },
  { text: 'Hunters Association', icon: <Forum />, path: '/forum', category: 'Community' },
  { text: 'Shadow Exchange', icon: <Group />, path: '/social', category: 'Community' },
  { text: 'System AI', icon: <SmartToy />, path: '/ai-tutor', category: 'System' },
  { text: 'Quest Analytics', icon: <Analytics />, path: '/analytics', category: 'System' },
  { text: 'Daily Quests', icon: <Assignment />, path: '/quests', category: 'Quests' },
  { text: 'Achievement Hall', icon: <EmojiEvents />, path: '/achievements', category: 'Quests' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const { stats } = useStats();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const drawer = (
    <Box sx={{ 
      bgcolor: 'background.default',
      height: '100%',
      background: 'linear-gradient(180deg, #0A1929 0%, #132F4C 100%)',
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(76, 170, 255, 0.2)',
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#4CAAFF',
            textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
            fontWeight: 'bold',
          }}
        >
          SYSTEM
        </Typography>
      </Box>

      {Object.entries(
        allMenuItems.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {})
      ).map(([category, items], categoryIndex) => (
        <React.Fragment key={category}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: 'rgba(76, 170, 255, 0.8)',
              px: 3,
              pt: 2,
              pb: 1,
              fontWeight: 'bold',
            }}
          >
            {category}
          </Typography>
          <List>
            {items.map((item) => (
              <StyledListItem
                button
                key={item.text}
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
              >
                <GlowingIcon>{item.icon}</GlowingIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#fff',
                      fontWeight: 500,
                    },
                  }}
                />
              </StyledListItem>
            ))}
          </List>
          {categoryIndex < Object.entries(allMenuItems).length - 1 && (
            <Divider sx={{ 
              my: 1,
              borderColor: 'rgba(76, 170, 255, 0.2)',
              boxShadow: '0 0 5px rgba(76, 170, 255, 0.1)',
            }} />
          )}
        </React.Fragment>
      ))}
      <List>
        <StyledListItem
          button
          onClick={handleLogout}
        >
          <ListItemIcon sx={{ color: 'rgba(255, 76, 76, 0.7)' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#fff',
              },
            }}
          />
        </StyledListItem>
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(45deg, #0A1929 30%, #132F4C 90%)',
        borderBottom: '2px solid rgba(76, 170, 255, 0.3)',
        boxShadow: '0 0 20px rgba(76, 170, 255, 0.2)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  filter: 'drop-shadow(0 0 4px rgba(76, 170, 255, 0.8))',
                },
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            component={RouterLink}
            to="/"
            sx={{ 
              flexGrow: { xs: 1, md: 0 },
              mr: { xs: 0, md: 4 },
              color: '#4CAAFF',
              textDecoration: 'none',
              textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
              fontWeight: 'bold',
              letterSpacing: '1px',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              '&:hover': {
                textShadow: '0 0 15px rgba(76, 170, 255, 0.8)',
              },
            }}
          >
            SOLO LEVELING
          </Typography>

          {!isTablet && (
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              {mainMenuItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                >
                  <Typography variant="button" noWrap>
                    {item.text}
                  </Typography>
                </NavButton>
              ))}
            </Box>
          )}

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 2 },
            ml: 'auto'
          }}>
            <RankBadge sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <EmojiEvents sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                {stats.rank} | Level {stats.level}
              </Typography>
            </RankBadge>

            <NavButton
              component={RouterLink}
              to="/profile"
              startIcon={<Person />}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Typography variant="button" noWrap>
                Profile
              </Typography>
            </NavButton>

            <StyledBadge badgeContent={3}>
              <IconButton 
                color="inherit"
                sx={{
                  '&:hover': {
                    '& .MuiSvgIcon-root': {
                      filter: 'drop-shadow(0 0 4px rgba(76, 170, 255, 0.8))',
                    },
                  },
                }}
              >
                <Notifications />
              </IconButton>
            </StyledBadge>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.displayName || 'User'}
                    src={user?.photoURL}
                    sx={{
                      border: '2px solid #4CAAFF',
                      boxShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '45px',
                  '& .MuiPaper-root': {
                    backgroundColor: '#132F4C',
                    border: '1px solid rgba(76, 170, 255, 0.3)',
                    boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => {
                  navigate('/profile');
                  handleCloseUserMenu();
                }}>
                  <Typography sx={{ color: '#fff' }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}>
                  <Typography sx={{ color: '#FF4C4C' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: 280,
            border: 'none',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
