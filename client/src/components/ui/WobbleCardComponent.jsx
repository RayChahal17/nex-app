import React from "react";
import { CardBody, CardContainer, CardItem } from "./WobbleCard";
import { Link } from "react-router-dom";

// Simplified function to combine class names
function cn(...classes) {
   return classes.filter(Boolean).join(" ");
}

export function WobbleCardComponent({ title, description, buttonText, img, link }) {
   return (
      <CardContainer className="inter-var h-auto ">
         <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-auto h-auto rounded-xl  px-2 md:px-5 border">
            <CardItem
               translateZ="50"
               className="text-xl font-bold text-neutral-600 dark:text-white"
            >
               {title}
            </CardItem>
            <CardItem
               as="p"
               translateZ="60"
               className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
               {description}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
               <img
                  src={img}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
               />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
               <CardItem
                  translateZ={20}
                  as="a"
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
               >
                  <Link to={link}>Click here →</Link>
               </CardItem>
               <Link to={link}>
                  <CardItem
                     translateZ={20}
                     as="button"
                     className="px-10 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                     {buttonText}
                  </CardItem></Link>
            </div>
         </CardBody>
      </CardContainer>
   );
}

export default WobbleCardComponent;
