import React from 'react';
import { Skeleton } from '../../ui';
import useGetTradeAmount from '../../../hooks/useGetTradeAmount';

import { useToken } from '@usedapp/core';
import { formatUnits, parseUnits } from '@ethersproject/units';

const PoolInfo = ({ pairAddress, contractTokenA, contractTokenB, reservesFromContract, reservesA, reservesB }) => {
  const reserves = [reservesA, reservesB];

  const tokenAInfo = useToken(contractTokenA);
  const tokenBInfo = useToken(contractTokenB);

  const exchangeRateAmount = useGetTradeAmount(pairAddress, parseUnits("1", tokenAInfo?.decimals), reserves?.[0], reserves?.[1]);

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
      <div className="flex flex-col h-full border-slate-900/10 bg-white/80 border rounded-r-box p-4 ml-2">
        <div className="text-gradient text-lg font-bold">Pool details</div>
        {reserves[0] && reserves[1] && tokenAInfo && tokenBInfo
          ? <PoolDetails />
          : <div className='mt-4'><Skeleton.PoolInfo /></div>
        }

      </div>
    </>
  )
}

export default PoolInfo;