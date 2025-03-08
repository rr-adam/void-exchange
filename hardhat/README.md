# VoidExchange

VoidExchange is a decentralized exchange that allows anyone to add liquidity to a ERC-20 token pair and trade the tokens.
This repository comes with smart contracts, unit tests, infrastructure for local testing and deployment.

## Local Environment Setup

Create `.env` file in the project's root. It should contain the following fields:

```shell
# (Optional) Alchemy API key that will allow to fork Ethereum Mainnet for local testing
ALCHEMY =

# (Optional) Ethereum address private key that you want to use as a deployer
PRIVATE_KEY =
```

Install packages

`npm i`

You're ready to go!

## Node Scripts

The following scripts are defined:

```shell
# starts local hardhat network
npm run hardhat

# compile contracts
npm run compile

# run unit tests
npm run test

# show unit tests coverage
npm run coverage

# run deployment script on local network
npm run localhost-deploy
```
