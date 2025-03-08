import { React } from 'react'
import Loader from '../Loader';
import { toFloat, toBigNumber } from '../../../util';
import { Contract } from 'ethers';
import { useTokenAllowance, useContractFunction } from '@usedapp/core';
import VoidPair from '../../../abi/VoidPair';
import ERC20 from '../../../abi/ERC20';

const ApproveButton = ({ tokenA, pairAddress }) => {
  const tokenContract = new Contract(tokenA, ERC20);

  console.log('contract args: ', tokenContract.interface.getFunction('approve').inputs.length)
  // (2^256 - 1)
  const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

  // transactions
  const { state, send } = useContractFunction(tokenContract, 'approve', { transactionName: 'Approve' });
  const allowToken = () => {
    send(pairAddress, MAX_UINT256);
  }

  if (state.status === 'Mining')
    return (
      <button className='btn btn-primary btn-outline opacity-40 hover:cursor-default gap-2'>
        <Loader.Small />
        Approve pending
      </button>
    );
  else
    return (<button onClick={allowToken} className='btn btn-primary'>Approve</button>);
}

const SwapButton = ({ tokenA, tokenB, inputAmount, outputAmount, pairAddress }) => {
  const voidPairContract = new Contract(pairAddress, VoidPair);

  // transactions
  const { state, send } = useContractFunction(voidPairContract, 'swap', { transactionName: 'Swap' });

  const outputWithSlippage = outputAmount.mul(90).div(100);

  const swap = () => {
    send(tokenA, tokenB, toBigNumber(inputAmount), outputWithSlippage);
  }

  if (state.status === 'Mining')
    return (
      <button className='btn btn-primary btn-outline opacity-40 hover:cursor-default gap-2'>
        <Loader.Small />
        Swap pending...
      </button>
    );
  else
    return (<button onClick={swap} className='btn btn-primary'>Swap</button>);
}

const ApproveAndSwapSteps = ({ account, tokenA, tokenB, inputAmount, outputAmount, pairAddress }) => {
  const allowance = useTokenAllowance(tokenA, account, pairAddress);

  function getStep() {
    if (allowance && toFloat(allowance, 18) < inputAmount) {
      return 1;
    }
    else if (allowance && toFloat(allowance, 18) >= inputAmount, 18) {
      return 2;
    }

    return 1;
  }

  const step = getStep();

  if (step == 1)
    return (
      <>
        <ul className="steps steps-vertical">
          <li className="step step-primary p-2">
            <ApproveButton tokenA={tokenA} pairAddress={pairAddress} />
          </li>
          <li className="step p-2">
            <button className='btn btn-disabled'>Swap tokens</button>
          </li>
        </ul>
      </>
    )
  else if (step == 2)
    return (
      <ul className="steps steps-vertical">
        <li className="step step-primary p-2">
          <button className='btn btn-success opacity-40 hover:cursor-default'>
            <i className="bi bi-check-lg mr-2"></i>
            Approved
          </button>
        </li>
        <li className="step step-primary p-2">
          <SwapButton tokenA={tokenA} tokenB={tokenB} inputAmount={inputAmount} outputAmount={outputAmount} pairAddress={pairAddress} />
        </li>
      </ul>
    )
}

export default ApproveAndSwapSteps