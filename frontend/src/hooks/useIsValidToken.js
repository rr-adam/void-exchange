import { Contract, ethers } from 'ethers';

import ERC20 from "../abi/ERC20.js";
import { useCall } from '@usedapp/core';

const isZeroAddress = (address) => {
  return address === ethers.constants.AddressZero;
};

function useIsValidToken(tokenAddress) {
  const { value, error } = useCall(
    tokenAddress &&
    ethers.utils.isAddress(tokenAddress) &&
    !isZeroAddress(tokenAddress) &&
    {
      contract: new Contract(tokenAddress, ERC20),
      method: 'symbol',
      args: []
    }
  ) ?? {};
  if(error) {
    console.error(error)
    return 'invalid';
  }
  if (!ethers.utils.isAddress(tokenAddress) || isZeroAddress(tokenAddress)) {
    return 'invalid';
  }

  return value ? 'valid' : 'loading';
}

export default useIsValidToken;

