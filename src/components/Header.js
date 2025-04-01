import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import MenuIcon from "@mui/icons-material/Menu";
import backgroundImg from '../Media/pizza.jpeg'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TastyDashboard = () => {

  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/getstock-notify");
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const handleClick = async () => {
    navigate("/notifications");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 3,
      }}
    >

      <AppBar position="sticky" color="primary" sx={{ zIndex: 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pizza Delight Dashboard
          </Typography>
          <IconButton onClick={handleClick} color="inherit">
          <Badge badgeContent={unreadCount} color="secondary">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        </Toolbar>
      </AppBar>

      <Box textAlign="center" sx={{ py: 5, color: "white" }}>
        <Typography variant="h1">Welcome to Pizza Delight!</Typography>
        <Typography variant="h3" color="secondary">
          Manage your Inventory, Orders, and delight your customers!
        </Typography>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={4}>
        {/* Pizza Orders Card */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
                <LocalPizzaIcon fontSize="large" />
              </Avatar>
              <Typography variant="h2">Orders</Typography>
              <Typography variant="body1" sx={{ my: 2 }}>
                View and manage all pizza orders. Keep track of order status and
                update customers.
              </Typography>
              <Button variant="contained" color="primary"
              onClick={() =>navigate('/orders')}>
                Go to Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory Management Card */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>
                <LocalPizzaIcon fontSize="large" />
              </Avatar>
              <Typography variant="h2">Inventory</Typography>
              <Typography variant="body1" sx={{ my: 2 }}>
                Update and manage inventory. Track ingredients like bases,
                sauces, and cheese.
              </Typography>
              <Button variant="contained" color="secondary"
              onClick={() => navigate('/inventory')}
              >
                
                Manage Inventory
              </Button>
            </CardContent>
          </Card>
        </Grid>

          </Grid>
    </Box>
  );
};

export default TastyDashboard;
