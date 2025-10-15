const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register (for demo, add admin user manually or use this)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await user.matchPassword(password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;