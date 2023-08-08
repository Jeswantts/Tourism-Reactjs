import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Tabs,Tab,Box
} from '@mui/material';
import Package from './Package';
import Itinerary from './Itinerary';
import Location from './Location';
import { useAuth } from '../Context/AuthContext';

const Agentdash = () => {
  const [agents, setAgents] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [editedAgent, setEditedAgent] = useState({
    agent_name: '',
    agency_name: '',
    agent_mobile: '',
    email_id: '',
  });
  const customerId = localStorage.getItem('customerId');
  const { logout } = useAuth();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };



  useEffect(() => {
    // Fetch agent details from your API
    fetch(`https://localhost:7258/api/Agent/Agent/filter/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setAgents(data); // Set the fetched agent details in the state
      })
      .catch((error) => {
        console.error('Error fetching agent details:', error);
      });
  }, [customerId]);

  const handleEditClick = (agent) => {
    setSelectedAgent(agent);
    setEditedAgent({
      agent_name: agent.agent_name,
      agency_name: agent.agency_name,
      agent_mobile: agent.agent_mobile,
      email_id: agent.email_id,
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedAgent(null);
    setEditedAgent({
      agent_name: '',
      agency_name: '',
      agent_mobile: '',
      email_id: '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedAgent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {


    // Example using fetch
    fetch(`https://localhost:7258/api/Agent/updateAgent/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedAgent),
    })
      .then((response) => response.json())
      .then((updatedAgent) => {
        // Update the agents state with the updated agent data
        const updatedAgents = agents.map((agent) =>
          agent.customer_id === updatedAgent.customer_id ? updatedAgent : agent
        );
        setAgents(updatedAgents);
        handleEditClose(); // Close the edit dialog
      })
      .catch((error) => {
        console.error('Error updating agent details:', error);
        // Handle error or show an error message to the user
      });
  };

  return (
    <Container>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Location" />
          <Tab label="Package" />
          <Tab label="Itinerary" />
        </Tabs>
      </AppBar>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            {/* Sidebar */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Agent Name: {agents.agent_name}
                </Typography>
                <Typography variant="body1">Agency Name: {agents.agency_name}</Typography>
                <Typography variant="body1">Email: {agents.email_id}</Typography>
                <Typography variant="body1">Mobile: {agents.agent_mobile}</Typography>
                <Button variant="outlined" color="primary" onClick={() => handleEditClick(agents.customer_id)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={logout}>
                  Logout
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
            {/* Main Content */}
            {tabValue === 0 && (
              <Location />
            )}
            {tabValue === 1 && (
              <Package />
            )}
            {tabValue === 2 && (
              <Itinerary />
            )}
          </Grid>
        </Grid>
      </Box>
      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        {/* ...DialogContent and DialogActions */}
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Agent Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Agent Name"
            name="agent_name"
            value={editedAgent.agent_name}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Agency Name"
            name="agency_name"
            value={editedAgent.agency_name}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email_id"
            value={editedAgent.email_id}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile"
            name="agent_mobile"
            value={editedAgent.agent_mobile}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Agentdash;
