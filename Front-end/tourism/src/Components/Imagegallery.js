import React, { useState } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';

const Imagegallery = () => {
  const [hotelData, setHotelData] = useState({
    image: '',
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

    formData.append('image', hotelData.image);
    formData.append('file', hotelData.file); // Append the selected file

    // Send the form data using an HTTP POST request (using fetch or axios)
    fetch('https://localhost:7017/api/Admin/Image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Image added successfully:', data);
        // Handle success or show a success message to the user
      })
      .catch((error) => {
        console.error('Error adding image:', error);
        // Handle error or show an error message to the user
      });
  };

  return (
    <Container>
      <h2>Add for Image gallery</h2>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit} className="border p-4">
            <div className="form-group">
              <label htmlFor="image" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                Image Name:
              </label>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                name="image"
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="file" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                Image:
              </label>
              <input type="file" className="form-control-file" name="file" onChange={handleFileChange} required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant="contained" color="primary" type="submit">
                Upload Image
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Imagegallery;
