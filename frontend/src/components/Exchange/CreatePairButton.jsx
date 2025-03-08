import React from 'react';
import VoidFactory from '../../abi/VoidFactory';
import { Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';

const CreatePairButton = ({ factoryAddress, tokenA, tokenB }) => {
  const voidFactoryContract = new Contract(factoryAddress, VoidFactory);

  // transactions
  const { state, send } = useContractFunction(voidFactoryContract, 'createPair', { transactionName: 'CreatePair' });

  const createPair = () => {
    send(tokenA, tokenB);
  }

  return (
    <button
      className="btn btn-primary gap-2"
      onClick={createPair}
    >
      <i className="bi bi-file-earmark-plus"></i>
      Create pair
    </button>
  )
}

export default CreatePairButton;