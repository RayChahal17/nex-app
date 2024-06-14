import { cn } from "../../utils/cn"; // Ensure this utility is correctly set up in your React project
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom instead of next/link
import { useState } from "react";

export const HoverCard = ({
   items,
   className,
   value,
   setValue,
   setHoverEffect
}) => {
   const [hoveredIndex, setHoveredIndex] = useState(null);


   return (
      <div className={cn("grid grid-cols-1 w-auto md:grid-cols-2 lg:grid-cols-1 py-1 h-full", className)}>
         {items.map((item, idx) => (
            <Link
               to={item?.link} // Changed from href to to for react-router-dom Link
               key={item?.link}
               className="relative group block p-2 h-full w-full"
               onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setValue(item.word);  // Assuming `word` is what you want to show in Highlights
                  setHoverEffect(true);

               }}
               onMouseLeave={() => {
                  setHoveredIndex(null);
                  setValue(items[0].word); // Clear value on mouse leave if necessary
                  setHoverEffect(false);

               }}            >
               <AnimatePresence>
                  {hoveredIndex === idx && (
                     <motion.span
                        className="absolute inset-0 h-96 w-max bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                     />
                  )}
               </AnimatePresence>
               <Card onMouseEnter={() => setValue(item.title)} >
                  <CardTitle>{item.title}</CardTitle>
               </Card>
            </Link>
         ))}
      </div>
   );
};

export const Card = ({
   className,
   children,
}) => {
   return (
      <div className={cn(" rounded-2xl h-20 w-full p-0 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20", className)}>
         <div className="relative z-50">
            <div className="px-4">{children}</div>
         </div>
      </div>
   );
};

export const CardTitle = ({
   className,
   children,
}) => {
   return (
      <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
         {children}
      </h4>
   );
};










