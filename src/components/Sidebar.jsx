import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Sidebar() {
    const theme = useTheme();
  return (
    <Drawer
    variant="permanent"
    sx={{
      width: 150,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    }}
  >
     <List>
        <h3><span className='text-success'>TREE</span> SURVEY</h3>
       
        {/* Add more sidebar items here */}
      </List>
      <List>
      <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  )
}

export default Sidebar;