import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from '@mui/material';


export const ConfirmDialog = ({ open, handleClose, handleConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{
       backgroundColor: 'rgba(231, 194, 139, 0.54)'
      }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Box>
    </Dialog>
  );
};

