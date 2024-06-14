import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText, HiClock } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
   const { currentUser } = useSelector((state) => state.user);
   const location = useLocation();
   const [tab, setTab] = useState('');
   const dispatch = useDispatch();

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
         setTab(tabFromUrl);
      }
   }, [location.search]);

   const handleSignOut = async () => {
      try {
         const res = await fetch('/api/user/signout', {
            method: 'POST',
         });
         const data = await res.json();
         if (!res.ok) {
            console.log(data.message);
         } else {
            dispatch(signoutSuccess());
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <Sidebar className="w-full md:w-56">
         <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
               <Link to="/dashboard?tab=profile">
                  <Sidebar.Item active={tab === 'profile'} icon={HiUser}>
                     Profile
                  </Sidebar.Item>
               </Link>

               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=appointments">
                     <Sidebar.Item active={tab === 'appointments'} icon={HiDocumentText}>
                        Appointments
                     </Sidebar.Item>
                  </Link>
               )}

               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=busy-times">
                     <Sidebar.Item active={tab === 'busy-times'} icon={HiClock}>
                        Busy Times
                     </Sidebar.Item>
                  </Link>
               )}
               <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className="cursor-pointer">
                  Sign Out
               </Sidebar.Item>
            </Sidebar.ItemGroup>
         </Sidebar.Items>
      </Sidebar>
   );
}
