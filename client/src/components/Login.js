import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      onLogin(username, res.data.token);
      navigate('/tasks');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained">Login</Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Container>
  );
};

export default Login;