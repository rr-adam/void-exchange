import React, { useState, useEffect } from 'react';
import Loader from './Loader';

import { useEthers } from '@usedapp/core'

const ConnectButton = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [connecting, setConnecting] = useState(false);

  function handleConnectClick() {
    activateBrowserWallet();
    setConnecting(true);
  }

  useEffect(() => {
    if (!account) {
      setConnecting(false);
    }
  }, [account]);

  if (account) {
    return (
      <button
        className="btn btn-primary gap-2"
        disabled
      >
        <i className="bi bi-wallet"></i>
        Connected
      </button>
    )
  }
  else if (connecting) {
    return (
      <button
        className="btn btn-primary btn-outline gap-2"
      >
        <Loader.Small />
        Connecting...
      </button>
    )
  }
  else if (window.ethereum) {
    return (
      <button
        className="btn btn-primary btn-outline gap-2"
        onClick={() => handleConnectClick()}
      >
        <i className="bi bi-wallet"></i>
        Connect Wallet
      </button>
    )
  }
  else if (!window.ethereum) {
    return (
      <button
        className="btn btn-secondary gap-2"
        disabled
      >
        <i className="bi bi-wallet"></i>
        Connect Wallet
      </button>
    )
  }
}

export default ConnectButton;