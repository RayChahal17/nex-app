import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiUser, HiLogout, HiCalendar, HiOutlineCalculator, HiClipboardList, HiOutlineDocumentText, HiOutlineBriefcase } from 'react-icons/hi';
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
                     <Sidebar.Item active={tab === 'appointments'} icon={HiCalendar}>
                        Appointments
                     </Sidebar.Item>
                  </Link>
               )}

               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=busy-times">
                     <Sidebar.Item active={tab === 'busy-times'} icon={HiOutlineDocumentText}>
                        Busy Times
                     </Sidebar.Item>
                  </Link>
               )}
               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=calc-estimate">
                     <Sidebar.Item active={tab === 'calc-estimate'} icon={HiOutlineCalculator}>
                        Calculate Estimate
                     </Sidebar.Item>
                  </Link>
               )}
               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=cost-calculator">
                     <Sidebar.Item active={tab === 'cost-calculator'} icon={HiClipboardList}>
                        Cost Calculator
                     </Sidebar.Item>
                  </Link>
               )}
               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=show-calc-estimates">
                     <Sidebar.Item active={tab === 'show-calc-estimates'} icon={HiClipboardList}>
                        Show Estimates
                     </Sidebar.Item>
                  </Link>
               )}
               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=schedule-jobs">
                     <Sidebar.Item active={tab === 'schedule-jobs'} icon={HiOutlineBriefcase}>
                        Jobs Scheduler
                     </Sidebar.Item>
                  </Link>
               )}
               {currentUser && currentUser.isAdmin && (
                  <Link to="/dashboard?tab=manage-current-jobs">
                     <Sidebar.Item active={tab === 'manage-current-jobs'} icon={HiClipboardList}>
                        Current Jobs Manager
                     </Sidebar.Item>
                  </Link>
               )}
               
               
               <Sidebar.Item onClick={handleSignOut} icon={HiLogout} className="cursor-pointer">
                  Sign Out
               </Sidebar.Item>
            </Sidebar.ItemGroup>
         </Sidebar.Items>
      </Sidebar>
   );
}
