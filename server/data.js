const bcrypt = require('bcryptjs');

// In-memory stores
let users = [];
let tasks = [];

// Seed admin
const seedAdmin = () => {
  if (users.length === 0) {
    const hashed = bcrypt.hashSync('password', 10);
    users.push({ id: 1, username: 'admin', password: hashed });
    console.log('Admin seeded');
  }
};
seedAdmin();

module.exports = { users, tasks };