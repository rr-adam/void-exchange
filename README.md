# VoidExchange

> ⚠️ **WARNING:** This is an old project from 2023 that is no longer maintained. It is provided as-is with no updates or support.

A decentralized exchange platform with smart contracts built on Ethereum and a React.js frontend.

![image](https://github.com/user-attachments/assets/78a7065f-3a55-4d15-9366-d72d3a054879)


## Overview

VoidExchange is a DEX (Decentralized Exchange) that allows users to:

- Swap tokens
- Provide liquidity and earn fees
- Manage liquidity pool tokens

The project consists of two main components:

- **Smart contracts** (Hardhat project)
- **Frontend application** (React.js)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [MetaMask](https://metamask.io/) browser extension

### Installation

1. Clone the repository

   ```
   git clone https://github.com/rr-adam/void-exchange.git
   cd VoidExchange
   ```

2. Set up MetaMask

   - Install the MetaMask extension from [metamask.io](https://metamask.io/)
   - Create a new wallet (use a simple password for testing)
   - Skip the recovery phrase backup for testing by selecting "Remind me later"

3. Start the Hardhat environment

   ```
   cd hardhat
   npm install
   npm run hardhat
   ```

4. Deploy the contracts (in a new terminal window)

   ```
   cd hardhat
   npm run localhost-deploy
   ```

   **Important:** Take note of the deployed contract addresses, especially:

   - VoidFactory address
   - Multicall address
   - Test token addresses (TokenA and TokenB)

5. Configure MetaMask

   - Import the Hardhat test account:
     - Click on your account icon → Import Account
     - Enter this example private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
       > ⚠️ **WARNING:** This is a testing hardhat private key, never transfer real funds to these accounts.

- Add the Hardhat network:
  - Go to Networks dropdown → Add Network → Add a network manually
  - Network Name: Hardhat
  - RPC URL: `http://127.0.0.1:8545`
  - Chain ID: `31337`
  - Currency Symbol: ETH

6. Set up the frontend

   - Update contract addresses in `frontend/src/constants/index.js`:
     - Replace the placeholder addresses with the ones from the deployment step
   - Install dependencies and start the application:
     ```
     cd frontend
     npm install
     npm run dev
     ```

7. Access the application at [http://localhost:5173/](http://localhost:5173/)

## Usage

### Token Swapping

![image](https://github.com/user-attachments/assets/ce3fade5-2fa1-420c-a491-aadeebf932ac)

1. Navigate to the swap screen by clicking "Open app" on the landing page
2. Connect your MetaMask wallet if prompted
3. Select tokens to swap by clicking the blue button in each field
   - Enter the test token addresses noted from the deployment step
4. Enter the amount to swap
5. Click "Swap" to execute the transaction

### Managing Liquidity

![image](https://github.com/user-attachments/assets/797a53e8-870f-44b5-aa8d-64ef360f1e2d)

1. Navigate to the "Pool" tab
2. View your current liquidity positions
3. Add or remove liquidity using the interface
4. Note that by default, your account has LP tokens as liquidity is added during deployment

## Repository Structure

```
VoidExchange/
├── hardhat/             # ======== Hardhat project ========
│   ├── contracts/       # Solidity smart contracts
│   ├── scripts/         # Deployment scripts
│   └── test/            # Contract tests
└── frontend/            # ====== React.js application =====
    ├── public/          # Static assets
    └── src/             # Source code
        ├── abi/         # Smart contracts ABIs
        ├── assets/      # Assets
        ├── components/  # React components
        ├── constants/   # Application constants
        ├── hooks/       # React hooks for token and pairs logic
        ├── pages/       # Application pages
        └── util/        # Helper functions
```
