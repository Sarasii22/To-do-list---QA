import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Tasks = ({ user, logout }) => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', { description });
    setDescription('');
    fetchTasks();
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