import React from 'react';
import { Skeleton } from '../ui';

import { useEthers, useEtherBalance, Mainnet, Sepolia, Hardhat } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';

const Account = () => {
  const { account, deactivate, switchNetwork, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  function displayEtherValue(value) {
    return parseFloat(formatEther(value)).toFixed(4);
  }

  function copyAddress() {
    navigator.clipboard.writeText(account);
  }

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-outline btn-secondary rounded-full btn-md m-1 gap-2">
          {account.slice(0, 8)}...{account.slice(-8)}
          <i className="bi bi-chevron-down"></i>
        </label>
        <div tabIndex={0} className="dropdown-content p-2 rounded-xl backdrop-blur border border-slate-900/10 bg-white w-96 mt-4">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-primary">
                  Connected as
                </div>
                <div className="text-sm">{account.slice(0, 8)}...{account.slice(-8)}</div>
                {etherBalance
                  ? <div className='mt-2 text-slate-400'>{displayEtherValue(etherBalance)} <span>ETH</span></div>
                  : <Skeleton />
                }
              </div>
              <div className='h-fit mt-2 self-start'>
                <div className="tooltip tooltip-secondary tooltip-bottom" data-tip="Copy address">
                  <button className="btn btn-circle btn-ghost btn-sm" onClick={() => copyAddress()}>
                    <i className="bi bi-clipboard"></i>
                  </button>
                </div>
                <div className="tooltip tooltip-secondary tooltip-bottom" data-tip="Disconnect">
                  <button className="btn btn-circle btn-ghost btn-sm" onClick={() => deactivate()}>
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="font-bold text-primary">
              Network
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="radio"
                  name="radio1"
                  className="radio checked:bg-slate-500"
                  onClick={() => switchNetwork(Hardhat.chainId)}
                  checked={chainId === Hardhat.chainId}
                  readOnly
                />
                <span className="label-text">Localhost</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="radio"
                  name="radio1"
                  className="radio checked:bg-purple-300"
                  onClick={() => switchNetwork(Sepolia.chainId)}
                  checked={chainId === Sepolia.chainId}
                  readOnly
                />
                <span className="label-text">Sepolia Testnet</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="radio"
                  name="radio1"
                  className="radio checked:bg-blue-400"
                  onClick={() => switchNetwork(Mainnet.chainId)}
                  checked={chainId === Mainnet.chainId}
                  readOnly
                />
                <span className="label-text">Ethereum Mainnet</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account;