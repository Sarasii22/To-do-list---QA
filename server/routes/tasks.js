const express = require('express');
const jwt = require('jsonwebtoken');
const { tasks } = require('../data');  // Import shared
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', auth, (req, res) => {
  const userTasks = tasks.filter(t => t.userId === req.user.id);
  res.json(userTasks);
});

router.post('/', auth, (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body, userId: req.user.id, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

module.exports = router;