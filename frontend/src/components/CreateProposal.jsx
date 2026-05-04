import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const CreateProposal = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('3600'); // Default 1 hour
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreate(title, desc, parseInt(duration));
      setTitle('');
      setDesc('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="glass-card" onSubmit={handleSubmit} style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={24} /> New Proposal
      </h2>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        <input 
          className="glass-card" 
          style={{ padding: '0.75rem', width: '100%', background: 'rgba(255,255,255,0.05)' }}
          placeholder="Proposal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          className="glass-card" 
          style={{ padding: '0.75rem', width: '100%', background: 'rgba(255,255,255,0.05)', minHeight: '100px' }}
          placeholder="Detailed Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Duration (sec):</label>
          <input 
            type="number"
            className="glass-card" 
            style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)' }}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginLeft: 'auto' }}>
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProposal;
