import CalcEstimate from '../models/calcEstimate.model.js';
import CurrentJob from '../models/currentJob.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();  // Ensure environment variables are loaded

const createEmailContent = (estimateData) => {
   const totalArea = estimateData.sections.reduce((sum, section) => sum + section.area, 0);

   return `
     <div style="font-family: Arial, sans-serif; color: #333;">
       <header style="text-align: center; padding: 20px; background-color: #f7f7f7; border-bottom: 1px solid #ccc;">
         <h1 style="color: #4CAF50;">NexRenovations Estimate</h1>
       </header>
       <main style="padding: 20px;">
         <section>
           <p>Dear ${estimateData.customerInfo.name},</p>
           <p>Thank you for considering NexRenovations. Here is your detailed estimate:</p>
         </section>
 
         <section style="margin-top: 20px;">
           <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Customer Information</h2>
           <p><strong>Name:</strong> ${estimateData.customerInfo.name}</p>
           <p><strong>Address:</strong> ${estimateData.customerInfo.address}</p>
           <p><strong>City:</strong> ${estimateData.customerInfo.city}</p>
           <p><strong>Phone:</strong> ${estimateData.customerInfo.phone}</p>
           <p><strong>Email:</strong> ${estimateData.customerInfo.email}</p>
                      <p><strong>Additional Notes:</strong> ${estimateData.customerInfo.note}</p>
         </section>
 
         <section style="margin-top: 20px;">
           <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Service Type</h2>
           <p>${estimateData.serviceType}</p>
         </section>
 
         <section style="margin-top: 20px;">
           <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Section Details</h2>
           <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
             <thead>
               <tr>
                 <th style="border: 1px solid #ccc; padding: 8px; background-color: #f7f7f7;">Name</th>
                 <th style="border: 1px solid #ccc; padding: 8px; background-color: #f7f7f7;">Type</th>
                 <th style="border: 1px solid #ccc; padding: 8px; background-color: #f7f7f7;">Area (sq ft)</th>
               </tr>
             </thead>
             <tbody>
               ${estimateData.sections.map(section => `
                 <tr>
                   <td style="border: 1px solid #ccc; padding: 8px;">${section.name}</td>
                   <td style="border: 1px solid #ccc; padding: 8px;">${section.type}</td>
                   <td style="border: 1px solid #ccc; padding: 8px;">${section.area.toFixed(2)}</td>
                 </tr>`).join('')}
               <tr>
                 <td colspan="2" style="border: 1px solid #ccc; padding: 8px; text-align: right;"><strong>Total Area:</strong></td>
                 <td style="border: 1px solid #ccc; padding: 8px;">${totalArea.toFixed(2)}</td>
               </tr>
             </tbody>
           </table>
         </section>
 
         <section style="margin-top: 20px;">
           <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Additional Costs</h2>
           <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
             <thead>
               <tr>
                 <th style="border: 1px solid #ccc; padding: 8px; background-color: #f7f7f7;">Description</th>
                 <th style="border: 1px solid #ccc; padding: 8px; background-color: #f7f7f7;">Amount</th>
               </tr>
             </thead>
             <tbody>
               <tr><td style="border: 1px solid #ccc; padding: 8px;">Demolition Charges</td><td style="border: 1px solid #ccc; padding: 8px;">$${estimateData.additionalCosts.demolition}</td></tr>
               <tr><td style="border: 1px solid #ccc; padding: 8px;">Bin Charges</td><td style="border: 1px solid #ccc; padding: 8px;">$${estimateData.additionalCosts.bin}</td></tr>
               <tr><td style="border: 1px solid #ccc; padding: 8px;">Labor Charges</td><td style="border: 1px solid #ccc; padding: 8px;">$${estimateData.additionalCosts.labor}</td></tr>
               <tr><td style="border: 1px solid #ccc; padding: 8px;">Iron Mesh and Reinforcements Charges</td><td style="border: 1px solid #ccc; padding: 8px;">$${estimateData.additionalCosts.ironMesh}</td></tr>
               <tr><td style="border: 1px solid #ccc; padding: 8px;">Miscellaneous Charges</td><td style="border: 1px solid #ccc; padding: 8px;">$${estimateData.additionalCosts.miscellaneous}</td></tr>
             </tbody>
           </table>
         </section>
 
         <section style="margin-top: 20px;">
           <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Stairs</h2>
           <p><strong>Number of Stairs:</strong> ${estimateData.stairs.numberOfStairs}</p>
           <p><strong>Cost Per Stair:</strong> ${estimateData.stairs.costPerStair.toFixed(2)}</p>
           <p><strong>Total Cost of Stairs:</strong> ${estimateData.stairs.totalCost.toFixed(2)}</p>
         </section>
 
         <section style="margin-top: 20px;">
           <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Cost Calculation</h2>
           <p><strong>Cost Per Square Feet:</strong> $${estimateData.costPerSqFeet}</p>
           ${estimateData.discount > 0 ? `
             <p><strong>Discount Type:</strong> ${estimateData.discountType === 'percentage' ? 'Percentage' : 'Fixed Amount'}</p>
             <p><strong>Discount:</strong> ${estimateData.discountType === 'percentage' ? `${estimateData.discount}%` : `$${estimateData.discount}`}</p>
             <p><strong>Final Estimate:</strong> <span style="text-decoration: line-through;">$${estimateData.finalEstimate.toFixed(2)}</span> $${estimateData.discountedEstimate.toFixed(2)}</p>
           ` : `
             <p><strong>Final Estimate:</strong> $${estimateData.finalEstimate.toFixed(2)}</p>
           `}
         </section>
 
         <section style="margin-top: 20px;">
           <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Total with HST (13%)</h2>
           <p><strong>HST Amount:</strong> $${(estimateData.discountedEstimate * 0.13).toFixed(2)}</p>
           <p><strong>Total Estimate with HST:</strong> $${(estimateData.discountedEstimate * 1.13).toFixed(2)}</p>
         </section>
 
         <footer style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 20px;">
           <p>Thank you for choosing NexRenovations. If you have any questions, please feel free to contact us at (437) 799-2029</p>
           <p>Best Regards,<br><strong>NexRenovations Team</strong></p>
         </footer>
       </main>
     </div>
   `;
};

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
   },
});

