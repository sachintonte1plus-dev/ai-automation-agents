
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json({
  "title": "SEO Audit Details",
  "status": "Warning",
  "metrics": [
    {
      "label": "Unindexed Pages",
      "value": "10"
    },
    {
      "label": "Missing Meta Desc",
      "value": "5",
      "highlight": true
    },
    {
      "label": "Rank Drops",
      "value": "2"
    }
  ],
  "lists": [
    {
      "name": "Homepage",
      "details": "Missing H1 tag",
      "value": "High Priority",
      "color": "#ef4444"
    },
    {
      "name": "About Us",
      "details": "Meta description too short",
      "value": "Low Priority",
      "color": "#f59e0b"
    }
  ],
  "recommendation": "Submit sitemap to GSC for the 10 unindexed pages."
});
});

const PORT = 5002;
app.listen(PORT, () => console.log('seo-agent microservice running on port ' + PORT));
