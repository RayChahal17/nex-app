import React from 'react'

const TextContentLarge1 = ({ h2Text1, h2MidSpan, h2Text2, pText, textButton }) => {
   return (
      <>
         <section className='w-100 h-auto min-h-[60vh] bg-stone-200 flex flex-col text-center justify-center self-center items-center px-10 md:px-30'>
            <h2 className='pt-10 pb-5 font-extrabold md:text-4xl text-1xl  self-center justify-center'>{h2Text1}</h2>
               <h2 className='text-green-600 md:text-2xl  text-xl '>{h2MidSpan}</h2> {h2Text2}
            <button className=
               {textButton ? 'classWhenValueExists'
                  : 'classWhenNull'}>
               {textButton || ''}
            </button>
            <p className='pt-5 pb-10 px-5 md:px-20  text-1xl self-center justify-center font-semibold text-slate-800'>{pText}</p>
         </section>
      </>
   )
}

export default TextContentLarge1
