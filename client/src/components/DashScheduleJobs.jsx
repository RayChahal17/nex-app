import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Textarea, TextInput, Spinner } from 'flowbite-react';
import { DateTime } from 'luxon';
import { WiThermometer, WiRain, WiSnow, WiStrongWind, WiHumidity } from 'react-icons/wi';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

export default function ScheduleJobs() {
   const [jobs, setJobs] = useState([]);
   const [selectedJob, setSelectedJob] = useState(null);
   const [selectedDate, setSelectedDate] = useState(null);
   const [selectedTime, setSelectedTime] = useState('');
   const [taskNote, setTaskNote] = useState('');
   const [tasks, setTasks] = useState([]);
   const [notes, setNotes] = useState('');
   const [weatherData, setWeatherData] = useState({});
   const [modalOpen, setModalOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [currentStartDate, setCurrentStartDate] = useState(new Date());
   const [sortOption, setSortOption] = useState('nearest');
   const [showOldJobs, setShowOldJobs] = useState(false);
   const [filterOption, setFilterOption] = useState('all');
   const [cityFilter, setCityFilter] = useState('');
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [jobToDelete, setJobToDelete] = useState(null);
   const [weatherModalOpen, setWeatherModalOpen] = useState(false);
   const [weatherModalData, setWeatherModalData] = useState({ date: '', city: '' });
   const [unassignedJobs, setUnassignedJobs] = useState([]);

   const { t } = useTranslation();

   const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      setIsLoading(true); // Mark as loading when language is changed
   };


   useEffect(() => {
      fetchJobs();
   }, []);

   const fetchJobs = async () => {
      setLoading(true);
      try {
         const response = await fetch('/api/current-jobs');
         const data = await response.json();
         console.log('Fetched jobs data:', data);
         setJobs(data.jobs);

         // Compute unassignedJobs after jobs are fetched
         const filteredUnassignedJobs = data.jobs.filter(job => {
            const isUnassigned = job.schedule.length === 0;
            const isNotCompleted = job.status !== 'Job Completed';
            return isUnassigned && isNotCompleted;
         });

         setUnassignedJobs(filteredUnassignedJobs);

         const today = new Date();
         const nextSixDays = Array.from({ length: 5 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return date.toISOString().split('T')[0];
         });

         nextSixDays.forEach(date => {
            const job = data.jobs.find(job => job.schedule.some(entry => entry.date === date));
            const city = job ? job.customerInfo.city : 'Brampton';
            fetchWeatherData(city);
         });
      } catch (error) {
         console.error('Error fetching jobs:', error);
      } finally {
         setLoading(false);
      }
   };


   const handleShowWeatherClick = (date, city) => {
      setWeatherModalData({ date, city });
      setWeatherModalOpen(true);
   };

   const handleDateClick = (date) => {
      setSelectedDate(date);
      setSelectedTime('');
      setTasks([]);
      setNotes([]);
      setModalOpen(true);

      const jobScheduled = jobs.find(job => job.schedule?.some(entry => entry.date === date));
      if (jobScheduled) {
         const scheduleEntry = jobScheduled.schedule.find(entry => entry.date === date);
         console.log("Schedule entry on date click:", scheduleEntry);
         setSelectedJob(jobScheduled);
         setSelectedTime(scheduleEntry.time);
         setTasks(scheduleEntry.tasks || []);
         setNotes(scheduleEntry.notes || []);
         fetchWeatherData(jobScheduled.customerInfo.city); // Fetch weather data for the job's city
      } else {
         setSelectedJob(null);
         fetchWeatherData('Brampton'); // Default to Brampton if no job is scheduled
      }
   };


   const fetchWeatherData = async (city) => {
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      if (!apiKey) {
         console.error('API key is missing');
         return;
      }
      try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},CA&appid=${apiKey}&units=metric`);
         const data = await response.json();
         console.log(`Fetched weather data for ${city}:`, data);

         const groupedData = data.list.reduce((acc, entry) => {
            const date = entry.dt_txt.split(' ')[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push({
               time: entry.dt_txt,
               temp: entry.main.temp,
               description: entry.weather[0].description,
               rain: entry.rain ? entry.rain['3h'] : 0,
               snow: entry.snow ? entry.snow['3h'] : 0,
            });
            return acc;
         }, {});

         setWeatherData(prevData => ({
            ...prevData,
            ...groupedData
         }));
      } catch (error) {
         console.error('Error fetching weather data:', error);
      }
   };




   const handleJobSelect = (jobId) => {
      const job = jobs.find(j => j._id === jobId);
      console.log("Selected job:", job);
      setSelectedJob(job);
      if (selectedTime) {
         const scheduleEntry = job.schedule?.find(entry => entry.date === selectedDate && entry.time === selectedTime);
         console.log("Selected job schedule entry:", scheduleEntry);
         setTasks(scheduleEntry?.tasks || []);
         setNotes(scheduleEntry?.notes || []);
      }
   };

   const handleTimeSelect = (time) => {
      setSelectedTime(time);
      if (selectedJob) {
         const scheduleEntry = selectedJob.schedule.find(entry => entry.date === selectedDate && entry.time === time);
         console.log("Selected time schedule entry:", scheduleEntry);
         setTasks(scheduleEntry?.tasks || []);
         setNotes(scheduleEntry?.notes || []);
      }
   };



   const addTask = () => {
      if (taskNote.trim()) {
         setTasks([...tasks, { description: taskNote, status: 'to be done' }]);
         setTaskNote('');
      }
   };

   // const addChecklist = () => {
   //    if (checklistNote.trim()) {
   //       setChecklists([...checklists, { description: checklistNote, checked: false }]);
   //       setChecklistNote('');
   //    }
   // };

   const saveSchedule = async () => {
      const newEntry = {
         date: selectedDate,
         time: selectedTime,
         tasks,
         notes: typeof notes === 'string' ? [notes] : notes, // Ensure notes is an array
      };

      const updatedSchedule = selectedJob.schedule?.filter(entry => !(entry.date === selectedDate && entry.time === selectedTime)) || [];
      updatedSchedule.push(newEntry);
      setSelectedJob({ ...selectedJob, schedule: updatedSchedule });

      try {
         const response = await fetch(`/api/current-jobs/${selectedJob._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schedule: updatedSchedule }),
         });

         if (response.status === 200) {
            fetchJobs();
            setSelectedJob(null);
            setModalOpen(false);
         } else {
            console.error('Failed to update job', response.statusText);
         }
      } catch (error) {
         console.error('Error saving schedule:', error);
      }
   };

   const renderWeather = (date, time, city) => {
      if (!weatherData[date]) return <p>No weather data available.</p>;

      const timeMap = {
         morning: [6, 9, 12],
         noon: [12, 15],
         evening: [18, 21],
         'whole day': [6, 9, 12, 15, 18, 21]
      };

      const weatherForTime = weatherData[date].filter(entry => {
         const entryHour = new Date(entry.time).getHours();
         return timeMap[time] ? timeMap[time].includes(entryHour) : false;
      });

      if (weatherForTime.length === 0) return <p>No weather data available.</p>;

      return (
         <div className="weather-info mt-2 bg-gray-100 p-2 rounded-lg">
            <h4 className="font-bold">{city}</h4>
            {weatherForTime.map((weather, index) => (
               <div key={index} className="mt-2">
                  <p><strong>Time:</strong> {new Date(weather.time).toLocaleTimeString()}</p>
                  <p><strong>Temperature:</strong> {weather.temp} °C</p>
                  <p><strong>Weather:</strong> {weather.description}</p>
                  <p><strong>Rain:</strong> {weather.rain > 0 ? `${weather.rain} mm` : 'No rain'}</p>
                  <p><strong>Snow:</strong> {weather.snow > 0 ? `${weather.snow} mm` : 'No snow'}</p>
               </div>
            ))}
         </div>
      );
   };




   // Button to toggle visibility
   // Example: Toggle Old Jobs Button
   const renderToggleOldJobsButton = () => (
      <div className='flex justify-center align-center mt-10'>
         <Button color="dark" pill onClick={() => setShowOldJobs(!showOldJobs)} className='px-10 font-bold'>
            {showOldJobs ? t('Hide Old or Completed Jobs') : t('Show Old or Completed Jobs')}
         </Button>
      </div>
   );

   // Example: Render Unassigned Jobs
   const renderUnassignedJobs = () => {
      return (
         <div className="md:px-20 px-5 py-5 text-center rounded-lg border-solid border-teal-700 mt-10 bg-blue-50 border-2">
            <h3 className="md:text-3xl text-xl text-slate-900 font-bold mb-4">{t('Unassigned Jobs')}</h3>
            {unassignedJobs.map((job) => (
               <div key={job._id} className="mt-4 p-4 bg-gray-300 rounded-lg text-sm">
                  <h3 className="text-sm font-bold">{job.customerInfo.name} ({job.status})</h3>
                  <div><strong>{t('Address')}:</strong> {job.customerInfo.address}, {job.customerInfo.city}</div>
                  <div><strong>{t('Estimated Cost')}:</strong> ${job.discountedEstimate?.toFixed(2) || 'N/A'}</div>
                  <div><strong>{t('Service Type')}:</strong> {job.serviceType || 'N/A'}</div>
                  <div className="mt-4">
                     <Select
                        value={job.status}
                        onChange={(e) => handleJobStatusChange(job._id, e.target.value)}
                        className="w-full"
                     >
                        <option value="Job Pending">{t('Job Pending')}</option>
                        <option value="Job Waiting">{t('Job Waiting')}</option>
                        <option value="Job In Progress">{t('Job In Progress')}</option>
                        <option value="Job Completed">{t('Job Completed')}</option>
                     </Select>
                  </div>
               </div>
            ))}
         </div>
      );
   };


   const deleteSchedule = async () => {
      if (!selectedJob || !selectedTime) return;
      const updatedSchedule = selectedJob.schedule?.filter(entry => !(entry.date === selectedDate && entry.time === selectedTime)) || [];
      setSelectedJob({ ...selectedJob, schedule: updatedSchedule });

      try {
         const response = await fetch(`/api/current-jobs/${selectedJob._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schedule: updatedSchedule }),
         });

         if (response.status === 200) {
            fetchJobs();
            setSelectedJob(null);
            setModalOpen(false);
         } else {
            console.error('Failed to update job', response.statusText);
         }
      } catch (error) {
         console.error('Error deleting schedule:', error);
      }
   };

   const handleFilterChange = (e) => {
      setFilterOption(e.target.value);
   };

   const handleCityFilterChange = (e) => {
      setCityFilter(e.target.value);
   };

   const filterJobs = (job) => {
      const today = new Date();
      const jobDate = new Date(job.schedule[0]?.date);

      switch (filterOption) {
         case 'thisWeek':
            const currentDate = new Date();
            const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1); // Adjust if Sunday
            const startOfWeek = new Date(currentDate.setDate(firstDayOfWeek));
            startOfWeek.setHours(0, 0, 0, 0); // Start at the beginning of the day

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999); // End at the last millisecond of the day

            return jobDate >= startOfWeek && jobDate <= endOfWeek;
         case 'thisMonth':
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999); // End at the last millisecond of the day
            return jobDate >= startOfMonth && jobDate <= endOfMonth;
         case 'nextMonth':
            const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
            endOfNextMonth.setHours(23, 59, 59, 999); // End at the last millisecond of the day
            return jobDate >= startOfNextMonth && jobDate <= endOfNextMonth;
         default:
            return true;
      }
   };


   const handleTaskStatusChange = async (jobId, selectedDate, selectedTime, taskIndex, status) => {
      const job = jobs.find(j => j._id === jobId);
      const updatedSchedule = job.schedule.map((entry) => {
         if (entry.date === selectedDate && entry.time === selectedTime) {
            const updatedTasks = entry.tasks.map((task, index) => {
               if (index === taskIndex) {
                  return { ...task, status };
               }
               return task;
            });
            return { ...entry, tasks: updatedTasks };
         }
         return entry;
      });

      try {
         const response = await fetch(`/api/current-jobs/${jobId}/schedule`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schedule: updatedSchedule }),
         });

         if (response.status === 200) {
            fetchJobs(); // Refresh jobs after update
         } else {
            console.error('Failed to update task status', response.statusText);
         }
      } catch (error) {
         console.error('Error updating task status:', error);
      }
   };





   // const handleChecklistChange = async (selectedJob, entryIndex, checklistIndex, checked) => {
   //    if (!selectedJob) {
   //       console.error('No job selected');
   //       return;
   //    }

   //    if (!selectedJob.schedule || entryIndex < 0 || entryIndex >= selectedJob.schedule.length) {
   //       console.error('Invalid schedule entry index');
   //       return;
   //    }

   //    if (!selectedJob.schedule[entryIndex].checklists) {
   //       console.error('Checklist array does not exist');
   //       return;
   //    }

   //    const updatedJob = { ...selectedJob };
   //    updatedJob.schedule[entryIndex].checklists[checklistIndex].checked = checked;
   //    setSelectedJob(updatedJob);

   //    try {
   //       const response = await fetch(`/api/current-jobs/${selectedJob._id}`, {
   //          method: 'PUT',
   //          headers: {
   //             'Content-Type': 'application/json',
   //          },
   //          body: JSON.stringify({ schedule: updatedJob.schedule }),
   //       });

   //       if (response.status === 200) {
   //          fetchJobs();
   //       } else {
   //          console.error('Failed to update job checklist', response.statusText);
   //       }
   //    } catch (error) {
   //       console.error('Error updating job checklist:', error);
   //    }
   // };




   const handleJobStatusChange = async (jobId, status) => {
      try {
         const response = await fetch(`/api/current-jobs/${jobId}/status`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
         });

         if (response.status === 200) {
            fetchJobs();
         } else {
            console.error('Failed to update job status', response.statusText);
         }
      } catch (error) {
         console.error('Error updating job status:', error);
      }
   };



   const handleDayChange = (offset) => {
      const newStartDate = new Date(currentStartDate);
      newStartDate.setDate(newStartDate.getDate() + offset);
      setCurrentStartDate(newStartDate);
   };

   const renderWeatherModal = () => {
      const { date, city } = weatherModalData;
      const weatherForDate = weatherData[date] || [];

      return (
         <Modal show={weatherModalOpen} onClose={() => setWeatherModalOpen(false)} size="lg">
            <Modal.Header>{t('Weather Details for')} {city} {t('on')} {date}</Modal.Header>
            <Modal.Body>
               <div className="space-y-4">
                  {weatherForDate.length > 0 ? (
                     weatherForDate.map((weather, index) => (
                        <div key={index} className="weather-detail p-2 border rounded-lg bg-gray-50">
                           <p><strong>{t('Time')}:</strong> {new Date(weather.time).toLocaleTimeString()}</p>
                           <p><strong>{t('Temperature')}:</strong> {weather.temp} °C</p>
                           <p><strong>{t('Weather')}:</strong> {weather.description}</p>
                           <p><strong>{t('Rain')}:</strong> {weather.rain > 0 ? `${weather.rain} mm` : t('No rain')}</p>
                           <p><strong>{t('Snow')}:</strong> {weather.snow > 0 ? `${weather.snow} mm` : t('No snow')}</p>
                        </div>
                     ))
                  ) : (
                     <p>{t('No weather data available.')}</p>
                  )}
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => setWeatherModalOpen(false)} gradientMonochrome="info" size="sm">
                  {t('Close')}
               </Button>
            </Modal.Footer>
         </Modal>
      );
   };


   const renderBriefWeather = (date, city) => {
      if (!weatherData[date]) return null;

      const specificTimes = ['09:00:00', '12:00:00', '15:00:00', '18:00:00', '21:00:00'];
      const briefWeather = weatherData[date].reduce((acc, entry) => {
         const time = entry.time.split(' ')[1];
         if (specificTimes.includes(time)) {
            acc.rainTimes[time] = entry.rain;
         }
         acc.tempSum += entry.temp;
         acc.windSum += entry.wind ? entry.wind.speed : 0;
         acc.rainSum += entry.rain;
         acc.count += 1;
         return acc;
      }, { tempSum: 0, rainSum: 0, windSum: 0, rainTimes: {}, count: 0 });

      const avgTemp = (briefWeather.tempSum / briefWeather.count).toFixed(1);
      const avgRain = (briefWeather.rainSum / briefWeather.count).toFixed(1);
      const avgWind = (briefWeather.windSum / briefWeather.count).toFixed(1);

      return (
         <div className="flex flex-wrap items-center space-x-2 mt-2 text-sm">
            <div className="flex items-center text-yellow-600">
               <WiThermometer size={18} className="text-yellow-600" />
               <span className="ml-1">{avgTemp} °C</span>
            </div>
            <div className="flex items-center text-yellow-600">
               <WiRain size={18} className="text-yellow-600" />
               <span className={`ml-1 ${avgRain >= 0.1 ? 'text-red-500' : 'text-yellow-600'}`}>{avgRain} mm</span>
            </div>
            <div className="flex items-center text-yellow-600">
               <WiStrongWind size={18} className="text-yellow-600" />
               <span className="ml-1">{avgWind} m/s</span>s
            </div>
            <div className=" pl-5 flex flex-wrap items-center space-x-2 mt-2 sm:mt-0">
               {Object.entries(briefWeather.rainTimes).map(([time, rain], index) => (
                  <div key={index} className="flex items-center">
                     <WiRain size={18} className="text-blue-500" />
                     <span className={`ml-1 ${rain >= 0.1 ? 'text-red-500' : 'text-blue-500'}`}>{time.split(':')[0]}:00 - {rain} mm</span>
                  </div>
               ))}
            </div>
         </div>
      );
   };




   const renderCalendar = () => {
      const days = [];
      const startOfWeek = new Date(currentStartDate);
      startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1));
      const today = new Date();
      const sixDaysLater = new Date(today);
      sixDaysLater.setDate(today.getDate() + 5); // Including today, it's 6 days

      for (let i = 0; i < 7; i++) {
         const date = new Date(startOfWeek);
         date.setDate(startOfWeek.getDate() + i);
         days.push(date);
      }

      const dayColors = (date) => {
         const today = new Date().setHours(0, 0, 0, 0);
         const dateWithoutTime = new Date(date).setHours(0, 0, 0, 0);
         const currentWeekStart = new Date(startOfWeek);
         const currentWeekEnd = new Date(currentWeekStart);
         currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

         if (dateWithoutTime === today) return 'bg-green-200 text-gray-800 italic border border-dotted border-2 border-gray-800 rounded-xl';
         if (dateWithoutTime < today) return 'bg-gray-300 text-slate-700';
         if (date.getDay() === 0) return 'bg-green-100';
         if (date.getDay() === 6) return 'bg-green-100';
         if (date >= currentWeekStart && date <= currentWeekEnd) return 'bg-green-200';
         if (date > currentWeekEnd) return 'bg-gray-200';

         return 'bg-green-200';
      };

      return (
         <div className="calendar">
            <div className="calendar-header flex justify-between items-center mb-4">
               <Button onClick={() => handleDayChange(-7)}>Previous</Button>
               <h2>{currentStartDate.toLocaleString('default', { month: 'long' })} {currentStartDate.getFullYear()}</h2>
               <Button onClick={() => handleDayChange(7)}>Next</Button>
            </div>
            <div className="calendar-grid grid grid-cols-1 gap-2 border border-solid border-gray-700 md:p-10 p-5">
               {days.map((day, index) => {
                  const dayString = day.toISOString().split('T')[0];
                  const job = jobs.find(job => job.schedule.some(entry => entry.date === dayString));
                  const city = job ? job.customerInfo.city : 'Brampton';
                  const isWithinNextSixDays = (day >= today && day <= sixDaysLater);

                  return (
                     <div
                        key={index}
                        className={`calendar-day border p-3 cursor-pointer ${dayColors(day)}`}
                        onClick={() => handleDateClick(dayString)}
                     >
                        <div className="font-bold">
                           <span className='text-gray-950 font-extrabold'>{day.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                           <span className='pr-2'></span>
                           {day.toLocaleDateString('default', { weekday: 'long' })}
                           {renderBriefWeather(dayString, city)}

                        </div>
                        {renderJobsForDay(dayString)}
                        {/* {isWithinNextSixDays && (
                           <div>
                              <Button gradientDuoTone="greenToBlue   " pill onClick={() => handleShowWeatherClick(dayString, city)} className="mt-2">
                                 Show Weather
                              </Button>
                           </div>
                        )} */}
                     </div>
                  );
               })}
            </div>
            {renderWeatherModal()}
         </div>
      );
   };



   const renderJobsForDay = (date) => {
      const timeSlots = ['morning', 'noon', 'evening', 'whole day'];
      const timeColors = {
         morning: 'bg-yellow-100',
         noon: 'bg-yellow-200',
         evening: 'bg-yellow-300',
         'whole day': 'bg-yellow-500',
      };

      return timeSlots.map(time => {
         const jobEntries = jobs.filter(job => {
            const entry = job.schedule?.find(entry => entry.date === date && entry.time === time);
            if (entry && entry.tasks.length === 0 && entry.notes.length === 0 && (!entry.checklists || entry.checklists.length === 0)) {
               deleteEmptySchedule(job._id, date, time);
               return false;
            }
            return !!entry;
         });
         if (jobEntries.length === 0) return null;

         return (
            <div key={time} className={`${timeColors[time]} p-2 mt-2 rounded`}>
               <div className="font-bold">{time.charAt(0).toUpperCase() + time.slice(1)}:</div>
               {jobEntries.map((job, index) => {
                  const entry = job.schedule.find(entry => entry.date === date && entry.time === time);
                  return (
                     <div key={index} className="text-sm">
                        {job.customerInfo.name} ({job.customerInfo.city}) (Tasks: {entry.tasks.length}, Notes: {entry.notes.length})

                     </div>
                  );
               })}
            </div>
         );
      });
   };





   const deleteEmptySchedule = async (jobId, date, time) => {
      const job = jobs.find(j => j._id === jobId);
      const updatedSchedule = job.schedule?.filter(entry => !(entry.date === date && entry.time === time)) || [];
      try {
         await fetch(`/api/current-jobs/${jobId}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schedule: updatedSchedule }),
         });
         fetchJobs();
      } catch (error) {
         console.error('Error deleting empty schedule:', error);
      }
   };



   const renderSummarySection = () => {
      if (!selectedJob) return null;
      const timeSlots = ['morning', 'noon', 'evening', 'whole day'];

      return (
         <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Summary</h3>
            {timeSlots.map(time => {
               const entries = selectedJob.schedule.filter(entry => entry.time === time && entry.date === selectedDate);
               return (
                  <div key={time}>
                     <h4 className="text-lg font-semibold">{time.charAt(0).toUpperCase() + time.slice(1)}</h4>
                     {entries.map((entry, index) => (
                        <div key={index} className="mb-4">
                           <div className="mb-2">
                              <strong>Notes:</strong>
                              <p>{entry.notes}</p>
                           </div>
                           <div className="mb-2">
                              <strong>Tasks:</strong>
                              {entry.tasks.map((task, taskIndex) => (
                                 <div key={taskIndex} className="flex justify-between items-center">
                                    <span
                                       style={{
                                          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                          color: task.status === 'cancelled' ? 'red' : 'inherit',
                                       }}
                                    >
                                       {task.description}
                                    </span>
                                    <span>Status: {task.status}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               );
            })}
         </div>
      );
   };


   const renderScheduleModal = () => (
      <Modal show={modalOpen} onClose={() => setModalOpen(false)} size="lg">
         <Modal.Header>{t('Schedule for')} {selectedDate}</Modal.Header>
         <Modal.Body>
            <div className="space-y-4">
               <div>
                  <Select
                     value={selectedJob?._id || ''}
                     onChange={(e) => handleJobSelect(e.target.value)}
                     className="w-full"
                  >
                     <option value="">{t('Select Job')}</option>
                     {jobs
                        .filter(job => ['Job Pending', 'Job Waiting', 'Job In Progress'].includes(job.status))
                        .map(job => (
                           <option key={job._id} value={job._id}>
                              {job.customerInfo.name}, {job.customerInfo.city} ({job.status})
                           </option>
                        ))}
                  </Select>
               </div>
               <div>
                  <Select
                     value={selectedTime}
                     onChange={(e) => handleTimeSelect(e.target.value)}
                     className="w-full"
                     disabled={!selectedJob}
                  >
                     <option value="">{t('Select Time')}</option>
                     <option value="morning">{t('Morning')}</option>
                     <option value="noon">{t('Noon')}</option>
                     <option value="evening">{t('Evening')}</option>
                     <option value="whole day">{t('Whole Day')}</option>
                  </Select>
               </div>
               <div>
                  <Textarea
                     placeholder={t("Add notes")}
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     className="w-full"
                     disabled={!selectedJob}
                  />
               </div>
               <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                     <TextInput
                        placeholder={t("Add task")}
                        value={taskNote}
                        onChange={(e) => setTaskNote(e.target.value)}
                        className="w-full"
                        disabled={!selectedJob}
                     />
                     <Button onClick={addTask} gradientMonochrome="info" size="sm" disabled={!taskNote.trim() || !selectedJob}>
                        {t("Add Task")}
                     </Button>
                  </div>
                  {tasks.map((task, index) => (
                     <div key={index} className="flex justify-between items-center mt-2">
                        <span>{task.description}</span>
                        <Select
                           value={task.status}
                           onChange={(e) => handleTaskStatusChange(selectedJob._id, selectedTime, index, e.target.value)}
                           className="w-1/3"
                        >
                           <option value="to be done">{t('To be done')}</option>
                           <option value="completed">{t('Completed')}</option>
                           <option value="cancelled">{t('Cancelled')}</option>
                        </Select>
                        <Button size="xs" gradientMonochrome="failure" onClick={() => deleteTask(selectedJob._id, index)}>
                           {t('Delete')}
                        </Button>
                     </div>
                  ))}
               </div>
            </div>
            {renderSummarySection()}
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={saveSchedule} gradientMonochrome="success" size="sm">
               {t('Save Schedule')}
            </Button>
            <Button onClick={deleteSchedule} gradientMonochrome="failure" size="sm" disabled={!selectedTime}>
               {t('Delete Schedule')}
            </Button>
            <Button onClick={() => setModalOpen(false)} gradientMonochrome="info" size="sm">
               {t('Close')}
            </Button>
         </Modal.Footer>
      </Modal>
   );



   const deleteNote = (jobId, entryIndex, noteIndex) => {
      const job = jobs.find(j => j._id === jobId);
      const updatedSchedule = [...job.schedule];
      updatedSchedule[entryIndex].notes.splice(noteIndex, 1);
      updateJobSchedule(jobId, updatedSchedule);
   };

   const deleteTask = (jobId, entryIndex, taskIndex) => {
      const job = jobs.find(j => j._id === jobId);
      const updatedSchedule = [...job.schedule];
      updatedSchedule[entryIndex].tasks.splice(taskIndex, 1);
      updateJobSchedule(jobId, updatedSchedule);
   };

   // const deleteChecklist = (jobId, entryIndex, checklistIndex) => {
   //    const job = jobs.find(j => j._id === jobId);
   //    const updatedSchedule = [...job.schedule];
   // updatedSchedule[entryIndex].checklists.splice(checklistIndex, 1);
   //    updateJobSchedule(jobId, updatedSchedule);
   // };

   const updateJobSchedule = async (jobId, updatedSchedule) => {
      try {
         const response = await fetch(`/api/current-jobs/${jobId}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schedule: updatedSchedule }),
         });

         if (response.status === 200) {
            fetchJobs();
         } else {
            console.error('Failed to update job schedule', response.statusText);
         }
      } catch (error) {
         console.error('Error updating job schedule:', error);
      }
   };


   const renderJobDetails = (job, showStatusChange = true) => {
      const timeColors = {
         morning: 'bg-yellow-100',
         noon: 'bg-yellow-200',
         evening: 'bg-yellow-300',
         'whole day': 'bg-yellow-500',
      };

      const formatDate = (date) => {
         const today = DateTime.now().setZone('America/Toronto').startOf('day');
         const entryDate = DateTime.fromISO(date, { zone: 'America/Toronto' }).startOf('day');
         if (entryDate.equals(today)) return `${entryDate.toLocaleString(DateTime.DATE_SHORT)} (${t('Today')})`;
         if (entryDate.equals(today.plus({ days: 1 }))) return `${entryDate.toLocaleString(DateTime.DATE_SHORT)} (${t('Tomorrow')})`;
         return entryDate.toLocaleString(DateTime.DATE_SHORT);
      };

      const timeOrder = ['morning', 'noon', 'evening', 'whole day'];

      const groupedSchedule = job.schedule.reduce((acc, entry) => {
         const date = entry.date;
         if (!acc[date]) acc[date] = [];
         acc[date].push(entry);
         return acc;
      }, {});

      const sortedDates = Object.keys(groupedSchedule).sort((a, b) => new Date(a) - new Date(b));

      return (
         <div className="mt-4 md:p-5 p-2 md:mb-10 mb-4 bg-blue-50 border-solid shadow-[inset_0px_0px_17px_1px_#48bb78]  rounded-lg border-2 ">
            <h3 className="text-2xl text-red-800 font-bold mb-2">{job.customerInfo.name} ({job.status})</h3>
            <div className="mb-2">
               <strong>{t('Address')}:</strong> {job.customerInfo.address}, {job.customerInfo.city}
            </div>
            <div className="mb-2">
               <strong>{t('Estimated Cost')}:</strong> ${job.discountedEstimate?.toFixed(2) || 'N/A'}
            </div>
            <div className="mb-2">
               <strong>{t('Service Type')}:</strong> {job.serviceType || 'N/A'}
            </div>
            <div className="mb-2 text-red-900">
               <strong>{t('Scheduled Dates')}:</strong> {sortedDates.map(date => formatDate(date)).join(', ')}
            </div>
            {sortedDates.map(date => (
               <div key={date} className="mt-4 bg-blue-100 md:p-2 p-1 md:py-4 py-1 shadow-lg rounded-lg border">
                  <h4 className="text-xl text-green-700 font-semibold md:mb-2 mb-0">{formatDate(date)}</h4>
                  {groupedSchedule[date]
                     .sort((a, b) => timeOrder.indexOf(a.time) - timeOrder.indexOf(b.time))
                     .map((entry, entryIndex) => (
                        <div key={entryIndex} className={`${timeColors[entry.time]} md:p-4 md:mt-4 mb-1 p-1 rounded-lg`}>
                           <h4 className="text-xl font-semibold md:mb-2 mb-0">{t(entry.time.charAt(0).toUpperCase() + entry.time.slice(1))}</h4>
                           <div className="md:mb-2 md:p-2 mb-1 p-1 bg-gray-100 rounded-lg shadow-md flex flex-wrap">
                              {entry.notes.length > 0 && (
                                 <div className="w-full md:w-1/2 pr-4">
                                    <strong className="block mb-2 text-gray-400">{t('Notes')} ({formatDate(entry.date)}):</strong>
                                    <ul className="list-disc pl-5">
                                       {entry.notes.map((note, noteIndex) => (
                                          <li key={noteIndex} className="mb-1">{note}</li>
                                       ))}
                                    </ul>
                                 </div>
                              )}
                              {entry.tasks.length > 0 && (
                                 <div className="w-full md:w-1/2 pl-4 md:border-l  border-gray-300">
                                    <strong className="block mb-2 text-gray-400">{t('Tasks')} ({formatDate(entry.date)}):</strong>
                                    <ul>
                                       {entry.tasks.map((task, taskIndex) => (
                                          <li key={taskIndex} className="mb-1 flex flex-wrap justify-between items-center">
                                             <span
                                                className={`flex-grow ${task.status === 'completed' ? 'line-through' : ''} ${task.status === 'cancelled' ? 'text-red-500' : ''}`}
                                             >
                                                {task.description}
                                             </span>
                                             <Select
                                                value={task.status}
                                                onChange={(e) => handleTaskStatusChange(job._id, entry.date, entry.time, taskIndex, e.target.value)}
                                                className="w-1/3 ml-4"
                                             >
                                                <option value="to be done">{t('To be done')}</option>
                                                <option value="completed">{t('Completed')}</option>
                                                <option value="cancelled">{t('Cancelled')}</option>
                                             </Select>
                                             <Button size="xs" gradientMonochrome="failure" onClick={() => deleteTask(job._id, entryIndex, taskIndex)}>
                                                {t('Delete')}
                                             </Button>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
               </div>
            ))}
            {showStatusChange && (
               <div className="mt-4">
                  <Select
                     value={job.status}
                     onChange={(e) => handleJobStatusChange(job._id, e.target.value)}
                     className="w-full"
                  >
                     <option value="Job Pending">{t('Job Pending')}</option>
                     <option value="Job Waiting">{t('Job Waiting')}</option>
                     <option value="Job In Progress">{t('Job In Progress')}</option>
                     <option value="Job Completed">{t('Job Completed')}</option>
                  </Select>
               </div>
            )}
         </div>
      );
   };








   const sortedJobs = [...jobs]
      .filter(job => job.schedule.length > 0 && job.status !== 'Job Completed')
      .sort((a, b) => {
         if (sortOption === 'nearest') {
            return new Date(a.schedule[0]?.date) - new Date(b.schedule[0]?.date);
         }
         return new Date(b.schedule[0]?.date) - new Date(a.schedule[0]?.date);
      })
      .filter(job => filterJobs(job) && (cityFilter === '' || job.customerInfo.city.toLowerCase().includes(cityFilter.toLowerCase())));

   // const unassignedJobs = jobs.filter(job => job.schedule.length === 0 && job.status !== 'Job Completed');

   const oldOrCompletedJobs = jobs.filter(job => {
      const lastScheduledDate = job.schedule.reduce((latest, entry) => {
         const entryDate = new Date(entry.date);
         return entryDate > latest ? entryDate : latest;
      }, new Date(0));

      return lastScheduledDate < new Date().setHours(0, 0, 0, 0) || job.status === 'Job Completed';
   });



   const confirmDeleteJob = (jobId) => {
      setJobToDelete(jobId);
      setShowDeleteModal(true);
   };

   const handleConfirmDelete = () => {
      if (jobToDelete) {
         deleteJob(jobToDelete);
         setShowDeleteModal(false);
         setJobToDelete(null);
      }
   };
   const renderDeleteModal = () => (
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} size="md">
         <Modal.Header>Confirm Deletion</Modal.Header>
         <Modal.Body>
            <p>Are you sure you want to delete this job?</p>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={handleConfirmDelete} gradientMonochrome="failure" size="sm">
               Confirm
            </Button>
            <Button onClick={() => setShowDeleteModal(false)} gradientMonochrome="info" size="sm">
               Cancel
            </Button>
         </Modal.Footer>
      </Modal>
   );



   const deleteJob = async (jobId) => {
      try {
         const response = await fetch(`/api/current-jobs/${jobId}`, {
            method: 'DELETE',
         });

         if (response.status === 200) {
            fetchJobs();
         } else {
            console.error('Failed to delete job', response.statusText);
         }
      } catch (error) {
         console.error('Error deleting job:', error);
      }
   };



   const renderCompletedOrOldJobs = () => {
      if (!showOldJobs) return null;

      return (
         <div className="md:px-20 px-5 py-5 rounded-lg border-solid border-slate-700 mt-10 bg-gray-300 border-2">
            <h3 className="md:text-3xl text-xl text-slate-800 font-bold mb-4">Old or Completed Jobs</h3>
            {oldOrCompletedJobs.map((job) => (
               <div key={job._id} className="mt-4 p-4 bg-gray-400 italic rounded-lg text-sm">
                  <h3 className="text-sm font-bold">{job.customerInfo.name} ({job.status})</h3>
                  <div><strong>Address:</strong> {job.customerInfo.address}, {job.customerInfo.city}</div>
                  <div><strong>Estimated Cost:</strong> ${job.discountedEstimate?.toFixed(2) || 'N/A'}</div>
                  <div><strong>Service Type:</strong> {job.serviceType || 'N/A'}</div>
                  <div><strong>Scheduled Date:</strong> {job.schedule[0]?.date}</div>
                  <div className="mt-4">
                     <Select
                        value={job.status}
                        onChange={(e) => handleJobStatusChange(job._id, e.target.value)}
                        className="w-full"
                        disabled={new Date(job.schedule[0]?.date) < new Date().setHours(0, 0, 0, 0)}
                     >
                        <option value="Job Pending">Job Pending</option>
                        <option value="Job Waiting">Job Waiting</option>
                        <option value="Job In Progress">Job In Progress</option>
                        <option value="Job Completed">Job Completed</option>
                        <option value="Past Jobs">Past Jobs</option>
                     </Select>
                     <Button
                        onClick={() => confirmDeleteJob(job._id)}
                        gradientMonochrome="failure"
                        size="sm"
                        className="mt-2"
                     >
                        Delete
                     </Button>
                  </div>
               </div>
            ))}
            {renderDeleteModal()}
         </div>
      );
   };





   return (
      <div className="p-4">
               <h1 className="flex justify-center align-center text-2xl font-extrabold mb-4 ">{t('Schedule Jobs')}</h1>

         <div className='flex flex-for no-wrap gap-2 w-full justify-center py-10'>

            <Button outline gradientDuoTone="cyanToBlue" onClick={() => changeLanguage('en')}>{t('English')}</Button>
            <Button outline gradientDuoTone="cyanToBlue" onClick={() => changeLanguage('pa')}>{t('Punjabi')}</Button>
         </div>

         {loading ? (
            <div className="flex justify-center items-center">
               <Spinner size="xl" />
            </div>
         ) : (
            <>
               {renderCalendar()}
               <div className="md:mt-10 mt-5 md:p-10 p-2 border border-rounded border-solid border-green-400">
                  <h1 className="md:text-4xl text-green-700 font-bold text-center mb-4">Summary of Scheduled Jobs</h1>
                  <Select
                     value={sortOption}
                     onChange={(e) => setSortOption(e.target.value)}
                     className="w-full mb-4"
                  >
                     <option value="nearest">Nearest Date</option>
                     <option value="farthest">Farthest Date</option>
                  </Select>
                  <Select
                     value={filterOption}
                     onChange={handleFilterChange}
                     className="w-full mb-4"
                  >
                     <option value="all">All</option>
                     <option value="thisWeek">This Week</option>
                     <option value="thisMonth">This Month</option>
                     <option value="nextMonth">Next Month</option>
                  </Select>
                  <TextInput
                     placeholder="Filter by city"
                     value={cityFilter}
                     onChange={handleCityFilterChange}
                     className="w-full mb-4"
                  />
                  {sortedJobs.map((job) => (
                     <div key={job._id} className="mt-4">
                        {renderJobDetails(job)}
                     </div>
                  ))}
               </div>
               {renderUnassignedJobs()}
               {renderToggleOldJobsButton()}
               {renderCompletedOrOldJobs()}
               {renderScheduleModal()}
            </>
         )}
      </div>
   );




}




