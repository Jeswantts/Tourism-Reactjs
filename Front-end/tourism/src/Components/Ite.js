import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { usePackageContext } from '../Context/PackageContext';
import { useCustomerId } from '../Context/CustomerIdContext';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';

const Ite = () => {
  const { location, packageId } = useParams();
  const navigate = useNavigate();
  const locationName = new URLSearchParams(useLocation().search).get('locationName');
  const [itineraryData, setItineraryData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const { selectedPackage } = usePackageContext();
  const { customerId } = useCustomerId();

  useEffect(() => {
    fetch(`https://localhost:7114/api/Package/GetItinerary/ByPackageId/${packageId}`)
      .then((response) => response.json())
      .then((data) => {
        setItineraryData(data);
      })
      .catch((error) => {
        console.error('Error fetching itinerary:', error);
      });
  }, [packageId]);

  useEffect(() => {
    fetch(`https://localhost:7134/api/Hotel/Hotels/filterbyloc/${locationName}`)
      .then((response) => response.json())
      .then((data) => {
        setHotelData(data);
      })
      .catch((error) => {
        console.error('Error fetching itinerary:', error);
      });
  }, [locationName]);

  const handleBookNow = () => {
    navigate('/Loc/Pac/:location/Itinerary/:packageId/Passenger', {
      state: {
        selectedPackage,
        locationId: location,
        packageId: packageId,
        locationName: locationName,
      },
    });
  };

  return (
    <div>
      <h2>Itinerary for Package ID: {packageId}</h2>
      {itineraryData.length > 0 ? (
        itineraryData.map((itinerary) => (
          <Card key={itinerary.itinerary_id} sx={{ display: 'flex', marginBottom: '16px' }}>
            <CardMedia
              component="img"
              image={`/Admin/${itinerary.image}`}
              alt={`Day ${itinerary.day}`}
              sx={{ width: 200, height: 200 }}
            />
            <CardContent>
              <Typography variant="body1" component="p">
                <strong>Day:</strong> {itinerary.day}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Spots:</strong> {itinerary.spots}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Details:</strong> {itinerary.details}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Date:</strong> {itinerary.date}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Loading itinerary data...</p>
      )}
      <Button variant="contained" color="primary" onClick={handleBookNow}>
        Book Now
      </Button>
      <h3>Hotel Nearby</h3>
      {hotelData.length > 0 ? (
        <div>
          <h2>Hotel Details</h2>
          {hotelData.map((hotel) => (
            <Card key={hotel.hotel_id} sx={{ display: 'flex', marginBottom: '16px' }}>
              <CardMedia
                component="img"
                image={hotel.hotel_image}
                alt={hotel.hotel_name}
                sx={{ width: 200, height: 200 }}
              />
              <CardContent>
                <Typography variant="h5" component="h3">
                  {hotel.hotel_name}
                </Typography>
                <Typography variant="body1" component="p">
                  Location: {hotel.hotel_location}
                </Typography>
                <Typography variant="body1" component="p">
                  Email: {hotel.hotel_email}
                </Typography>
                <Typography variant="body1" component="p">
                  Phone: {hotel.hotel_phone}
                </Typography>
                <Typography variant="body1" component="p">
                  Detailed Location: {hotel.detailed_location}
                </Typography>
                {/* Add more hotel details as needed */}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading hotel details...</p>
      )}
    </div>
  );
};

export default Ite;
