const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware for auth
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

// Get tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Add task
router.post('/', auth, async (req, res) => {
  const task = new Task({ ...req.body, user: req.user.id });
  await task.save();
  res.json(task);
});

module.exports = router;