import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEthers, Hardhat } from '@usedapp/core';
import { SwapForm, SwapAction, PoolInfo, ModalSelectToken } from '/src/components/Exchange';
import { HeroSection, Card } from '/src/components/ui';
import { SWAP_ACTION, ADDRESS } from '../constants';
import { toFloat, toBigNumber } from '../util';
import { ethers } from 'ethers';
import useGetPairAddress from '../hooks/useGetPairAddress';
import useIsValidToken from '../hooks/useIsValidToken';
import useGetSwapAmount from '../hooks/useGetSwapAmount';
import useGetReserves from '../hooks/useGetReserves';
import useGetTokenA from '../hooks/useGetTokenA';
import useGetTokenB from '../hooks/useGetTokenB';

const Swap = () => {
  const { account, chainId } = useEthers();
  const navigate = useNavigate();

  const VOID_FACTORY = {
    [Hardhat.chainId]: ADDRESS.VoidFactory,
  };

  // Swap form
  const [inputValue, setInputValue] = useState(null);

  const [tokenA, setTokenA] = useState(localStorage.getItem("tokenA") || '');
  const [tokenB, setTokenB] = useState(localStorage.getItem("tokenB") || '');

  const isValidA = useIsValidToken(tokenA);
  const isValidB = useIsValidToken(tokenB);
  const tokensValid = isValidA === 'valid' && isValidB === 'valid';

  // VoidPair address
  const pairAddress = useGetPairAddress(VOID_FACTORY[chainId], tokenA, tokenB, tokensValid);

  // Output
  const contractTokenA = useGetTokenA(pairAddress);
  const contractTokenB = useGetTokenB(pairAddress);
  const reservesFromContract = useGetReserves(pairAddress);
  const reservesA = (tokenA == contractTokenA) ? reservesFromContract?.[0] : reservesFromContract?.[1];
  const reservesB = (tokenA == contractTokenA) ? reservesFromContract?.[1] : reservesFromContract?.[0];

  const outputValue = useGetSwapAmount(pairAddress, tokensValid, toBigNumber(inputValue), reservesA, reservesB);

  // idle - enter something info alert
  // loading - display loader
  // error - display error
  // ready - display approve and swap steps
  function getSwapAction() {
    if (isValidA && isValidB && pairAddress && pairAddress === ethers.constants.AddressZero) {
      return SWAP_ACTION.createPool;
    }
    else if (!inputValue || inputValue == 0)
      return SWAP_ACTION.idle;
    else if (inputValue && toFloat(reservesA, 18) == 0 && toFloat(reservesB, 18) == 0) {
      return SWAP_ACTION.noLiquidity;
    }
    else if (!reservesA && !reservesB) {
      return SWAP_ACTION.error;
    }
    else if (inputValue && !outputValue && isValidA !== 'invalid' && isValidB !== 'invalid')
      return SWAP_ACTION.loading;
    else if (inputValue && outputValue)
      return SWAP_ACTION.ready;
    else
      return SWAP_ACTION.error;
  }
  const swapAction = getSwapAction();

  function onInputChange(value) {
    setInputValue(value);
  }

  function onTokensSwitch() {
    const tempTokenA = tokenA;
    setTokenA(tokenB);
    setTokenB(tempTokenA);
    localStorage.setItem("tokenA", tokenB);
    localStorage.setItem("tokenB", tempTokenA);
  }

  function handleInputTokenChange(value) {
    setTokenA(value);
    localStorage.setItem("tokenA", value);
  }

  function handleOutputTokenChange(value) {
    setTokenB(value);
    localStorage.setItem("tokenB", value);
  }

  // navigate to onboarding if wallet disconnected
  useEffect(() => {
    if (!account) {
      navigate('/app');
    }
  }, [account]);

  return (
    <>
      <HeroSection>
        <Card>
          <Card.Title>Swap tokens</Card.Title>

          <Card.Section>
            <div className="flex items-stretch w-full">
              <div className="left">
                <SwapForm
                  inputValue={inputValue}
                  outputValue={toFloat(outputValue)}
                  onInputChange={onInputChange}
                  onTokensSwitch={onTokensSwitch}
                  tokenA={tokenA}
                  tokenB={tokenB}
                  isValidA={isValidA}
                  isValidB={isValidB}
                  account={account}
                />
              </div>
              <div className="right flex-1">
                <PoolInfo
                  pairAddress={pairAddress}
                  tokenA={tokenA}
                  tokenB={tokenB}
                  reservesFromContract={reservesFromContract}
                  contractTokenA={contractTokenA}
                  contractTokenB={contractTokenB}
                  reservesA={reservesA}
                  reservesB={reservesB}
                />
              </div>
            </div>
          </Card.Section>

          <Card.Section>
            <SwapAction
              action={swapAction}
              tokenA={tokenA}
              tokenB={tokenB}
              account={account}
              inputAmount={inputValue}
              outputAmount={outputValue}
              pairAddress={pairAddress}
            />
          </Card.Section>
        </Card>
      </HeroSection>

      <ModalSelectToken.Input handleInputTokenChange={handleInputTokenChange} />
      <ModalSelectToken.Output handleOutputTokenChange={handleOutputTokenChange} />
    </>
  )
}

export default Swap;