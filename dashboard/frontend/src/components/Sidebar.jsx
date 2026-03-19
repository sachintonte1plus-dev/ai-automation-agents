import React from 'react';
import { LayoutDashboard, Users, Activity, Settings, BrainCircuit } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="brand">
        <BrainCircuit size={32} color="var(--primary)" />
        <span>AgentSpace UI</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <a href="#" className="nav-item active">
          <LayoutDashboard size={20} /> Dashboard
        </a>
        <a href="#" className="nav-item">
          <Users size={20} /> My Agents
        </a>
        <a href="#" className="nav-item">
          <Activity size={20} /> Analytics
        </a>
        <a href="#" className="nav-item">
          <Settings size={20} /> Settings
        </a>
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>System Status</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--status-active)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="status-dot" style={{ color: 'var(--status-active)' }}></span> All Systems Operational
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
