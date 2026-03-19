
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "System Error Logs",
  "status": "Critical",
  "metrics": [
    {
      "label": "Payment API Failures",
      "value": "12%",
      "highlight": true
    },
    {
      "label": "500 Errors",
      "value": "45"
    },
    {
      "label": "Exceptions",
      "value": "120"
    }
  ],
  "lists": [
    {
      "name": "Stripe API Timeout",
      "details": "Endpoint: /api/checkout",
      "value": "Critical Error",
      "color": "#ef4444"
    },
    {
      "name": "Unhandled Promise",
      "details": "Component: AgentCard.jsx:45",
      "value": "Warning",
      "color": "#f59e0b"
    }
  ],
  "recommendation": "Rollback recent checkout service deployment immediately."
});
});

const PORT = 5004;
app.listen(PORT, () => console.log('error-logs-agent microservice running on port ' + PORT));
