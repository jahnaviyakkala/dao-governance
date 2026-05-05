import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProposalCard = ({ proposal, onVote, onExecute }) => {
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
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card" 
      style={{ marginBottom: '1.5rem', borderLeft: proposal.executed ? '4px solid var(--success)' : '1px solid var(--glass-border)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-main)' }}>{proposal.title}</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{proposal.description}</p>
        </div>
        <span className={`badge ${proposal.executed ? 'badge-passed' : isExpired ? (proposal.yesVotes > proposal.noVotes ? 'badge-passed' : 'badge-failed') : 'badge-active'}`}>
          {proposal.executed ? 'Executed' : isExpired ? (proposal.yesVotes > proposal.noVotes ? 'Passed' : 'Failed') : 'Active'}
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

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {proposal.executed && (
            <span style={{ color: 'var(--success)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <CheckCircle size={16} /> Completed
            </span>
          )}
          {proposal.userHasVoted && !proposal.executed && (
            <span style={{ color: 'var(--accent)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <CheckCircle size={16} /> Voted
            </span>
          )}
          
          {!isExpired && !proposal.executed && !proposal.userHasVoted && (
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

          {isExpired && !proposal.executed && proposal.yesVotes > proposal.noVotes && (
            <button 
              className="btn btn-primary" 
              style={{ background: 'var(--success)' }}
              onClick={() => onExecute(proposal.id)}
              disabled={loading}
            >
              Execute Decision
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProposalCard;
