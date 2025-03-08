import React from 'react';
import { Skeleton } from '../../ui';

import { useToken, useTokenBalance } from '@usedapp/core';
import { formatUnits } from '@ethersproject/units';

const TokensOwnedLoading = () => {
  return (
    <>
      <div className="text-xs text-slate-900">You have</div>
      <h3 className="font-bold text-sm text-slate-400 h-5">
        <Skeleton.Small />
      </h3>
    </>
  )
}

const TokensOwned = ({ token, account, onOwnedClick }) => {
  const tokenBalance = useTokenBalance(token, account);
  const tokenInfo = useToken(token);

  function handleOwnedClick() {
    onOwnedClick(parseFloat(formatUnits(tokenBalance, tokenInfo.decimals)).toString());
  }

  return (
    <>
      <div className="text-xs text-slate-900">You have</div>
      <h3 className="font-bold text-sm text-slate-400 h-5">
        {tokenBalance && tokenInfo?.symbol
          ? <span onClick={handleOwnedClick} className='hover:cursor-pointer hover:text-slate-500'>{formatUnits(tokenBalance, tokenInfo.decimals)} {tokenInfo.symbol}</span>
          : <Skeleton.Small />
        }
      </h3>
    </>
  )
}

const TokensOwnedNotSelected = () => {
  return (
    <>
      <div className="text-xs text-slate-900">&nbsp;</div>
      <h3 className="font-bold text-sm text-slate-400 h-5">Select token...</h3>
    </>
  )
}

const TokensOwnedInvalid = () => {
  return (
    <>
      <div className="text-xs text-slate-900">&nbsp;</div>
      <h3 className="text-sm text-red-600 h-5">Incorrect token address selected!</h3>
    </>
  )
}

const TokenSelectButtonNone = () => {
  return (
    <>
      ... <i className="bi bi-chevron-down ml-2"></i>
    </>
  )
}

const TokenSelectButtonContent = ({ token }) => {
  const tokenInfo = useToken(token);

  if (tokenInfo?.symbol) {
    return (
      <>
        {tokenInfo?.symbol}
        <i className="bi bi-chevron-down ml-2"></i>
      </>
    )
  }
  else {
    return <TokenSelectButtonNone />
  }
}

const PoolForm = (props) => {
  const isValidA = props.isValidA;
  const isValidB = props.isValidB;

  function handleInputChange(event) {
    props.onInputChange(event.target.value);
  }

  function handleOutputChange(event) {
    props.onOutputChange(event.target.value);
  }

  return (
    <>
      <div className="flex relative gap-2">
        <div className="flex border-slate-900/10 bg-white/80 border rounded-tl-box place-items-center justify-between p-4 gap-4">
          <div className="flex flex-col">
            <div className='h-fit whitespace-nowrap self-start mb-2 pl-1'>
              {isValidA == 'loading' && props.tokenA
                ? <TokensOwnedLoading />
                : isValidA == 'invalid' && props.tokenA
                  ? <TokensOwnedInvalid />
                  : isValidA == 'valid' && props.tokenA
                    ? <TokensOwned
                      token={props.tokenA}
                      account={props.account}
                      onOwnedClick={props.onInputChange}
                    />
                    : <TokensOwnedNotSelected />
              }
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="0"
                className="input input-lg w-full font-bold text-slate-600 bg-slate-100"
                value={props.inputValue || ''}
                onChange={handleInputChange}
              />
              <label htmlFor="token-select-modal-input" className='btn btn-secondary btn-lg'>
                {isValidA == 'loading' && props.tokenA
                  ? <TokenSelectButtonNone />
                  : isValidA == 'invalid' && props.tokenA
                    ? <TokenSelectButtonNone />
                    : isValidA == 'valid' && props.tokenA
                      ? <TokenSelectButtonContent token={props.tokenA} />
                      : <TokenSelectButtonNone />
                }
              </label>
            </div>
          </div>
        </div>
        <div className="flex border-slate-900/10 bg-white/80 border rounded-tr-box place-items-center justify-between p-4 gap-4">
          <div className="flex flex-col">
            <div className='h-fit whitespace-nowrap self-start mb-2 pl-1'>
              {isValidB == 'loading' && props.tokenB
                ? <TokensOwnedLoading />
                : isValidB == 'invalid' && props.tokenB
                  ? <TokensOwnedInvalid />
                  : isValidB == 'valid' && props.tokenB
                    ? <TokensOwned token={props.tokenB} account={props.account} />
                    : <TokensOwnedNotSelected />
              }
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="0"
                className="input input-lg w-full font-bold text-slate-600 bg-slate-100"
                value={props.outputValue || ''}
                onChange={handleOutputChange}
              />
              <label htmlFor="token-select-modal-output" className='btn btn-secondary btn-lg'>
                {isValidB == 'loading' && props.tokenB
                  ? <TokenSelectButtonNone />
                  : isValidB == 'invalid' && props.tokenB
                    ? <TokenSelectButtonNone />
                    : isValidB == 'valid' && props.tokenB
                      ? <TokenSelectButtonContent token={props.tokenB} />
                      : <TokenSelectButtonNone />
                }
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PoolForm;