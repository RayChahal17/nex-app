import React from 'react';
import { Footer } from 'flowbite-react';
import { FaFacebook, FaTwitter, FaInstagram, FaTools, FaBlog, FaLightbulb, FaHandSparkles, FaPhone, FaInfoCircle, FaHandshake, FaQuestionCircle, FaUserShield, FaRegAddressBook, FaClipboardList, FaRegCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
   return (
      <Footer container={true} className="w-full p-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-50">
         <div className="w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-6">
               <div>
                  <Footer.Title title="Company" className="text-2xl font-bold mb-4" />
                  <Footer.LinkGroup col={true}>
                     <Link to='/about' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaInfoCircle className="mr-2" /> About Us
                     </Link>
                     <Link to='/contact' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaPhone className="mr-2" /> Contact Us
                     </Link>
                     <Link to='/privacy-policy' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaUserShield className="mr-2" /> Privacy Policy & Terms of Service
                     </Link>
                     <Link to='/pricing' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaClipboardList className="mr-2" /> See Pricing & Plans
                     </Link>
                     <Link to='/reviews' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaRegCommentDots className="mr-2" /> Reviews
                     </Link>
                     <Link to='/faq' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaQuestionCircle className="mr-2" /> FAQ
                     </Link>
                  </Footer.LinkGroup>
               </div>
               <div>
                  <Footer.Title title="Nex-Renovations Services" className="text-2xl font-bold mb-4" />
                  <Footer.LinkGroup col={true}>
                     <Link to='/concrete' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Concrete Builds
                     </Link>
                     <Link to='/interlock-services' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Interlocks Driveways
                     </Link>
                     {/* <Link to='/stone-walkways' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Stone Walkways
                     </Link> */}
                     <Link to='/retaining-walls' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Retaining Walls
                     </Link>
                     <Link to='/wood-decks' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Wood Decks
                     </Link>
                     <Link to='/fences' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Fences
                     </Link>
                     <Link to='/kitchen-renovations' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Kitchen Renovations
                     </Link>
                     {/* <Link to='/home-additions' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Home Additions
                     </Link> */}
                     <Link to='/basement-renovations' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Basement Renovations
                     </Link>
                     <Link to='/bathroom-renovations' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Bathroom Renovations
                     </Link>
                     <Link to='/custom-landscapes' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Custom Landscapes
                     </Link>
                     {/* <Link to='/custom-pools-spas' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaTools className="mr-2" /> Custom Pools & Spas
                     </Link> */}
                  </Footer.LinkGroup>
               </div>
               <div>
                  <Footer.Title title="Knowledge Center" className="text-2xl font-bold mb-4" />
                  <Footer.LinkGroup col={true}>
                     <Link to='/blog' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaBlog className="mr-2" /> Blog
                     </Link>
                     <Link to='/free-tips' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaLightbulb className="mr-2" /> Free Tips
                     </Link>
                     <Link to='/project-ideas' className="flex items-center hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out">
                        <FaHandSparkles className="mr-2" /> Project Ideas
                     </Link>
                  </Footer.LinkGroup>
               </div>
               <div>
                  <Footer.Title title="Connect With Us" className="text-2xl font-bold mb-4" />
                  <Footer.LinkGroup col={true}>
                     <a href="https://www.facebook.com" className="hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out" target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                           <FaFacebook className="w-5 h-5 text-gray-100" />
                           <span className="ml-2">Facebook</span>
                        </div>
                     </a>
                     <a href="https://www.twitter.com" className="hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out" target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                           <FaTwitter className="w-5 h-5 text-gray-100" />
                           <span className="ml-2">Twitter</span>
                        </div>
                     </a>
                     <a href="https://www.instagram.com" className="hover:text-primary-600 dark:hover:text-primary-500 hover:scale-105 transform transition duration-300 ease-in-out" target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                           <FaInstagram className="w-5 h-5 text-gray-100" />
                           <span className="ml-2">Instagram</span>
                        </div>
                     </a>
                  </Footer.LinkGroup>
               </div>
            </div>
            <div className="w-full py-6 bg-gray-800 text-center">
               <p className="text-gray-400">© {new Date().getFullYear()} NexRenovations. All rights reserved.</p>
            </div>
         </div>
      </Footer>
   );
}

export default FooterComponent;
