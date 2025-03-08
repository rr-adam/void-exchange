import { useCall } from '@usedapp/core';
import { Contract } from 'ethers';
import VoidPair from "../abi/VoidPair.js";

function useGetSwapAmount(pairAddress, tokensValid, inputAmount, inputReserve, outputReserve) {
  const { value, error } = useCall(pairAddress && tokensValid && inputAmount && inputReserve > 0 && outputReserve > 0 && {
    contract: new Contract(pairAddress, VoidPair),
    method: 'getTradeAmount',
    args: [inputAmount, inputReserve, outputReserve]
  }) ?? {};
  if(error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
}

export default useGetSwapAmount;