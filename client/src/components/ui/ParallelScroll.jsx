import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn"; // Ensure this utility is correctly set up in your React project

const ParallelScroll = ({ images, className }) => {
   const gridRef = useRef(null);
   const { scrollYProgress } = useScroll({
      container: gridRef,
      offset: ["start start", "end start"],
   });

   const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
   const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
   const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

   const third = Math.ceil(images.length / 3);

   const firstPart = images.slice(0, third);
   const secondPart = images.slice(third, 2 * third);
   const thirdPart = images.slice(2 * third);

   return (
      <div className={cn("h-[40rem] items-start overflow-y-auto w-full", className)} ref={gridRef}>
         <div className="heading-section bg-cover bg-center py-20 text-center text-white" style={{ backgroundImage: `url(${images[7]})` }}>
            <div className="bg-black bg-opacity-50 py-10 px-5 rounded-lg inline-block">
               <h1 className="text-5xl font-bold mb-4">Welcome to Our Stunning Gallery</h1>
               <p className="text-xl">Explore our collection of breathtaking images showcasing our top-notch services and craftsmanship. Each image tells a story of dedication, quality, and customer satisfaction.</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
            <div className="grid gap-10">
               {firstPart.map((el, idx) => (
                  <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
                     <img src={el} className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0" alt="thumbnail" />
                  </motion.div>
               ))}
            </div>
            <div className="grid gap-10">
               {secondPart.map((el, idx) => (
                  <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                     <img src={el} className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0" alt="thumbnail" />
                  </motion.div>
               ))}
            </div>
            <div className="grid gap-10">
               {thirdPart.map((el, idx) => (
                  <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                     <img src={el} className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0" alt="thumbnail" />
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ParallelScroll;
