import './Home.css'

import { dai, eth, link, wbtc } from '../assets/tokens'

import { HeroSection } from '../components/ui';
import { NavLink } from "react-router-dom";
import React from 'react'
import { void_icon } from '../assets'

const Home = () => {
  return (
    <>
      <HeroSection.Home>
        <div className='flex-1 relative p-2 md:p-12 mx-5'>
          <h1 className="text-6xl max-w-lg font-bold text-gradient">Trade ERC-20 tokens</h1>
          <p className="text-lg text-justify max-w-md py-12">Exchange your favorite tokens with no extra fees. VoidExchange is a fully decentralized, permissionless, autonomous application and can be used by anyone around the world.</p>
          <NavLink
            to="/app"
            className="btn btn-primary"
          >
            Open the app
          </NavLink>
        </div>
        <div className='flex-1 flex flex-col relative h-64'>
          <img className='absolute top-1/2 left-1/2 w-64 h-64 hero-animated-icon void-icon z-10' src={`${void_icon}`} />
          <img className='absolute top-1/2 left-1/2 w-16 h-16 hero-animated-icon token-1' src={`${wbtc}`} />
          <img className='absolute top-1/2 left-1/2 w-16 h-16 hero-animated-icon token-2' src={`${eth}`} />
          <img className='absolute top-1/2 left-1/2 w-16 h-16 hero-animated-icon token-3' src={`${link}`} />
          <img className='absolute top-1/2 left-1/2 w-16 h-16 hero-animated-icon token-4' src={`${dai}`} />
        </div>
      </HeroSection.Home>
    </>
  )
}

export default Home