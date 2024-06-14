import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAppointments from '../components/DashAppointments';
import DashBusyTimesManager from '../components/DashBusyTimeManager';

export default function Dashboard() {
   const location = useLocation();
   const [tab, setTab] = useState('');
   
   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
         setTab(tabFromUrl);
      }
   }, [location.search]);

   return (
      <div className='min-h-screen flex flex-col md:flex-row'>
         <div className='md:w-56'>
            <DashSidebar/>
         </div>
         <div className='flex-1 p-4'>
            {tab === 'profile' && <DashProfile />}
            {tab === 'appointments' && <DashAppointments />}
            {tab === 'busy-times' && <DashBusyTimesManager />}
         </div>
      </div>
   );
}
