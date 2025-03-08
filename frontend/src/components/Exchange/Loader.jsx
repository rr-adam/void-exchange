import React from 'react';
import { void_icon } from '../../assets';

const Loader = () => {
  return (
    <>
      <div className="flex justify-around relative">
        <div className="flex justify-around absolute animate-ping">
          <img className='w-12 h-12' src={`${void_icon}`} />
        </div>
        <img className='w-12 h-12' src={`${void_icon}`} />
      </div>
    </>
  )
}
const Small = () => {
  return (
    <>
      <div className="flex justify-around relative">
        <div className="flex justify-around absolute animate-ping">
          <img className='w-6 h-6' src={`${void_icon}`} />
        </div>
        <img className='w-6 h-6' src={`${void_icon}`} />
      </div>
    </>
  )
}

Loader.Small = Small;

export default Loader;