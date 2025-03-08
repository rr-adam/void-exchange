import { React } from 'react'
import Loader from '../Loader';
import { toFloat, toBigNumber } from '../../../util';
import { Contract } from 'ethers';
import { useTokenAllowance, useContractFunction } from '@usedapp/core';
import VoidPair from '../../../abi/VoidPair';
import ERC20 from '../../../abi/ERC20';

const ApproveButton = ({ token, pairAddress, text }) => {
  const tokenContract = new Contract(token, ERC20);

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
    return (<button onClick={allowToken} className='btn btn-primary'>{text}</button>);
}

const PoolButton = ({ inputAmount, outputAmount, pairAddress }) => {
  const voidPairContract = new Contract(pairAddress, VoidPair);

  // transactions
  const { state, send } = useContractFunction(voidPairContract, 'addLiquidity', { transactionName: 'Pool' });

  const pool = () => {
    send(toBigNumber(inputAmount.toString()), toBigNumber(outputAmount.toString()));
  }

  if (state.status === 'Mining')
    return (
      <button className='btn btn-primary btn-outline opacity-40 hover:cursor-default gap-2'>
        <Loader.Small />
        Add liquidity pending...
      </button>
    );
  else
    return (<button onClick={pool} className='btn btn-primary'>Add liquidity</button>);
}

const ApproveAndPoolSteps = ({ account, tokenA, tokenB, inputAmount, outputAmount, pairAddress }) => {
  const allowanceA = useTokenAllowance(tokenA, account, pairAddress);
  const allowanceB = useTokenAllowance(tokenB, account, pairAddress);

  function getStep() {
    if (allowanceA && toFloat(allowanceA, 18) < inputAmount) {
      return 1;
    }
    else if (allowanceA && toFloat(allowanceA, 18) >= inputAmount && allowanceB && toFloat(allowanceB, 18) < outputAmount) {
      return 2;
    }
    else if (allowanceA && allowanceB && toFloat(allowanceA, 18) >= inputAmount && toFloat(allowanceB, 18) >= outputAmount) {
      return 3;
    }

    return 4;
  }

  const step = getStep();

  if (step == 1)
    return (
      <>
        <ul className="steps steps-vertical">
          <li className="step step-primary p-2">
            <ApproveButton token={tokenA} pairAddress={pairAddress} text={'Approve first token'} />
          </li>
          <li className="step p-2">
            <button className='btn btn-disabled'>Approve second token</button>
          </li>
          <li className="step p-2">
            <button className='btn btn-disabled'>Add liquidity</button>
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
          <ApproveButton token={tokenB} pairAddress={pairAddress} text={'Approve second token'} />
        </li>
        <li className="step p-2">
          <button className='btn btn-disabled'>Add liquidity</button>
        </li>
      </ul>
    )
  else if (step == 3)
    return (
      <ul className="steps steps-vertical">
        <li className="step step-primary p-2">
          <button className='btn btn-success opacity-40 hover:cursor-default'>
            <i className="bi bi-check-lg mr-2"></i>
            Approved
          </button>
        </li>
        <li className="step step-primary p-2">
          <button className='btn btn-success opacity-40 hover:cursor-default'>
            <i className="bi bi-check-lg mr-2"></i>
            Approved
          </button>
        </li>
        <li className="step step-primary p-2">
          <PoolButton tokenA={tokenA} tokenB={tokenB} inputAmount={inputAmount} outputAmount={outputAmount} pairAddress={pairAddress} />
        </li>
      </ul>
    )
}

export default ApproveAndPoolSteps;