import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAppointments from '../components/DashAppointments';
import DashBusyTimesManager from '../components/DashBusyTimeManager';
import CalcEstimate from '../components/CalcEstimate';
import SubmitCalcEstimate from '../components/SubmitCalcEstimate';
import ShowCalcEstimates from '../components/ShowCalcEstimates';
import ManageCurrentJobs from '../components/DashManageCurrentJobs';
import ScheduleJobs from '../components/DashScheduleJobs';
import DashCostCalculator from '../components/DashCostCalculator';

export default function Dashboard() {
   const location = useLocation();
   const [tab, setTab] = useState('');
   const [submittedData, setSubmittedData] = useState(null);

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
         setTab(tabFromUrl);
      }
   }, [location.search]);

   const renderContent = () => {
      if (tab === 'profile') return <DashProfile />;
      if (tab === 'appointments') return <DashAppointments />;
      if (tab === 'busy-times') return <DashBusyTimesManager />;
      if (tab === 'calc-estimate') {
         return submittedData ? (
            <SubmitCalcEstimate formData={submittedData} setSubmittedData={setSubmittedData} />
         ) : (
            <CalcEstimate setSubmittedData={setSubmittedData} initialData={submittedData} />
         );
      }
      if (tab === 'show-calc-estimates') return <ShowCalcEstimates />;
      if (tab === 'schedule-jobs') return <ScheduleJobs/>;
      if (tab === 'manage-current-jobs') return <ManageCurrentJobs/>;
      if (tab === 'cost-calculator') return <DashCostCalculator/>;



      return <div>Welcome to your dashboard!</div>;

   
   };

   return (
      <div className="min-h-screen flex flex-col md:flex-row">
         <div className="md:w-56">
            <DashSidebar />
         </div>
         <div className="flex-1 p-4">{renderContent()}</div>
      </div>
   );
}
