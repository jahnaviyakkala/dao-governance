# 🏛️ DAO Governance Platform

A full-stack decentralized application that enables community-driven decision-making using Ethereum smart contracts.

---

## 🖼️ Screenshots

![Dashboard](./assets/dashboard.png)

> *Note: Dashboard features a modern Glassmorphism UI with real-time on-chain data synchronization.*

---

## 🚀 Overview

This project implements a DAO (Decentralized Autonomous Organization) governance system where users can create proposals, vote using token-based power, and execute decisions transparently on-chain. 

The platform combines robust **Solidity** smart contracts with a **React** frontend, enabling secure interaction through **MetaMask**.

---

## ⚙️ Core Features

- **Decentralized Proposals**: Anyone with enough tokens can create a governance proposal.
- **Token-Based Voting**: Uses `ERC20Votes` to calculate power based on historical snapshots (prevents flash-loan attacks).
- **Sybil Resistance**: Prevents double voting and ensures one-vote-per-weight.
- **Lifecycle Tracking**: Full state machine (Active → Passed → Queued → Executed).
- **Timelock Security**: Enforces a mandatory delay before execution to protect the community.
- **Simulation Suite**: Includes scripts for automated multi-user stress testing.

---

## 🧱 Smart Contract Architecture

- **GovernanceToken.sol**: ERC20Votes token with snapshot functionality.
- **GovernorContract.sol**: Core logic handling voting, quorum, and proposal lifecycle.
- **Timelock.sol**: Adds a 48-hour security buffer before any decision is executed.
- **SimpleDAO.sol**: A streamlined version for testing and rapid prototyping.
- **Box.sol**: The governed contract (asset) that the DAO manages.

---

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity 0.8.26, OpenZeppelin
- **Frontend**: React (Vite), Framer Motion, Lucide Icons
- **Web3 Integration**: Ethers.js v6
- **Wallet**: MetaMask
- **Development Tools**: Hardhat, Node.js

---

## 📁 Project Structure

```text
dao-governance/
├── blockchain/
│   ├── contracts/   # Solidity Smart Contracts
│   ├── scripts/     # Deployment & Simulation Logic
│   └── test/        # Hardhat Unit Tests
├── frontend/
│   ├── src/hooks/   # Custom Web3 Hooks
│   ├── src/components/# UI Components
│   └── src/constants/ # ABIs & Contract Addresses
└── assets/          # Project Images & Media
```

---

## ⚙️ Setup Instructions

### 1. Smart Contracts (Backend)
```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat node
# Deploy to local node
npx hardhat run scripts/deploy.js --network localhost
```

### 2. Frontend (Client)
```bash
cd frontend
npm install
npm run dev
```
*Access the platform at `http://localhost:5173`*

---

## 📊 Project Highlights

- **Security First**: Snapshot-based voting prevents price manipulation during votes.
- **Transparency**: Every vote and proposal is recorded permanently on the blockchain.
- **Real-Time UI**: Instant feedback on transaction status and proposal updates.

## ⚠️ Challenges Faced
- **EVM Compatibility**: Resolved Solidity `mcopy` opcode issues by configuring the EVM target to **Cancun** to support OpenZeppelin v5.0 contracts.

## 🔮 Future Improvements
- **The Graph**: Integrate Subgraphs for faster historical data indexing.
- **Multi-Chain**: Deploy on Sepolia or Polygon Amoy for public testing.
- **NFT Governance**: Add support for NFT-gated proposal creation.

---

---

## 🌐 Mainnet Deployment (SCAI Network)

The smart contracts have been configured for deployment on the **SecureChain AI (SCAI)** mainnet.

### Network Details:
- **Network Name**: SCAI Mainnet
- **RPC URL**: `https://mainnet-rpc.scai.network`
- **Chain ID**: `34`
- **Currency Symbol**: `SCAI`
- **Block Explorer**: [explorer.securechain.ai](https://explorer.securechain.ai)

### Deployed Contracts:
- **SimpleDAO**: `0x5FbDB2315678afecb367f032d93F642f64180aa3` (SCAI Mainnet)

---

## 🚀 Vercel Deployment

The frontend is designed for seamless deployment on Vercel.

**Live Demo**: [frontend-five-delta-21.vercel.app](https://frontend-five-delta-21.vercel.app)

---

## 📜 License
This project is licensed under the MIT License.