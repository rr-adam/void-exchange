import React from 'react';
import LoadingData from '../LoadingData';
import ApproveAndPoolSteps from './ApproveAndPoolSteps';
import { SWAP_ACTION } from '../../../constants';
import CreatePairButton from '../CreatePairButton';

const PoolAction = ({ action, tokenA, tokenB, account, inputAmount, outputAmount, pairAddress, factoryAddress }) => {
  if (action == SWAP_ACTION.ready) {
    return (
      <ApproveAndPoolSteps
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
          <span>Enter pool amount to begin.</span>
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
      <div className="alert alert-info mt-12">
        <div>
          <i className="bi bi-info-circle mr-2 text-xl"></i>
          <span>Enter pool amount to begin.</span>
        </div>
      </div>
    );
  }
  else if (action == SWAP_ACTION.createPool) {
    return (
      <div className="alert alert-info mt-12">
        <div className='w-full'>
          <i className="bi bi-exclamation-circle mr-2 text-xl"></i>
          <div className='flex flex-1 justify-between'>
            <div className="left">
              <h3 className="font-bold">This pair doesn't exist yet</h3>
              <div className="text-sm">You can create it now!</div>
            </div>
            <div className="right">
              <CreatePairButton factoryAddress={factoryAddress} tokenA={tokenA} tokenB={tokenB} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PoolAction;