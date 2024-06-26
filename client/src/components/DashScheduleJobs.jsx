import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Textarea, TextInput, Spinner } from 'flowbite-react';
import { DateTime } from 'luxon';


export default function ScheduleJobs() {
   const [jobs, setJobs] = useState([]);
   const [selectedJob, setSelectedJob] = useState(null);
   const [selectedDate, setSelectedDate] = useState(null);
   const [selectedTime, setSelectedTime] = useState('');
   const [taskNote, setTaskNote] = useState('');
   const [tasks, setTasks] = useState([]);
   const [notes, setNotes] = useState('');

   const [modalOpen, setModalOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [currentStartDate, setCurrentStartDate] = useState(new Date());
   const [sortOption, setSortOption] = useState('nearest');
   const [showOldJobs, setShowOldJobs] = useState(false);
   const [filterOption, setFilterOption] = useState('all');
   const [cityFilter, setCityFilter] = useState('');
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [jobToDelete, setJobToDelete] = useState(null);


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
      } catch (error) {
         console.error('Error fetching jobs:', error);
      } finally {
         setLoading(false);
      }
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
      } else {
         setSelectedJob(null);
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



   // Button to toggle visibility
   const renderToggleOldJobsButton = () => (
      <div className='flex justify-center align-center mt-10'>
         <Button color="dark" pill onClick={() => setShowOldJobs(!showOldJobs)} className='px-10 font-bold'>
            {showOldJobs ? 'Hide Old or Completed Jobs' : 'Show Old or Completed Jobs'}
         </Button>
      </div>
   );

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

   const renderCalendar = () => {
      const days = [];
      // Find the start of the current week (Monday)
      const startOfWeek = new Date(currentStartDate);
      startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1));

      // Generate the 7 days of the week from Monday to Sunday
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

         if (dateWithoutTime === today) return 'bg-green-500 text-gray-800 italic border border-dotted border-2 border-gray-800 rounded-xl'; // Today's date
         if (dateWithoutTime < today) return 'bg-gray-400 text-slate-700'; // Past days
         if (date.getDay() === 0) return 'bg-red-100'; // Sundays
         if (date.getDay() === 6) return 'bg-green-100'; // Saturdays
         if (date >= currentWeekStart && date <= currentWeekEnd) return 'bg-green-200'; // Current week
         if (date > currentWeekEnd) return 'bg-gray-200'; // All other days

         return 'bg-green-200'; // Default color for any other days not covered by the above conditions
      };

      return (
         <div className="calendar">
            <div className="calendar-header flex justify-between items-center mb-4">
               <Button onClick={() => handleDayChange(-7)}>Previous</Button>
               <h2>{currentStartDate.toLocaleString('default', { month: 'long' })} {currentStartDate.getFullYear()}</h2>
               <Button onClick={() => handleDayChange(7)}>Next</Button>
            </div>
            <div className="calendar-grid grid grid-cols-1 gap-2 border border-solid border-gray-700 md:p-10 p-5">
               {days.map((day, index) => (
                  <div
                     key={index}
                     className={`calendar-day border p-3 cursor-pointer ${dayColors(day)}`}
                     onClick={() => handleDateClick(day.toISOString().split('T')[0])}
                  >
                     <div className="font-bold">{day.toLocaleDateString('default', { weekday: 'long' })}</div>
                     <div>{day.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                     {renderJobsForDay(day.toISOString().split('T')[0])}
                  </div>
               ))}
            </div>
         </div>
      );
   };

   const renderJobsForDay = (date) => {
      const timeSlots = ['morning', 'noon', 'evening', 'whole day'];
      const timeColors = {
         morning: 'bg-green-400',
         noon: 'bg-yellow-200',
         evening: 'bg-red-200',
         'whole day': 'bg-gray-400',
      };

      return timeSlots.map(time => {
         const jobEntries = jobs.filter(job => {
            const entry = job.schedule?.find(entry => entry.date === date && entry.time === time);
            if (entry && entry.tasks.length === 0 && entry.notes.length === 0 && (!entry.checklists || entry.checklists.length === 0)) {
               // Automatically delete empty schedules
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
                        {job.customerInfo.name} (Tasks: {entry.tasks.length}, Notes: {entry.notes.length})
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
         <Modal.Header>Schedule for {selectedDate}</Modal.Header>
         <Modal.Body>
            <div className="space-y-4">
               {/* Existing fields and selectors */}
               <div>
                  <Select
                     value={selectedJob?._id || ''}
                     onChange={(e) => handleJobSelect(e.target.value)}
                     className="w-full"
                  >
                     <option value="">Select Job</option>
                     {jobs.map(job => (
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
                     <option value="">Select Time</option>
                     <option value="morning">Morning</option>
                     <option value="noon">Noon</option>
                     <option value="evening">Evening</option>
                     <option value="whole day">Whole Day</option>
                  </Select>
               </div>
               <div>
                  <Textarea
                     placeholder="Add notes"
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     className="w-full"
                     disabled={!selectedJob}
                  />
               </div>
               <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                     <TextInput
                        placeholder="Add task"
                        value={taskNote}
                        onChange={(e) => setTaskNote(e.target.value)}
                        className="w-full"
                        disabled={!selectedJob}
                     />
                     <Button onClick={addTask} gradientMonochrome="info" size="sm" disabled={!taskNote.trim() || !selectedJob}>
                        Add Task
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
                           <option value="to be done">To be done</option>
                           <option value="completed">Completed</option>
                           <option value="cancelled">Cancelled</option>
                        </Select>
                        <Button size="xs" gradientMonochrome="failure" onClick={() => deleteTask(selectedJob._id, index)}>
                           Delete
                        </Button>
                     </div>
                  ))}

               </div>
            </div>
            {renderSummarySection()}
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={saveSchedule} gradientMonochrome="success" size="sm">
               Save Schedule
            </Button>
            <Button onClick={deleteSchedule} gradientMonochrome="failure" size="sm" disabled={!selectedTime}>
               Delete Schedule
            </Button>
            <Button onClick={() => setModalOpen(false)} gradientMonochrome="info" size="sm">
               Close
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
         morning: 'bg-green-500',
         noon: 'bg-yellow-300',
         evening: 'bg-red-300',
         'whole day': 'bg-gray-400',
      };

      const formatDate = (date) => {
         const today = DateTime.now().setZone('America/Toronto').startOf('day');
         const entryDate = DateTime.fromISO(date, { zone: 'America/Toronto' }).startOf('day');
         if (entryDate.equals(today)) return `${entryDate.toLocaleString(DateTime.DATE_SHORT)} (Today)`;
         if (entryDate.equals(today.plus({ days: 1 }))) return `${entryDate.toLocaleString(DateTime.DATE_SHORT)} (Tomorrow)`;
         return entryDate.toLocaleString(DateTime.DATE_SHORT);
      };

      const timeOrder = ['morning', 'noon', 'evening', 'whole day'];

      // Group schedule entries by date and sort dates
      const groupedSchedule = job.schedule.reduce((acc, entry) => {
         const date = entry.date;
         if (!acc[date]) acc[date] = [];
         acc[date].push(entry);
         return acc;
      }, {});

      const sortedDates = Object.keys(groupedSchedule).sort((a, b) => new Date(a) - new Date(b));

      return (
         <div className="mt-4 md:p-10 p-4 bg-blue-100 border-solid border-green-600 shadow-md rounded-lg border">
            <h3 className="text-2xl text-red-800 font-bold mb-2">{job.customerInfo.name} ({job.status})</h3>
            <div className="mb-2">
               <strong>Address:</strong> {job.customerInfo.address}, {job.customerInfo.city}
            </div>
            <div className="mb-2">
               <strong>Estimated Cost:</strong> ${job.discountedEstimate?.toFixed(2) || 'N/A'}
            </div>
            <div className="mb-2">
               <strong>Service Type:</strong> {job.serviceType || 'N/A'}
            </div>
            <div className="mb-2 text-red-900">
               <strong>Scheduled Dates:</strong> {sortedDates.map(date => formatDate(date)).join(', ')}
            </div>
            {sortedDates.map(date => (
               <div key={date} className="mt-4 bg-blue-200 p-5 py-10 shadow-md rounded-lg border">
                  <h4 className="text-xl text-red-800 font-semibold md:mb-2 mb-0">{formatDate(date)}</h4>
                  {groupedSchedule[date]
                     .sort((a, b) => timeOrder.indexOf(a.time) - timeOrder.indexOf(b.time))
                     .map((entry, entryIndex) => (
                        <div key={entryIndex} className={`${timeColors[entry.time]} md:p-4 md:mt-4 mb-1 p-1 rounded-lg`}>
                           <h4 className="text-xl font-semibold md:mb-2 mb-0">{entry.time.charAt(0).toUpperCase() + entry.time.slice(1)}</h4>
                           <div className="md:mb-2 md:p-2 mb-1 p-1 bg-gray-100 rounded-lg shadow-md flex flex-wrap">
                              {entry.notes.length > 0 && (
                                 <div className="w-full md:w-1/2 pr-4">
                                    <strong className="block mb-2">Notes ({formatDate(entry.date)}):</strong>
                                    <ul className="list-disc pl-5">
                                       {entry.notes.map((note, noteIndex) => (
                                          <li key={noteIndex} className="mb-1">{note}</li>
                                       ))}
                                    </ul>
                                 </div>
                              )}
                              {entry.tasks.length > 0 && (
                                 <div className="w-full md:w-1/2 pl-4 md:border-l border-gray-300">
                                    <strong className="block mb-2">Tasks ({formatDate(entry.date)}):</strong>
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
                                                <option value="to be done">To be done</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                             </Select>
                                             <Button size="xs" gradientMonochrome="failure" onClick={() => deleteTask(job._id, entryIndex, taskIndex)}>
                                                Delete
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
                     <option value="Job Pending">Job Pending</option>
                     <option value="Job Waiting">Job Waiting</option>
                     <option value="Job In Progress">Job In Progress</option>
                     <option value="Job Completed">Job Completed</option>
                  </Select>
               </div>
            )}
         </div>
      );
   };











   const sortedJobs = [...jobs]
      .filter(job => job.status !== 'Job Completed' && (job.schedule.length === 0 || new Date(job.schedule[0]?.date) >= new Date().setHours(0, 0, 0, 0)))
      .sort((a, b) => {
         if (sortOption === 'nearest') {
            return new Date(a.schedule[0]?.date) - new Date(b.schedule[0]?.date);
         }
         return new Date(b.schedule[0]?.date) - new Date(a.schedule[0]?.date);
      })
      .filter(job => filterJobs(job) && (cityFilter === '' || job.customerInfo.city.toLowerCase().includes(cityFilter.toLowerCase())));

   const unassignedJobs = jobs.filter(job => job.schedule.length === 0 && job.status !== 'Job Completed');

   const oldOrCompletedJobs = jobs.filter(job => {
      const lastScheduledDate = job.schedule.reduce((latest, entry) => {
         const entryDate = new Date(entry.date);
         return entryDate > latest ? entryDate : latest;
      }, new Date(0));

      return lastScheduledDate < new Date().setHours(0, 0, 0, 0) || job.status === 'Job Completed';
   });

   const renderUnassignedJobs = () => {
      return (
         <div className="md:px-20 px-5 py-5 text-center rounded-lg border-solid border-teal-700 mt-10 bg-blue-50 border-2">
            <h3 className="md:text-3xl text-xl text-slate-900 font-bold mb-4">Unassigned Jobs</h3>
            {unassignedJobs.map((job) => (
               <div key={job._id} className="mt-4 p-4 bg-gray-300 rounded-lg text-sm">
                  <h3 className="text-sm font-bold">{job.customerInfo.name} ({job.status})</h3>
                  <div><strong>Address:</strong> {job.customerInfo.address}, {job.customerInfo.city}</div>
                  <div><strong>Estimated Cost:</strong> ${job.discountedEstimate?.toFixed(2) || 'N/A'}</div>
                  <div><strong>Service Type:</strong> {job.serviceType || 'N/A'}</div>
                  <div className="mt-4">
                     <Select
                        value={job.status}
                        onChange={(e) => handleJobStatusChange(job._id, e.target.value)}
                        className="w-full"
                     >
                        <option value="Job Pending">Job Pending</option>
                        <option value="Job Waiting">Job Waiting</option>
                        <option value="Job In Progress">Job In Progress</option>
                        <option value="Job Completed">Job Completed</option>
                     </Select>
                  </div>
               </div>
            ))}
         </div>
      );
   };

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
         <h1 className="text-2xl font-bold mb-4">Schedule Jobs</h1>
         {loading ? (
            <div className="flex justify-center items-center">
               <Spinner size="xl" />
            </div>
         ) : (
            <>
               {renderCalendar()}
               <div className="md:mt-10 mt-5  bg-green-200 md:p-10 p-2 border border-rounded rounded-lg border-solid border-green-400 ">
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
   f



}



