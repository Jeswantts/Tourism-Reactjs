import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';

const Hotel = () => {
  const [hotelData, setHotelData] = useState({
    hotel_name: '',
    hotel_location: '',
    hotel_email: '',
    hotel_phone: '',
    hotel_image: '',
    detailed_location: '',
    amenities: '',
    hotel_types: '',
    whats_nearby: '',
    policies: '',
    file: null, // To store the selected file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHotelData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hotel_name', hotelData.hotel_name);
    formData.append('hotel_location', hotelData.hotel_location);
    formData.append('hotel_email', hotelData.hotel_email);
    formData.append('hotel_phone', hotelData.hotel_phone);
    formData.append('hotel_image', hotelData.hotel_image);
    formData.append('file', hotelData.file); // Append the selected file
    formData.append('detailed_location', hotelData.detailed_location);
    formData.append('amenities', hotelData.amenities);
    formData.append('hotel_types', hotelData.hotel_types);
    formData.append('whats_nearby', hotelData.whats_nearby);
    formData.append('policies', hotelData.policies);

    // Send the form data using an HTTP POST request (using fetch or axios)
    fetch('https://localhost:7134/api/Hotel/PostHotels', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Hotel added successfully:', data);
        // Handle success or show a success message to the user
      })
      .catch((error) => {
        console.error('Error adding hotel:', error);
        // Handle error or show an error message to the user
      });
  };

  return (
    <Container>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
      }}
    >
          <HotelIcon style={{ fontSize: '64px', color: '#3f51b5', marginBottom: '16px' }} />
      <Typography variant="h4">Add a New Hotel</Typography>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hotel Name"
                  variant="outlined"
                  name="hotel_name"
                  value={hotelData.hotel_name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hotel Location"
                  variant="outlined"
                  name="hotel_location"
                  value={hotelData.hotel_location}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hotel Email"
                  variant="outlined"
                  type="email"
                  name="hotel_email"
                  value={hotelData.hotel_email}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hotel Phone"
                  variant="outlined"
                  type="number"
                  name="hotel_phone"
                  value={hotelData.hotel_phone}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hotel Image URL"
                  variant="outlined"
                  name="hotel_image"
                  value={hotelData.hotel_image}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="detailed_location"
                  variant="outlined"
                  name="detailed_location"
                  value={hotelData.detailed_location}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="amenities"
                  variant="outlined"
                  name="amenities"
                  value={hotelData.amenities}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="hotel_types"
                  variant="outlined"
                  name="hotel_types"
                  value={hotelData.hotel_types}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="whats_nearby"
                  variant="outlined"
                  name="whats_nearby"
                  value={hotelData.whats_nearby}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="policies"
                  variant="outlined"
                  name="policies"
                  value={hotelData.policies}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" name="file" onChange={handleFileChange} required />
              </Grid>
              
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Hotel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Box>
  </Container>
  );
};

export default Hotel;
