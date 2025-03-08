import React from 'react';
import LoadingData from '../LoadingData';
import ApproveAndSwapSteps from './ApproveAndSwapSteps';
import { SWAP_ACTION } from '../../../constants';

const SwapAction = ({ action, tokenA, tokenB, account, inputAmount, outputAmount, pairAddress }) => {
  if (action == SWAP_ACTION.ready) {
    return (
      <ApproveAndSwapSteps
        tokenA={tokenA}
        tokenB={tokenB}
        account={account}
        inputAmount={inputAmount}
        outputAmount={outputAmount}
        pairAddress={pairAddress}
      />
    )
  }
  else if (action == SWAP_ACTION.idle) {
    return (
      <div className="alert alert-info mt-12">
        <div>
          <i className="bi bi-info-circle mr-2 text-xl"></i>
          <span>Enter trade amount to begin.</span>
        </div>
      </div>
    );
  }
  else if (action == SWAP_ACTION.loading) {
    return <LoadingData />;
  }
  else if (action == SWAP_ACTION.error) {
    return (
      <div className="alert alert-error mt-12">
        <div>
          <i className="bi bi-exclamation-circle mr-2 text-xl"></i>
          <div>
            <h3 className="font-bold">No pool detected</h3>
            <div className="text-sm">Select valid tokens to find trading pair.</div>
          </div>
        </div>
      </div>
    );
  }
  else if (action == SWAP_ACTION.noLiquidity) {
    return (
      <div className="alert alert-error mt-12">
        <div>
          <i className="bi bi-exclamation-circle mr-2 text-xl"></i>
          <div>
            <h3 className="font-bold">Selected trading pair has no liquidity</h3>
            <div className="text-sm">Liquidity pool exists but it's empty. Add liqudity in the Pool tab.</div>
          </div>
        </div>
      </div>
    );
  }
  else if (action == SWAP_ACTION.createPool) {
    return (
      <div className="alert alert-error mt-12">
        <div>
          <i className="bi bi-exclamation-circle mr-2 text-xl"></i>
          <div>
            <h3 className="font-bold">This pair doesn't exist</h3>
            <div className="text-sm">Create pair and add liquidity in the Pool tab.</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SwapAction;