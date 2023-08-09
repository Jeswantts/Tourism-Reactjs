import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, TextField, Container, Paper, Grid, Button, Switch } from '@mui/material';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    email_id: '',
    password: '',
    role: 'user', // Default role set to 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      role: prevData.role === 'user' ? 'agent' : 'user',
    }));
    if (formData.role === 'user') {
      setBackgroundImageUrl('https://images.pexels.com/photos/6980885/pexels-photo-6980885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); // Replace with the URL of the agent background image
    } else {
      setBackgroundImageUrl('https://images.pexels.com/photos/9329790/pexels-photo-9329790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); // Replace with the URL of the user background image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check the role selected and make separate POST requests
    if (formData.role === 'user') {
      axios
        .post('https://localhost:7258/api/Profile/register', formData)
        .then((response) => {
          console.log('User Registration successful:', response.data);
          toast.success('Reg Succesfully')
          // Redirect to login page or handle registration success
        })
        .catch((error) => {
          console.error('User Registration failed:', error);
          toast.error('Error reg')
          // Handle registration failure
        });
    } else if (formData.role === 'agent') {
      axios
        .post('https://localhost:7258/api/Agent/register', formData)
        .then((response) => {
          console.log('Agent Registration successful:', response.data);
          toast.success('Reg Success')
          // Redirect to login page or handle registration success
        })
        .catch((error) => {
          console.error('Agent Registration failed:', error);
          toast.error('Reg Failed')
          // Handle registration failure
        });
    }
  };

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    'https://images.pexels.com/photos/9329790/pexels-photo-9329790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ); // Replace with the URL of the user background image

  const getBackgroundImageStyle = () => ({
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white', 
  });

  const getOverlayStyle = () => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the alpha value to control the darkness
    pointerEvents: 'none',  
});



  return (
    <div style={getBackgroundImageStyle()}>
      <div style={getOverlayStyle()} />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" gutterBottom >
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="email"
              name="email_id"
              label="Email"
              value={formData.email_id}
              onChange={handleChange}
              fullWidth
              margin="normal"

            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              
            />
            <Grid container justifyContent="center">
              <Typography variant="subtitle1" gutterBottom >
                {formData.role === 'user' ? 'user' : 'agent'}
              </Typography>
              <Switch checked={formData.role === 'agent'} onChange={handleRoleChange} />
            </Grid>
            <Grid container justifyContent="center">
              <Button variant="contained" type="submit" sx={{ width: '50%', height: '36px', marginTop: '10px' }}>
                Register
              </Button>
            </Grid>
          </form>
          {/* Login link */}
          <Grid container justifyContent="center" mt={2}>
            <Typography variant="body2" gutterBottom >
              Already have an account?{' '}
              <Link to="/Login" style={{ textDecoration: 'underline', color: 'blue' }}>
                Login here
              </Link>
              .
            </Typography>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
