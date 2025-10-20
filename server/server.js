const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { users, tasks } = require('./data');  // Import shared state
dotenv.config();

const app = express();  // Define app first

//after defining app, set up rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5, // 5 attempts
  message: 'Too many login attempts, try again later'
});
app.use('/api/auth/login', limiter);  // Blocks after 5

app.use(cors());
app.use(express.json());

// Use in routes (passed via middleware if needed)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => {
  res.redirect('http://localhost:3000');  // Redirect to frontend
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) console.error('Server error:', err);
  else console.log(`Server on ${PORT}`);
});