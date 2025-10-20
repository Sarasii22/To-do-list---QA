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
    //added token expiration handling
  } catch (err) {
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired, login again' });
  }
  res.status(401).json({ message: 'Invalid token' });
}
};

router.get('/', auth, (req, res) => {
  const userTasks = tasks.filter(t => t.userId === req.user.id);
  res.json(userTasks);
});
/*
//before
router.post('/', auth, (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body, userId: req.user.id, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});*/

//after - with validation
const { body, validationResult } = require('express-validator');

router.post('/', auth, [
  body('description').trim().escape().isLength({ min: 1, max: 500 }).withMessage('Invalid description')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const task = new Task({ ...req.body, user: req.user.id });
  await task.save();
  res.json(task);
});

module.exports = router;