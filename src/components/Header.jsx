import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('userdata'));

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    setIsLogin(false);
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        height: '70px'  // Adjust the height of the AppBar
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: 'white', textDecoration: 'none' }}
          >
            Tree Survey
          </Typography>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: 2,  // Add space between menu items
            ml: 2
          }}
        >
          <MenuItem component={Link} to="/" sx={{ color: 'white' }}>Home</MenuItem>
          <MenuItem component={Link} to="/request" sx={{ color: 'white' }}>Request Form</MenuItem>
          {isLogin ? (
            <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>Logout</MenuItem>
          ) : (
            <MenuItem component={Link} to="/login" sx={{ color: 'white' }}>Login</MenuItem>
          )}
          {/* Add more menu items here if needed */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
