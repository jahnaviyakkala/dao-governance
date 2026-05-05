# 🚀 Deployment Guide

This document outlines the steps to deploy the DAO Governance Platform to the SCAI Mainnet and Vercel.

## 1. Smart Contract Deployment (SCAI Mainnet)

### Prerequisites
- Node.js & npm installed.
- A wallet with **SCAI** tokens for gas fees.
- Private key added to `blockchain/.env`.

### Configuration
The network is already configured in `blockchain/hardhat.config.js`:
```javascript
scai: {
  url: "https://mainnet-rpc.scai.network",
  chainId: 34,
  accounts: [process.env.PRIVATE_KEY]
}
```

### Deployment Commands
```bash
cd blockchain
# Install dependencies
npm install
# Compile contracts
npx hardhat compile --network scai
# Deploy SimpleDAO
npx hardhat run scripts/deploySimpleDAO.js --network scai
```

---

## 2. Frontend Deployment (Vercel)

### Configuration
Ensure `frontend/src/constants/contract.js` has the correct contract address after deployment.

### Steps to Deploy
1. **Build the project locally** (optional but recommended):
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   # Login to Vercel
   vercel login
   # Deploy
   vercel --prod
   ```

### Vercel Link
Once deployed, your project will be available at:
`https://dao-governance-platform.vercel.app` (or your custom project name).

---

## 🛠️ Troubleshooting

### Invalid Opcode 0x5f
If you encounter `invalid opcode 0x5f`, ensure your `hardhat.config.js` is set to `evmVersion: "london"` or `paris` to avoid the `PUSH0` opcode which may not be supported by the SCAI network yet.

### mcopy Error
The `mcopy` instruction is Cancun-specific. Ensure you are using OpenZeppelin v5.0.2 or lower if your target network doesn't support the Cancun hard fork.
