const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { users, tasks } = require('./data');  // Import shared state
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use in routes (passed via middleware if needed)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));