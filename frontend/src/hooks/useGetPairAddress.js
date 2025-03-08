import { useCall } from '@usedapp/core';
import { Contract } from 'ethers';
import VoidFactory from "../abi/VoidFactory.js";

function useGetPairAddress(factoryAddress, tokenA, tokenB, tokensValid) {
  const { value, error } = useCall(factoryAddress && tokenA && tokenB && tokensValid && {
    contract: new Contract(factoryAddress, VoidFactory),
    method: 'getPairAddress',
    args: [tokenA, tokenB]
  }) ?? {};
  if(error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export default useGetPairAddress;