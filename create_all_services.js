const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const agents = [
  {
    folder: "ads-agent", port: 5001,
    data: {
      title: "Ads Performance Audit",
      status: "Critical",
      metrics: [ { label: "Total Spend", value: "₹8500" }, { label: "Avg ROAS", value: "2.1x", highlight: true }, { label: "Active Ads", value: "3" } ],
      lists: [
        { name: "Summer Sale 2026", details: "Meta | Spend: ₹5000", value: "3.2x ROAS", color: "#10b981" },
        { name: "Retargeting Network", details: "Google | Spend: ₹2000", value: "0.8x ROAS", color: "#ef4444" },
        { name: "Brand Awareness", details: "Meta | Spend: ₹1500", value: "1.5x ROAS", color: "#f59e0b" }
      ],
      recommendation: "Shift ₹2000/day budget from 'Retargeting Network' to 'Summer Sale 2026' to maximize ROI."
    }
  },
  {
    folder: "seo-agent", port: 5002,
    data: {
      title: "SEO Audit Details",
      status: "Warning",
      metrics: [ { label: "Unindexed Pages", value: "10" }, { label: "Missing Meta Desc", value: "5", highlight: true }, { label: "Rank Drops", value: "2" } ],
      lists: [
        { name: "Homepage", details: "Missing H1 tag", value: "High Priority", color: "#ef4444" },
        { name: "About Us", details: "Meta description too short", value: "Low Priority", color: "#f59e0b" }
      ],
      recommendation: "Submit sitemap to GSC for the 10 unindexed pages."
    }
  },
  {
    folder: "ga4-agent", port: 5003,
    data: {
      title: "GA4 Traffic Details",
      status: "Warning",
      metrics: [ { label: "Checkout Drop-off", value: "70%", highlight: true }, { label: "Avg Session", value: "1m 12s" }, { label: "Bounce Rate", value: "65%" } ],
      lists: [
        { name: "Direct Traffic", details: "Down 15% vs last week", value: "3,402 views", color: "#f59e0b" },
        { name: "Organic Search", details: "Steady growth", value: "12,041 views", color: "#10b981" }
      ],
      recommendation: "Simplify checkout form to reduce 70% drop-off rate."
    }
  },
  {
    folder: "error-logs-agent", port: 5004,
    data: {
      title: "System Error Logs",
      status: "Critical",
      metrics: [ { label: "Payment API Failures", value: "12%", highlight: true }, { label: "500 Errors", value: "45" }, { label: "Exceptions", value: "120" } ],
      lists: [
        { name: "Stripe API Timeout", details: "Endpoint: /api/checkout", value: "Critical Error", color: "#ef4444" },
        { name: "Unhandled Promise", details: "Component: AgentCard.jsx:45", value: "Warning", color: "#f59e0b" }
      ],
      recommendation: "Rollback recent checkout service deployment immediately."
    }
  },
  {
    folder: "privacy-agent", port: 5005,
    data: {
      title: "Privacy & Consent Tracking",
      status: "Warning",
      metrics: [ { label: "Consent Rate", value: "45%", highlight: true }, { label: "Opt-outs Today", value: "120" }, { label: "Violations", value: "0" } ],
      lists: [
        { name: "EU Region Traffic", details: "GDPR Compliance status", value: "32% Consent", color: "#ef4444" },
        { name: "US Region Traffic", details: "CCPA Compliance status", value: "68% Consent", color: "#10b981" }
      ],
      recommendation: "Redesign cookie banner to improve consent rate above 45% minimum threshold."
    }
  },
  {
    folder: "lead-agent", port: 5006,
    data: {
      title: "Lead Management System",
      status: "Optimal",
      metrics: [ { label: "New Leads", value: "24", highlight: true }, { label: "Hot Leads", value: "3" }, { label: "Conversion Rate", value: "4.2%" } ],
      lists: [
        { name: "John Doe", details: "Source: Google Ads Campaign", value: "Hot prospect", color: "#10b981" },
        { name: "Acme Corp", details: "Source: Organic Search", value: "Warm lead", color: "#f59e0b" },
        { name: "Jane Smith", details: "Source: Email Referral", value: "Hot prospect", color: "#10b981" }
      ],
      recommendation: "Call the 3 high-quality leads from Google Ads immediately."
    }
  },
  {
    folder: "content-agent", port: 5007,
    data: {
      title: "Content & SEO Strategy",
      status: "Optimal",
      metrics: [ { label: "Keyword Gaps", value: "15" }, { label: "Top Article", value: "Back pain" }, { label: "Organic Growth", value: "+12%", highlight: true } ],
      lists: [
        { name: "Back pain treatment", details: "Search Volume: 12k/mo", value: "Ranked #4", color: "#10b981" },
        { name: "Dental implants cost", details: "Search Volume: 8k/mo", value: "Ranked #12", color: "#f59e0b" }
      ],
      recommendation: "Write follow-up post on 'Back pain prevention' to capture related volume."
    }
  },
  {
    folder: "conversion-agent", port: 5008,
    data: {
      title: "Conversion Optimization",
      status: "Optimal",
      metrics: [ { label: "Form Abandonment", value: "45%" }, { label: "A/B Winner", value: "Variant B", highlight: true }, { label: "Click Rate", value: "8.5%" } ],
      lists: [
        { name: "Test: CTA Button Color", details: "Red vs Blue", value: "Blue Wins (+15%)", color: "#10b981" },
        { name: "Test: Checkout Layout", details: "1-step vs multi-step", value: "Running...", color: "#3b82f6" }
      ],
      recommendation: "Deploy Variant B (Blue Button) to production."
    }
  },
  {
    folder: "website-performance-agent", port: 5009,
    data: {
      title: "Website Performance",
      status: "Critical",
      metrics: [ { label: "Traffic Drop", value: "25%", highlight: true }, { label: "Avg Load", value: "3.2s" }, { label: "Broken Links", value: "4" } ],
      lists: [
        { name: "Homepage Load Time", details: "Largest Contentful Paint", value: "4.5s (Poor)", color: "#ef4444" },
        { name: "/pricing responsiveness", details: "First Input Delay", value: "12ms (Good)", color: "#10b981" }
      ],
      recommendation: "Investigate server response time (TTFB) and optimize hero images on homepage."
    }
  },
  {
    folder: "reporting-agent", port: 5010,
    data: {
      title: "Master Analytics Report",
      status: "Critical",
      metrics: [ { label: "System Health", value: "Degraded", highlight: true }, { label: "Active Alerts", value: "4" }, { label: "Total Agents", value: "10" } ],
      lists: [
        { name: "Website Performance", details: "Traffic dropped 25%", value: "Critical Error", color: "#ef4444" },
        { name: "Ads Performance", details: "Wasting ₹2000/day", value: "Critical Error", color: "#ef4444" },
        { name: "SEO & Privacy", details: "Minor issues detected", value: "Warnings", color: "#f59e0b" }
      ],
      recommendation: "Immediate Action Required: Address Website Performance and Ads Agent errors."
    }
  }
];

agents.forEach(agent => {
  const agentPath = path.join(rootDir, agent.folder);
  if (!fs.existsSync(agentPath)) {
    fs.mkdirSync(agentPath);
  }

  const pkgJson = {
    name: agent.folder,
    version: "1.0.0",
    main: "index.js",
    scripts: { start: "node index.js" },
    dependencies: { cors: "^2.8.5", express: "^4.18.2" }
  };
  fs.writeFileSync(path.join(agentPath, 'package.json'), JSON.stringify(pkgJson, null, 2));

  const indexJs = `
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/details', (req, res) => {
  res.json(${JSON.stringify(agent.data, null, 2)});
});

const PORT = ${agent.port};
app.listen(PORT, () => console.log('${agent.folder} microservice running on port ' + PORT));
`;
  fs.writeFileSync(path.join(agentPath, 'index.js'), indexJs);
  console.log('Created ' + agent.folder);
});
console.log('Finished writing 10 agent microservices.');
