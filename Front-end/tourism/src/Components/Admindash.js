import React, { useState } from 'react';
import { AppBar, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, Container, Grid } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxContent from './InboxContent';
import MailContent from './MailContent';
import WelcomeContent from './WelcomeContent';
import Imagegallery from './Imagegallery';

const drawerWidth = 240;

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen(false);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'inbox':
        return <InboxContent />;
      case 'mail':
        return <MailContent />;
      case 'welcome':
        return(<div> <WelcomeContent/><Imagegallery/></div>);
      default:
        return (
          <Container>
            <Typography variant="h2" gutterBottom>
              Welcome to Admin Dashboard!
            </Typography>
            <Typography variant="body1">
              This is a basic example of an admin dashboard using Material-UI.
              Feel free to customize and add more features as needed.
            </Typography>
          </Container>
        );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
          {open && (
            <IconButton color="inherit" aria-label="expand-collapse" onClick={() => setOpen(!open)} edge="end">
              <ChevronRightIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <div>
          <List>
            <ListItem button onClick={() => handleOptionClick('inbox')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button onClick={() => handleOptionClick('mail')}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItem>
            <ListItem button onClick={() => handleOptionClick('welcome')}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Welcome" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {renderContent()}
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default AdminDashboard;
