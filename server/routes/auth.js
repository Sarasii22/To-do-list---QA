const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('../data');
const router = express.Router();

const login = async (req, res) => {  // Add this function
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1m' });
    res.json({ token, username: user.username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

router.post('/login', login);
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashed };
  users.push(newUser);
  res.json({ message: 'User created' });
});

//module.exports = { router, login };  // Export login for test

module.exports = router;