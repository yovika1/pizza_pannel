// src/components/AddInventoryItem.js

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const AddInventoryItem = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    base: '',
    sauce: '',
    cheese: '',
    veggies: '',
    meat: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory', formData);
      setFormData({ base: '', sauce: '', cheese: '', veggies: '', meat: '' });
      onItemAdded(); // Refresh inventory list
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Base"
        name="base"
        value={formData.base}
        onChange={handleChange}
        required
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="Sauce"
        name="sauce"
        value={formData.sauce}
        onChange={handleChange}
        required
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="Cheese"
        name="cheese"
        value={formData.cheese}
        onChange={handleChange}
        required
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="Veggies"
        name="veggies"
        value={formData.veggies}
        onChange={handleChange}
        required
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="Meat"
        name="meat"
        value={formData.meat}
        onChange={handleChange}
        required
        sx={{ mr: 2, mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Item
      </Button>
    </Box>
  );
};

export default AddInventoryItem;
