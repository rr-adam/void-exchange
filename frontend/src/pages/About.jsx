import { about_ve_liquidity, about_ve_main, about_ve_swapping, logo_experimental } from '../assets'

import { HeroSection } from '../components/ui'
import React from 'react'

const About = () => {
  return (
    <>
      <HeroSection.Wide>
        <div className="flex-1 flex">
          <div className='flex-1 relative p-2 md:p-12 mx-5'>
            <h1 className="text-6xl leading-snug max-w-lg font-bold text-gradient">About VoidExchange</h1>
            <p className="text-lg text-justify max-w-md py-12">VoidExchange is a fully decentralized, permissionless, autonomous ERC-20 token exchange protocol. It uses liquidity pools to provide markets for token pairs. User can manage liquidity and swap tokens of his choice.</p>
          </div>
          <div className="flex-1 flex flex-col align-middle justify-center ">
            <img src={logo_experimental} className='w-3/4' />
          </div>
        </div>

        <div className="absolute -translate-x-1/2 left-1/2 bottom-24 text-slate-400">
          Scroll down to learn more
        </div>
      </HeroSection.Wide>
      <HeroSection.Wide>
        <div className="flex-1 flex">
          <div className='flex-1 relative p-2 md:p-12 mx-5'>
            <h1 className="text-6xl leading-snug max-w-lg font-bold text-gradient">Liquidity Pools</h1>
            <p className="text-lg text-justify max-w-md py-12">Trading pairs can be created for any two ERC-20 tokens. User then can add and remove liquidity for that pair. Users can also swap tokens in a pair if the pair has liquidity.</p>
          </div>
          <div className="flex-1 flex flex-col align-middle justify-center ">
            <img src={about_ve_main} className='shadow-md' />
          </div>
        </div>
      </HeroSection.Wide>
      <HeroSection.Wide>
        <div className="flex-1 flex">
          <div className='flex-1 relative p-2 md:p-12 mx-5'>
            <h1 className="text-6xl leading-snug max-w-lg font-bold text-gradient">Swapping</h1>
            <p className="text-lg text-justify max-w-md py-12">To swap tokens simply enter the amount that you want to sell. The app will then show amount of tkoens that you will receive! Remember to first approve the tokens with the "Approve" button.</p>
          </div>
          <div className="flex-1 flex flex-col align-middle justify-center ">
            <img src={about_ve_swapping} className='shadow-md' />
          </div>
        </div>
      </HeroSection.Wide>
      <HeroSection.Wide>
        <div className="flex-1 flex">
          <div className='flex-1 relative p-2 md:p-12 mx-5'>
            <h1 className="text-6xl leading-snug max-w-lg font-bold text-gradient">Managing liquidity</h1>
            <p className="text-lg text-justify max-w-md py-12">To add liquidity user needs to enter amount of tokens that he wants to add to the pair and confirm with "Add liquidity" button. Liquidity can be removed with the "Remove liquidity" button anytime.</p>
          </div>
          <div className="flex-1 flex flex-col align-middle justify-center ">
            <img src={about_ve_liquidity} className='shadow-md' />
          </div>
        </div>
      </HeroSection.Wide>
    </>
  )
}

export default About