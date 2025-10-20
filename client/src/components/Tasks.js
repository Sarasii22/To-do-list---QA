import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Tasks = ({ user, logout }) => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Redirect to login if no token
    window.location.href = '/login';
  }
  fetchTasks();
}, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  //before
  /*const addTask = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');  // Get token
  if (!token) {
    alert('Please login again');
    return;
  }
  try {
    await axios.post('http://localhost:5000/api/tasks', { description }, {
      headers: { Authorization: `Bearer ${token}` }  // Explicit header
    });
    setDescription('');
    fetchTasks();
  } catch (err) {
    if (err.response.status === 401) {
      alert('Token expired—login again');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }*/

    //after - with error handling
    const addTask = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login again');
    return;
  }
  try {
    await axios.post('http://localhost:5000/api/tasks', { description }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDescription('');
    fetchTasks();
  } catch (err) {
    if (err.response.status === 401) {
      alert('Token expired—login again');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

};

  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Tasks for {user}</Typography>
        <Button onClick={logout} variant="outlined">Logout</Button>
      </Box>
      <form onSubmit={addTask}>
        <TextField fullWidth label="New Task" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button type="submit" variant="contained">Add</Button>
      </form>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id}>
            <ListItemText primary={task.description} secondary={task.completed ? 'Completed' : 'Pending'} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Tasks;