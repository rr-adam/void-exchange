import React from 'react';
import { Skeleton } from '../../ui';
import useGetTradeAmount from '../../../hooks/useGetTradeAmount';

import { Contract } from 'ethers';
import { toBigNumber } from '../../../util';
import { useContractFunction } from '@usedapp/core';
import { useToken, useTokenBalance } from '@usedapp/core';
import { formatUnits, parseUnits } from '@ethersproject/units';
import VoidPair from '../../../abi/VoidPair';

const RemoveLiquidityButton = ({ pairAddress, liquidityHoldings }) => {
  const voidPairContract = new Contract(pairAddress, VoidPair);

  // transactions
  const { state, send } = useContractFunction(voidPairContract, 'removeLiquidity', { transactionName: 'Remove Liquidity' });

  const remove = () => {
    send(liquidityHoldings);
  }

  if (state.status === 'Mining')
    return (
      <button className='btn btn-primary btn-outline btn-xs w-fit opacity-40 hover:cursor-default gap-2'>
        Remove liquidity pending...
      </button>
    );
  else
    return (<button onClick={remove} className='btn btn-primary btn-xs w-fit'>Remove liquidity</button>);
}

const PoolingInfo = ({ pairAddress, contractTokenA, contractTokenB, reservesFromContract, reservesA, reservesB, account, handleExchangeRateUpdate }) => {
  const reserves = [reservesA, reservesB];

  const tokenAInfo = useToken(contractTokenA);
  const tokenBInfo = useToken(contractTokenB);

  const exchangeRateAmount = useGetTradeAmount(pairAddress, parseUnits("1", tokenAInfo?.decimals), reserves?.[0], reserves?.[1]);

  const poolHoldings = useTokenBalance(pairAddress, account);

  function displayUnitValue(value, decimals) {
    if (value)
      return parseFloat(formatUnits(value, decimals)).toFixed(4);
    else
      return value;
  }

  const ExchangeRate = () => {
    return (
      <div className='mt-2 text-slate-600'>
        <p>
          Exchange rate
        </p>
        <p>1 {tokenAInfo.symbol} = {displayUnitValue(exchangeRateAmount, tokenBInfo.decimals)} {tokenBInfo.symbol}</p>
      </div>
    )
  }

  const PoolDetails = () => {
    return (
      <>
        <div className='mt-4 text-slate-600'>
          <p><span className='font-bold text-slate-500'>Reserves</span></p>
          <p><span className=''>Reserve {tokenAInfo.symbol}:</span> {displayUnitValue(reservesFromContract[0], 18)}</p>
          <p><span className=''>Reserve {tokenBInfo.symbol}:</span> {displayUnitValue(reservesFromContract[1], 18)}</p>
        </div>
        {formatUnits(reserves?.[0], 18) != 0
          ? <ExchangeRate />
          : <p className='mt-2 text-slate-400'>Pool is empty.</p>
        }
      </>
    )
  }

  return (
    <>
      <div className="flex border-slate-900/10 bg-white/80 border rounded-b-box p-4">
        <div className="flex flex-1 flex-col">
          <div className="text-gradient text-lg font-bold">Pool details</div>
          {reserves[0] && reserves[1] && tokenAInfo && tokenBInfo
            ? <PoolDetails />
            : <div className='mt-4'><Skeleton.PoolInfo /></div>
          }
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-gradient text-lg font-bold">Your holdings</div>
          {poolHoldings
            ? (<>
              <div className='mt-4'>You hold: {displayUnitValue(poolHoldings, 18)} LP tokens</div>
              {displayUnitValue(poolHoldings, 18) > 0 &&
                <RemoveLiquidityButton pairAddress={pairAddress} liquidityHoldings={poolHoldings} />
              }
            </>)
            : <div className='mt-4'><Skeleton.PoolInfo /></div>
          }
        </div>
      </div>
    </>
  )
}

export default PoolingInfo;