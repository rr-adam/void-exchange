import React from 'react';
import { ExchangeNavbar } from '/src/components/Exchange';
import { Outlet } from "react-router-dom";
import { ADDRESS } from './constants';

import { Mainnet, Sepolia, Hardhat, DAppProvider } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const LayoutExchange = () => {
  const config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Hardhat.chainId]: 'http://127.0.0.1:8545',
      [Sepolia.chainId]: getDefaultProvider('sepolia'),
      [Mainnet.chainId]: getDefaultProvider('mainnet'),
    },
    multicallAddresses: {
      [Hardhat.chainId]: ADDRESS.multicall
    }
  }

  return (
    <>
      <DAppProvider config={config}>
        <ExchangeNavbar />
        <Outlet />
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Success!</h2>
            <p className="py-4">You have received your tokens.</p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">Yay!</label>
            </div>
          </div>
        </div>
      </DAppProvider>
    </>
  )
}

export default LayoutExchange;