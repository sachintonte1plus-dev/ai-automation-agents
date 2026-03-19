require('dotenv').config();
const mongoose = require('mongoose');
const Agent = require('./models/Agent');
const Insight = require('./models/Insight');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB. Clearing old data...');
        await Agent.deleteMany({});
        await Insight.deleteMany({});

        const agentsList = [
            {
                name: "Website Performance Agent",
                purpose: "Monitor website health",
                integrations: ["Google Analytics 4", "Server logs / uptime tools"],
                status: "error",
                icon: "Activity"
            },
            {
                name: "SEO Audit Agent",
                purpose: "Improve search rankings",
                integrations: ["Google Search Console"],
                status: "warning",
                icon: "Search"
            },
            {
                name: "GA4 Insights Agent",
                purpose: "Analyze user behavior",
                integrations: ["Google Analytics 4"],
                status: "warning",
                icon: "BarChart2"
            },
            {
                name: "Ads Performance Agent",
                purpose: "Optimize paid campaigns",
                integrations: ["Google Ads", "Meta Ads Manager"],
                status: "error",
                icon: "Megaphone"
            },
            {
                name: "Privacy & Consent Agent",
                purpose: "Ensure compliance",
                integrations: ["OneTrust"],
                status: "warning",
                icon: "ShieldAlert"
            },
            {
                name: "Error Logs Monitoring Agent",
                purpose: "Detect technical issues",
                integrations: ["Server logs", "Sentry"],
                status: "error",
                icon: "FileWarning"
            },
            {
                name: "Conversion Optimization Agent",
                purpose: "Increase leads/sales",
                integrations: ["GA4", "CRM"],
                status: "info",
                icon: "TrendingUp"
            },
            {
                name: "Lead Tracking Agent",
                purpose: "Manage leads",
                integrations: ["CRM", "Forms", "WhatsApp"],
                status: "success",
                icon: "Users"
            },
            {
                name: "Content & SEO Strategy Agent",
                purpose: "Grow organic traffic",
                integrations: ["Search Console", "Keyword Tools"],
                status: "info",
                icon: "FileText"
            },
            {
                name: "Automation & Reporting Agent (Master Agent)",
                purpose: "Combine everything",
                integrations: ["All Agents"],
                status: "active",
                icon: "BrainCircuit"
            }
        ];

        const createdAgents = await Agent.insertMany(agentsList);
        console.log('Inserted Agents.');

        const findAgent = (nameSnippet) => createdAgents.find(a => a.name.includes(nameSnippet));

        const insightsList = [
            {
                agentId: findAgent("Website Performance")._id,
                message: "Traffic dropped 25% on homepage in last 24 hours",
                type: "error"
            },
            {
                agentId: findAgent("SEO Audit")._id,
                message: "10 pages not indexed, 5 pages missing meta description",
                type: "warning"
            },
            {
                agentId: findAgent("GA4 Insights")._id,
                message: "Checkout page has 70% drop-off rate",
                type: "warning"
            },
            {
                agentId: findAgent("Ads Performance")._id,
                message: "Ad group A wasting ₹2000/day with low conversions",
                type: "error"
            },
            {
                agentId: findAgent("Privacy")._id,
                message: "Only 45% users giving consent — tracking accuracy affected",
                type: "warning"
            },
            {
                agentId: findAgent("Error Logs")._id,
                message: "Payment API failing 12% requests",
                type: "error"
            },
            {
                agentId: findAgent("Conversion")._id,
                message: "Form too long — reduce fields to increase conversion",
                type: "info"
            },
            {
                agentId: findAgent("Lead Tracking")._id,
                message: "High-quality lead from Google Ads — call immediately",
                type: "success"
            },
            {
                agentId: findAgent("Content & SEO")._id,
                message: "Write blog on 'back pain treatment' — high search volume",
                type: "info"
            },
            {
                agentId: findAgent("Automation & Reporting Agent (Master Agent)")._id,
                message: "Full business report: Traffic 📉 Ads waste 💸 SEO issues ⚠️ Errors 🚨",
                type: "alert"
            }
        ];

        await Insight.insertMany(insightsList);
        console.log('Inserted Insights.');

        console.log('Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
