import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Box, Chip
} from '@mui/material';
import axios from 'axios';

export const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/order-details'); 
      setOrders(response?.data?.orders || []);
      console.log(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); 

    return () => clearInterval(interval); 
  }, []);

  // Function to return a colored chip based on order status
  const getStatusChip = (status) => {
    const statusColors = {
      "pending": "default",
      "preparing": "warning",
      "delivered": "success",
    };
    return <Chip label={status} color={statusColors[status] || "default"} />;
  };

  return (
    <Box sx={{ p: 3, background: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
        Order Management
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table aria-label="order management table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Items</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total (INR)</TableCell>              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length > 0
             && orders.map((order) => (
              <TableRow key={order._id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>
                  {order.items.map((item) =>(
                    <Box key={item._id}>
                      {item.name} ({item.quantity} x)
                    </Box>
                  ))}
                </TableCell>
                <TableCell>{order.grandTotal}</TableCell>
                <TableCell>{getStatusChip(order.status)}</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
