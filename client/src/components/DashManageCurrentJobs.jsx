import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Spinner } from 'flowbite-react';

export default function ManageCurrentJobs() {
   const [currentJobs, setCurrentJobs] = useState([]);
   const [selectedJob, setSelectedJob] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      fetchCurrentJobs();
   }, []);

   const fetchCurrentJobs = async () => {
      setLoading(true);
      try {
         const response = await fetch('/api/current-jobs');
         const data = await response.json();
         setCurrentJobs(data.jobs);
      } catch (error) {
         console.error('Error fetching current jobs:', error);
      } finally {
         setLoading(false);
      }
   };

   const handleViewClick = (job) => {
      setSelectedJob(job);
   };

   const renderJobDetails = () => {
      if (!selectedJob) return null;
      const {
         customerInfo = {}, sections = [], additionalCosts = {}, stairs = {}, costPerSqFeet, discount, discountType, finalEstimate,
         discountedEstimate, serviceType, note, schedule = []
      } = selectedJob;
      const hst = 0.13;
      const hstAmount = discountedEstimate * hst;
      const totalWithHst = discountedEstimate + hstAmount;
      const totalArea = sections.reduce((sum, section) => sum + section.area, 0);

      return (
         <Modal show={!!selectedJob} onClose={() => setSelectedJob(null)} size="5xl">
            <Modal.Header>Job Details</Modal.Header>
            <Modal.Body>
               <div className="p-4">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div>
                           <p><strong>Name:</strong> {customerInfo.name || 'N/A'}</p>
                           <p><strong>Address:</strong> {customerInfo.address || 'N/A'}</p>
                        </div>
                        <div>
                           <p><strong>City:</strong> {customerInfo.city || 'N/A'}</p>
                           <p><strong>Phone:</strong> {customerInfo.phone || 'N/A'}</p>
                           <p><strong>Email:</strong> {customerInfo.email || 'N/A'}</p>
                        </div>
                     </div>
                     <h2 className="text-2xl font-bold mb-4">Service Type</h2>
                     <p className="mb-8">{serviceType || 'N/A'}</p>
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
                     <p><strong>Number of Stairs:</strong> {stairs.numberOfStairs || 0}</p>
                     <p><strong>Cost Per Stair:</strong> ${stairs.costPerStair?.toFixed(2) || 0}</p>
                     <p><strong>Total Cost of Stairs:</strong> ${stairs.totalCost?.toFixed(2) || 0}</p>
                     <h2 className="text-2xl font-bold mb-4">Cost Per Square Feet</h2>
                     <p><strong>Cost Per Sq Ft:</strong> ${costPerSqFeet || 0}</p>
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
                     <h2 className="text-2xl font-bold mb-4">Job Schedule</h2>
                     <table className="min-w-full bg-white mb-8 border">
                        <thead>
                           <tr>
                              <th className="py-2 text-left border">Date</th>
                              <th className="py-2 text-left border">Time</th>
                              <th className="py-2 text-left border">Notes</th>
                           </tr>
                        </thead>
                        <tbody>
                           {schedule.map((entry, index) => (
                              <tr key={index}>
                                 <td className="py-2 border-t">{entry.date}</td>
                                 <td className="py-2 border-t">{entry.time}</td>
                                 <td className="py-2 border-t">{entry.notes}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
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
               <Button onClick={() => setSelectedJob(null)} gradientMonochrome="info" size="sm">
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      );
   };

   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Current Jobs</h1>
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
                  {currentJobs.map((job) => (
                     <Table.Row key={job._id}>
                        <Table.Cell>{new Date(job.date).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>{job.customerInfo?.name || 'N/A'}</Table.Cell>
                        <Table.Cell>{job.customerInfo?.address || 'N/A'}</Table.Cell>
                        <Table.Cell>{job.customerInfo?.city || 'N/A'}</Table.Cell>
                        <Table.Cell>${job.discountedEstimate?.toFixed(2) || 'N/A'}</Table.Cell>
                        <Table.Cell>{job.serviceType || 'N/A'}</Table.Cell>
                        <Table.Cell>{job.status || 'N/A'}</Table.Cell>
                        <Table.Cell>
                           <Button onClick={() => handleViewClick(job)} gradientMonochrome="info" size="sm">
                              View
                           </Button>
                        </Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>
            </Table>
         )}
         {renderJobDetails()}
      </div>
   );
}
