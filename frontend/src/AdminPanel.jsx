import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';

// Dummy data for tickets
const tickets = [
  { id: 1, name: 'John Doe', email: 'john@example.com', description: 'Problem 1', status: 'new' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', description: 'Problem 2', status: 'in progress' },
  // Add more tickets as needed
];

function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);

  const handleClickOpen = (ticket) => {
    setCurrentTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper} >
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
          <TextField margin="dense" label="Name" type="text" fullWidth defaultValue={currentTicket?.name} />
          <TextField margin="dense" label="Email" type="text" fullWidth defaultValue={currentTicket?.email} />
          <TextField margin="dense" label="Description" type="text" fullWidth defaultValue={currentTicket?.description} />
          <Select value={currentTicket?.status} fullWidth>
            <MenuItem value={'new'}>New</MenuItem>
            <MenuItem value={'in progress'}>In Progress</MenuItem>
            <MenuItem value={'resolved'}>Resolved</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default AdminPanel;