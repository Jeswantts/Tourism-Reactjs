import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useCustomerId } from '../Context/CustomerIdContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Typography, TextField, Container, Paper, Grid, Switch, Button } from '@mui/material';
import { toast } from 'react-toastify';

const Userlogin = () => {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgent, setIsAgent] = useState(false); // true for 'Agent', false for 'User'
  const { login } = useAuth();
  const { setCustomerId } = useCustomerId();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isAgent) {
      axios
        .post('https://localhost:7258/api/Agent/login/Authenticator', { email_id, password })
        .then((response) => {
          const { token, customerId } = response.data;
          console.log('Agent Login Response:', response.data);
          console.log('AgentId:', customerId);
          console.log('Token:', token);
          setCustomerId(customerId);
          login(token);
          toast.success('Welcome Agent');
          navigate('/Agentdash');
        })
        .catch((response) => {
          console.error('Agent Login failed:', response.error);
          toast.error('U r not Activated/Invalid credentials');
        });
    } else {
      axios
        .post('https://localhost:7258/api/Profile/login/Authenticator', { email_id, password })
        .then((response) => {
          const { token, customerId } = response.data;
          console.log('User Login Response:', response.data);
          console.log('CustomerId:', customerId);
          console.log('Token:', token);
          setCustomerId(customerId);
          login(token);
          toast.success('Welcome User');
          navigate('/Profile');
        })
        .catch((error) => {
          console.error('User Login failed:', error);
          toast.error('Invalid Credentials');
        });
    }
  };
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('https://images.pexels.com/photos/163185/old-retro-antique-vintage-163185.jpeg'); // Replace with the URL of the user background image


  const getBackgroundImageStyle = () => ({
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white', // Set the text color to white


  });
  const getOverlayStyle = () => ({
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the alpha value to control the darkness
    pointerEvents: 'none',
  });

  const handleRoleChange = () => {
    setIsAgent((prevIsAgent) => !prevIsAgent);
    if (!isAgent) {
      setBackgroundImageUrl('https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg'); // Replace with the URL of the agent background image
    } else {
      setBackgroundImageUrl('https://images.pexels.com/photos/163185/old-retro-antique-vintage-163185.jpeg'); // Replace with the URL of the user background image
    }
  };
  const formElementsStyle = {
    color: 'black', // Set the text color for form elements (e.g., TextField and Typography)
  };

  return (
    <div style={getBackgroundImageStyle()}>
      <div style={getOverlayStyle()} />
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h4" gutterBottom style={formElementsStyle}>
              Login
            </Typography>
            <TextField
              type="email"
              label="Email"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
              <Typography variant="subtitle1" gutterBottom>
                {isAgent ? 'Agent' : 'User'}
              </Typography>
              <Switch checked={isAgent} onChange={handleRoleChange} />
            </Grid>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{ width: '50%', height: '36px', marginTop: '10px' }}
              >
                Login
              </Button>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
            <Typography variant="body2" gutterBottom>
              Don't have an account?{' '}
              <Link to="/Register" style={{ textDecoration: 'underline', color: 'blue' }}>
                <a>Register here</a>
              </Link>
              .
            </Typography>
          </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default Userlogin;
