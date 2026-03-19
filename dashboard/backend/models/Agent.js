const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purpose: { type: String, required: true },
  integrations: [String],
  status: { type: String, enum: ['active', 'warning', 'error', 'info', 'success'], default: 'active' },
  icon: String, // String identifier for lucide-react icon
});

module.exports = mongoose.model('Agent', AgentSchema);
