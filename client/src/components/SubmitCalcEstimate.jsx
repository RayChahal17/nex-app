import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Spinner, Modal } from 'flowbite-react';
import { FaFilePdf, FaSave } from 'react-icons/fa';
import logo from '../assets/images/nex1.png';
import watermark from '../assets/images/blacknex.png';

export default function SubmitCalcEstimate({ formData }) {
   const { customerInfo, sections, additionalCosts, stairs, costPerSqFeet, discount, discountType, finalEstimate, discountedEstimate, serviceType, note } = formData;
   const hst = 0.13;
   const hstAmount = discountedEstimate * hst;
   const totalWithHst = discountedEstimate + hstAmount;
   const totalArea = sections.reduce((sum, section) => sum + section.area, 0);
   const [loading, setLoading] = useState(false);
   const [modalMessage, setModalMessage] = useState('');
   const [showModal, setShowModal] = useState(false);

   const generatePDF = async () => {
      setLoading(true);
      setModalMessage('');
      setShowModal(true);
      try {
         const input = document.getElementById('estimate-summary');
         const canvas = await html2canvas(input, { backgroundColor: null, allowTaint: true, useCORS: true });
         const ctx = canvas.getContext('2d');
         const img = new Image();
         img.src = watermark;
         await new Promise((resolve) => {
            img.onload = () => {
               ctx.globalAlpha = 0.1;
               const centerX = canvas.width / 2;
               const centerY = canvas.height / 2;
               const watermarkWidth = canvas.width * 0.5;
               const watermarkHeight = (img.height / img.width) * watermarkWidth;
               ctx.drawImage(img, centerX - watermarkWidth / 2, centerY - watermarkHeight / 2, watermarkWidth, watermarkHeight);
               resolve();
            };
         });
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF('p', 'mm', 'a4');
         const pdfWidth = pdf.internal.pageSize.getWidth();
         const pdfHeight = pdf.internal.pageSize.getHeight();
         const imgWidth = canvas.width;
         const imgHeight = canvas.height;
         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
         const width = imgWidth * ratio;
         const height = imgHeight * ratio;
         pdf.addImage(imgData, 'PNG', 0, 0, width, height);
         const pdfName = `${customerInfo.name}-${new Date().toLocaleDateString()}-${Math.floor(1000 + Math.random() * 9000)}.pdf`;
         pdf.save(pdfName);
         setModalMessage('PDF downloaded successfully.');
      } catch (error) {
         console.error('Error generating PDF:', error);
         setModalMessage('Error generating PDF.');
      } finally {
         setLoading(false);
      }
   };

   const handleSave = async () => {
      setLoading(true);
      setModalMessage('');
      setShowModal(true);
      try {
         const response = await fetch('/api/calc-estimate', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData }),
         });
         if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
         }
         const data = await response.json();
         console.log('Estimate saved and email sent:', data);
         setModalMessage('Estimate saved and email sent successfully.');
      } catch (error) {
         console.error('Error saving estimate or sending email:', error);
         setModalMessage('Error saving estimate or sending email.');
      } finally {
         setLoading(false);
      }
   };

   const closeModal = () => setShowModal(false);

   return (
      <div className="p-4 bg-gray-100 min-h-screen relative">
         <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
            <img src={watermark} alt="NexRenovations Watermark" className="w-full h-full object-cover" />
         </div>
         <h1 className="text-4xl font-bold mb-8 text-center">Estimate Summary</h1>
         <div id="estimate-summary" className="bg-white p-6 rounded-lg shadow-md relative z-10">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <img src={logo} alt="NexRenovations Logo" className="w-32 mb-4" />
                  <p className="font-bold">NexRenovations</p>
                  <p>(437) 799-2029</p>
{/*                   <p>info@nexrenovations.com</p> */}
               </div>
               <div className="text-right">
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Quote No:</strong> 001</p>
                  <p><strong>Customer ID:</strong> {customerInfo.customerId}</p>
               </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 ">Customer Information</h2>
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
            <h2 className="text-2xl font-bold mb-4 ">Service Type</h2>
            <p className="mb-8">{serviceType}</p>
            <h2 className="text-2xl font-bold mb-4 ">Section Details</h2>
            <table className="min-w-full bg-white mb-8">
               <thead>
                  <tr>
                     <th className="py-2 text-left">Name</th>
                     <th className="py-2 text-left">Type</th>
                     <th className="py-2 text-left">Area (sq ft)</th>
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
                  <tr>
                     <td className="py-2 border-t font-bold text-blue-600" colSpan="2">Total Area</td>
                     <td className="py-2 border-t font-bold text-blue-600">{totalArea.toFixed(2)} sq ft</td>
                  </tr>
               </tbody>
            </table>
            <h2 className="text-2xl font-bold mb-4 ">Additional Costs</h2>
            <table className="min-w-full bg-white mb-8">
               <thead>
                  <tr>
                     <th className="py-2 text-left">Description</th>
                     <th className="py-2 text-left">Amount</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td className="py-2 border-t">Demolition Charges</td>
                     <td className="py-2 border-t">${additionalCosts.demolition}</td>
                  </tr>
                  <tr>
                     <td className="py-2 border-t">Bin Charges</td>
                     <td className="py-2 border-t">${additionalCosts.bin}</td>
                  </tr>
                  <tr>
                     <td className="py-2 border-t">Labor Charges</td>
                     <td className="py-2 border-t">${additionalCosts.labor}</td>
                  </tr>
                  <tr>
                     <td className="py-2 border-t">Iron Mesh and Reinforcements Charges</td>
                     <td className="py-2 border-t">${additionalCosts.ironMesh}</td>
                  </tr>
                  <tr>
                     <td className="py-2 border-t">Miscellaneous Charges</td>
                     <td className="py-2 border-t">${additionalCosts.miscellaneous}</td>
                  </tr>
               </tbody>
            </table>
            <h2 className="text-2xl font-bold mb-4 ">Stairs</h2>
            <p><strong>Number of Stairs:</strong> {stairs.numberOfStairs}</p>
            <p><strong>Cost Per Stair:</strong> ${stairs.costPerStair.toFixed(2)}</p>
            <p><strong>Total Cost of Stairs:</strong> ${stairs.totalCost.toFixed(2)}</p><br></br>
            <h2 className="text-2xl font-bold mb-4 ">Cost Per Square Feet</h2>
            <p className='text-green-600'><strong>Cost Per Sq Ft:</strong> ${costPerSqFeet}</p><br></br>
            {note && (
               <>
                  <h2 className="text-2xl font-bold mb-4">Additional Notes</h2>
                  <p>{note}</p>
               </>
            )}
            {discount > 0 && (
               <>
                  <h2 className="text-2xl font-bold mb-4 ">Discount</h2>
                  <p><strong>Discount Type:</strong> {discountType}</p>
                  <p><strong>Discount:</strong> {discountType === 'percentage' ? `${discount}%` : `$${discount}`}</p><br></br>
                  <h2 className="text-2xl font-bold mb-4 ">Final Estimate</h2>
                  <p className="text-lg line-through">${finalEstimate.toFixed(2)}</p>
                  <p className="text-lg">${discountedEstimate.toFixed(2)}</p><br></br>
               </>
            )}
            <h2 className="text-2xl font-bold mb-4 text-green-600">Total Estimate without HST:</h2>
            <p className="text-green-600">${discountedEstimate.toFixed(2)}</p>
            <h2 className="text-2xl font-bold mb-4  text-blue-600">Total Estimate with HST (13%):</h2>
            <p className="text-blue-600">${totalWithHst.toFixed(2)}</p>
            
         </div>
         <div className="mt-4 flex justify-center">
            <Button onClick={generatePDF} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded">
               <FaFilePdf className="inline mr-2" /> Download PDF
            </Button>
            <Button onClick={handleSave} className="ml-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 rounded">
               <FaSave className="inline mr-2" /> Save Estimate and Send to Client
            </Button>
         </div>
         <Modal show={showModal} onClose={closeModal}>
            <Modal.Header>Processing</Modal.Header>
            <Modal.Body>
               {loading ? (
                  <div className="flex justify-center items-center">
                     <Spinner size="lg" />
                  </div>
               ) : (
                  <p>{modalMessage}</p>
               )}
            </Modal.Body>
            {!loading && (
               <Modal.Footer>
                  <Button onClick={closeModal} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded">
                     Close
                  </Button>
               </Modal.Footer>
            )}
         </Modal>
      </div>
   );
}
