import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import starIcon from '../assets/images/star.png';

// Import all images from the services folder
import aggregate1 from '../assets/services/aggregate1.jpeg';
import basement1 from '../assets/services/basement1.jpeg';
import basement2 from '../assets/services/basement2.jpeg';
import basement3 from '../assets/services/basement3.jpeg';
import basement4 from '../assets/services/basement4.jpeg';
import basement5 from '../assets/services/basement5.jpeg';
import basement6 from '../assets/services/basement6.jpeg';
import bath1 from '../assets/services/bath1.jpeg';
import bath2 from '../assets/services/bath2.jpeg';
import bath3 from '../assets/services/bath3.jpeg';
import bath4 from '../assets/services/bath4.jpeg';
import bath5 from '../assets/services/bath5.jpeg';
import bath6 from '../assets/services/bath6.jpeg';
import bath7 from '../assets/services/bath7.jpeg';
import bath8 from '../assets/services/bath8.jpeg';
import bath9 from '../assets/services/bath9.jpeg';
import bath10 from '../assets/services/bath10.jpeg';
import concrete1 from '../assets/services/concrete1.jpeg';
import concrete2 from '../assets/services/concrete2.jpeg';
import concrete3 from '../assets/services/concrete3.jpeg';
import concrete4 from '../assets/services/concrete4.jpeg';
import concrete5 from '../assets/services/concrete5.jpeg';
import concrete6 from '../assets/services/concrete6.jpeg';
import concrete7 from '../assets/services/concrete7.jpeg';
import concrete8 from '../assets/services/concrete8.jpeg';
import deck1 from '../assets/services/deck1.jpeg';
import deck2 from '../assets/services/deck2.jpeg';
import deck3 from '../assets/services/deck3.jpeg';
import deck4 from '../assets/services/deck4.jpeg';
import deck5 from '../assets/services/deck5.jpeg';
import deck6 from '../assets/services/deck6.jpeg';
import deck7 from '../assets/services/deck7.jpeg';
import deck8 from '../assets/services/deck8.jpeg';
import deck9 from '../assets/services/deck9.jpeg';
import fences1 from '../assets/services/fences1.jpeg';
import fences2 from '../assets/services/fences2.jpeg';
import fences3 from '../assets/services/fences3.jpeg';
import fences4 from '../assets/services/fences4.jpeg';
import fences5 from '../assets/services/fences5.jpeg';
import fences6 from '../assets/services/fences6.jpeg';
import fences7 from '../assets/services/fences7.jpeg';
import fences8 from '../assets/services/fences8.jpeg';
import fences9 from '../assets/services/fences9.jpeg';
import fences10 from '../assets/services/fences10.jpeg';
import fences11 from '../assets/services/fences11.jpeg';
import fences12 from '../assets/services/fences12.jpeg';
import interlock1 from '../assets/services/interlock1.jpeg';
import interlock2 from '../assets/services/interlock2.jpeg';
import interlock3 from '../assets/services/interlock3.jpeg';
import interlock4 from '../assets/services/interlock4.jpeg';
import interlock5 from '../assets/services/interlock5.jpeg';
import interlock6 from '../assets/services/interlock6.jpeg';
import interlock7 from '../assets/services/interlock7.jpeg';
import interlock8 from '../assets/services/interlock8.jpeg';
import interlock9 from '../assets/services/interlock9.jpeg';
import landscaping1 from '../assets/services/landscaping1.jpeg';
import landscaping2 from '../assets/services/landscaping2.jpeg';
import landscaping3 from '../assets/services/landscaping3.jpeg';
import landscaping4 from '../assets/services/landscaping4.jpeg';
import landscaping5 from '../assets/services/landscaping5.jpeg';
import landscaping6 from '../assets/services/landscaping6.jpeg';
import pavers1 from '../assets/services/pavers1.jpeg';
import pavers2 from '../assets/services/pavers2.jpeg';
import pavers3 from '../assets/services/pavers3.jpeg';
import retaining1 from '../assets/services/retaining1.jpeg';
import retaining2 from '../assets/services/retaining2.jpeg';
import retaining3 from '../assets/services/retaining3.jpeg';
import retaining4 from '../assets/services/retaining4.jpeg';
import retaining5 from '../assets/services/retaining5.jpeg';
import retaining6 from '../assets/services/retaining6.jpeg';
import retaining7 from '../assets/services/retaining7.jpeg';

