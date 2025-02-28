import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import AdminPizzaList from "./PizzaDeatils";

export const AddPizza = () => {
  const [pizza, setPizza] = useState({ 
    name: "", 
    description: "", 
    price: "", 
    category: "", 
    image: "" 
  });

  const handleChange = (e) => {
    setPizza({ ...pizza, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/create", pizza);
      console.log(response);
      alert("Pizza added successfully!");
      setPizza({ name: "", description: "", price: "", category: "", image: "" });
    } catch (error) {
      console.error("Error adding pizza:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="row" gap={4} p={2}>
      {/* Pizza Form */}
      <Box sx={{ maxWidth: "500px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Add a New Pizza 🍕</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Pizza Name"
            fullWidth
            value={pizza.name}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={pizza.description}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            name="price"
            label="Price (INR)"
            fullWidth
            type="number"
            value={pizza.price}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            name="category"
            label="Category"
            fullWidth
            value={pizza.category}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            value={pizza.image}
            onChange={handleChange}
            sx={{ marginBottom: "20px" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Pizza
          </Button>
        </form>
      </Box>

      {/* Pizza List */}
      <AdminPizzaList />
    </Box>
  );
};
