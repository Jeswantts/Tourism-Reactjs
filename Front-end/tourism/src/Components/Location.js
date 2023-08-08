import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Location = () => {
  const [location, setLocation] = useState({
    location_name: '',
    image: '',
    file: null,
  });

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Package/Location/getall');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('location_name', location.location_name);
      formData.append('image', location.image);
      formData.append('file', location.file);

      const response = await axios.post('https://localhost:7114/api/Package/Location', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Location created:', response.data);
      fetchLocations();
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setLocation({ ...location, file: files[0] });
    } else {
      setLocation({ ...location, [name]: value });
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
                    <LocationOnIcon sx={{ fontSize: '64px', color: '#3f51b5', marginBottom: '16px' }} />
          <Typography variant="h5">Create a New Location</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="location_name"
                  value={location.location_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Image URL"
                  variant="outlined"
                  name="image"
                  value={location.image}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input type="file" name="file" onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Create Location
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Location;
