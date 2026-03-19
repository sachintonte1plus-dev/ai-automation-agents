import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [agents, setAgents] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, insightsRes] = await Promise.all([
          fetch(`${API_BASE}/agents`),
          fetch(`${API_BASE}/insights`)
        ]);
        
        const agentsData = await agentsRes.json();
        const insightsData = await insightsRes.json();
        
        setAgents(agentsData);
        setInsights(insightsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
    // Simulate real-time polling
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getLatestInsightForAgent = (agentId) => {
    return insights.find(insight => 
      (insight.agentId._id === agentId) || 
      (insight.agentId === agentId)
    );
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Marketing Ecosystem</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Overview of all AI Automation Agents</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text-main)', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>Export Report</button>
            <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--primary)', border: 'none', color: 'white', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)' }}>+ Add Agent</button>
          </div>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div className="brand loading-pulse" style={{ fontSize: '2rem' }}>Loading Agents...</div>
          </div>
        ) : (
          <div className="dashboard-grid">
            {agents.map(agent => (
              <AgentCard 
                key={agent._id} 
                agent={agent} 
                latestInsight={getLatestInsightForAgent(agent._id)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
