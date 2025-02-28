import React, { useState } from "react";
import axios from "axios";
import { 
  TextField, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from "@mui/material";

export const EditPizzaForm = ({ pizza, onClose, refresh }) => {
  const [updatedPizza, setUpdatedPizza] = useState({ ...pizza });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUpdatedPizza({ ...updatedPizza, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:8000/updated-pizza/${pizza._id}`, 
        updatedPizza
      );
      console.log(response);

      if (response.status === 200) {
        refresh(); // Refresh the pizza list in AdminPizzaList
        onClose(); // Close the modal
      } else {
        setError("Failed to update pizza.");
      }
    } catch (error) {
      console.error("Error updating pizza:", error);
      setError("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Pizza</DialogTitle>
      <DialogContent>
        <TextField
          label="Pizza Name"
          name="name" 
          value={updatedPizza.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price (INR)"
          name="price"
          type="number"
          value={updatedPizza.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={updatedPizza.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained" 
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Pizza"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
