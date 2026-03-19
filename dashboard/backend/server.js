require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Agent = require('./models/Agent');
const Insight = require('./models/Insight');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Get all agents
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get insights (with optional agent filter)
app.get('/api/insights', async (req, res) => {
  try {
    let query = {};
    if (req.query.agentId) {
      query.agentId = req.query.agentId;
    }
    const insights = await Insight.find(query).populate('agentId', 'name icon').sort({ createdAt: -1 }).limit(50);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
