const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'alert', 'success', 'warning', 'error'], default: 'info' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Insight', InsightSchema);
