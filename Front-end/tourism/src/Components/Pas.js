import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCustomerId } from '../Context/CustomerIdContext';
import { Container, Grid, Typography, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';

export default function Passenger() {
    const { customerId } = useCustomerId();
    const [passengers, setPassengers] = useState([
      {
        customer_id: customerId,
        personal_titles: '',
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        contact_no: '',
      },
    ]);
    console.log(customerId);
    const location = useLocation();
    const { locationId, locationName,selectedPackage } = location?.state || {};
    const { package_id, package_name, budget, spots_nearby,package_duration } = selectedPackage || {};
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [passengerIds, setPassengerIds] = useState('');
    const [passengerNames, setPassengerNames] = useState('');
    const [email_id, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [invoiceData, setInvoiceData] = useState('');
    const navigate = useNavigate();
  
  
    
  
    const numPassengers = passengers.length;
    const additionalBudgetPerPassenger = budget;
    const updatedBudget = numPassengers * additionalBudgetPerPassenger;
  
  
    const handleInputChange = (event, index) => {
      const { name, value } = event.target;
      const updatedPassengers = [...passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [name]: value
      };
      setPassengers(updatedPassengers);
    };
  
    
    const handleSubmit = (event) => {
      event.preventDefault();
  
      axios
        .post('https://localhost:7168/api/Booking/Passenger', passengers, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          setSuccess(true);
          const passengerIds = response.data.map((passenger) => passenger.passenger_id);
          const passengerIdsString = passengerIds.length > 1 ? passengerIds.join(',') : passengerIds[0].toString();
          setPassengerIds(passengerIdsString);
  
          const names = response.data.map((passenger) => `${passenger.personal_titles}.${passenger.first_name} ${passenger.last_name}`);
          const passengerNamesString = names.length > 1 ? names.join(', ') : names[0].toString();
          setPassengerNames(passengerNamesString);  
          console.log('Customer ID in SomeComponent:', customerId);
  
          toast.success('Passengers Added');
  
          const bookingpost = {
            location_id: locationId,
            location_name: locationName,
            package_id: package_id,
            package_name: package_name,
            passenger_id: passengerIdsString,
            num_passengers: numPassengers,
            passenger_name: passengerNamesString,
            total_price: updatedBudget,
            duration: package_duration,
            email: email_id,
            contact: contact,
            booking_date: new Date().toISOString(),
          };
  
          axios.post('https://localhost:7168/api/Booking/Booking', bookingpost, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            const invoiceData = response.data;
            setSuccess(true);
            toast.success('Booking Successful');
            setInvoiceData(invoiceData);
            navigate('/Loc/Pac/:location/Itinerary/:packageId/Passenger/Payment', { state: { invoiceData } });
          })
          .catch((error) => {
            console.error('Error during booking:', error);
            setSuccess(false);
            if (error.response && error.response.data) {
              setError(error.response.data);
              toast.error('Error Occurred', error);
            } else {
              setError('An error occurred while submitting the form.');
              toast.error('An error occurred while submitting the form.', error);
            }
          });
        })
        .catch((error) => {
          setSuccess(false);
          if (error.response && error.response.data) {
            setError(error.response.data);
            toast.error('Error Occurred', error);
          } else {
            setError('An error occurred while submitting the form.');
            toast.error('An error occurred while submitting the form.', error);
          }
        });
    };
  
    
  
    const handleAddPassenger = () => {
      setPassengers((prevPassengers) => [
        ...prevPassengers,
        {
          customer_id: 1,
          personal_titles: '',
          first_name: '',
          last_name: '',
          gender: '',
          email: '',
          contact_no: ''
        }
      ]);
    };
  
    const handleRemovePassenger = (index) => {
      setPassengers((prevPassengers) => prevPassengers.filter((_, i) => i !== index));
    };
  
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Passenger Details</Typography>
          <form onSubmit={handleSubmit}>
            {passengers.map((passenger, index) => (
              <div key={index}>
                <Typography variant="h6" gutterBottom>Passenger {index + 1}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Title</InputLabel>
                      <Select
                        required
                        name="personal_titles"
                        value={passenger.personal_titles}
                        onChange={(e) => handleInputChange(e, index)}
                        label="Title"
                      >
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      name="first_name"
                      value={passenger.first_name}
                      onChange={(e) => handleInputChange(e, index)}
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      name="last_name"
                      value={passenger.last_name}
                      onChange={(e) => handleInputChange(e, index)}
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Gender</InputLabel>
                      <Select
                        required
                        name="gender"
                        value={passenger.gender}
                        onChange={(e) => handleInputChange(e, index)}
                        label="Gender"
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      type="email"
                      name="email"
                      value={passenger.email}
                      onChange={(e) => handleInputChange(e, index)}
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      name="contact_no"
                      value={passenger.contact_no}
                      onChange={(e) => handleInputChange(e, index)}
                      label="Contact Number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {index > 0 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemovePassenger(index)}
                      >
                        Remove Passenger
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <br />
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPassenger}
            >
              Add Passenger
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: '10px' }}
            >
              Proceed To Payment
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Booking Summary</Typography>
          <Typography variant="h6">Selected Package: {package_name}</Typography>
          <Typography variant="body1">Package ID: {package_id}</Typography>
          <Typography variant="body1">Location ID: {locationId}</Typography>
          <Typography variant="body1">Location Name: {locationName}</Typography>
          <Typography variant="body1">Package Duration: {package_duration}</Typography>
          <Typography variant="body1">Budget: {budget}</Typography>
          <Typography variant="body1">Spots Nearby: {spots_nearby}</Typography>
          <Typography variant="h6">Final amount: {getTotalPrice()}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
