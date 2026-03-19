
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "Conversion Optimization",
  "status": "Optimal",
  "metrics": [
    {
      "label": "Form Abandonment",
      "value": "45%"
    },
    {
      "label": "A/B Winner",
      "value": "Variant B",
      "highlight": true
    },
    {
      "label": "Click Rate",
      "value": "8.5%"
    }
  ],
  "lists": [
    {
      "name": "Test: CTA Button Color",
      "details": "Red vs Blue",
      "value": "Blue Wins (+15%)",
      "color": "#10b981"
    },
    {
      "name": "Test: Checkout Layout",
      "details": "1-step vs multi-step",
      "value": "Running...",
      "color": "#3b82f6"
    }
  ],
  "recommendation": "Deploy Variant B (Blue Button) to production."
});
});

const PORT = 5008;
app.listen(PORT, () => console.log('conversion-agent microservice running on port ' + PORT));
