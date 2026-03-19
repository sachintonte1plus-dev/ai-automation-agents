import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';

const API_BASE = 'http://localhost:5000/api';
const ADS_AGENT_API = 'http://localhost:5001/api/ads/performance';

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

  const handleOpenAdsDetails = async () => {
    setModalOpen(true);
    setLoadingAds(true);
    try {
      const res = await fetch(ADS_AGENT_API);
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
                onClickDetails={handleOpenAdsDetails}
              />
            ))}
          </div>
        )}

        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Ads Performance Details</h2>
              
              {loadingAds ? (
                <div className="loading-pulse" style={{ padding: '2rem', textAlign: 'center' }}>Loading live ad data...</div>
              ) : adsData ? (
                <div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Spend</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{adsData.summary.totalSpend}</div>
                    </div>
                    <div style={{ flex: 1, padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Avg ROAS</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--status-active)' }}>{adsData.summary.averageRoas}x</div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Active Campaigns</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {adsData.campaigns.map(c => (
                      <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `4px solid ${c.color}` }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{c.name} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>({c.platform})</span></div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Spend: ₹{c.spend} | Conversions: {c.conversions}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 'bold', color: c.color }}>{c.roas}x ROAS</div>
                          <div style={{ fontSize: '0.75rem', color: c.color }}>{c.status}</div>
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
