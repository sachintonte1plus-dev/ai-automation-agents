
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "Master Analytics Report",
  "status": "Critical",
  "metrics": [
    {
      "label": "System Health",
      "value": "Degraded",
      "highlight": true
    },
    {
      "label": "Active Alerts",
      "value": "4"
    },
    {
      "label": "Total Agents",
      "value": "10"
    }
  ],
  "lists": [
    {
      "name": "Website Performance",
      "details": "Traffic dropped 25%",
      "value": "Critical Error",
      "color": "#ef4444"
    },
    {
      "name": "Ads Performance",
      "details": "Wasting ₹2000/day",
      "value": "Critical Error",
      "color": "#ef4444"
    },
    {
      "name": "SEO & Privacy",
      "details": "Minor issues detected",
      "value": "Warnings",
      "color": "#f59e0b"
    }
  ],
  "recommendation": "Immediate Action Required: Address Website Performance and Ads Agent errors."
});
});

const PORT = 5010;
app.listen(PORT, () => console.log('reporting-agent microservice running on port ' + PORT));