// controllers/calcEstimateController.js
export const createCalcEstimate = async (req, res) => {
   try {
      const { formData } = req.body;
      const estimateData = typeof formData === 'string' ? JSON.parse(formData) : formData;

      const newEstimate = new CalcEstimate(estimateData);
      await newEstimate.save();

      const mailOptions = {
         from: process.env.EMAIL_USER,
         to: estimateData.customerInfo.email,
         subject: 'Your Estimate from NexRenovations',
         html: createEmailContent(estimateData),
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({
         success: true,
         message: 'Estimate created and email sent successfully',
         estimate: newEstimate,
      });
   } catch (error) {
      console.error('Error creating estimate or sending email:', error);
      res.status(500).json({
         success: false,
         message: 'Failed to create estimate or send email',
         error: error.message,
      });
   }
};

export const getCalcEstimates = async (req, res) => {
   try {
      const estimates = await CalcEstimate.find();
      res.status(200).json({
         success: true,
         estimates,
      });
   } catch (error) {
      console.error('Error fetching estimates:', error);
      res.status(500).json({
         success: false,
         message: 'Failed to fetch estimates',
         error: error.message,
      });
   }
};


// When the status of a CalcEstimate is changed, create a new CurrentJob if necessary
// Ensure the createEmailContent function and the transporter setup are also included here
export const updateEstimateStatus = async (req, res) => {
   try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedEstimate = await CalcEstimate.findByIdAndUpdate(
         id,
         { status },
         { new: true }
      );

      if (!updatedEstimate) {
         return res.status(404).json({
            success: false,
            message: 'Estimate not found',
         });
      }

      if (['Job Pending', 'Job Waiting', 'Job In Progress'].includes(status)) {
         const currentJobData = {
            sections: updatedEstimate.sections,
            additionalCosts: updatedEstimate.additionalCosts,
            stairs: updatedEstimate.stairs,
            costPerSqFeet: updatedEstimate.costPerSqFeet,
            discount: updatedEstimate.discount,
            discountType: updatedEstimate.discountType,
            customerInfo: updatedEstimate.customerInfo,
            finalEstimate: updatedEstimate.finalEstimate,
            discountedEstimate: updatedEstimate.discountedEstimate,
            serviceType: updatedEstimate.serviceType,
            status: updatedEstimate.status,
            date: updatedEstimate.date,
            notes: updatedEstimate.notes || [],
            payments: [],
            progress: [],
            schedule: [],
            workers: [],
         };

         const newCurrentJob = new CurrentJob(currentJobData);
         await newCurrentJob.save();
      }

      res.status(200).json({
         success: true,
         estimate: updatedEstimate,
      });
   } catch (error) {
      console.error('Error updating estimate status:', error);
      res.status(500).json({
         success: false,
         message: 'Failed to update estimate status',
         error: error.message,
      });
   }
};

export const getCalcEstimateById = async (req, res) => {
   try {
      const estimate = await CalcEstimate.findById(req.params.id);
      if (!estimate) {
         return res.status(404).json({
            success: false,
            message: 'Estimate not found',
         });
      }
      res.status(200).json({
         success: true,
         estimate,
      });
   } catch (error) {
      console.error('Error fetching estimate:', error);
      res.status(500).json({
         success: false,
         message: 'Failed to fetch estimate',
         error: error.message,
      });
   }
};

export const getCalcEstimatesByAddress = async (req, res) => {
   try {
      const { address } = req.params;
      const estimates = await CalcEstimate.find({ 'customerInfo.address': address });
      res.status(200).json({
         success: true,
         estimates,
      });
   } catch (error) {
      console.error('Error fetching estimates by address:', error);
      res.status(500).json({
         success: false,
         message: 'Failed to fetch estimates by address',
         error: error.message,
      });
   }
};

export const deleteCalcEstimate = async (req, res) => {
   try {
      const { id } = req.params;
      await CalcEstimate.findByIdAndDelete(id);
      await CurrentJob.findOneAndDelete({ estimateId: id });
      res.status(200).json({
         success: true,
         message: 'Estimate deleted successfully',
      });
   } catch (error) {
      console.error('Error deleting estimate:', error);
      res.status(500).json({
         success: false,
         message: 'Failed to delete estimate',
         error: error.message,
      });
   }
};