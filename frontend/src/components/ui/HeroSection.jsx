import React from 'react';
import { background_prism1 } from '../../assets';

const HeroSection = ({ children }) => {
  return (
    <>
      <div className="hero min-h-screen max-h-screen bg-gradient-to-tr from-pink-100 via-purple-50 to-indigo-100 relative">
        <div className="hero-content w-screen justify-between max-w-4xl flex-col md:flex-row">
          {children}
        </div>
      </div>
    </>
  )
}
const Home = ({ children }) => {
  return (
    <>
      <div className="hero min-h-screen max-h-screen bg-base-100 relative">
        <div className="absolute top-4 left-1/2 select-none">
          <img className='w-3/4 h-3/4' src={`${background_prism1}`} />
        </div>
        <div className="hero-content w-screen justify-between max-w-8xl flex-col md:flex-row">
          {children}
        </div>
      </div>
    </>
  )
}
const Wide = ({ children }) => {
  return (
    <>
      <div className="hero min-h-screen max-h-screen bg-gradient-to-tr from-pink-100 via-purple-50 to-indigo-100 relative">
        <div className="hero-content w-screen justify-between max-w-8xl flex-col md:flex-row">
          {children}
        </div>
      </div>
    </>
  )
}

HeroSection.Home = Home;
HeroSection.Wide = Wide;

export default HeroSection;