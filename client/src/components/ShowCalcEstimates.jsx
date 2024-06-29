import React, { useEffect, useState } from 'react';
import { Button, Table, Dropdown, Select, Modal, Spinner } from 'flowbite-react';
import i18nShowCalcEstimate from '../utils/i18nShowCalcEstimate';
import { useTranslation } from 'react-i18next';


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
   const [statusChangeMessage, setStatusChangeMessage] = useState('');
   const [showStatusChangeMessageModal, setShowStatusChangeMessageModal] = useState(false);


   const { t } = useTranslation();

   const changeLanguage = (lng) => {
      i18nShowCalcEstimate.changeLanguage(lng);
   };


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

   const handleStatusChange = (id, newStatus) => {
      setEstimateToUpdate(id);
      setNewStatus(newStatus);
      setShowStatusModal(true);
   };

   const confirmStatusChange = async () => {
      try {
         const currentJobResponse = await fetch(`/api/current-jobs/${estimateToUpdate}`);
         const currentJobData = await currentJobResponse.json();

         if (currentJobData && currentJobData.job) {
            if (['Job Pending', 'Job Waiting', 'Job In Progress'].includes(currentJobData.job.status)) {
               setShowStatusModal(false);
               setStatusChangeMessage("The estimate is already moved to the scheduler and this action cannot be done.");
               setShowStatusChangeMessageModal(true);
               return; // Exit the function without updating the status
            }
         }

         // Update the status if the job does not exist in current jobs or has a different status
         await updateEstimateStatus();

      } catch (error) {
         console.error('Error checking current job status:', error);
      }
   };


   const updateEstimateStatus = async () => {
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
            setShowStatusModal(false);
            setStatusChangeMessage("The job has been added to the scheduler.");
            setShowStatusChangeMessageModal(true);
         } else {
            console.error('Failed to update status', response);
         }
      } catch (error) {
         console.error('Error updating status:', error);
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
            <Modal.Header>{t('Estimate Details')}</Modal.Header>
            <Modal.Body>
                <div className="p-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{t('Customer Information')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div>
                                <p><strong>{t('Name')}:</strong> {customerInfo.name}</p>
                                <p><strong>{t('Address')}:</strong> {customerInfo.address}</p>
                            </div>
                            <div>
                                <p><strong>{t('City')}:</strong> {customerInfo.city}</p>
                                <p><strong>{t('Phone')}:</strong> {customerInfo.phone}</p>
                                <p><strong>{t('Email')}:</strong> {customerInfo.email}</p>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">{t('Service Type')}</h2>
                        <p className="mb-8">{serviceType}</p>
                        <h2 className="text-2xl font-bold mb-4">{t('Section Details')}</h2>
                        <table className="min-w-full bg-white mb-8 border">
                            <thead>
                                <tr>
                                    <th className="py-2 text-left border">{t('Name')}</th>
                                    <th className="py-2 text-left border">{t('Type')}</th>
                                    <th className="py-2 text-left border">{t('Area (sq ft)')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sections.map((section, index) => (
                                    <tr key={index}>
                                        <td className="py-2 border-t">{section.name || `${t('Section')} ${index + 1}`}</td>
                                        <td className="py-2 border-t">{section.type}</td>
                                        <td className="py-2 border-t">{section.area.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-right font-bold">{t('Total Area')}: {totalArea.toFixed(2)} {t('sq ft')}</p>
                        <h2 className="text-2xl font-bold mb-4">{t('Additional Costs')}</h2>
                        <table className="min-w-full bg-white mb-8 border">
                            <thead>
                                <tr>
                                    <th className="py-2 text-left border">{t('Description')}</th>
                                    <th className="py-2 text-left border">{t('Amount')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 border-t">{t('Demolition Charges')}</td>
                                    <td className="py-2 border-t">${additionalCosts.demolition || 0}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-t">{t('Bin Charges')}</td>
                                    <td className="py-2 border-t">${additionalCosts.bin || 0}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-t">{t('Labor Charges')}</td>
                                    <td className="py-2 border-t">${additionalCosts.labor || 0}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-t">{t('Iron Mesh and Reinforcements Charges')}</td>
                                    <td className="py-2 border-t">${additionalCosts.ironMesh || 0}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-t">{t('Miscellaneous Charges')}</td>
                                    <td className="py-2 border-t">${additionalCosts.miscellaneous || 0}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className="text-2xl font-bold mb-4">{t('Stairs')}</h2>
                        <p><strong>{t('Number of Stairs')}:</strong> {stairs.numberOfStairs}</p>
                        <p><strong>{t('Cost Per Stair')}:</strong> ${stairs.costPerStair.toFixed(2)}</p>
                        <p><strong>{t('Total Cost of Stairs')}:</strong> ${stairs.totalCost.toFixed(2)}</p>
                        <h2 className="text-2xl font-bold mb-4">{t('Cost Per Square Feet')}</h2>
                        <p><strong>{t('Cost Per Sq Ft')}:</strong> ${costPerSqFeet}</p>
                        {discount > 0 && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{t('Discount')}</h2>
                                <p><strong>{t('Discount Type')}:</strong> {discountType}</p>
                                <p><strong>{t('Discount')}:</strong> {discountType === 'percentage' ? `${discount}%` : `$${discount}`}</p>
                                <h2 className="text-2xl font-bold mb-4">{t('Final Estimate')}</h2>
                                <p className="text-lg line-through">${finalEstimate.toFixed(2)}</p>
                                <p className="text-lg">${discountedEstimate.toFixed(2)}</p>
                            </>
                        )}
                        <h2 className="text-2xl font-bold mb-4">{t('Total without HST')}</h2>
                        <p className="text-lg">${discountedEstimate.toFixed(2)}</p>
                        <h2 className="text-2xl font-bold mb-4">{t('Total with HST (13%)')}</h2>
                        <p><strong>{t('HST Amount')}:</strong> ${hstAmount.toFixed(2)}</p>
                        <p><strong>{t('Total Estimate with HST')}:</strong> ${totalWithHst.toFixed(2)}</p>
                        {note && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{t('Additional Notes')}</h2>
                                <p>{note}</p>
                            </>
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setSelectedEstimate(null)} gradientMonochrome="info" size="sm">
                    {t('Close')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">{t('All Estimates')}</h1>
         <div className="flex justify-between items-center mb-4">
            <Dropdown label={t('Sort by')}>
               <Dropdown.Item onClick={() => handleSortChange('date')}>{t('Date (Closest)')}</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('date')}>{t('Date (Farthest)')}</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('serviceType')}>{t('Service Type')}</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('status')}>{t('Status')}</Dropdown.Item>
               <Dropdown.Item onClick={() => handleSortChange('customerInfo.name')}>{t('Customer Name')}</Dropdown.Item>
            </Dropdown>
            <Dropdown label={t('Filter by Status')}>
               {statusOptions.map(status => (
                  <Dropdown.Item key={status} onClick={() => handleStatusFilterChange(status)}>
                     {t(status)}
                  </Dropdown.Item>
               ))}
            </Dropdown>
            <Button onClick={fetchEstimates} gradientMonochrome="info" size="sm">
               {t('Refresh')}
            </Button>
            <Button onClick={() => changeLanguage('en')}>English</Button>
            <Button onClick={() => changeLanguage('pa')}>Punjabi</Button>
         </div>
         {loading ? (
            <div className="flex justify-center items-center">
               <Spinner size="xl" />
            </div>
         ) : (
            <Table hoverable className="mt-4">
               <Table.Head>
                  <Table.HeadCell>{t('Date')}</Table.HeadCell>
                  <Table.HeadCell>{t('Customer Name')}</Table.HeadCell>
                  <Table.HeadCell>{t('Address')}</Table.HeadCell>
                  <Table.HeadCell>{t('City')}</Table.HeadCell>
                  <Table.HeadCell>{t('Estimated Cost')}</Table.HeadCell>
                  <Table.HeadCell>{t('Service Type')}</Table.HeadCell>
                  <Table.HeadCell>{t('Status')}</Table.HeadCell>
                  <Table.HeadCell>{t('Actions')}</Table.HeadCell>
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
                                    {t(status)}
                                 </option>
                              ))}
                           </Select>
                        </Table.Cell>
                        <Table.Cell>
                           <Button onClick={() => handleViewClick(estimate)} gradientMonochrome="info" size="sm">
                              {t('View')}
                           </Button>
                           <Button onClick={() => handleDeleteClick(estimate)} gradientMonochrome="failure" size="sm" className="ml-2">
                              {t('Delete')}
                           </Button>
                        </Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>
            </Table>
         )}
         {estimateToDelete && (
            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
               <Modal.Header>{t('Delete Estimate')}</Modal.Header>
               <Modal.Body>
                  <p>{t('Are you sure you want to delete this estimate?')}</p>
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={confirmDelete} gradientMonochrome="failure" size="sm">
                     {t('Confirm')}
                  </Button>
                  <Button onClick={() => setShowDeleteModal(false)} gradientMonochrome="gray" size="sm" className="ml-2">
                     {t('Cancel')}
                  </Button>
               </Modal.Footer>
            </Modal>
         )}
         {showStatusModal && (
            <Modal show={showStatusModal} onClose={() => setShowStatusModal(false)}>
               <Modal.Header>{t('Change Status')}</Modal.Header>
               <Modal.Body>
                  <p>{t('Are you sure you want to change the status to')} "{t(newStatus)}"?</p>
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={confirmStatusChange} gradientMonochrome="success" size="sm">
                     {t('Confirm')}
                  </Button>
                  <Button onClick={() => setShowStatusModal(false)} gradientMonochrome="gray" size="sm" className="ml-2">
                     {t('Cancel')}
                  </Button>
               </Modal.Footer>
            </Modal>
         )}
         {showStatusChangeMessageModal && (
            <Modal show={showStatusChangeMessageModal} onClose={() => setShowStatusChangeMessageModal(false)}>
               <Modal.Header>{t('Status Change')}</Modal.Header>
               <Modal.Body>
                  <p>{statusChangeMessage}</p>
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={() => setShowStatusChangeMessageModal(false)} gradientMonochrome="info" size="sm">
                     {t('Close')}
                  </Button>
               </Modal.Footer>
            </Modal>
         )}
         {renderEstimateDetails()}
      </div>
   );
}

