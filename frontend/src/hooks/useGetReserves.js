import { useCall } from '@usedapp/core';
import { Contract } from 'ethers';
import VoidPair from "../abi/VoidPair.js";

function useGetReserves(pairAddress) {
  const { value, error } = useCall(pairAddress && {
    contract: new Contract(pairAddress, VoidPair),
    method: 'getReserves',
    args: []
  }) ?? {};
  if(error) {
    console.error(error.message);
    return undefined;
  }

  return value;
}

export default useGetReserves;