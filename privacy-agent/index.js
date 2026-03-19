
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "Privacy & Consent Tracking",
  "status": "Warning",
  "metrics": [
    {
      "label": "Consent Rate",
      "value": "45%",
      "highlight": true
    },
    {
      "label": "Opt-outs Today",
      "value": "120"
    },
    {
      "label": "Violations",
      "value": "0"
    }
  ],
  "lists": [
    {
      "name": "EU Region Traffic",
      "details": "GDPR Compliance status",
      "value": "32% Consent",
      "color": "#ef4444"
    },
    {
      "name": "US Region Traffic",
      "details": "CCPA Compliance status",
      "value": "68% Consent",
      "color": "#10b981"
    }
  ],
  "recommendation": "Redesign cookie banner to improve consent rate above 45% minimum threshold."
});
});

const PORT = 5005;
app.listen(PORT, () => console.log('privacy-agent microservice running on port ' + PORT));
