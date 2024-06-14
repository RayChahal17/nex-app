import React from 'react'
import ScheduleFreeQuote from '../components/ScheduleFreeQuote'
import BackgroundBeamsComponent from '../components/ui/BackgroundBeamsComponenet';
import TextContent1 from '../components/TextContent1';

export default function GetAFreeEstimate() {
   return (
      <>
         <TextContent1
            h2Text1='Book A Free Estimate'
            h2MidSpan=' With NexRenovations'
            h2Text2=''
            pText="Your Gateway to Exceptional Design and Quality Craftsmanship!"
            textButton=''
         />
         <ScheduleFreeQuote />
         <BackgroundBeamsComponent />
      </>
   )
}
