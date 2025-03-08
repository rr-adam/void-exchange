import React from 'react';
import Loader from './Loader';

const LoadingData = () => {
  return (
    <>
      <div className="container text-center mt-12">
        <Loader />
        <p className='mt-6'>Loading</p>
      </div>
    </>
  )
}

export default LoadingData;