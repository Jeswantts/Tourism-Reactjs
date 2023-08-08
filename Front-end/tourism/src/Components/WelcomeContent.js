import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Container, Button } from '@mui/material';

const WelcomeContent = () => {
  const [agents, setAgents] = useState([]);
  const [status, setStatus] = useState('waiting'); // Replace with the desired status value

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

  const handleAccept = async (agentId) => {
    try {
      // Call the API to update the agent's status to "Activated"
      const response = await axios.put(`https://localhost:7258/api/Agent/Activation/${agentId}`, {
        status: 'activated',
      });

      // If the API call is successful, update the local state with the new data
      setAgents((prevAgents) => {
        return prevAgents.map((agent) => {
          if (agent.customer_id === agentId) {
            return { ...agent, status: response.data.status };
          } else {
            return agent;
          }
        });
      });

      console.log('Agent with ID:', agentId, 'is activated.');
    } catch (error) {
      console.error('Error activating agent:', error);
    }
  };

  const handleDecline = async (agentId) => {
    try {
        // Call the API to update the agent's status to "Activated"
        const response = await axios.put(`https://localhost:7258/api/Agent/Activation/${agentId}`, {
          status: 'deactivated',
        });
  
        // If the API call is successful, update the local state with the new data
        setAgents((prevAgents) => {
          return prevAgents.map((agent) => {
            if (agent.customer_id === agentId) {
              return { ...agent, status: response.data.status };
            } else {
              return agent;
            }
          });
        });
  
        console.log('Agent with ID:', agentId, 'is activated.');
      } catch (error) {
        console.error('Error activating agent:', error);
      }
  };

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
            <Button onClick={() => handleAccept(agent.customer_id)} color="success" sx={{ mt: 2, mr: 2 }}>
              Accept
            </Button>
            <Button onClick={() => handleDecline(agent.customer_id)} color="error" sx={{ mt: 2 }}>
              Decline
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default WelcomeContent;
