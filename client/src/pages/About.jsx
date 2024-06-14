import React from 'react';
import { Card, Button } from 'flowbite-react';
import { useInView } from 'react-intersection-observer';
import { FaTools, FaLightbulb, FaSmile, FaHandshake } from 'react-icons/fa';
import ScheduleFreeQuote from '../components/ScheduleFreeQuote';
import ImageLayoutGridComponent from '../components/ui/ImageLayoutGridComponent';

import aboutUsImg from '../assets/images/concrete1.webp';
import missionImg from '../assets/images/mission2.jpg';
import a from '../assets/images/h.jpeg';
import b from '../assets/images/b.jpeg';
import c from '../assets/images/c.jpeg';
import d from '../assets/images/d.jpeg';

const About = () => {
   const { ref: storyRef, inView: storyInView } = useInView({ triggerOnce: true });
   const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true });
   const { ref: valuesRef, inView: valuesInView } = useInView({ triggerOnce: true });
   const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true });
   const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true });

   return (
      <div className="bg-gray-50 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-5xl font-extrabold text-gray-800 mb-4">About Us</h2>
            </div>

            <div className="mb-16" ref={storyRef}>
               <Card className={`transition-transform transform ${storyInView ? 'translate-y-0' : '-translate-y-20'} opacity-${storyInView ? '100' : '0'}`}>
                  <img src={aboutUsImg} alt="Our Story" />
                  <div className="p-6">
                     <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h3>
                     <p className="text-gray-600">
                        NexRenovations was founded with a vision to revolutionize the concrete industry. Our journey began with a small team of dedicated professionals who shared a common goal: to deliver top-tier concrete services with unparalleled precision and creativity. Over the years, we've grown into a renowned company, trusted by clients for our unwavering commitment to quality and innovation.
                     </p>
                  </div>
               </Card>
            </div>

            <div className="mb-16" ref={missionRef}>
               <Card className={`transition-transform transform ${missionInView ? 'translate-y-0' : '-translate-y-20'} opacity-${missionInView ? '100' : '0'}`}>
                  <div className="p-6">
                     <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                     <p className="text-gray-600">
                        Our mission is simple: to transform spaces and exceed expectations through innovative concrete solutions. We strive to deliver excellence in every project, ensuring that our clients receive the highest quality craftsmanship and the latest in concrete technology.
                     </p>
                  </div>
                  <img src={missionImg} alt="Our Mission" className="rounded-b-lg w-full" />
               </Card>
            </div>

            <div className="relative bg-gray-800 text-white py-20 mb-12">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="md:text-6xl text-2xl font-extrabold mb-4 text-green-600">NexRenovations</h1>
                  <p className="text-xl mb-6 text-green-500">Innovate. Renovate. Elevate.</p>
               </div>
            </div>

            <div className="mb-16" ref={valuesRef}>
               <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Values</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                     { icon: FaTools, title: 'Quality', description: 'We are committed to delivering the highest standards of quality in every project.' },
                     { icon: FaLightbulb, title: 'Innovation', description: 'Embracing the latest technologies and techniques, we continually seek new ways to improve and innovate.' },
                     { icon: FaSmile, title: 'Customer Satisfaction', description: 'Our clients are at the heart of everything we do. We believe in building strong, lasting relationships through open communication, reliability, and exceptional service.' },
                     { icon: FaHandshake, title: 'Integrity', description: 'Honesty and transparency are the cornerstones of our business.' },
                  ].map((value, index) => (
                     <Card key={index} className={`transition-transform transform ${valuesInView ? 'translate-y-0' : '-translate-y-20'} opacity-${valuesInView ? '100' : '0'}`}>
                        <div className="p-6 text-center">
                           <value.icon className="text-blue-500 text-5xl mx-auto mb-4" />
                           <h4 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h4>
                           <p className="text-gray-600">{value.description}</p>
                        </div>
                     </Card>
                  ))}
               </div>
            </div>

            <div className="mb-16" ref={servicesRef}>
               <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Services</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                  <div className={`transition-transform transform ${servicesInView ? 'translate-y-0' : '-translate-y-20'} opacity-${servicesInView ? '100' : '0'}`}>
                     <h4 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h4>
                     <p className="text-gray-600">
                        At NexRenovations, we offer a comprehensive range of concrete services tailored to meet the unique needs of each client. Our expertise spans residential, commercial, and industrial projects, ensuring that we can handle any challenge with confidence and skill.
                     </p>
                  </div>
                  <ul className={`transition-transform transform ${servicesInView ? 'translate-y-0' : '-translate-y-20'} opacity-${servicesInView ? '100' : '0'}`}>
                     {['Residential Concrete Solutions', 'Commercial Concrete Services', 'Industrial Concrete Applications'].map((service, index) => (
                        <li key={index} className="mb-4">
                           <div className="flex items-center justify-center text-center">
                              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                 {index + 1}
                              </div>
                              <p className="text-gray-800">{service}</p>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="mb-16" ref={contactRef}>
               <Card className={`transition-transform transform ${contactInView ? 'translate-y-0' : '-translate-y-20'} opacity-${contactInView ? '100' : '0'}`}>
                  <div className="p-6 text-center">
                     <h3 className="text-3xl font-bold text-gray-800 mb-4">Let's Schedule a free estimate for you.</h3>
                     <p className="text-gray-600 mb-8">
                        Ready to transform your space with NexRenovations? Contact us today to discuss your project and discover how we can bring your vision to life.
                     </p>
                     <ScheduleFreeQuote />
                  </div>
               </Card>
            </div>

            <div className="mb-0" ref={contactRef}>
               <Card className={`transition-transform transform ${contactInView ? 'translate-y-0' : '-translate-y-20'} opacity-${contactInView ? '100' : '0'}`}>
                  <ImageLayoutGridComponent
                     heading="Stunning Nex-Renovations Projects"
                     context="Explore our diverse range of concrete projects that showcase our commitment to quality and innovation"
                     image1={a}
                     image2={b}
                     image3={c}
                     image4={d}
                     title1="House above the clouds"
                     description1="Perched high above the world, this house offers breathtaking views and a unique living experience. It&apos;s a place where the sky meets home, and tranquility is a way of life."
                     title2="Greens all over"
                     description2="A house surrounded by greenery and nature&apos;s beauty. It&apos;s the perfect place to relax, unwind, and enjoy life."
                     title3="Rivers are serene"
                     description3="A house by the river is a place of peace and tranquility. It&apos;s the perfect place to relax, unwind, and enjoy life."
                     title4="House in the woods"
                     description4="A serene and tranquil retreat, this house in the woods offers a peaceful escape from the hustle and bustle of city life."
                  />
               </Card>
            </div>
         </div>
      </div>
   );
};

export default About;
