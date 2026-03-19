
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "GA4 Traffic Details",
  "status": "Warning",
  "metrics": [
    {
      "label": "Checkout Drop-off",
      "value": "70%",
      "highlight": true
    },
    {
      "label": "Avg Session",
      "value": "1m 12s"
    },
    {
      "label": "Bounce Rate",
      "value": "65%"
    }
  ],
  "lists": [
    {
      "name": "Direct Traffic",
      "details": "Down 15% vs last week",
      "value": "3,402 views",
      "color": "#f59e0b"
    },
    {
      "name": "Organic Search",
      "details": "Steady growth",
      "value": "12,041 views",
      "color": "#10b981"
    }
  ],
  "recommendation": "Simplify checkout form to reduce 70% drop-off rate."
});
});

const PORT = 5003;
app.listen(PORT, () => console.log('ga4-agent microservice running on port ' + PORT));
