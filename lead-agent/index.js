
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "Lead Management System",
  "status": "Optimal",
  "metrics": [
    {
      "label": "New Leads",
      "value": "24",
      "highlight": true
    },
    {
      "label": "Hot Leads",
      "value": "3"
    },
    {
      "label": "Conversion Rate",
      "value": "4.2%"
    }
  ],
  "lists": [
    {
      "name": "John Doe",
      "details": "Source: Google Ads Campaign",
      "value": "Hot prospect",
      "color": "#10b981"
    },
    {
      "name": "Acme Corp",
      "details": "Source: Organic Search",
      "value": "Warm lead",
      "color": "#f59e0b"
    },
    {
      "name": "Jane Smith",
      "details": "Source: Email Referral",
      "value": "Hot prospect",
      "color": "#10b981"
    }
  ],
  "recommendation": "Call the 3 high-quality leads from Google Ads immediately."
});
});

const PORT = 5006;
app.listen(PORT, () => console.log('lead-agent microservice running on port ' + PORT));
