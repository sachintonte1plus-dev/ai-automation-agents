<div align="center">
  <h1>🚀 AI Automation Agents (Marketing Ecosystem)</h1>
  <p><strong>A Unified, Intelligent Dashboard Powered by 10 Independent AI Microservices</strong></p>
</div>

---

## 🎯 The Objective

In today's fast-paced digital landscape, marketing, development, and sales teams rely on dozens of disparate tools—from Google Analytics and Meta Ads to Sentry and OneTrust. **Our objective** is to eliminate data silos and context-switching by creating a centralized, AI-driven command center. 

This application deploys **10 specialized AI agents**, each running as an independent microservice, to autonomously monitor, audit, and analyze different facets of your digital ecosystem. Instead of just showing raw data, the agents provide **actionable AI recommendations** directly to the user.

---

## 🌩️ The Current Challenges

Before this ecosystem, modern digital teams faced significant bottlenecks:
1. **Fragmented Tooling:** Jumping between GA4, Google Ads, Search Console, CRM, and server logs wastes hours of productive time every week.
2. **Reactive Instead of Proactive:** Teams often only discover an e-commerce checkout bug or a drastic SEO drop *after* revenue has been lost.
3. **Hidden Ad Scopes:** Budget waste across Meta and Google Ads goes unnoticed because cross-platform ROI analysis is highly manual.
4. **Data Overload:** Non-technical stakeholders struggle to interpret raw data (e.g., Server 500s or TTFB metrics) to make business decisions.

---

## 💡 How This Application Helps

This project solves these challenges through a distributed, highly visual agentic workflow:

- **Unified "Single Pane of Glass" Dashboard:** A breathtaking, premium Glassmorphism UI built in React that aggregates real-time health across all marketing and technical vectors.
- **Autonomous Microservice Architecture:** 10 independent Node.js REST APIs run concurrently. If the SEO tracking API goes down, the Ads Optimization API remains fully operational.
- **Intelligent Synthesis:** Raw metrics are translated into human-readable alerts (e.g., *"Shift ₹2000/day budget from 'Retargeting' to 'Summer Sale' to maximize ROI"*). 

---

## 🤖 The 10 AI Agents

Each agent is a dedicated microservice running on its own designated port:

1. 🌐 **Website Performance Agent** (`Port 5009`): Tracks uptime, TTFB, and server health.
2. 🔍 **SEO Audit Agent** (`Port 5002`): Monitors Google Search Console for unindexed pages and meta tag anomalies.
3. 📊 **GA4 Insights Agent** (`Port 5003`): Analyzes user behavior, bounce rates, and funnel drop-offs.
4. 📢 **Ads Performance Agent** (`Port 5001`): Optimizes paid campaigns across Google and Meta to prevent budget waste.
5. 🍪 **Privacy & Consent Agent** (`Port 5005`): Ensures total GDPR/CCPA compliance via OneTrust integration.
6. 🧾 **Error Logs Monitoring Agent** (`Port 5004`): Hooks into Sentry/Server logs to instantly alert on API failures.
7. 📈 **Conversion Optimization Agent** (`Port 5008`): Suggests A/B tests and UI improvements to increase sales.
8. 📬 **Lead Tracking Agent** (`Port 5006`): Scores and routes high-quality leads from the CRM directly to the sales team.
9. 📝 **Content & SEO Strategy Agent** (`Port 5007`): Identifies keyword gaps and suggests high-volume blog topics.
10. 🔄 **Reporting Agent (Master)** (`Port 5010`): Aggregates the intelligence of all subordinate agents into comprehensive daily health reports.

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** Vite, React, Vanilla CSS (Custom Glassmorphism Design System)
* **Backend:** Node.js, Express (11 total APIs: 1 Main Master Backend + 10 Microservices)
* **Database:** MongoDB (Mongoose)

## 🚀 Getting Started

1. **Start the Database:** Ensure your local MongoDB instance is running on `mongodb://127.0.0.1:27017/ai-marketing-agents`.
2. **Start the Main Backend:** Navigate to `dashboard/backend` and run `node seed.js` followed by `node server.js` (`Port 5000`).
3. **Start the Microservices:** Navigate to the root directory `ai-automation-agents` and run `node create_all_services.js`. Then, execute the printed PowerShell snippet to start all 10 independent node processes in the background!
4. **Start the Dashboard:** Navigate to `dashboard/frontend` and run `npm run dev`.
5. Open your browser to `http://localhost:5173` to view the comprehensive agent ecosystem in action!
