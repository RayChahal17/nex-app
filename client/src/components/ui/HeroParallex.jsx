import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

// The HeroParallax component creates a dynamic visual effect for product displays based on user scroll interaction.
export const HeroParallax = ({ products }) => {
   // State to store the screen width
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

   // Update the screen width state on resize
   useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   // Organizing products into three separate rows to create layered visual effects.
   const firstRow = products.slice(0, 10);
   const secondRow = products.slice(10, 20);
   const thirdRow = products.slice(20, 30);

   // Using useRef to get a reference to the container element that reacts to scroll events.
   const ref = React.useRef(null);

   // Hook to capture the scroll progress within the container. "target" points to the referenced DOM element.
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
   });

   // Configuration for the spring physics for animation; this affects how the animations feel.
   const springConfig = { stiffness: 700, damping: 40, bounce: 100 };

   // Creating a motion value that translates elements along the X-axis as the user scrolls.
   const translateX = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, 1000]),
      springConfig
   );

   // Creating a reverse motion value for alternate row animation, moving in the opposite direction.
   const translateXReverse = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, -1000]),
      springConfig
   );

   // Additional animations for rotating and fading elements based on scroll progress.
   const rotateX = useSpring(
      useTransform(scrollYProgress, [0, 0.2], [15, 0]),
      springConfig
   );
   const opacity = useSpring(
      useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
      springConfig
   );
   const rotateZ = useSpring(
      useTransform(scrollYProgress, [0, 0.2], [20, 0]),
      springConfig
   );

   // Determine the translateY value based on screen size
   const translateY = useSpring(
      useTransform(
         scrollYProgress,
         [0, 0.2],
         screenWidth < 768 ? [-350, 0] : [-650, -50]
      ),
      springConfig
   );

   // Render the scrolling container with a series of product cards that animate based on scroll position.
   return (
      <div
         ref={ref}
         className="h-full  
      md:h-full md:py-10
      lg:h-full lg:pt-60
      sm:h-full 
      overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      >
         <Header />
         <motion.div
            style={{
               rotateX,
               rotateZ,
               translateY,
               opacity,
            }}
         >
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-20">
               {firstRow.map((product) => (
                  <ProductCard
                     product={product}
                     translate={translateX}
                     key={product.title}
                  />
               ))}
            </motion.div>
            <motion.div className="flex flex-row mb-20 space-x-10">
               {secondRow.map((product) => (
                  <ProductCard
                     product={product}
                     translate={translateXReverse}
                     key={product.title}
                  />
               ))}
            </motion.div>
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-10">
               {thirdRow.map((product) => (
                  <ProductCard
                     product={product}
                     translate={translateX}
                     key={product.title}
                  />
               ))}
            </motion.div>
         </motion.div>
      </div>
   );
};

// The Header component displays a fixed content block at the top of the HeroParallax component.
export const Header = () => {
   return (
      <div className="max-w-7xl relative mx-auto w-full left-0 
    px-4
    md:px-4
    pt-20 -top-70 
    sm:pt-20 sm:-top-0 
    md:pt-20 md:-top-20 
    lg:pt-20 lg:-top-20
    ">
         <h1 className="text-2xl text-green-900 md:text-8xl font-bold dark:text-white">
         OUR MOST 
         <br /> POPULAR SERVICES
         </h1>
         <p className="max-w-2xl text-base text-green-700 md:text-2xl mt-8 dark:text-neutral-200">
            We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products.
         </p>
      </div>
   );
};

// The ProductCard component represents individual products with interactive hover effects.
export const ProductCard = ({ product, translate }) => {
   return (
      <motion.div
         style={{ x: translate }}
         whileHover={{ y: -20 }}
         key={product.title}
         className="group product relative flex-shrink-0 
      bg-blue-500
      h-60 w-[10rem] 
      sm:h-60 sm:w-[15rem] 
      md:h-60 md:w-[15rem] 
      lg:h-60 lg:w-[15rem]"
      >
         <Link
            to={product.link}
            className="block group-hover:shadow-2xl"
         >
            <img
               src={product.thumbnail}
               height="600"
               width="600"
               className="object-cover object-left-top absolute h-full w-full inset-0"
               alt={product.title}
            />
         </Link>
         <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-80 bg-black pointer-events-none"></div>
         <h2 className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 text-white">
            {product.title}
         </h2>
      </motion.div>
   );
};

export default HeroParallax;
