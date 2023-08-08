import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useCustomerId } from '../Context/CustomerIdContext';
import { useNavigate } from 'react-router';
import { Typography, TextField, Container, Paper, Grid, Button } from '@mui/material';

const Adminlogin = () => {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { setCustomerId } = useCustomerId();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    axios
      .post('https://localhost:7017/api/Admin/Login/Authentication', { email_id, password })
      .then((response) => {
        console.log('Admin Login Response:', response.data); // Log the entire response
        const token = response.data; // Access the token using the correct key
        console.log('Token:', token);
        if (token) {
          login(token);
          navigate('/Admindash');
        } else {
          console.error('Token not received in API response.');
        }
      })
      .catch((error) => {
        console.error('Admin Login failed:', error);
      });
  };
  

  const getBackgroundImageStyle = () => ({
    backgroundImage: `url('https://images.pexels.com/photos/17781404/pexels-photo-17781404/free-photo-of-wood-road-landscape-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, // Replace with the URL of the admin background image
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white', // Set the text color to white
  });

  const getOverlayStyle = () => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the alpha value to control the darkness
  });

  return (
    <div style={getBackgroundImageStyle()}>
      <div style={getOverlayStyle()} />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" gutterBottom>
            Admin Login
          </Typography>
          <TextField
            type="email"
            value={email_id}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            fullWidth
            margin="normal"
            style={{ color: 'white' }} // Set the text color to white for form elements
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            fullWidth
            margin="normal"
            style={{ color: 'white' }} // Set the text color to white for form elements
          />
          <Grid container justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleAdminLogin} sx={{ width: '50%', height: '36px' }}>
              Login
            </Button>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Adminlogin;
