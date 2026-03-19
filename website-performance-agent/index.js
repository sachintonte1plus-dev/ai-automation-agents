
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "Website Performance",
  "status": "Critical",
  "metrics": [
    {
      "label": "Traffic Drop",
      "value": "25%",
      "highlight": true
    },
    {
      "label": "Avg Load",
      "value": "3.2s"
    },
    {
      "label": "Broken Links",
      "value": "4"
    }
  ],
  "lists": [
    {
      "name": "Homepage Load Time",
      "details": "Largest Contentful Paint",
      "value": "4.5s (Poor)",
      "color": "#ef4444"
    },
    {
      "name": "/pricing responsiveness",
      "details": "First Input Delay",
      "value": "12ms (Good)",
      "color": "#10b981"
    }
  ],
  "recommendation": "Investigate server response time (TTFB) and optimize hero images on homepage."
});
});

const PORT = 5009;
app.listen(PORT, () => console.log('website-performance-agent microservice running on port ' + PORT));
