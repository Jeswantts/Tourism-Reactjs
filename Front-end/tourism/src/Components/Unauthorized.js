import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgj7khq8kgI0gFC1sOTFvrDfKRMtCmHgm_c7rOAGKaZyGsXIB9Btebv1OerwTxoWMoIwg&usqp=CAU")', // Replace with the URL of your background image
          backgroundSize: 'cover',
        }}
      >
        <LockIcon sx={{ fontSize: '64px', color: 'gray' }} />
        <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You are not authorized to access this page. Please log in or contact an administrator for access.
        </Typography>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <Link to="/Login">
            <Button variant="contained" color="primary">
              Log In
            </Button>
          </Link>
          <Link to="/Adminlogin">
            <Button variant="contained" color="primary">
              Admin
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Unauthorized;
