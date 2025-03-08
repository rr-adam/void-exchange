import { Card, HeroSection } from '/src/components/ui'
import React, { useEffect } from 'react';

import ConnectButton from '/src/components/Exchange/ConnectButton';
import { useEthers } from '@usedapp/core'
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const { account } = useEthers();
  const navigate = useNavigate();

  const walletInstalled = window.ethereum;

  useEffect(() => {
    if (account) {
      navigate('/app/swap');
    }
  }, [account]);

  return (
    <>
      <HeroSection>
        <Card>
          <Card.TitleAppear>
            Welcome to VoidExchange
          </Card.TitleAppear>

          {walletInstalled
            ?
            <Card.Section>

              <div className="flex animate-fade">
                <div className="left flex-1">
                  <div className="h-full font-bold text-slate-400 text-center border-slate-900/10 bg-white/80 rounded-md p-8 mr-8">
                    Connect your Metamask wallet to VoidExchange and experience the full potential of decentralized finance. Don't wait, trade now!
                  </div>
                </div>

                <div className="divider divider-vertical"></div>

                <div className="right flex-1 flex flex-col justify-center item-center">
                  <div className="flex justify-center mt-2">
                    <i className="bi bi-key-fill text-6xl onboarding-key my-8"></i>
                    <div className="bg-white my-7 z-10">
                      <i className="bi bi-file-lock-fill text-6xl"></i>
                    </div>

                  </div>

                  <ConnectButton />
                </div>
              </div>

              <div className="divider mt-16"></div>

              <div className="alert alert-info">
                <div>
                  <i className="bi bi-info-circle mr-2 text-xl"></i>
                  <span>It seems you don't have your wallet connected!</span>
                </div>
              </div>
            </Card.Section>
            :
            <Card.Section>
              <div className="alert alert-info">
                <div>
                  <i className="bi bi-info-circle mr-2 text-xl"></i>
                  <span>You don't have metamask wallet installed. Visit <a className='text-secondary' href="https://metamask.io/">metamask.io</a> to install your wallet.</span>
                </div>
              </div>
            </Card.Section>
          }
        </Card>
      </HeroSection>
    </>
  )
}

export default Onboarding;