import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BookEstimateAppointment from '../components/services/BookEstimateAppointment'
const testimonials = [
   {
      name: 'John Mitchell',
      location: 'Burlington',
      quote: 'The team did an incredible job transforming our backyard with a stunning new patio. Their attention to detail and quality craftsmanship are truly commendable.',
      rating: 5,
   },
   {
      name: 'Sarah Thompson',
      location: 'Oakville',
      quote: 'Our driveway renovation was seamless from start to finish. NexRenovations exceeded our expectations in every way!',
      rating: 5,
   },
   {
      name: 'David Rodriguez',
      location: 'Hamilton',
      quote: 'We couldn’t be happier with our new kitchen. The design and execution were flawless. Highly recommended!',
      rating: 5,
   },
   {
      name: 'Emily Clark',
      location: 'Toronto',
      quote: 'NexRenovations turned our basement into a beautiful, functional space. Their team was professional, efficient, and attentive to our needs.',
      rating: 5,
   },
   {
      name: 'Michael Brown',
      location: 'Mississauga',
      quote: 'Our home addition was completed on time and within budget. The quality of work is outstanding. We highly recommend NexRenovations.',
      rating: 5,
   },
   {
      name: 'Jessica White',
      location: 'Brampton',
      quote: 'NexRenovations transformed our landscape into a beautiful oasis. The team was knowledgeable and professional throughout the project.',
      rating: 5,
   },
   {
      name: 'Robert Johnson',
      location: 'Markham',
      quote: 'The craftsmanship and attention to detail in our new fence are exceptional. We are very satisfied with the results.',
      rating: 5,
   },
   {
      name: 'Laura Lee',
      location: 'Vaughan',
      quote: 'We love our new custom pool and spa. NexRenovations made the process smooth and stress-free. Highly recommended!',
      rating: 5,
   },
   {
      name: 'Daniel Harris',
      location: 'Richmond Hill',
      quote: 'Our bathroom renovation exceeded our expectations. The quality of work and professionalism were top-notch.',
      rating: 5,
   },
   {
      name: 'Amanda Clark',
      location: 'Barrie',
      quote: 'NexRenovations did a fantastic job on our kitchen remodel. The team was friendly, efficient, and the results are stunning.',
      rating: 5,
   },
];

const renderStars = (rating) => {
   const stars = [];
   for (let i = 1; i <= 5; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
   }
   return stars;
};

const Testimonials = () => {
   const [current, setCurrent] = useState(0);

   const nextSlide = () => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
   };

   const prevSlide = () => {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
   };

   useEffect(() => {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
         <div className="text-center mb-16 px-4">
            <h2 className="text-5xl font-extrabold text-green-700 dark:text-gray-100 mb-4">Our Happy Clients</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
               Discover why our clients love working with NexRenovations. Here are some of the wonderful things they have to say about our services.
            </p>
         </div>

         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FiChevronLeft
               onClick={prevSlide}
               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-700 dark:text-gray-300 cursor-pointer z-10"
            />
            <FiChevronRight
               onClick={nextSlide}
               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-700 dark:text-gray-300 cursor-pointer z-10"
            />

            <AnimatePresence mode="wait">
               <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center"
               >
                  <div className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                     <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                           {testimonials[current].name.charAt(0)}
                        </div>
                        <div className="ml-4">
                           <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{testimonials[current].name}</h3>
                           <p className="text-gray-500 dark:text-gray-400">{testimonials[current].location}</p>
                        </div>
                     </div>
                     <div className="flex items-center mb-4">
                        {renderStars(testimonials[current].rating)}
                     </div>
                     <FaQuoteLeft className="text-blue-500 dark:text-blue-400 text-3xl mb-4" />
                     <p className="text-gray-600 dark:text-gray-300">{testimonials[current].quote}</p>
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-4xl mt-16">
            <div className="text-center py-10 px-6">
               <h3 className="text-4xl font-extrabold mb-4">Client Spotlight</h3>
               <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-500 text-3xl font-bold">
                     E
                  </div>
                  <div className="ml-4">
                     <h3 className="text-3xl font-bold">Emma Johnson</h3>
                     <p className="text-lg">Toronto</p>
                  </div>
               </div>
               <div className="flex items-center justify-center mb-4">
                  {renderStars(5)}
               </div>
               <FaQuoteLeft className="text-white text-4xl mb-4" />
               <p className="text-lg">
                  "NexRenovations did a phenomenal job on our home renovation. The team was professional, punctual, and their attention to detail was impeccable. We are thrilled with the final result and highly recommend them!"
               </p>
            </div>
         </div>

         <div className="bg-gray-50 dark:bg-gray-900 py-16 mt-16">
            <div className="text-center mb-16">
               <h3 className="text-4xl font-extrabold text-green-700 dark:text-gray-100 mb-8">Why Choose Us?</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                     <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Expert Craftsmanship</h4>
                     <p className="text-gray-600 dark:text-gray-300">
                        Our team of skilled professionals is dedicated to delivering high-quality workmanship that exceeds your expectations. We take pride in every project we undertake, ensuring attention to detail and precision at every step.
                     </p>
                  </div>
                  <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                     <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Customer Satisfaction</h4>
                     <p className="text-gray-600 dark:text-gray-300">
                        We value our clients and strive to provide exceptional service from start to finish. Our commitment to customer satisfaction is reflected in our transparent communication, timely project completion, and post-project support.
                     </p>
                  </div>
                  <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                     <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Innovative Solutions</h4>
                     <p className="text-gray-600 dark:text-gray-300">
                        At NexRenovations, we embrace innovation and modern techniques to create stunning, functional spaces. Our designers and builders work collaboratively to bring your vision to life, incorporating the latest trends and technologies.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="text-center mt-16">

            <BookEstimateAppointment/>
         </div>
      </div>
   );
};

export default Testimonials;
