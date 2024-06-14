import React from 'react';
import { Card } from 'flowbite-react';
import { FaBuilding, FaHome, FaIndustry } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import ScheduleFreeQuote from '../ScheduleFreeQuote';

export default function HeaderSubServicesAndContactUs({
   Heading,
   Subheading,
   SubServicesHeading,
   SubService1,
   SubService1Context,
   SubService2,
   SubService2Context,
   SubService3,
   SubService3Context,
}) {
   const { ref: residentialRef, inView: residentialInView } = useInView({ triggerOnce: true });
   const { ref: commercialRef, inView: commercialInView } = useInView({ triggerOnce: true });
   const { ref: industrialRef, inView: industrialInView } = useInView({ triggerOnce: true });
   const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true });

   return (
      <div className="bg-gray-50 pb-12">
         {/* Hero Section */}
         <div className="relative bg-gray-800 text-white py-20 mb-12" style={{ backgroundImage: 'url(https://source.unsplash.com/featured/?concrete)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h1 className="text-6xl font-extrabold mb-4">{Heading}</h1>
               <p className="text-xl mb-6">{Subheading}</p>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Our Services</h2>
               <p className="text-xl text-gray-600">{SubServicesHeading}</p>
            </div>

            <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Residential Services */}
               {SubService1 && (
                  <div ref={residentialRef} className={`transition-transform transform ${residentialInView ? 'translate-y-0' : '-translate-y-20'} opacity-${residentialInView ? '100' : '0'}`}>
                     <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center p-6">
                           <FaHome className="text-blue-500 text-5xl" />
                        </div>
                        <div className="p-6">
                           <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{SubService1}</h3>
                           <p className="text-gray-600 text-center">{SubService1Context}</p>
                        </div>
                     </Card>
                  </div>
               )}

               {/* Commercial Services */}
               {SubService2 && (
                  <div ref={commercialRef} className={`transition-transform transform ${commercialInView ? 'translate-y-0' : '-translate-y-20'} opacity-${commercialInView ? '100' : '0'}`}>
                     <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center p-6">
                           <FaBuilding className="text-blue-500 text-5xl" />
                        </div>
                        <div className="p-6">
                           <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{SubService2}</h3>
                           <p className="text-gray-600 text-center">{SubService2Context}</p>
                        </div>
                     </Card>
                  </div>
               )}

               {/* Industrial Services */}
               {SubService3 && (
                  <div ref={industrialRef} className={`transition-transform transform ${industrialInView ? 'translate-y-0' : '-translate-y-20'} opacity-${industrialInView ? '100' : '0'}`}>
                     <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center p-6">
                           <FaIndustry className="text-blue-500 text-5xl" />
                        </div>
                        <div className="p-6">
                           <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{SubService3}</h3>
                           <p className="text-gray-600 text-center">{SubService3Context}</p>
                        </div>
                     </Card>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
