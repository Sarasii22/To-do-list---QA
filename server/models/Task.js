const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', taskSchema);