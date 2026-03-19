const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ads/performance', (req, res) => {
  // Simulating a real fetching algorithm that analyzes Google Ads / Meta Ads performance
  const data = {
    summary: {
      totalSpend: 8500,
      averageRoas: 2.1
    },
    campaigns: [
      { id: 1, platform: "Meta", name: "Summer Sale 2026", spend: 5000, conversions: 120, roas: 3.2, status: "Optimal", color: "#10b981" },
      { id: 2, platform: "Google", name: "Retargeting Network", spend: 2000, conversions: 12, roas: 0.8, status: "Underperforming", color: "#ef4444" },
      { id: 3, platform: "Meta", name: "Brand Awareness", spend: 1500, conversions: 45, roas: 1.5, status: "Average", color: "#f59e0b" }
    ],
    recommendation: "Shift ₹2000/day budget from 'Retargeting Network' to 'Summer Sale 2026' to maximize ROI and reduce ad waste."
  };
  res.json(data);
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Ads Agent microservice running on port ${PORT}`));
