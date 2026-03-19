
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "Ads Performance Audit",
  "status": "Critical",
  "metrics": [
    {
      "label": "Total Spend",
      "value": "₹8500"
    },
    {
      "label": "Avg ROAS",
      "value": "2.1x",
      "highlight": true
    },
    {
      "label": "Active Ads",
      "value": "3"
    }
  ],
  "lists": [
    {
      "name": "Summer Sale 2026",
      "details": "Meta | Spend: ₹5000",
      "value": "3.2x ROAS",
      "color": "#10b981"
    },
    {
      "name": "Retargeting Network",
      "details": "Google | Spend: ₹2000",
      "value": "0.8x ROAS",
      "color": "#ef4444"
    },
    {
      "name": "Brand Awareness",
      "details": "Meta | Spend: ₹1500",
      "value": "1.5x ROAS",
      "color": "#f59e0b"
    }
  ],
  "recommendation": "Shift ₹2000/day budget from 'Retargeting Network' to 'Summer Sale 2026' to maximize ROI."
});
});

const PORT = 5001;
app.listen(PORT, () => console.log('ads-agent microservice running on port ' + PORT));
