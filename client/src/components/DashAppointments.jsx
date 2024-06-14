import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Alert, Modal, Dropdown } from 'flowbite-react';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

export default function DashAppointments() {
   const [appointments, setAppointments] = useState([]);
   const [confirmedAppointments, setConfirmedAppointments] = useState([]);
   const [deletedAppointments, setDeletedAppointments] = useState([]);
   const [filteredAppointments, setFilteredAppointments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [showConfirmModal, setShowConfirmModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [selectedAppointment, setSelectedAppointment] = useState(null);
   const [filter, setFilter] = useState('all');
   const [sortCriteria, setSortCriteria] = useState('date-new');
   const [sortLabel, setSortLabel] = useState('Closest Appointments');

   useEffect(() => {
      fetchAppointments();
   }, []);

   useEffect(() => {
      applyFilters();
   }, [appointments, confirmedAppointments, deletedAppointments, filter, sortCriteria]);

   const fetchAppointments = async () => {
      setLoading(true);
      try {
         const response = await fetch('/api/estimate');
         if (!response.ok) {
            throw new Error(`Error fetching appointments: ${response.statusText}`);
         }
         const data = await response.json();
         setAppointments(data.pendingEstimates);
         setConfirmedAppointments(data.confirmedEstimates);
         setDeletedAppointments(data.deletedEstimates);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   const applyFilters = () => {
      let filtered = [];
      if (filter === 'all') {
         filtered = [...appointments, ...confirmedAppointments];
      } else if (filter === 'unconfirmed') {
         filtered = appointments;
      } else if (filter === 'confirmed') {
         filtered = confirmedAppointments;
      } else if (filter === 'deleted') {
         filtered = deletedAppointments;
      }

      if (sortCriteria === 'date-new') {
         filtered.sort((a, b) => new Date(b.busyTimeRanges[0].start) - new Date(a.busyTimeRanges[0].start));
         setSortLabel('Closest Appointments');
      } else if (sortCriteria === 'date-old') {
         filtered.sort((a, b) => new Date(a.busyTimeRanges[0].start) - new Date(b.busyTimeRanges[0].start));
         setSortLabel('Farthest Appointments');
      } else if (sortCriteria === 'name') {
         filtered.sort((a, b) => a.busyTimeRanges[0].name.localeCompare(b.busyTimeRanges[0].name));
         setSortLabel('Name');
      } else if (sortCriteria === 'city') {
         filtered.sort((a, b) => a.busyTimeRanges[0].city.localeCompare(b.busyTimeRanges[0].city));
         setSortLabel('City');
      } else if (sortCriteria === 'service') {
         filtered.sort((a, b) => a.busyTimeRanges[0].service.localeCompare(b.busyTimeRanges[0].service));
         setSortLabel('Service Type');
      }

      setFilteredAppointments(filtered);
   };

   const confirmAppointment = async () => {
      try {
         const response = await fetch(`/api/estimate/${selectedAppointment._id}/confirm`, {
            method: 'PATCH',
         });
         if (!response.ok) {
            throw new Error(`Error confirming appointment: ${response.statusText}`);
         }
         sendConfirmationEmail(selectedAppointment);
         fetchAppointments(); // Refresh the appointments list
         setShowConfirmModal(false);
      } catch (err) {
         setError(err.message);
      }
   };

   const deleteAppointment = async () => {
      try {
         const endpoint =
            filter === 'deleted'
               ? `/api/estimate/${selectedAppointment._id}/permanent-delete`
               : `/api/estimate/${selectedAppointment._id}`;
         const response = await fetch(endpoint, {
            method: 'DELETE',
         });
         if (!response.ok) {
            throw new Error(`Error deleting appointment: ${response.statusText}`);
         }
         fetchAppointments(); // Refresh the appointments list
         setShowDeleteModal(false);
      } catch (err) {
         setError(err.message);
      }
   };

   const sendConfirmationEmail = async (appointment) => {
      try {
         const response = await fetch('/api/send-confirmation-email', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
         });
         if (!response.ok) {
            throw new Error(`Error sending email: ${response.statusText}`);
         }
      } catch (err) {
         console.error('Error sending confirmation email:', err.message);
      }
   };

   const handleConfirmClick = (appointment) => {
      setSelectedAppointment(appointment);
      setShowConfirmModal(true);
   };

   const handleDeleteClick = (appointment) => {
      setSelectedAppointment(appointment);
      setShowDeleteModal(true);
   };

   if (loading) return <Spinner size="lg" />;
   if (error) return <Alert color="failure">{error}</Alert>;

   return (
      <div className="p-4 w-full">
         <h1 className="text-2xl font-bold mb-4">Appointments</h1>
         <div className="mb-4 flex justify-between items-center">
            <div>
               <select onChange={(e) => setFilter(e.target.value)} value={filter} className="form-select">
                  <option value="all">All Appointments</option>
                  <option value="unconfirmed">Unconfirmed Appointments</option>
                  <option value="confirmed">Confirmed Appointments</option>
                  <option value="deleted">Deleted Appointments</option>
               </select>
            </div>
            <div>
               <Dropdown label={sortLabel}>
                  <Dropdown.Item onClick={() => setSortCriteria('date-new')}>
                     <HiSortAscending className="inline-block mr-2" />
                     Closest Appointments
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortCriteria('date-old')}>
                     <HiSortDescending className="inline-block mr-2" />
                     Farthest Appointments
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortCriteria('name')}>Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortCriteria('city')}>City</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortCriteria('service')}>Service Type</Dropdown.Item>
               </Dropdown>
            </div>
         </div>
         <Table hoverable={true}>
            <Table.Head>
               <Table.HeadCell>Name</Table.HeadCell>
               <Table.HeadCell>Email</Table.HeadCell>
               <Table.HeadCell>Phone</Table.HeadCell>
               <Table.HeadCell>City</Table.HeadCell>
               <Table.HeadCell>Service</Table.HeadCell>
               <Table.HeadCell>Date</Table.HeadCell>
               <Table.HeadCell>Time</Table.HeadCell>
               <Table.HeadCell>Confirmed</Table.HeadCell>
               <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
               {filteredAppointments.map((appointment) => (
                  <Table.Row key={appointment._id}>
                     <Table.Cell>{appointment.busyTimeRanges[0].name}</Table.Cell>
                     <Table.Cell>{appointment.busyTimeRanges[0].email}</Table.Cell>
                     <Table.Cell>{appointment.busyTimeRanges[0].phone}</Table.Cell>
                     <Table.Cell>{appointment.busyTimeRanges[0].city}</Table.Cell>
                     <Table.Cell>{appointment.busyTimeRanges[0].service}</Table.Cell>
                     <Table.Cell>{appointment.date}</Table.Cell>
                     <Table.Cell>{new Date(appointment.busyTimeRanges[0].start).toLocaleTimeString()}</Table.Cell>
                     <Table.Cell>{appointment.busyTimeRanges[0].confirmed ? 'Yes' : 'No'}</Table.Cell>
                     <Table.Cell className="space-x-2">
                        {filter !== 'confirmed' && filter !== 'deleted' && !appointment.busyTimeRanges[0].confirmed && (
                           <Button
                              size="xs"
                              color="success"
                              onClick={() => handleConfirmClick(appointment)}
                           >
                              Confirm
                           </Button>
                        )}
                        <Button
                           size="xs"
                           color="failure"
                           onClick={() => handleDeleteClick(appointment)}
                           className="ml-2"
                        >
                           Delete
                        </Button>
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table>

         <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
            <Modal.Header>Confirm Appointment</Modal.Header>
            <Modal.Body>
               <p>Are you sure you want to confirm this appointment?</p>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={confirmAppointment} color="success">Yes, Confirm</Button>
               <Button onClick={() => setShowConfirmModal(false)} color="gray">Cancel</Button>
            </Modal.Footer>
         </Modal>

         <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
            <Modal.Header>Delete Appointment</Modal.Header>
            <Modal.Body>
               <p>Are you sure you want to delete this appointment?</p>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={deleteAppointment} color="failure">Yes, Delete</Button>
               <Button onClick={() => setShowDeleteModal(false)} color="gray">Cancel</Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}
