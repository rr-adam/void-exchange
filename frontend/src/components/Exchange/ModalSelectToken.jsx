import React, { useState } from 'react';
import useIsValidToken from '../../hooks/useIsValidToken';
import Loader from './Loader';

const ModalSelectToken = () => {
  return (
    <>
    </>
  )
}
const Input = ({ handleInputTokenChange }) => {
  const [inputValue, setInputValue] = useState('');
  const isValidAddress = useIsValidToken(inputValue);

  const handleConfirm = () => {
    handleInputTokenChange(inputValue);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const StateMessage = () => {
    if (!inputValue) {
      return <p>Enter token address...</p>;
    }
    else if (isValidAddress === 'loading') {
      return (
        <Loader />
      );
    }
    else if (isValidAddress === 'invalid') {
      return <p className='text-primary'>Enter correct token address!</p>;
    }
    else if (isValidAddress === 'valid') {
      return <p>Token found!</p>;
    }
    else {
      return <p className='text-primary'>Enter correct token address!</p>;
    }
  }

  return (
    <>
      <input type="checkbox" id="token-select-modal-input" className="modal-toggle" />
      <div className="modal backdrop-blur-sm bg-transparent bg-gradient-to-tr from-pink-100 via-purple-50/50 to-indigo-100/50">
        <div className="modal-box flex-1 relative p-8 rounded-box backdrop-blur border border-slate-900/10 bg-white">
          <label htmlFor="token-select-modal-input" className="btn btn-sm btn-circle btn-ghost absolute right-8 top-8">✕</label>
          <h3 className="font-bold text-lg ml-1">Select input token</h3>
          <input
            type="text"
            placeholder="0x..."
            className="input input-lg text-sm input-bordered mt-8 w-full flex-grow font-bold text-slate-600 bg-slate-100"
            onChange={handleInputChange}
            value={inputValue}
          />
          <div className="h-24 py-4">
            <StateMessage />
          </div>
          <div className="modal-action">
            <label onClick={handleConfirm} htmlFor="token-select-modal-input" className="btn btn-secondary">Confirm</label>
          </div>
        </div>
      </div>
    </>
  )
}
const Output = ({ handleOutputTokenChange }) => {
  const [inputValue, setInputValue] = useState('');
  const isValidAddress = useIsValidToken(inputValue);

  const handleConfirm = () => {
    handleOutputTokenChange(inputValue);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const StateMessage = () => {
    if (!inputValue) {
      return <p>Enter token address...</p>;
    }
    else if (isValidAddress === 'loading') {
      return (
        <Loader />
      );
    }
    else if (isValidAddress === 'invalid') {
      return <p className='text-primary'>Enter correct token address!</p>;
    }
    else if (isValidAddress === 'valid') {
      return <p>Token found!</p>;
    }
    else {
      return <p className='text-primary'>Enter correct token address!</p>;
    }
  }

  return (
    <>
      <input type="checkbox" id="token-select-modal-output" className="modal-toggle" />
      <div className="modal backdrop-blur-sm bg-transparent bg-gradient-to-tr from-pink-100 via-purple-50/50 to-indigo-100/50">
        <div className="modal-box flex-1 relative p-8 rounded-box backdrop-blur border border-slate-900/10 bg-white">
          <label htmlFor="token-select-modal-output" className="btn btn-sm btn-circle btn-ghost absolute right-8 top-8">✕</label>
          <h3 className="font-bold text-lg ml-1">Select output token</h3>
          <input
            type="text"
            placeholder="0x..."
            className="input input-lg text-sm input-bordered mt-8 w-full flex-grow font-bold text-slate-600 bg-slate-100"
            onChange={handleInputChange}
            value={inputValue}
          />
          <div className="h-24 py-4">
            <StateMessage />
          </div>
          <div className="modal-action">
            <label onClick={handleConfirm} htmlFor="token-select-modal-output" className="btn btn-secondary">Confirm</label>
          </div>
        </div>
      </div>
    </>
  )
}

ModalSelectToken.Input = Input;
ModalSelectToken.Output = Output;
export default ModalSelectToken;