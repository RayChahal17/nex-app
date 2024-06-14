import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Table, Button, Spinner, Alert, TextInput } from 'flowbite-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

const fetchAllAppointmentsCollected = async (setBusyTimeRanges, setLoading) => {
   setLoading(true);
   try {
      const response = await fetch('/api/all-appointments-collected');
      if (!response.ok) {
         throw new Error(`Server responded with status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
         const busyTimeRanges = data.appointments.reduce((acc, appointment) => {
            const dateKey = appointment.date;
            acc[dateKey] = appointment.appointments.map(({ start, end }) => ({
               start: DateTime.fromISO(start),
               end: DateTime.fromISO(end),
            }));
            return acc;
         }, {});
         setBusyTimeRanges(busyTimeRanges);
      } else {
         throw new Error(`Error fetching data: ${data.message}`);
      }
   } catch (error) {
      console.error('Error fetching busy time ranges:', error);
   } finally {
      setLoading(false);
   }
};

const shouldDisableSlot = (date, hour, busyTimeRanges) => {
   const dateKey = date.toFormat('yyyy-MM-dd');
   const start = date.set({ hour }).toISO();
   const end = date.set({ hour: hour + 1 }).toISO();

   if (busyTimeRanges[dateKey]) {
      return busyTimeRanges[dateKey].some(range => {
         const rangeStart = DateTime.fromISO(range.start);
         const rangeEnd = DateTime.fromISO(range.end);
         return (DateTime.fromISO(start) >= rangeStart && DateTime.fromISO(start) < rangeEnd) ||
            (DateTime.fromISO(end) > rangeStart && DateTime.fromISO(end) <= rangeEnd);
      });
   }

   return false;
};

const DashBusyTimesManager = () => {
   const [busyTimeRanges, setBusyTimeRanges] = useState({});
   const [selectedDate, setSelectedDate] = useState(DateTime.now());
   const [busyDetails, setBusyDetails] = useState({ reason: '' });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetchAllAppointmentsCollected(setBusyTimeRanges, setLoading);
   }, []);

   const handleAddBusyTime = async (hour) => {
      const start = selectedDate.set({ hour }).toISO();
      const end = selectedDate.set({ hour: hour + 1 }).toISO();

      try {
         const response = await fetch('/api/all-appointments-collected/add-busy-time', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               date: selectedDate.toISODate(),
               timeSlots: [{ start, end }],
               reason: busyDetails.reason || 'Busy Time'
            }),
         });

         if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Error adding busy time: ${errorDetails.message}`);
         }

         fetchAllAppointmentsCollected(setBusyTimeRanges, setLoading);
         setBusyDetails({ reason: '' });
      } catch (err) {
         setError(err.message);
      }
   };

   const handleDateChange = (days) => {
      const newDate = selectedDate.plus({ days });
      const today = DateTime.now();
      const maxDate = today.plus({ days: 60 });

      if (newDate >= today.startOf('day') && newDate <= maxDate.endOf('day')) {
         setSelectedDate(newDate);
      }
   };

   const renderTimeSlots = (date) => {
      const hours = Array.from({ length: 12 }, (_, i) => 10 + i);

      return hours.map(hour => (
         <Button
            key={hour}
            onClick={() => handleAddBusyTime(hour)}
            disabled={shouldDisableSlot(date, hour, busyTimeRanges)}
            className="m-2"
         >
            {date.set({ hour }).toFormat('h a')}
         </Button>
      ));
   };

   if (loading) return <Spinner size="lg" />;
   if (error) return <Alert color="failure">{error}</Alert>;

   return (
      <div className="p-4 w-full">
         <h1 className="text-2xl font-bold mb-4">Manage Busy Times</h1>

         <div className="flex justify-between items-center mb-4 space-x-4">
            <Button onClick={() => handleDateChange(-1)} className="p-2">Previous Day</Button>
            <h2 className="text-2xl font-semibold">{selectedDate.toFormat('MMMM dd, yyyy')}</h2>
            <Button onClick={() => handleDateChange(1)} className="p-2">Next Day</Button>
         </div>
         <div className='w-full h-full flex justify-center align-center '>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-xl">
               {renderTimeSlots(selectedDate)}
            </div>
         </div>


         <div className="mt-6">
            <TextInput
               id="reason"
               type="text"
               placeholder="Reason for busyness"
               value={busyDetails.reason}
               onChange={(e) => setBusyDetails({ ...busyDetails, reason: e.target.value })}
               required
            />
         </div>
      </div>
   );
};

export default DashBusyTimesManager;
