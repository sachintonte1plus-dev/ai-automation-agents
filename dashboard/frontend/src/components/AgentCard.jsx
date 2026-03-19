import React from 'react';
import * as Icons from 'lucide-react';

const getStatusColor = (status) => {
  switch(status) {
    case 'active': return 'status-active';
    case 'warning': return 'status-warning';
    case 'error': return 'status-error';
    case 'info': return 'status-info';
    case 'success': return 'status-active'; // Using active color for success
    default: return 'status-info';
  }
};

const getStatusText = (status) => {
  if (status === 'success') return 'ACTIVE';
  return status.toUpperCase();
};

const AgentCard = ({ agent, latestInsight, onClickDetails }) => {
  const IconComponent = Icons[agent.icon] || Icons.Box;

  return (
    <div className="glass-card">
      <div className="agent-header">
        <div className="agent-icon">
          <IconComponent size={24} />
        </div>
        <div className={`status-indicator ${getStatusColor(agent.status)}`}>
          <span className="status-dot"></span>
          {getStatusText(agent.status)}
        </div>
      </div>
      
      <h3 className="agent-name">{agent.name}</h3>
      <p className="agent-purpose">{agent.purpose}</p>
      
      <div className="agent-integrations">
        {agent.integrations.map((int, i) => (
          <span key={i} className="badge">{int}</span>
        ))}
      </div>
      
      <div className="agent-output">
        <div className="output-box">
          <span>👉</span> 
          <div>{latestInsight ? latestInsight.message : "Waiting for insights..."}</div>
        </div>
        {agent.name.includes("Ads Performance") && (
          <button 
            onClick={() => onClickDetails(agent)}
            style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid var(--primary)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: '600' }}
          >
            View Ad Campaign Details
          </button>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
