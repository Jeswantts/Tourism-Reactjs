import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const Package = () => {
  const [packageData, setPackageData] = useState({
    location_id: 0,
    package_name: '',
    package_duration: '',
    spots_nearby: '',
    speciality: '',
    budget: 0,
    image: '',
    file: null,
  });

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Package/Packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('location_id', packageData.location_id);
      formData.append('package_name', packageData.package_name);
      formData.append('package_duration', packageData.package_duration);
      formData.append('spots_nearby', packageData.spots_nearby);
      formData.append('speciality', packageData.speciality);
      formData.append('budget', packageData.budget);
      formData.append('image', packageData.image);
      formData.append('file', packageData.file);

      const response = await axios.post('https://localhost:7114/api/Package/Packages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log('Package created:', response.data);

      fetchPackages();
    } catch (error) {
      console.error('Error creating package:', error);

    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setPackageData({ ...packageData, file: files[0] });
    } else {
      setPackageData({ ...packageData, [name]: value });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create New Package
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Location ID"
            type="number"
            name="location_id"
            value={packageData.location_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Package Name"
            type="text"
            name="package_name"
            value={packageData.package_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Duration"
            type="text"
            name="package_duration"
            value={packageData.package_duration}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Spots Nearby"
            type="text"
            name="spots_nearby"
            value={packageData.spots_nearby}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Speciality"
            type="text"
            name="speciality"
            value={packageData.speciality}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Budget"
            type="number"
            name="budget"
            value={packageData.budget}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Image URL"
            type="text"
            name="image"
            value={packageData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Image"
            type="file"
            name="file"
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create Package
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Package;
