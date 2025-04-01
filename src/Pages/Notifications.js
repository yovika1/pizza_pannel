import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";

 export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/getstock-notify");
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:8000/mark-notification/${id}`);
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleClick = (notification) => {
    markAsRead(notification._id);

    if (notification.message.includes("Stock for")) {
      navigate("/stock-notifications");
    }
  };

  return (
    
    <Paper elevation={3} sx={{ maxWidth: 600, margin: "auto", padding: 3, mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        🔔 Notifications
      </Typography>
      {notifications.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No notifications available
        </Typography>
      ) : (
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification._id}
              button
              onClick={() => handleClick(notification)}
              sx={{
                backgroundColor: notification.isRead ? "#f5f5f5" : "white",
                borderBottom: "1px solid #ddd",
              }}
            >
              <ListItemText
                primary={notification.message}
                primaryTypographyProps={{
                  sx: !notification.isRead ? { fontWeight: "bold" } : {},
                }}
                secondary={new Date(notification.createdAt).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

