import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button,TextareaAutosize } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import { toast } from 'react-toastify';

const Itinerary = () => {
  const [itineraryData, setItineraryData] = useState({
    package_id: 0,
    day: 0,
    spots: '',
    details: '',
    date: '',
    image: '',
    file: null,
  });

  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Package/Itinerary/get/all');
      setItineraries(response.data);
      toast.success('Succesfull')
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      toast.error('Failed')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('package_id', itineraryData.package_id);
      formData.append('day', itineraryData.day);
      formData.append('spots', itineraryData.spots);
      formData.append('details', itineraryData.details);
      formData.append('date', itineraryData.date);
      formData.append('image', itineraryData.image);
      formData.append('file', itineraryData.file);

      const response = await axios.post('https://localhost:7114/api/Package/Itinerary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Itinerary created:', response.data);
      fetchItineraries();
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setItineraryData({ ...itineraryData, file: files[0] });
    } else {
      setItineraryData({ ...itineraryData, [name]: value });
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
        <HotelIcon sx={{ fontSize: '64px', color: '#3f51b5', marginBottom: '16px' }} />
        <Typography variant="h5">Create a New Itinerary</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Package ID"
            variant="outlined"
            name="package_id"
            value={itineraryData.package_id}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Day"
            variant="outlined"
            type="number"
            name="day"
            value={itineraryData.day}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Spots"
            variant="outlined"
            name="spots"
            value={itineraryData.spots}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextareaAutosize
            placeholder="Details"
            name="details"
            value={itineraryData.details}
            onChange={handleChange}
            rowsMin={3}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <TextField
            label="Date"
            variant="outlined"
            type="date"
            name="date"
            value={itineraryData.date}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Image URL"
            variant="outlined"
            name="image"
            value={itineraryData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <input type="file" name="file" onChange={handleChange} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '10px', marginBottom: '16px' }}
          >
            Create Itinerary
          </Button>
        </form>
      </Box>
    </Container>
    </div>
  );
};

export default Itinerary;
