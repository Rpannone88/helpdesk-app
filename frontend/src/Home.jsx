import { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import axios from 'axios';

function Home() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/tickets`, formData);
      console.log(response.data);
      alert('Ticket submitted successfully!');
      setFormData({ name: '', email: '', description: '' });
    } catch (error) {
      console.error('Failed to submit ticket:', error);
      alert('Failed to submit the ticket. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom>
        Submit a support ticket
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Home;