const images = [
   aggregate1, basement1, basement2, basement3, basement4, basement5, basement6, bath1, bath2, bath3, bath4,
   bath5, bath6, bath7, bath8, bath9, bath10, concrete1, concrete2, concrete3, concrete4, concrete5,
   concrete6, concrete7, concrete8, deck1, deck2, deck3, deck4, deck5, deck6, deck7, deck8, deck9,
   fences1, fences2, fences3, fences4, fences5, fences6, fences7, fences8, fences9, fences10, fences11,
   fences12, interlock1, interlock2, interlock3, interlock4, interlock5, interlock6, interlock7, interlock8, interlock9,
   landscaping1, landscaping2, landscaping3, landscaping4, landscaping5, landscaping6, pavers1, pavers2, pavers3,
   retaining1, retaining2, retaining3, retaining4, retaining5, retaining6, retaining7
];

const NextArrow = ({ onClick }) => (
   <div
      className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer z-10"
      onClick={onClick}
      style={{ pointerEvents: 'auto' }}
   >
      <FaChevronRight className="text-gray-800" />
   </div>
);

const PrevArrow = ({ onClick }) => (
   <div
      className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer z-10"
      onClick={onClick}
      style={{ pointerEvents: 'auto' }}
   >
      <FaChevronLeft className="text-gray-800" />
   </div>
);

const Gallery = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               dots: false, // Hide dots on smaller devices
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: false, // Hide dots on smaller devices
            },
         },
      ],
   };

   return (
      <div className="gallery-container bg-transparent md:pt-5 pt-10">
         <div className="carousel-section mb-10 relative" style={{ zIndex: 2 }}>
            <Slider {...settings}>
               {images.map((image, index) => (
                  <div key={index} className="p-1 md:p-2">
                     <img
                        src={image}
                        alt={`slide-${index}`}
                        className="w-full h-40 md:h-48 lg:h-60 object-cover transition-transform duration-300 transform hover:scale-105 shadow-lg"
                     />
                  </div>
               ))}
            </Slider>
         </div>

         <div className="ratings-section py-10 px-5 bg-transparent" style={{ zIndex: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
               {/* First Column */}
               <div className="flex flex-col items-center justify-center mb-6 md:mb-0">
                  <h2 className="text-2xl md:text-xl font-bold mb-4 text-center">Star Score</h2>
                  <div className="flex items-center justify-center">
                     <img src={starIcon} alt="Star Icon" className="w-12 h-12 md:w-16 md:h-16 mr-4" />
                     <span className="text-4xl md:text-5xl font-extrabold">100%</span>
                  </div>
               </div>

               {/* Second Column */}
               <div className="space-y-2 md:space-y-3">
                  <div className="rating-metric">
                     <h3 className="text-base md:text-lg font-semibold">Average Rating</h3>
                     <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full">
                        <div className="bg-green-500 h-1.5 md:h-2 rounded-full" style={{ width: '100%' }}></div>
                     </div>
                  </div>
                  <div className="rating-metric">
                     <h3 className="text-base md:text-lg font-semibold">Recency</h3>
                     <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full">
                        <div className="bg-green-500 h-1.5 md:h-2 rounded-full" style={{ width: '100%' }}></div>
                     </div>
                  </div>
                  <div className="rating-metric">
                     <h3 className="text-base md:text-lg font-semibold">Reputation</h3>
                     <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full">
                        <div className="bg-green-500 h-1.5 md:h-2 rounded-full" style={{ width: '100%' }}></div>
                     </div>
                  </div>
                  <div className="rating-metric">
                     <h3 className="text-base md:text-lg font-semibold">Responsiveness</h3>
                     <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full">
                        <div className="bg-green-500 h-1.5 md:h-2 rounded-full" style={{ width: '100%' }}></div>
                     </div>
                  </div>
               </div>

               {/* Third Column */}
               <div className="space-y-2 md:space-y-3">
                  <div className="rating-scale">
                     <h3 className="text-base md:text-lg font-semibold">Great</h3>
                     <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full">
                        <div className="bg-green-500 h-1.5 md:h-2 rounded-full" style={{ width: '100%' }}></div>
                     </div>
                     <span className="text-sm md:text-md font-bold">100%</span>
                  </div>
                  <div className="rating-scale">
                     <h3 className="text-base md:text-lg font-semibold">Average</h3>
                     <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full">
                        <div className="bg-yellow-500 h-1.5 md:h-2 rounded-full" style={{ width: '2%' }}></div>
                     </div>
                     <span className="text-sm md:text-md font-bold">2%</span>
                  </div>
                  <div className="rating-scale">
                     <h3 className="text-base md:text-lg font-semibold">Poor</h3>
                     <div className="w-full bg-gray-300 h-1.5 md:h-2 rounded-full">
                        <div className="bg-red-500 h-1.5 md:h-2 rounded-full" style={{ width: '0%' }}></div>
                     </div>
                     <span className="text-sm md:text-md font-bold">0%</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Gallery;
