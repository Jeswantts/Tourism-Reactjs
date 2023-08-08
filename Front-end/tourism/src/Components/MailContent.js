import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Container, Button } from '@mui/material';


const MailContent = () => {

    const [agents, setAgents] = useState([]);
    const [status, setStatus] = useState('deactivated'); // Replace with the desired status value
  
    useEffect(() => {
      // Function to fetch data from the API
      const fetchAgents = async () => {
        try {
          const response = await axios.get(`https://localhost:7258/api/Agent/GetAgent/Status/${status}`);
          setAgents(response.data);
        } catch (error) {
          console.error('Error fetching agents:', error);
        }
      };
  
      // Call the fetchAgents function when the component mounts
      fetchAgents();
    }, [status]); // Re-fetch data whenever the status changes
  return (
    <Container>
      <h2>Agents List with Status: {status}</h2>
      {agents.map((agent) => (
        <Card key={agent.customer_id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Agent Name: {agent.agent_name || 'N/A'}</Typography>
            <Typography variant="body1">Agency Name: {agent.agency_name || 'N/A'}</Typography>
            <Typography variant="body1">Agent Mobile: {agent.agent_mobile || 'N/A'}</Typography>
            <Typography variant="body1">Email ID: {agent.email_id}</Typography>
            <Typography variant="body1">Status: {agent.status}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default MailContent;
