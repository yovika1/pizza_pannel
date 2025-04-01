import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";

const StockPage = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchStockLevels();
  }, []);

  const fetchStockLevels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/low-stock");
      setStock(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching stock levels:", error);
    }
  };

  return (
    <Box sx={{ p: 3, background: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
        Stock Levels
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Typography color={item.quantity < 2 ? "error" : "success"}>
                    {item.quantity < 2 ? "Low Stock" : "In Stock"}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockPage;
