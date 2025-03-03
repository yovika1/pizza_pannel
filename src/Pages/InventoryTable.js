import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import InventoryModal from '../Models/InventoryModal';

const AddInventoryItem = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch inventory items from backend
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gettingInventory');
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleAddItem = () => {
    setSelectedPizza(null);
    setModalOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedPizza(item);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleItemAdded = () => {
    fetchInventory();
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: 3, background: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Inventory</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bases</TableCell>
              <TableCell>Sauces</TableCell>
              <TableCell>Cheese</TableCell>
              <TableCell>Meat</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.base}</TableCell>
                <TableCell>{item.sauce}</TableCell>
                <TableCell>{item.cheese}</TableCell>
                <TableCell>{item.meat}</TableCell>
                <TableCell>{item.ingredients.join(', ')}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditItem(item)} color="secondary">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" onClick={handleAddItem} sx={{ mt: 2 }}>
        Add Item
      </Button>

      {modalOpen && (
        <InventoryModal
          KnowPizza={selectedPizza}
          onClose={handleClose}
          refresh={handleItemAdded}
        />
      )}
    </Box>
  );
};

export default AddInventoryItem;
