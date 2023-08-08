import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import { useCustomerId } from '../Context/CustomerIdContext';
import { Container, Typography, Paper, Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, Grid, Divider } from '@mui/material';


export default function Passenger() {
  const { customerId } = useCustomerId();
  const [bookingId, setBookingId] = useState(''); 
  const [passengers, setPassengers] = useState([
    {
      customer_id: customerId,
      personal_titles: '',
      first_name: '',
      last_name: '',
      gender: '',
      email: '',
      contact_no: 0,
    },
  ]);
  
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
          customer_id:customerId,
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
          status:'pending',
          booking_date: new Date().toISOString(),
        };

        axios.post('https://localhost:7168/api/Booking/Booking', bookingpost, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const bookingId = response.data.booking_id;
          setBookingId(bookingId);
          const invoiceData = response.data;
          setSuccess(true);
          console.log(bookingId)
          toast.success('Booking Successful');
          setInvoiceData(invoiceData);
          navigate('/Loc/Pac/:location/Itinerary/:packageId/Passenger/Payment', { state: { invoiceData, bookingId } });
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
        customer_id: customerId,
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

  const bookingSummary = (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Booking Summary
      </Typography>
      <Divider style={{ marginBottom: '20px' }} />
      <Typography variant="h6" gutterBottom>
        Selected Package
      </Typography>
      <Typography>
        Package Name: {package_name}
        <br />
        Package ID: {package_id}
        <br />
        Location ID: {locationId}
        <br />
        Location Name: {locationName}
        <br />
        Package Duration: {package_duration}
        <br />
        Budget: {budget}
        <br />
        Spots Nearby: {spots_nearby}
      </Typography>
      <Divider style={{ marginTop: '20px' }} />
      <Typography variant="h6" gutterBottom>
        Booking Details
      </Typography>
      <Typography>
        Number of Passengers: {numPassengers}
        <br />
        Additional Budget Per Passenger: {additionalBudgetPerPassenger}
        <br />
        Updated Budget: {updatedBudget}
      </Typography>
    </Paper>
  );
  

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Add Passenger Details
        </Typography>
        <Divider style={{ marginBottom: '20px' }} />
        {passengers.map((passenger, index) => (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Passenger {index + 1}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Title</InputLabel>
                    <Select
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
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    name="first_name"
                    value={passenger.first_name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    name="last_name"
                    value={passenger.last_name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
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
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    fullWidth
                    name="email"
                    value={passenger.email}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Contact Number"
                    fullWidth
                    name="contact_no"
                    value={passenger.contact_no}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={6}>
        <TextField
          label="Email"
          required
          fullWidth
          value={email_id}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          placeholder="Email"
        />
        </Grid>
        <Grid item xs={6}>

        <TextField
          label="Contact Number"
          required
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          variant="outlined"
          margin="normal"
          placeholder="Contact Number"
          inputProps={{ pattern: "[0-9]*" }} // Only allow numbers
        /></Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemovePassenger(index)}
                >
                  Remove Passenger
                </Button>
              </Box>
            </form>
          </Paper>
        ))}
        <Divider style={{ marginTop: '20px' }} />
        <Box mt={2} display="flex" justifyContent="space-between">
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
          >
            Proceed To Payment
          </Button>
        </Box>
      </Paper>
      {bookingSummary}
    </Container>
  )
}
