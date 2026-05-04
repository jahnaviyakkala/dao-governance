import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle } from 'lucide-react';

const ProposalCard = ({ proposal, onVote }) => {
  const [loading, setLoading] = useState(false);
  const isExpired = Number(proposal.deadline) < Date.now() / 1000;

  const handleVote = async (support) => {
    setLoading(true);
    try {
      await onVote(proposal.id, support);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem', borderLeft: proposal.executed ? '4px solid var(--success)' : '1px solid var(--glass-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-main)' }}>{proposal.title}</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{proposal.description}</p>
        </div>
        <span className={`badge ${isExpired ? 'badge-passed' : 'badge-active'}`}>
          {proposal.executed ? 'Executed' : isExpired ? 'Voting Ended' : 'Active'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>{proposal.yesVotes.toString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FOR</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--danger)', fontWeight: 'bold', fontSize: '1.2rem' }}>{proposal.noVotes.toString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AGAINST</div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
          {!isExpired && !proposal.executed && (
            <>
              <button 
                className="btn btn-primary" 
                style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}
                onClick={() => handleVote(true)}
                disabled={loading}
              >
                <ThumbsUp size={16} /> Yes
              </button>
              <button 
                className="btn btn-primary" 
                style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' }}
                onClick={() => handleVote(false)}
                disabled={loading}
              >
                <ThumbsDown size={16} /> No
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
