import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const InventoryModal = ({ KnowPizza, onClose, refresh }) => {
  const [formData, setFormData] = useState({
    base: '',
    sauce: '',
    cheese: '',
    meat: '',
    ingredients: '',
  });

  useEffect(() => {
    if (KnowPizza) {
      setFormData({
        base: KnowPizza.base,
        sauce: KnowPizza.sauce,
        cheese: KnowPizza.cheese,
        meat: KnowPizza.meat,
        ingredients: KnowPizza.ingredients.join(', '),
      });
    }
  }, [KnowPizza]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async () => {
    try {
      if (KnowPizza) {
        await axios.put(`http://localhost:8000/updateInventory/${KnowPizza._id}`, formData);
      } else {
        await axios.post('http://localhost:8000/createInventory', formData);
      }
      refresh();
      onClose();
    } catch (error) {
      console.error("Error saving inventory item:", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ p: 4, background: "#fff", width: 400, margin: "auto", mt: "10%" }}>
        <TextField fullWidth margin="normal" label="Base" name="base" value={formData.base} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Sauce" name="sauce" value={formData.sauce} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Cheese" name="cheese" value={formData.cheese} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Meat" name="meat" value={formData.meat} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Ingredients (comma-separated)" name="ingredients" value={formData.ingredients} onChange={handleChange} />

        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ mt: 2 }}>
          {KnowPizza ? "Update Item" : "Add Item"}
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default InventoryModal;
