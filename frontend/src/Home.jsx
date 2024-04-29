import { Button, TextField, Container, Typography } from '@mui/material';

function Home() {
  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom>
        Submit a support ticket
      </Typography>

      <form noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Home;