import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CardStack = ({
   items,
   offset = 10,
   scaleFactor = 0.06,
}) => {
   const [cards, setCards] = useState(items);

   useEffect(() => {
      const interval = setInterval(() => {
         setCards((prevCards) => {
            const newArray = [...prevCards];
            newArray.unshift(newArray.pop());
            return newArray;
         });
      }, 8000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="relative h-80 w-80  md:h-100 md:w-4/5  content-center self-center justify-center items-center">
         {cards.slice(0, 3).map((card, index) => (
            <motion.div
               key={card.id}
               className="absolute dark:bg-black bg-gray-900 h-40 w-auto md:h-[30vh] md:w-auto rounded-3xl p-4 shadow-xl border border-slate-600 dark:border-white/[0.1] shadow-white/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
               style={{ transformOrigin: "top center" }}
               animate={{
                  top: index * -offset,
                  scale: 1 - index * scaleFactor,
                  zIndex: cards.length - index,
               }}
            >
               <div className="font-normal pt-5 text-neutral-300 dark:text-neutral-200">
                  {card.content}
               </div>
               <div>
                  <p className="text-neutral-500 font-medium dark:text-white">
                     {card.name}
                  </p>
                  <p className="text-neutral-400 font-normal dark:text-neutral-200">
                     {card.designation}
                  </p>
               </div>
            </motion.div>
         ))}
      </div>
   );
};

export default CardStack;
