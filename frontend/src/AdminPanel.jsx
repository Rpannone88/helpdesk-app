import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';

function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tickets`);
        setTickets(response.data);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleClickOpen = (ticket) => {
    setCurrentTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setCurrentTicket(prev => ({ ...prev, status: event.target.value }));
  };

  const handleUpdate = async () => {
    if (currentTicket) {
      try {
        const response = await axios.put(`${apiUrl}/tickets/${currentTicket.id}`, {
          status: currentTicket.status,
      });
        console.log(response.data);
        alert('Ticket updated successfully!');
        handleClose();
        const updatedTickets = tickets.map(t =>
          t.id === currentTicket.id ? { ...t, status: currentTicket.status } : t
        );
        setTickets(updatedTickets);
      } catch (error) {
        console.error('Failed to update ticket:', error);
        alert('Failed updating the ticket(s), please try again.');
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.name}</TableCell>
              <TableCell>{ticket.email}</TableCell>
              <TableCell>{ticket.description}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleClickOpen(ticket)}>
                  View / Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Ticket</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Name" type="text" fullWidth value={currentTicket?.name} disabled />
          <TextField margin="dense" label="Email" type="text" fullWidth value={currentTicket?.email} disabled />
          <TextField margin="dense" label="Description" type="text" fullWidth value={currentTicket?.description} disabled />
          <Select
            value={currentTicket?.status}
            fullWidth
            onChange={handleStatusChange}
          >
            <MenuItem value={'new'}>New</MenuItem>
            <MenuItem value={'in progress'}>In Progress</MenuItem>
            <MenuItem value={'resolved'}>Resolved</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default AdminPanel;
