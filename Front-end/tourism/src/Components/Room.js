import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  Grid
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import { toast } from 'react-toastify';


const Room = () => {
  const [roomData, setRoomData] = useState({
    hotel_id: 0,
    room_type: '',
    room_price: 0,
    room_image: '',
    room_details: '',
    availability: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRoomData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hotel_id', roomData.hotel_id);
    formData.append('room_type', roomData.room_type);
    formData.append('room_price', roomData.room_price);
    formData.append('file', roomData.file);
    formData.append('room_image', roomData.room_image);
    formData.append('room_details', roomData.room_details);
    formData.append('availability', roomData.availability);

    fetch('https://localhost:7134/api/Hotel/PostRoom', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Room added successfully:', data);
        toast.success('Room created')
      })
      .catch((error) => {
        console.error('Error adding room:', error);
        toast.error('Error')
      });
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
          <Typography variant="h5">Add a New Room</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hotel ID"
                  variant="outlined"
                  type="number"
                  name="hotel_id"
                  value={roomData.hotel_id}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Room Type"
                  variant="outlined"
                  name="room_type"
                  value={roomData.room_type}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Room Price"
                  variant="outlined"
                  type="number"
                  name="room_price"
                  value={roomData.room_price}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Room Image URL"
                  variant="outlined"
                  name="room_image"
                  value={roomData.room_image}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Availability (available/unavailable)"
                  variant="outlined"
                  name="availability"
                  value={roomData.availability}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  placeholder="Room Details"
                  name="room_details"
                  value={roomData.room_details}
                  onChange={handleInputChange}
                  rowsMin={3}
                  style={{ width: '100%', marginTop: '10px', marginBottom: '20px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" name="file" onChange={handleFileChange} required />
              </Grid>
              
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Room
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Room;
