import * as React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import AdminPanel from './AdminPanel';
import Home from './Home';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

function App() {
  return (
    <>
      <Router>
        <AppBar position="static" sx={{ flexGrow: 1, marginBottom: '1rem' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Help Desk
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;