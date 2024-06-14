import React from 'react'

const TextContent1 = ({h2Text1,h2MidSpan,h2Text2,pText,textButton}) => {
   return (
      <>
         <section className='w-100 h-auto py-2 md:py-10 flex flex-col text-center justify-center self-center items-center'>
         <h2 className='pt-5 font-extrabold md:text-4xl text-1xl self-center justify-center'>{h2Text1}<span className='text-green-600'>{h2MidSpan}</span> {h2Text2}</h2>
         <button className=
         {textButton ? 'classWhenValueExists' 
         : 'classWhenNull'}>
         {textButton || ''}
         </button>
         <p className='pt-5 pb-10 text-2xl self-center justify-center font-semibold text-slate-800'>{pText}</p>
         </section>
      </>
   )
}

export default TextContent1
