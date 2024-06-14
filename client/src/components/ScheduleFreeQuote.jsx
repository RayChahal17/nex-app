import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Modal, Button, TextInput, Select, Spinner, Alert } from 'flowbite-react';

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

export default function ScheduleFreeQuote() {
   const [busyTimeRanges, setBusyTimeRanges] = useState({});
   const [selectedDate, setSelectedDate] = useState(DateTime.now().plus({ days: 1 }));
   const [showModal, setShowModal] = useState(false);
   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
   const [showErrorModal, setShowErrorModal] = useState(false);
   const [formDetails, setFormDetails] = useState({ name: '', email: '', address: '', city: '', service: '', phone: '' });
   const [errorMessage, setErrorMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [confirmationDetails, setConfirmationDetails] = useState({ date: '', start: '', end: '' });

   useEffect(() => {
      fetchAllAppointmentsCollected(setBusyTimeRanges, setLoading);
   }, []);

   const handleDateChange = (days) => {
      const newDate = selectedDate.plus({ days });
      const today = DateTime.now();
      const maxDate = today.plus({ days: 60 });

      if (newDate >= today.plus({ days: 1 }).startOf('day') && newDate <= maxDate.endOf('day')) {
         setSelectedDate(newDate);
      }
   };

   const isPreviousDisabled = selectedDate <= DateTime.now().plus({ days: 1 }).startOf('day');
   const isNextDisabled = selectedDate >= DateTime.now().plus({ days: 60 }).endOf('day');

   const handleSlotClick = async (hour) => {
      setLoading(true);
      const start = selectedDate.set({ hour }).toISO();
      const end = selectedDate.set({ hour: hour + 1 }).toISO();

      const response = await fetch('/api/estimate', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            ...formDetails,
            date: selectedDate.toFormat('yyyy-MM-dd'),
            start,
            end,
         }),
      });

      const data = await response.json();

      setLoading(false);

      if (data.success) {
         setConfirmationDetails({
            date: selectedDate.toFormat('MMMM dd, yyyy'),
            start: selectedDate.set({ hour }).toFormat('h a'),
            end: selectedDate.set({ hour: hour + 1 }).toFormat('h a'),
         });
         setShowModal(false);
         setSelectedDate(selectedDate);
         setFormDetails({ name: '', email: '', address: '', city: '', service: '', phone: '' });
         setShowConfirmationModal(true);
         fetchAllAppointmentsCollected(setBusyTimeRanges, setLoading); // Refresh busy times after booking
      } else {
         setErrorMessage(data.message || 'An error occurred while creating the estimate');
         setShowErrorModal(true);
      }
   };

   const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormDetails(prevState => ({
         ...prevState,
         [id]: value,
      }));
   };

   const handleCancel = () => {
      setShowModal(false);
      setSelectedDate(selectedDate);
      setFormDetails({ name: '', email: '', address: '', city: '', service: '', phone: '' });
   };

   return (
      <>
         <div className="flex flex-col items-center rounded-[22px] bg-gray-300 bg-opacity-50 p-5">
            <div className="flex justify-between items-center space-x-4 ">
               <Button onClick={() => handleDateChange(-1)} className="p-1 md:p-2 bg-gray-800" disabled={isPreviousDisabled}>Previous Day</Button>
               <h2 className="md:text-2xl text-md font-semibold">{selectedDate.toFormat('MMMM dd, yyyy')}</h2>
               <Button onClick={() => handleDateChange(1)} className="p-2 bg-gray-800" disabled={isNextDisabled}>Next Day</Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 w-full max-w-xl p-2 rounded-lg">
               {Array.from({ length: 12 }, (_, index) => (
                  <Button
                     key={index}
                     disabled={shouldDisableSlot(selectedDate, 10 + index, busyTimeRanges)}
                     onClick={() => {
                        setSelectedDate(selectedDate.set({ hour: 10 + index }));
                        setShowModal(true);
                     }}
                     className="p-2 bg-gray-800"
                  >
                     {selectedDate.set({ hour: 10 + index }).toFormat('h a')}
                  </Button>
               ))}
            </div>
         </div>

         <Modal show={showModal} onClose={handleCancel}>
            <Modal.Header>Confirm Booking</Modal.Header>
            <Modal.Body>
               <div className="space-y-6">
                  <p>Selected Time Slot: {selectedDate && selectedDate.toFormat('MMMM dd, yyyy h a')}</p>
                  <TextInput
                     id="name"
                     type="text"
                     placeholder="Enter your name"
                     value={formDetails.name}
                     onChange={handleInputChange}
                     required
                     disabled={loading}
                  />
                  <TextInput
                     id="email"
                     type="email"
                     placeholder="Enter your email"
                     value={formDetails.email}
                     onChange={handleInputChange}
                     required
                     disabled={loading}
                  />
                  <TextInput
                     id="address"
                     type="text"
                     placeholder="Enter your address"
                     value={formDetails.address}
                     onChange={handleInputChange}
                     required
                     disabled={loading}
                  />
                  <TextInput
                     id="phone"
                     type="text"
                     placeholder="Enter your phone number"
                     value={formDetails.phone}
                     onChange={handleInputChange}
                     required
                     disabled={loading}
                  />
                  <Select
                     id="city"
                     value={formDetails.city}
                     onChange={handleInputChange}
                     required
                     disabled={loading}
                  >
                     <option value="" disabled>Select your city</option>
                     <option value="Ancaster">Ancaster</option>
                     <option value="Brampton">Brampton</option>
                     <option value="Brantford">Brantford</option>
                     <option value="Burlington">Burlington</option>
                     <option value="Caledonia">Caledonia</option>
                     <option value="Cayuga">Cayuga</option>
                     <option value="Dundas">Dundas</option>
                     <option value="Dunnville">Dunnville</option>
                     <option value="Fort Erie">Fort Erie</option>
                     <option value="Grimsby">Grimsby</option>
                     <option value="Hamilton">Hamilton</option>
                     <option value="Kitchener">Kitchener</option>
                     <option value="Mississauga">Mississauga</option>
                     <option value="Newmarket">Newmarket</option>
                     <option value="Niagara Falls">Niagara Falls</option>
                     <option value="Oakville">Oakville</option>
                     <option value="Oshawa">Oshawa</option>
                     <option value="Pickering">Pickering</option>
                     <option value="Port Colborne">Port Colborne</option>
                     <option value="Richmond Hill">Richmond Hill</option>
                     <option value="St. Catharines">St. Catharines</option>
                     <option value="Stoney Creek">Stoney Creek</option>
                     <option value="Toronto">Toronto</option>
                     <option value="Vaughan">Vaughan</option>
                     <option value="Vineland">Vineland</option>
                     <option value="Waterloo">Waterloo</option>
                     <option value="Welland">Welland</option>
                     <option value="Whitby">Whitby</option>
                     <option value="Woodbridge">Woodbridge</option>
                  </Select>
                  <Select
                     id="service"
                     value={formDetails.service}
                     onChange={handleInputChange}
                     required
                     disabled={loading}
                  >
                     <option value="" disabled>Select the kind of service</option>
                     <option value="Concrete Builds">Concrete Services</option>
                     <option value="Interlocks Services">Interlocks Services</option>
                     {/* <option value="Stone Walkways">Stone Walkways</option> */}
                     <option value="Retaining Walls">Retaining Walls</option>
                     <option value="Wood Decks">Wood Decks</option>
                     <option value="Fences">Fences</option>
                     <option value="Kitchen Renovations">Kitchen Renovations</option>
                     {/* <option value="Home Additions">Home Additions</option> */}
                     <option value="Basement Renovations">Basement Renovations</option>
                     <option value="Bathroom Renovations">Bathroom Renovations</option>
                     <option value="Custom Landscapes">Custom Landscapes</option>
                     {/* <option value="Custom Pools & Spas">Custom Pools & Spas</option> */}
                  </Select>
                  {loading && (
                     <div className="flex justify-center mt-4">
                        <Spinner size="lg" />
                     </div>
                  )}
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => handleSlotClick(selectedDate.hour)} disabled={loading}>
                  {loading ? 'Loading...' : 'OK'}
               </Button>
               <Button color="gray" onClick={handleCancel} disabled={loading}>Cancel</Button>
            </Modal.Footer>
         </Modal>

         <Modal show={showConfirmationModal} onClose={() => setShowConfirmationModal(false)}>
            <Modal.Header>
               <h2 className="text-xl font-semibold">Appointment Confirmed</h2>
            </Modal.Header>
            <Modal.Body>
               <div className="space-y-6">
                  <Alert color="success" withBorderAccent>
                     <span>
                        <strong className="text-lg">Success!</strong> Your appointment has been confirmed.
                     </span>
                  </Alert>
                  <div className="p-4 border rounded-lg shadow-md bg-gray-50">
                     <h3 className="text-lg font-medium text-gray-700">Appointment Details</h3>
                     <p className="text-gray-600">Date: <strong>{confirmationDetails.date}</strong></p>
                     <p className="text-gray-600">Time: <strong>{confirmationDetails.start} to {confirmationDetails.end}</strong></p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-md bg-gray-50">
                     <h3 className="text-lg font-medium text-gray-700">Next Steps</h3>
                     <p className="text-gray-600">A representative from NexRenovations will contact you within 24 hours to confirm the details.</p>
                     <p className="text-gray-600">For more information, please call <a href="tel:6478352021" className="text-blue-500 underline">647-835-2021</a>.</p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-md bg-gray-50">
                     <h3 className="text-lg font-medium text-gray-700">Contact</h3>
                     <p className="text-gray-600">If you have any questions, feel free to reach out to our representative.</p>
                     <a href="tel:6478352021" className="text-blue-500 underline">Call Representative</a>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => setShowConfirmationModal(false)}>OK</Button>
            </Modal.Footer>
         </Modal>

         <Modal show={showErrorModal} onClose={() => setShowErrorModal(false)}>
            <Modal.Header>Appointment Error</Modal.Header>
            <Modal.Body>
               <div className="space-y-6">
                  <p>{errorMessage}</p>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => setShowErrorModal(false)}>OK</Button>
            </Modal.Footer>
         </Modal>

         {loading && (
            <div className="flex justify-center items-center mt-4">
               <Spinner size="lg" />
            </div>
         )}
      </>
   );
}
