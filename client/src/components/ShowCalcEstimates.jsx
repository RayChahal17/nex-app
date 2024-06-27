import React, { useEffect, useState } from 'react';
import { Button, Table, Dropdown, Select, Modal, Spinner } from 'flowbite-react';

export default function ShowCalcEstimates() {
   const [estimates, setEstimates] = useState([]);
   const [filteredEstimates, setFilteredEstimates] = useState([]);
   const [selectedEstimate, setSelectedEstimate] = useState(null);
   const [sortKey, setSortKey] = useState('date');
   const [sortOrder, setSortOrder] = useState('asc');
   const [statusFilter, setStatusFilter] = useState('All');
   const [statusOptions] = useState([
      'All', 'Est. Pending', 'Est. Completed', 'Est. Cancelled', 'Est. Provided', 'Est. Successful',
      'Est. Failed', 'Est. Inconsequential', 'Est. Waiting', 'Job Pending', 'Job Waiting', 'Job In Progress', 'Job Completed'
   ]);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showStatusModal, setShowStatusModal] = useState(false);
   const [estimateToDelete, setEstimateToDelete] = useState(null);
   const [loading, setLoading] = useState(false);
   const [estimateToUpdate, setEstimateToUpdate] = useState(null);
   const [newStatus, setNewStatus] = useState('');

   useEffect(() => {
      fetchEstimates();
   }, []);

   useEffect(() => {
      filterAndSortEstimates();
   }, [estimates, statusFilter, sortKey, sortOrder]);

   const fetchEstimates = async () => {
      setLoading(true);
      try {
         const response = await fetch('/api/calc-estimate');
         const data = await response.json();
         setEstimates(data.estimates);
      } catch (error) {
         console.error('Error fetching estimates:', error);
      } finally {
         setLoading(false);
      }
   };

   const filterAndSortEstimates = () => {
      let updatedEstimates = [...estimates];
      if (statusFilter !== 'All') {
         updatedEstimates = updatedEstimates.filter(estimate => estimate.status === statusFilter);
      }
      sortEstimates(updatedEstimates);
   };

   const sortEstimates = (estimatesToSort) => {
      const sorted = [...estimatesToSort].sort((a, b) => {
         let comparison = 0;
         if (sortKey === 'date') {
            comparison = new Date(a.date) - new Date(b.date);
         } else if (sortKey === 'customerInfo.name') {
            comparison = a.customerInfo.name.localeCompare(b.customerInfo.name);
         } else if (sortKey === 'serviceType' || sortKey === 'status') {
            comparison = a[sortKey].localeCompare(b[sortKey]);
         }
         return sortOrder === 'asc' ? comparison : -comparison;
      });
      setFilteredEstimates(sorted);
   };

   const handleSortChange = (key) => {
      if (sortKey === key) {
         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
         setSortKey(key);
         setSortOrder('asc');
      }
   };

   const handleStatusFilterChange = (status) => {
      setStatusFilter(status);
   };

   const handleViewClick = (estimate) => {
      setSelectedEstimate(estimate);
   };

   const handleDeleteClick = (estimate) => {
      setEstimateToDelete(estimate);
      setShowDeleteModal(true);
   };

   const confirmDelete = async () => {
      try {
         await fetch(`/api/calc-estimate/${estimateToDelete._id}`, {
            method: 'DELETE',
         });
         setShowDeleteModal(false);
         fetchEstimates();
      } catch (error) {
         console.error('Error deleting estimate:', error);
      }
   };

   const handleStatusChange = (id, newStatus) => {
      setEstimateToUpdate(id);
      setNewStatus(newStatus);
      setShowStatusModal(true);
   };

   // Confirm status change in your React component
   const confirmStatusChange = async () => {
      try {
         const response = await fetch(`/api/estimate/${estimateToUpdate}/status`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
         });

         if (response.ok) {
            const updatedEstimates = estimates.map(est =>
               est._id === estimateToUpdate ? { ...est, status: newStatus } : est
            );
            setEstimates(updatedEstimates);
            setFilteredEstimates(updatedEstimates);
            if (selectedEstimate && selectedEstimate._id === estimateToUpdate) {
               setSelectedEstimate({ ...selectedEstimate, status: newStatus });
            }
         } else {
            console.error('Failed to update status', response);
         }
      } catch (error) {
         console.error('Error updating status:', error);
      } finally {
         setShowStatusModal(false);
      }
   };



   const renderEstimateDetails = () => {
      if (!selectedEstimate) return null;
      const {
         customerInfo, sections, additionalCosts = {}, stairs, costPerSqFeet, discount, discountType, finalEstimate,
         discountedEstimate, serviceType, note
      } = selectedEstimate;
      const hst = 0.13;
      const hstAmount = discountedEstimate * hst;
      const totalWithHst = discountedEstimate + hstAmount;
      const totalArea = sections.reduce((sum, section) => sum + section.area, 0);

      return (
         <Modal show={!!selectedEstimate} onClose={() => setSelectedEstimate(null)} size="5xl">
            <Modal.Header>Estimate Details</Modal.Header>
            <Modal.Body>
               <div className="p-4">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div>
                           <p><strong>Name:</strong> {customerInfo.name}</p>
                           <p><strong>Address:</strong> {customerInfo.address}</p>
                        </div>
                        <div>
                           <p><strong>City:</strong> {customerInfo.city}</p>
                           <p><strong>Phone:</strong> {customerInfo.phone}</p>
                           <p><strong>Email:</strong> {customerInfo.email}</p>
                        </div>
                     </div>
                     <h2 className="text-2xl font-bold mb-4">Service Type</h2>
                     <p className="mb-8">{serviceType}</p>
                     <h2 className="text-2xl font-bold mb-4">Section Details</h2>
                     <table className="min-w-full bg-white mb-8 border">
                        <thead>
                           <tr>
                              <th className="py-2 text-left border">Name</th>
                              <th className="py-2 text-left border">Type</th>
                              <th className="py-2 text-left border">Area (sq ft)</th>
                           </tr>
                        </thead>
                        <tbody>
                           {sections.map((section, index) => (
                              <tr key={index}>
                                 <td className="py-2 border-t">{section.name || `Section ${index + 1}`}</td>
                                 <td className="py-2 border-t">{section.type}</td>
                                 <td className="py-2 border-t">{section.area.toFixed(2)}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                     <p className="text-right font-bold">Total Area: {totalArea.toFixed(2)} sq ft</p>
                     <h2 className="text-2xl font-bold mb-4">Additional Costs</h2>
                     <table className="min-w-full bg-white mb-8 border">
                        <thead>
                           <tr>
                              <th className="py-2 text-left border">Description</th>
                              <th className="py-2 text-left border">Amount</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className="py-2 border-t">Demolition Charges</td>
                              <td className="py-2 border-t">${additionalCosts.demolition || 0}</td>
                           </tr>
                           <tr>
                              <td className="py-2 border-t">Bin Charges</td>
                              <td className="py-2 border-t">${additionalCosts.bin || 0}</td>
                           </tr>
                           <tr>
                              <td className="py-2 border-t">Labor Charges</td>
                              <td className="py-2 border-t">${additionalCosts.labor || 0}</td>
                           </tr>
                           <tr>
                              <td className="py-2 border-t">Iron Mesh and Reinforcements Charges</td>
                              <td className="py-2 border-t">${additionalCosts.ironMesh || 0}</td>
                           </tr>
                           <tr>
                              <td className="py-2 border-t">Miscellaneous Charges</td>
                              <td className="py-2 border-t">${additionalCosts.miscellaneous || 0}</td>
                           </tr>
                        </tbody>
                     </table>
                     <h2 className="text-2xl font-bold mb-4">Stairs</h2>
                     <p><strong>Number of Stairs:</strong> {stairs.numberOfStairs}</p>
                     <p><strong>Cost Per Stair:</strong> ${stairs.costPerStair.toFixed(2)}</p>
                     <p><strong>Total Cost of Stairs:</strong> ${stairs.totalCost.toFixed(2)}</p>
                     <h2 className="text-2xl font-bold mb-4">Cost Per Square Feet</h2>
                     <p><strong>Cost Per Sq Ft:</strong> ${costPerSqFeet}</p>
                     {discount > 0 && (
                        <>
                           <h2 className="text-2xl font-bold mb-4">Discount</h2>
                           <p><strong>Discount Type:</strong> {discountType}</p>
                           <p><strong>Discount:</strong> {discountType === 'percentage' ? `${discount}%` : `$${discount}`}</p>
                           <h2 className="text-2xl font-bold mb-4">Final Estimate</h2>
                           <p className="text-lg line-through">${finalEstimate.toFixed(2)}</p>
                           <p className="text-lg">${discountedEstimate.toFixed(2)}</p>
                        </>
                     )}
                     <h2 className="text-2xl font-bold mb-4">Total without HST</h2>
                     <p className="text-lg">${discountedEstimate.toFixed(2)}</p>
                     <h2 className="text-2xl font-bold mb-4">Total with HST (13%)</h2>
                     <p><strong>HST Amount:</strong> ${hstAmount.toFixed(2)}</p>
                     <p><strong>Total Estimate with HST:</strong> ${totalWithHst.toFixed(2)}</p>
                     {note && (
                        <>
                           <h2 className="text-2xl font-bold mb-4">Additional Notes</h2>
                           <p>{note}</p>
                        </>
                     )}
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => setSelectedEstimate(null)} gradientMonochrome="info" size="sm">
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      );
   };

   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">All Estimates</h1>
         <div className="flex justify-between items-center mb-4">
            <Dropdown label="Sort by">
               <Dropdown.Item onClick={() => handleSortChange('date')}>Date (Closest)</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('date')}>Date (Farthest)</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('serviceType')}>Service Type</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('status')}>Status</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('customerInfo.name')}>Customer Name</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Filter by Status">
               {statusOptions.map(status => (
                  <Dropdown.Item key={status} onClick={() => handleStatusFilterChange(status)}>
                     {status}
                  </Dropdown.Item>
               ))}
            </Dropdown>
            <Button onClick={fetchEstimates} gradientMonochrome="info" size="sm">
               Refresh
            </Button>
         </div>
         {loading ? (
            <div className="flex justify-center items-center">
               <Spinner size="xl" />
            </div>
         ) : (
            <Table hoverable className="mt-4">
               <Table.Head>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Customer Name</Table.HeadCell>
                  <Table.HeadCell>Address</Table.HeadCell>
                  <Table.HeadCell>City</Table.HeadCell>
                  <Table.HeadCell>Estimated Cost</Table.HeadCell>
                  <Table.HeadCell>Service Type</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
               </Table.Head>
               <Table.Body>
                  {filteredEstimates.map((estimate) => (
                     <Table.Row
                        key={estimate._id}
                        className={
                           ['Job Pending', 'Job Waiting', 'Job In Progress'].includes(estimate.status)
                              ? 'font-bold text-green-600'
                              : estimate.status === 'Job Completed'
                                 ? 'text-blue-600 font-bold'
                                 : ''
                        }
                     >
                        <Table.Cell>{new Date(estimate.date).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>{estimate.customerInfo.name}</Table.Cell>
                        <Table.Cell>{estimate.customerInfo.address}</Table.Cell>
                        <Table.Cell>{estimate.customerInfo.city}</Table.Cell>
                        <Table.Cell>${estimate.discountedEstimate.toFixed(2)}</Table.Cell>
                        <Table.Cell>{estimate.serviceType}</Table.Cell>
                        <Table.Cell>
                           <Select
                              value={estimate.status}
                              onChange={(e) => handleStatusChange(estimate._id, e.target.value)}
                              size="sm"
                           >
                              {statusOptions.slice(1).map(status => (
                                 <option
                                    key={status}
                                    value={status}
                                    className={`
                        ${['Job Pending', 'Job Waiting', 'Job In Progress'].includes(status) ? 'font-bold text-green-600' : ''}
                        ${status === 'Job Completed' ? 'font-bold text-blue-600' : ''}
                     `}
                                 >
                                    {status}
                                 </option>
                              ))}
                           </Select>
                        </Table.Cell>
                        <Table.Cell>
                           <Button onClick={() => handleViewClick(estimate)} gradientMonochrome="info" size="sm">
                              View
                           </Button>
                           <Button onClick={() => handleDeleteClick(estimate)} gradientMonochrome="failure" size="sm" className="ml-2">
                              Delete
                           </Button>
                        </Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>

            </Table>
         )}
         {estimateToDelete && (
            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
               <Modal.Header>Delete Estimate</Modal.Header>
               <Modal.Body>
                  <p>Are you sure you want to delete this estimate?</p>
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={confirmDelete} gradientMonochrome="failure" size="sm">
                     Confirm
                  </Button>
                  <Button onClick={() => setShowDeleteModal(false)} gradientMonochrome="gray" size="sm" className="ml-2">
                     Cancel
                  </Button>
               </Modal.Footer>
            </Modal>
         )}
         {showStatusModal && (
            <Modal show={showStatusModal} onClose={() => setShowStatusModal(false)}>
               <Modal.Header>Change Status</Modal.Header>
               <Modal.Body>
                  <p>Are you sure you want to change the status to "{newStatus}"?</p>
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={confirmStatusChange} gradientMonochrome="success" size="sm">
                     Confirm
                  </Button>
                  <Button onClick={() => setShowStatusModal(false)} gradientMonochrome="gray" size="sm" className="ml-2">
                     Cancel
                  </Button>
               </Modal.Footer>
            </Modal>
         )}
         {renderEstimateDetails()}
      </div>
   );
}
