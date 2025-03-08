import React from 'react';

const Card = ({ children }) => {
  return (
    <>
      <div className='flex-1 relative p-8 rounded-box backdrop-blur border border-slate-900/10 bg-white/80 mt-24'>
        {children}
      </div>
    </>
  )
}
const Section = ({ children }) => {
  return (
    <>
      <div className="flex flex-col justify-center align-middle items-center w-full mt-8">
        {children}
      </div>
    </>
  )
}
const Title = ({ children }) => {
  return (
    <>
      <h1 className="text-4xl leading-snug font-bold text-gradient">{children}</h1>
    </>
  )
}
const TitleAppear = ({ children }) => {
  return (
    <>
      <h1 className="text-4xl leading-snug font-bold text-gradient appear-animation whitespace-nowrap">{children}</h1>
    </>
  )
}

Card.Section = Section;
Card.Title = Title;
Card.TitleAppear = TitleAppear;

export default Card;