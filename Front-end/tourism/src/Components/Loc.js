import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCustomerId } from '../Context/CustomerIdContext';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const Loc = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const { customerId } = useCustomerId();

  useEffect(() => {
    // Fetch the location options from the API
    fetch('https://localhost:7114/api/Package/Location/getall')
      .then((response) => response.json())
      .then((data) => {
        setLocationOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching location options:', error);
      });
  }, []);

  const handleLocationSelect = (locationId, locationName) => {
    setSelectedLocation(locationId, locationName);
  };

  return (
    <div>
      <h2>Location Selection</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {locationOptions.map((loc) => (
          <Card key={loc.location_id} className="card">
            <CardMedia
              component="img"
              height="200"
              image={`/Agent/${loc.image}`}
              alt={loc.location_name}
              style={{ objectFit: 'cover' }}
            />
            <CardContent
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.6)',
                color: '#fff',
              }}
            >
              <Typography variant="h5" component="h2" style={{ marginBottom: '10px' }}>
                {loc.location_name}
              </Typography>
              <Link
                to={`/Loc/Pac?location=${loc.location_id}&locationName=${encodeURIComponent(
                  loc.location_name
                )}`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLocationSelect(loc.location_id, loc.location_name)}
                >
                  Show Packages
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Loc;
