import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';

const API_BASE = 'http://localhost:5000/api';

const getAgentApiUrl = (agentName) => {
  if (agentName.includes("Ads Performance")) return 'http://localhost:5001/api/details';
  if (agentName.includes("SEO Audit")) return 'http://localhost:5002/api/details';
  if (agentName.includes("GA4 Insights")) return 'http://localhost:5003/api/details';
  if (agentName.includes("Error Logs")) return 'http://localhost:5004/api/details';
  if (agentName.includes("Privacy")) return 'http://localhost:5005/api/details';
  if (agentName.includes("Lead Tracking")) return 'http://localhost:5006/api/details';
  if (agentName.includes("Content")) return 'http://localhost:5007/api/details';
  if (agentName.includes("Conversion")) return 'http://localhost:5008/api/details';
  if (agentName.includes("Website Performance")) return 'http://localhost:5009/api/details';
  if (agentName.includes("Master") || agentName.includes("Reporting")) return 'http://localhost:5010/api/details';
  return null;
};

function App() {
  const [agents, setAgents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [adsData, setAdsData] = useState(null);
  const [loadingAds, setLoadingAds] = useState(false);
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

  const handleOpenDetails = async (agent) => {
    const apiUrl = getAgentApiUrl(agent.name);
    if (!apiUrl) return alert("API not configured for this agent");

    setModalOpen(true);
    setLoadingAds(true);
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setAdsData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAds(false);
    }
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
                onClickDetails={handleOpenDetails}
              />
            ))}
          </div>
        )}

        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
              
              {loadingAds ? (
                <div className="loading-pulse" style={{ padding: '2rem', textAlign: 'center' }}>Loading live data from agent...</div>
              ) : adsData ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: 'var(--text-main)', margin: 0 }}>{adsData.title}</h2>
                    <span className="badge" style={{ color: adsData.status === 'Critical' ? 'var(--status-error)' : adsData.status === 'Warning' ? 'var(--status-warning)' : 'var(--status-active)', borderColor: 'currentColor', fontWeight: 600, padding: '6px 14px' }}>{adsData.status}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    {adsData.metrics.map((m, idx) => (
                      <div key={idx} style={{ flex: 1, padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{m.label}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: m.highlight ? 'var(--primary)' : 'inherit' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Detailed Audit</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {adsData.lists.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `4px solid ${item.color}` }}>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{item.details}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 'bold', color: item.color }}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="output-box" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'var(--status-warning)' }}>
                    <span>💡</span>
                    <div><strong>AI Recommendation:</strong> {adsData.recommendation}</div>
                  </div>
                </div>
              ) : (
                <div style={{ color: 'var(--status-error)' }}>Failed to load data.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
