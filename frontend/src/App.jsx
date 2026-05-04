import React, { useState, useEffect, useCallback } from 'react';
import { Wallet, AlertCircle, RefreshCcw } from 'lucide-react';
import { useWeb3 } from './hooks/useWeb3';
import ProposalCard from './components/ProposalCard';
import CreateProposal from './components/CreateProposal';

function App() {
  const { account, contract, error, connectWallet } = useWeb3();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [txPending, setTxPending] = useState(false);

  const fetchProposals = useCallback(async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const count = await contract.getProposalCount();
      const fetchedProposals = [];
      for (let i = 0; i < count; i++) {
        const prop = await contract.proposals(i);
        fetchedProposals.push(prop);
      }
      setProposals(fetchedProposals.reverse()); // Newest first
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const handleCreate = async (title, desc, duration) => {
    if (!contract) return;
    setTxPending(true);
    try {
      const tx = await contract.createProposal(title, desc, duration);
      await tx.wait();
      await fetchProposals();
    } catch (err) {
      alert("Error creating proposal: " + (err.reason || err.message));
    } finally {
      setTxPending(false);
    }
  };

  const handleVote = async (id, support) => {
    if (!contract) return;
    setTxPending(true);
    try {
      const tx = await contract.vote(id, support);
      await tx.wait();
      await fetchProposals();
    } catch (err) {
      alert("Error voting: " + (err.reason || err.message));
    } finally {
      setTxPending(false);
    }
  };

  return (
    <div className="app-container">
      <nav className="nav">
        <div className="logo">GOV.DAO</div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {error && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}><AlertCircle size={14} /> {error}</span>}
          <button className="btn btn-primary" onClick={connectWallet}>
            <Wallet size={18} />
            {account ? `${account.substring(0, 6)}...${account.substring(38)}` : "Connect Wallet"}
          </button>
        </div>
      </nav>

      {account ? (
        <main>
          <CreateProposal onCreate={handleCreate} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Live Governance</h2>
            <button className="btn btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={fetchProposals} disabled={loading}>
              <RefreshCcw size={16} className={loading ? 'spin' : ''} /> Refresh
            </button>
          </div>

          <div className="proposal-list">
            {loading && <p>Loading proposals...</p>}
            {!loading && proposals.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No proposals found yet.</p>}
            {proposals.map((prop) => (
              <ProposalCard key={prop.id.toString()} proposal={prop} onVote={handleVote} />
            ))}
          </div>
        </main>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <Wallet size={48} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
          <h1>Welcome to GOV.DAO</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please connect your wallet to view and participate in governance.</p>
          <button className="btn btn-primary" style={{ margin: '0 auto' }} onClick={connectWallet}>Connect MetaMask</button>
        </div>
      )}

      {txPending && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
          <div className="glass-card" style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white' }}>
            Transaction Pending... Please wait.
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
