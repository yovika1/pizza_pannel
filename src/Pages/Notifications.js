// src/components/Notifications.js

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import axios from 'axios';

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/api/alerts');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Stock Alerts</Typography>
      <List>
        {alerts.length === 0 ? (
          <ListItem>
            <ListItemText primary="No alerts at the moment." />
          </ListItem>
        ) : (
          alerts.map((alert) => (
            <ListItem key={alert.id}>
              <ListItemText primary={alert.message} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default Notifications;
