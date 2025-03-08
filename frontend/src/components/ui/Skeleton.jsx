import React from 'react';

const Skeleton = () => {
  return (
    <>
      <div className="flex-1 py-4 animate-pulse">
        <div className="h-4 bg-slate-200 rounded"></div>
      </div>
    </>
  )
}
const Small = () => {
  return (
    <>
      <div className="flex-1 animate-pulse">
        <div className="h-4 bg-slate-200 rounded"></div>
      </div>
    </>
  )
}
const PoolInfo = () => {
  return (
    <>
      <div className="flex-1 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded mt-2 w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded mt-2 w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded mt-8 w-1/4"></div>
        <div className="flex mt-2">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded ml-2 w-1/3"></div>
        </div>
      </div>
    </>
  )
}
Skeleton.Small = Small;
Skeleton.PoolInfo = PoolInfo;

export default Skeleton;