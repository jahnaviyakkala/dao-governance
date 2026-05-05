import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { SIMPLE_DAO_ADDRESS, SIMPLE_DAO_ABI } from '../constants/contract';

export const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const _signer = await provider.getSigner();
      const _contract = new ethers.Contract(SIMPLE_DAO_ADDRESS, SIMPLE_DAO_ABI, _signer);

      setAccount(accounts[0]);
      setSigner(_signer);
      setContract(_contract);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to connect wallet.");
    }
  }, []);

  // Auto-connect if already authorized
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) connectWallet();
        })
        .catch(console.error);
    }
  }, [connectWallet]);

  return { account, signer, contract, error, connectWallet };
};
