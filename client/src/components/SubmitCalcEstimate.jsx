import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../assets/images/nex1.png';  // Update the path to your logo

export default function SubmitCalcEstimate({ formData }) {
  const { customerInfo, sections, additionalCosts, costPerSqFeet, discount, discountType, finalEstimate, discountedEstimate } = formData;

  const hst = 0.13;
  const hstAmount = discountedEstimate * hst;
  const totalWithHst = discountedEstimate + hstAmount;

  const generatePDF = () => {
    const input = document.getElementById('estimate-summary');
    html2canvas(input)
      .then((canvas) => {
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
        pdf.save('estimate-summary.pdf');
      });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      <div className="absolute inset-0 opacity-5 flex items-center justify-center">
        <img src={logo} alt="NexRenovations Logo" className="w-1/2" />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center">Estimate Summary</h1>
      <div id="estimate-summary" className="bg-white p-6 rounded-lg shadow-md relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <img src={logo} alt="NexRenovations Logo" className="w-32 mb-4" />
            <p className="font-bold">NexRenovations</p>
            {/* <p>123 Main Street</p>
            <p>City, State, ZIP</p> */}
            <p>(437) 799-2029</p>
            <p>email@example.com</p>
          </div>
          <div className="text-right">
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Quote No:</strong> 001</p>
            <p><strong>Customer ID:</strong> 12345</p>
          </div>
        </div>
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
        <h2 className="text-2xl font-bold mb-4">Section Details</h2>
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
          </tbody>
        </table>
        <h2 className="text-2xl font-bold mb-4">Additional Costs</h2>
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
              <td className="py-2 border-t">Iron Mesh Charges</td>
              <td className="py-2 border-t">${additionalCosts.ironMesh}</td>
            </tr>
            <tr>
              <td className="py-2 border-t">Miscellaneous Charges</td>
              <td className="py-2 border-t">${additionalCosts.miscellaneous}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-2xl font-bold mb-4">Cost Calculation</h2>
        <div className="mb-8">
          <p><strong>Cost Per Square Feet:</strong> ${costPerSqFeet}</p>
          {discount > 0 ? (
            <>
              <p><strong>Discount Type:</strong> {discountType === 'percentage' ? 'Percentage' : 'Fixed Amount'}</p>
              <p><strong>Discount:</strong> {discountType === 'percentage' ? `${discount}%` : `$${discount}`}</p>
              <p><strong>Final Estimate:</strong> <span className="line-through">${finalEstimate.toFixed(2)}</span> ${discountedEstimate.toFixed(2)}</p>
            </>
          ) : (
            <p><strong>Final Estimate:</strong> ${finalEstimate.toFixed(2)}</p>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4">Total with HST (13%)</h2>
        <div className="mb-8">
          <p><strong>HST Amount:</strong> ${hstAmount.toFixed(2)}</p>
          <p><strong>Total Estimate with HST:</strong> ${totalWithHst.toFixed(2)}</p>
        </div>
        <button
          onClick={generatePDF}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download PDF
        </button>
      </div>
    </div>
  );
}
