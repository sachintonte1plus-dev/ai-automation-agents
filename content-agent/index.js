
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "Content & SEO Strategy",
  "status": "Optimal",
  "metrics": [
    {
      "label": "Keyword Gaps",
      "value": "15"
    },
    {
      "label": "Top Article",
      "value": "Back pain"
    },
    {
      "label": "Organic Growth",
      "value": "+12%",
      "highlight": true
    }
  ],
  "lists": [
    {
      "name": "Back pain treatment",
      "details": "Search Volume: 12k/mo",
      "value": "Ranked #4",
      "color": "#10b981"
    },
    {
      "name": "Dental implants cost",
      "details": "Search Volume: 8k/mo",
      "value": "Ranked #12",
      "color": "#f59e0b"
    }
  ],
  "recommendation": "Write follow-up post on 'Back pain prevention' to capture related volume."
});
});

const PORT = 5007;
app.listen(PORT, () => console.log('content-agent microservice running on port ' + PORT));
