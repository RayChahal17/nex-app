import React, { useState } from 'react';
// Importing necessary components and hooks from React and other libraries
import { HeroParallax } from '../components/ui/HeroParallex';
import a from '../assets/images/a.jpeg';
import b from '../assets/images/b.jpeg';
import c from '../assets/images/c.jpeg';
import d from '../assets/images/d.jpeg';
import e from '../assets/images/e.jpeg';
import f from '../assets/images/f.jpeg';
import g from '../assets/images/g.jpeg';
import h from '../assets/images/h.jpeg';
import BackgroundBoxesComponent from '../components/ui/BackgroundBoxesComponent';
import HeroHighlightComponent from '../components/ui/HeroHighlightComponent';
import InfiniteCardsComponent from '../components/ui/InfiniteCardsComponent';
import TextContent1 from '../components/TextContent1';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Adapter for using dayjs with MUI pickers
import ScheduleFreeQuote from '../components/ScheduleFreeQuote';
import MovingBorderComponent from '../components/ui/MovingBorderComponent';
import CardStackComponent from '../components/ui/CardStackComponent';
import BackgroundGradientComponent from '../components/ui/BackgroundGradientComponent';
import BackgroundBeamsComponent from '../components/ui/BackgroundBeamsComponenet';
import GalleryComponent from '../components/GalleryComponent';



// Import all images from the services folder
import interlock4 from '../assets/services/interlock4.jpeg';
import interlock5 from '../assets/services/interlock5.jpeg';
import interlock8 from '../assets/services/interlock8.jpeg';
import interlock9 from '../assets/services/interlock9.jpeg';
import deck6 from '../assets/services/deck6.jpeg';
import deck7 from '../assets/services/deck7.jpeg';
import landscaping1 from '../assets/services/landscaping1.jpeg';
import landscaping5 from '../assets/services/landscaping5.jpeg';
import basement1 from '../assets/services/basement1.jpeg';
import basement3 from '../assets/services/basement3.jpeg';
import bath4 from '../assets/services/bath4.jpeg';
import kitchen1 from '../assets/services/kitchen1.jpeg';
import kitchen3 from '../assets/services/kitchen3.jpeg';
import kitchen5 from '../assets/services/kitchen5.jpeg';
import fences1 from '../assets/services/fences1.jpeg';
import fences7 from '../assets/services/fences7.jpeg';
import retaining6 from '../assets/services/retaining6.jpeg';


// Array of product objects with their titles, links, and thumbnail images
const products = [
   { title: 'Concrete', link: '/concrete', thumbnail: a },
   { title: 'Interlock Services', link: '/interlock-services', thumbnail: interlock8 },
   // { title: 'Stone Walkways', link: '/stone-walkways', thumbnail: c },
   { title: 'Retaining Walls', link: '/retaining-walls', thumbnail: d },
   { title: 'Wood Decks', link: '/wood-decks', thumbnail: deck7 },
   { title: 'Fences', link: '/fences', thumbnail: fences1 },
   { title: 'Kitchen Renovations', link: '/kitchen-renovations', thumbnail: kitchen1 },
   // { title: 'Home Additions', link: '/home-additions', thumbnail: h },
   { title: 'Basement Renovations', link: '/basement-renovations', thumbnail: basement3 },
   { title: 'Bathroom Renovations', link: '/bathroom-renovations', thumbnail: bath4 },
   { title: 'Custom Landscapes', link: '/custom-landscapes', thumbnail: landscaping1 },
   // { title: 'Custom Pools & Spas', link: '/custom-pools-spas', thumbnail: d },

   { title: 'Concrete', link: '/concrete', thumbnail: a },
   { title: 'Interlock Services', link: '/interlock-services', thumbnail: interlock4 },
   // { title: 'Stone Walkways', link: '/stone-walkways', thumbnail: c },
   { title: 'Retaining Walls', link: '/retaining-walls', thumbnail: d },
   { title: 'Wood Decks', link: '/wood-decks', thumbnail: deck6 },
   { title: 'Fences', link: '/fences', thumbnail: fences7 },
   { title: 'Kitchen Renovations', link: '/kitchen-renovations', thumbnail: kitchen3 },
   // { title: 'Home Additions', link: '/home-additions', thumbnail: h },
   { title: 'Basement Renovations', link: '/basement-renovations', thumbnail: basement1 },
   { title: 'Custom Landscapes', link: '/custom-landscapes', thumbnail: landscaping5 },

   { title: 'Concrete', link: '/concrete', thumbnail: a },
   { title: 'Interlock Services', link: '/interlock-services', thumbnail: interlock5 },
   // { title: 'Stone Walkways', link: '/stone-walkways', thumbnail: c },
   { title: 'Retaining Walls', link: '/retaining-walls', thumbnail: d },
   { title: 'Wood Decks', link: '/wood-decks', thumbnail: deck7 },
   { title: 'Fences', link: '/fences', thumbnail: fences1 },
   { title: 'Kitchen Renovations', link: '/kitchen-renovations', thumbnail: kitchen5 },
   // { title: 'Home Additions', link: '/home-additions', thumbnail: h },
   { title: 'Basement Renovations', link: '/basement-renovations', thumbnail: basement3 },
   { title: 'Custom Landscapes', link: '/custom-landscapes', thumbnail: landscaping1 },

   { title: 'Concrete', link: '/concrete', thumbnail: a },
   { title: 'Interlock Services', link: '/interlock-services', thumbnail: interlock9 },
   { title: 'Retaining Walls', link: '/retaining-walls', thumbnail: retaining6 },
   { title: 'Wood Decks', link: '/wood-decks', thumbnail: deck6 },
   { title: 'Fences', link: '/fences', thumbnail: fences7 },
 ];
 

// Main Home component
export default function Home() {

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div>
            <BackgroundBoxesComponent />
            <HeroHighlightComponent />
            <HeroParallax products={products} />

            <TextContent1
               h2Text1='Unlock the Potential of Your Home:'
               h2MidSpan=' With NexRenovations'
               h2Text2=''
               pText="Your Gateway to Exceptional Design and Quality Craftsmanship!"
               textButton=''
            />
            <div className='flex flex-row  flex-wrap justify-center bg-gradient-to-br items-center pb-4 pt-0 md:py-10 gap-5 '
            // style={{
            //    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) , rgba(0,0,0,0.8), rgba(0,0,0,0.8) , rgba(0,0,0,0.9) )', // Add three colors
            // }}
            >
               <div className='basis-1/2 flex flex-col h-full justify-center items-center '>
                  <MovingBorderComponent
                     MovingBorderBoxText="Select time to schedule an appointment for a free quote"
                  />


               </div>

               <div className=' basis-2/5 flex h-full flex-col justify-center align-center '>
                  <div className='w-full basis-3/5  mt-2'>
                     <BackgroundGradientComponent className=" w-auto rounded-[22px] sm:w-auto p-0 sm:p-0 bg-gray-200 dark:bg-zinc-300 ">
                        <ScheduleFreeQuote />
                     </BackgroundGradientComponent>
                  </div>
               </div>
            </div>
            

            <InfiniteCardsComponent />
            <BackgroundBeamsComponent />


         </div>
      </LocalizationProvider>
   );
}
