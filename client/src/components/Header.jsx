import { Avatar, Button, Dropdown, MegaMenu, Navbar, TextInput } from 'flowbite-react';
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

   return (
      <Wrapper>
         <Navbar className='border-b-2'>
            <Link to='/' className='logoWrapper'>
               <img alt='Edurayte Logo' src={nex_logo}></img>
            </Link>
            <form onSubmit={handleSubmit}>
               <TextInput
                  type='text'
                  placeholder='Search...'
                  rightIcon={AiOutlineSearch}
                  className='hidden lg:inline cursor-pointer'
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
                        <div className='flex ml-5 justify-center items-center rounded-full w-12 h-12 bg-gradient-to-r shadow-md shadow-lime-100 hover:shadow-lime-300 from-green-500 to-lime-400 text-white font-bold text-2xl cursor-pointer'>
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
                  <MegaMenu.Dropdown toggle={<span className="cursor-pointer">Services</span>} className="bg-white bg-opacity-90 cursor-pointer">
                     <ul className="grid grid-cols-3">
                        <div className="space-y-4 p-4">
                           <li>
                              <Link to='/concrete' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Concrete Builds
                              </Link>
                           </li>
                           <li>
                              <Link to='/interlock-services' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Interlocks Services
                              </Link>
                           </li>
                           {/* <li>
                              <Link to='/stone-walkways' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Stone Walkways
                              </Link>
                           </li> */}
                           <li>
                              <Link to='/retaining-walls' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Retaining Walls
                              </Link>
                           </li>
                        </div>
                        <div className="space-y-4 p-4">
                           <li>
                              <Link to='/wood-decks' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Wood Decks
                              </Link>
                           </li>
                           <li>
                              <Link to='/fences' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Fences
                              </Link>
                           </li>
                           <li>
                              <Link to='/kitchen-renovations' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Kitchen Renovations
                              </Link>
                           </li>
                           {/* <li>
                              <Link to='/home-additions' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Home Additions
                              </Link>
                           </li> */}
                        </div>
                        <div className="space-y-4 p-4">
                           <li>
                              <Link to='/basement-renovations' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Basement Renovations
                              </Link>
                           </li>
                           <li>
                              <Link to='/bathroom-renovations' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Bathroom Renovations
                              </Link>
                           </li>
                           <li>
                              <Link to='/custom-landscapes' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Custom Landscapes
                              </Link>
                           </li>
                           {/* <li>
                              <Link to='/custom-pools-spas' className="transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-500 hover:underline cursor-pointer">
                                 Custom Pools & Spas
                              </Link>
                           </li> */}
                        </div>
                     </ul>
                  </MegaMenu.Dropdown>
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
