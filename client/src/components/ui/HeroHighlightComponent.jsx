import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./HeroHighlight";
import WobbleCardComponent from "./WobbleCardComponent";
import a from '../../assets/images/step1.jpeg';
import b from '../../assets/images/step2.jpeg';
import c from '../../assets/images/step3.jpeg';
import { Link } from 'react-router-dom';
import Gallery from "../GalleryComponent";


export function HeroHighlightComponent() {
   return (
      <div className="min-h-screen flex flex-col">
         <HeroHighlight containerClassName="flex-grow flex flex-col justify-center items-center">
            <motion.h1
               initial={{
                  opacity: 0,
                  y: 20,
               }}
               animate={{
                  opacity: 1,
                  y: [20, -5, 0],
               }}
               transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
               }}
               className="text-1xl px-10 md:px-2 pt-20 md:text-2xl lg:text-4xl font-bold text-neutral-700 dark:text-white max-w-2xl  md:max-w-6xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
               From Blueprint to Reality,<br></br> NexRenovations Elevates Your Home with Precision and Style.{" "}<br></br>
               <Highlight className="text-black dark:text-white">
                  Where Quality Meets Excellence.
               </Highlight>
            </motion.h1>
            <div className="flex justify-center items-center flex-row w-full md:pt-20 pt-0">
               <div className="w-full md:max-w-7xl max-w-sm  px-5">
                  <Gallery />
               </div>
            </div>
            <div className="h-auto flex flex-wrap gap-0 md:mt-8 mt-0">
               <div className="w-full md:w-1/3 p-1 md:p-2 hidden md:block">
                  <WobbleCardComponent
                     title="Our Process"
                     description="From consultation to completion, see our meticulous approach."
                     buttonText="Learn Our Process"
                     link="/our-process"
                     img={a}
                  />
               </div>
               <div className="w-full md:w-1/3 p-1 md:p-2 hidden md:block">
                  <WobbleCardComponent title="Our Craftsmanship"
                     description="Explore the exceptional quality and attention to detail that define NexRenovations' work."
                     buttonText="Explore Our Craftsmanship"
                     img={b}
                     link="/our-craftsmanship"
                  />
               </div>
               <div className="w-full md:w-1/3 p-1 md:p-2 block">
                  <WobbleCardComponent title="Transformations"
                     description="See the dramatic transformations of our projects, showcasing our ability to elevate any space."
                     buttonText="See Gallery"
                     img={c}
                     link="/our-transformations"
                  />
               </div>
            </div>
         </HeroHighlight>
      </div>
   );
}

// Export as default
export default HeroHighlightComponent;
