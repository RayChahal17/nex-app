import React from 'react';
import { Card } from 'flowbite-react';
import { useInView } from 'react-intersection-observer';
import ScheduleFreeQuote from '../ScheduleFreeQuote';

const BookEstimateAppointment = () => {
   const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true });

   return (
      <div className="mb-16" ref={contactRef}>
         <Card className={`transition-transform transform ${contactInView ? 'translate-y-0' : '-translate-y-20'} opacity-${contactInView ? '100' : '0'}`}>
            <div className="p-6 text-center">
               <h3 className="text-3xl font-bold text-gray-800 mb-4">Book Appointment for a free Estimate</h3>
               <p className="text-gray-600 mb-8">
                  Ready to transform your space with NexRenovations? Contact us today to discuss your project and discover how we can bring your vision to life.
               </p>
               <ScheduleFreeQuote />
            </div>
         </Card>
      </div>
   );
};

export default BookEstimateAppointment;
