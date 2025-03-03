import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,

} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditPizzaForm } from "../Models/Model";
import { ConfirmDialog } from "../Models/deleteInventory";

export const AdminPizzaList = () => {
  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId ,setDeleteId] = useState(null)

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getting-pizza");
      setPizzas(response.data);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };

  // Handle update
   const handleUpdate = () =>{
     fetchPizzas()
   }
  
  const handleClose =() =>{
    setSelectedPizza(null);
  }

  const handleEdit = (pizza) =>{
    setSelectedPizza(pizza)
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  // Handle Delete Pizza
  const handleDelete = async () => {
    if (deleteId) {
      
      try {
        await axios.delete(`http://localhost:8000/delete/${deleteId}`);
        setPizzas((prevPizzas) => prevPizzas.filter((pizza) => pizza._id !== deleteId)); 
      } catch (error) {
        console.error("Error deleting pizza:", error);
      }
      setDeleteId(null);
    setOpenConfirm(false);
    }
  };

  return (
    <Box>
      <h2 style={{ textAlign: "center" }}>Admin Pizza List 🍕</h2>

     

      <TableContainer component={Paper} sx={{ maxWidth: "800px", margin: "auto", mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Price (Rs)</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pizzas.map((pizza) => (
              <TableRow key={pizza._id}>
                <TableCell>
                  <img src={pizza.image} alt={pizza.name} width="50" height="50" style={{ borderRadius: "10px" }} />
                </TableCell>
                <TableCell>{pizza.name}</TableCell>
                <TableCell>{pizza.description}</TableCell>
                <TableCell>Rs{pizza.price}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon  onClick={() => handleEdit(pizza)}/>
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(pizza._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPizza && (
        <EditPizzaForm
        pizza={selectedPizza}
        onClose={handleClose}
        refresh={handleUpdate}
        />
      )}
       <ConfirmDialog
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={handleDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete this pizza?"
      />
    </Box>
  );
};

