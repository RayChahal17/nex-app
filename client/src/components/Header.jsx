import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import nex_logo from '../assets/images/nex1.png';
import Wrapper from '../wrappers/HeaderWrapper';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
   const path = useLocation().pathname;
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.user);
   const theme = useSelector((state) => state.theme.theme);
   const [searchTerm, setSearchTerm] = useState('');
   const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

   const avatarLabel = currentUser?.username?.charAt(0).toUpperCase() || 'U';

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
         setSearchTerm(searchTermFromUrl);
      }
   }, [location.search]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
   };

   const handleSignOut = async () => {
      try {
         const res = await fetch('/api/user/signout', {
            method: 'POST',
         });
         const data = await res.json();
         if (!res.ok) {
            // handle error
         } else {
            dispatch(signoutSuccess());
            navigate('/');
         }
      } catch (error) {
         // handle error
      }
   };

   const toggleServicesDropdown = (e) => {
      e.stopPropagation();
      setServicesDropdownOpen(!servicesDropdownOpen);
   };

   return (
      <Wrapper>
         <Navbar className='border-b-2'>
            <Link to='/' className='logoWrapper'>
               <img alt='Edurayte Logo' src={nex_logo} className="h-10" />
            </Link>
            <form onSubmit={handleSubmit} className='hidden lg:flex'>
               <TextInput
                  type='text'
                  placeholder='Search...'
                  icon={AiOutlineSearch}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </form>
            <Button className='w-12 h-10 sm:hidden' color='gray' pill onClick={() => dispatch(toggleTheme())}>
               {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>
            <div className='flex gap-2 md:order-2'>
               <Button className='w-12 h-12 hidden sm:inline-block' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                  {theme === 'light' ? <FaSun /> : <FaMoon />}
               </Button>
               {currentUser ? (
                  <Dropdown
                     arrowIcon={false}
                     inline
                     label={
                        <div className='flex ml-5 justify-center items-center rounded-full w-12 h-12 bg-gradient-to-r shadow-md from-green-500 to-lime-400 text-white font-bold text-2xl cursor-pointer'>
                           {avatarLabel}
                        </div>
                     }
                     className="bg-white bg-opacity-90"
                  >
                     <Dropdown.Header>
                        <span className='block text-sm text-center truncate text-yellow-500 font-bold'>
                           {currentUser.username}
                        </span>
                        <span className='block text-sm text-center font-normal truncate text-yellow-500'>
                           {currentUser.email}
                        </span>
                     </Dropdown.Header>
                     <Link to='/dashboard?tab=profile'><Dropdown.Item className="hover:text-primary-600 dark:hover:text-primary-500">Profile</Dropdown.Item></Link>
                     <Dropdown.Divider />
                     <Dropdown.Item onClick={handleSignOut} className="hover:text-primary-600 dark:hover:text-primary-500">Sign out</Dropdown.Item>
                  </Dropdown>
               ) : (
                  <Link to='/sign-in'>
                     <Button gradientDuoTone='tealToLime' outline>
                        Sign In
                     </Button>
                  </Link>
               )}

               <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
               <Navbar.Link>
                  <Link to='/' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                     Home
                  </Link>
               </Navbar.Link>
               <Navbar.Link>
                  <Link to='/about' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                     About
                  </Link>
               </Navbar.Link>
               <Navbar.Link>
                  <div className="relative">
                     <button onClick={toggleServicesDropdown} className="block  hover:bg-gray-100 cursor-pointer">
                        Services
                     </button>
                     {servicesDropdownOpen && (
                        <div className='absolute left-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 text-sm'>
                        <ul className='py-4 px-4 grid grid-cols-1 lg:grid-cols-3 gap-2 cursor-pointer '>
                              <div className="space-y-4">
                                 <li>
                                    <Link to='/concrete' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Concrete Builds
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to='/interlock-services' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Interlocks Services
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to='/retaining-walls' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Retaining Walls
                                    </Link>
                                 </li>
                              </div>
                              <div className="space-y-4">
                                 <li>
                                    <Link to='/wood-decks' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Wood Decks
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to='/fences' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Fences
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to='/kitchen-renovations' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Kitchen Renovations
                                    </Link>
                                 </li>
                              </div>
                              <div className="space-y-4">
                                 <li>
                                    <Link to='/basement-renovations' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Basement Renovations
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to='/bathroom-renovations' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Bathroom Renovations
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to='/custom-landscapes' className="block px-4 py-2 hover:text-primary-600 dark:hover:text-primary-500 cursor-pointer">
                                       Custom Landscapes
                                    </Link>
                                 </li>
                              </div>
                           </ul>
                        </div>
                     )}
                  </div>
               </Navbar.Link>
               <Navbar.Link>
                  <Link to='/gallery' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                     Gallery
                  </Link>
               </Navbar.Link>
               <Navbar.Link>
                  <Link to='/testimonials' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                     Testimonials
                  </Link>
               </Navbar.Link>
               <Navbar.Link>
                  <Link to='/get-a-free-estimate' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                     <span className='text-green-500 font-bold tracking-wide subpixel-antialiased'>Get a free Estimate</span>
                  </Link>
               </Navbar.Link>
            </Navbar.Collapse>
         </Navbar>
      </Wrapper>
   );
}
