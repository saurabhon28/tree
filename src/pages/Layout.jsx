import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Header';

function Layout() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: '#c8edbe', // Optional: background color for layout
    }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          p: 3,
          pt: { xs: 8, sm: 10 }, // Adjust padding-top to account for header height
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
