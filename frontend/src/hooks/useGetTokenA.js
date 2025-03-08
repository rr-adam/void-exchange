import { useCall } from '@usedapp/core';
import { Contract } from 'ethers';
import VoidPair from "../abi/VoidPair.js";

function useGetTokenA(pairAddress) {
  const { value, error } = useCall(pairAddress && {
    contract: new Contract(pairAddress, VoidPair),
    method: 'tokenA',
    args: []
  }) ?? {};
  if(error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
}

export default useGetTokenA;