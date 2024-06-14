import Estimate from '../models/estimate.model.js';
import ConfirmedAppointment from '../models/confirmedAppointment.model.js';
import DeletedAppointment from '../models/deletedAppointment.model.js';
import nodemailer from 'nodemailer';
import { DateTime } from 'luxon';
import User from '../models/user.model.js';
import CustomerEmail from '../models/customEmail.model.js';
import AllAppointmentsCollected from '../models/allApointmentsCollected.model.js';

/**
 * Fetches all estimates, including pending, confirmed, and deleted estimates.
 */
export const getAllEstimates = async (req, res) => {
   try {
      const pendingEstimates = await Estimate.find();
      const confirmedEstimates = await ConfirmedAppointment.find();
      const deletedEstimates = await DeletedAppointment.find();

      res.json({
         success: true,
         pendingEstimates,
         confirmedEstimates,
         deletedEstimates
      });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch estimates' });
   }
};

/**
 * Creates a new estimate and adds it to the AllAppointmentsCollected collection.
 * Checks for overlapping appointments and sends a confirmation email.
 */
export const createEstimate = async (req, res) => {
   const { date, start, name, email, address, city, service, phone } = req.body;
   const formattedStart = DateTime.fromISO(start).startOf('hour').toISO();
   const formattedEnd = DateTime.fromISO(start).plus({ hours: 1 }).startOf('hour').toISO();

   try {
      const existingAppointments = await Estimate.find({
         'busyTimeRanges.email': email,
         'busyTimeRanges.start': { $gte: new Date() }
      });

      if (existingAppointments.length > 0) {
         return res.status(400).json({
            success: false,
            message: 'The email already has an appointment set for the future. Please call the number to cancel the appointment or use a different email and credentials to set an appointment.',
         });
      }

      const newEstimate = new Estimate({
         date,
         busyTimeRanges: [
            {
               start: formattedStart,
               end: formattedEnd,
               name,
               email,
               address,
               city,
               service,
               phone,
            },
         ],
      });

      await newEstimate.save();

      const existingCustomerEmail = await CustomerEmail.findOne({ email });
      if (!existingCustomerEmail) {
         const newCustomerEmail = new CustomerEmail({ email });
         await newCustomerEmail.save();
      }

      // Add the busy slot to AllAppointmentsCollected
      let allAppointmentsDoc = await AllAppointmentsCollected.findOne({ date });

      const appointment = {
         start: formattedStart,
         end: formattedEnd,
         service,
         isBusyTime: true,
      };

      if (allAppointmentsDoc) {
         allAppointmentsDoc.appointments.push(appointment);
         await allAppointmentsDoc.save();
      } else {
         allAppointmentsDoc = new AllAppointmentsCollected({
            date,
            appointments: [appointment],
         });
         await allAppointmentsDoc.save();
      }

      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
      });

      const mailOptions = {
         from: process.env.EMAIL_USER,
         to: email,
         subject: 'NexRenovations Appointment Confirmation',
         html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
               <h2 style="color: #4CAF50;">Appointment Confirmation</h2>
               <p>Your meeting has been created with one of the representatives of NexRenovations at ${DateTime.fromISO(formattedStart).setZone('America/Toronto').toLocaleString(DateTime.DATETIME_FULL)}.</p>
               <p>The representative will call you and confirm the appointment within 24 hours and meet you regarding the same.</p>
               <p>You can call on <a href="tel:6478352021" style="color: #4CAF50;">647-835-2021</a> for additional information.</p>
               <p>The representative of NexRenovations will see you anytime from ${DateTime.fromISO(formattedStart).setZone('America/Toronto').toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(formattedEnd).setZone('America/Toronto').toLocaleString(DateTime.TIME_SIMPLE)}. Please be ready.</p>
               <p>Check your spam folder for confirmation.</p>
               <br>
               <p>Thank you,</p>
               <p>NexRenovations Team</p>
            </div>
         `,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
         if (error) {
            return res.status(500).json({ success: false, message: 'Failed to send email' });
         } else {
            newEstimate.emailSent = true;
            await newEstimate.save();
            res.status(201).json({ success: true, estimate: newEstimate });
         }
      });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create estimate', error: error.message });
   }
};



/**
 * Confirms an estimate and moves it to the ConfirmedAppointment collection.
 */
export const confirmEstimate = async (req, res) => {
   try {
      const estimate = await Estimate.findById(req.params.id);
      if (!estimate) {
         return res.status(404).json({ success: false, message: 'Estimate not found' });
      }

      estimate.busyTimeRanges[0].confirmed = true;
      await estimate.save();

      const confirmedAppointment = new ConfirmedAppointment(estimate.toObject());
      await confirmedAppointment.save();

      await Estimate.findByIdAndDelete(req.params.id);

      res.status(200).json({ success: true, message: 'Appointment confirmed' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to confirm appointment' });
   }
};

/**
 * Deletes an estimate or moves it to the DeletedAppointment collection.
 */
export const deleteEstimate = async (req, res) => {
   try {
      const { id } = req.params;
      let appointment;

      if (req.path.includes('permanent-delete')) {
         appointment = await DeletedAppointment.findByIdAndDelete(id);
      } else {
         appointment = await Estimate.findById(id);
         if (appointment) {
            const deletedAppointment = new DeletedAppointment(appointment.toObject());
            await deletedAppointment.save();
            await Estimate.findByIdAndDelete(id);
         }
      }

      if (!appointment) {
         return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

      res.status(200).json({ success: true, message: 'Appointment deleted' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete appointment' });
   }
};

/**
 * Permanently deletes an estimate from the DeletedAppointment and ConfirmedAppointment collections.
 */
export const permanentDeleteEstimate = async (req, res) => {
   const { id } = req.params;
   try {
      await DeletedAppointment.findByIdAndDelete(id);
      await ConfirmedAppointment.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Appointment permanently deleted' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete appointment permanently' });
   }
};

/**
 * Sends a confirmation email for an appointment.
 */
export const sendConfirmationEmail = async (req, res) => {
   const { email, date, busyTimeRanges } = req.body;
   const { start, end } = busyTimeRanges[0];

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS,
      },
   });

   const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Confirmation',
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Appointment Confirmation</h2>
                <p>Your appointment has been confirmed for ${DateTime.fromISO(start).toLocaleString(DateTime.DATETIME_MED)}.</p>
                <p>Please be ready from ${DateTime.fromISO(start).toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(end).toLocaleString(DateTime.TIME_SIMPLE)}.</p>
                <br>
                <p>Thank you,</p>
                <p>NexRenovations Team</p>
            </div>
        `,
   };

   try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Confirmation email sent.' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send confirmation email.' });
   }
};

/**
 * Fetches busy times from both the Estimate and ConfirmedAppointment collections.
 */
export const getBusyTimes = async (req, res) => {
   try {
      const estimates = await Estimate.find();
      const confirmedAppointments = await ConfirmedAppointment.find();

      const busyTimes = [...estimates, ...confirmedAppointments].flatMap((appointment) => {
         return appointment.busyTimeRanges.map((range) => ({
            ...range._doc,
            date: appointment.date,
         }));
      });

      res.json({ success: true, busyTimes });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch busy times' });
   }
};

/**
 * Adds a busy time to the Estimate collection.
 */
export const addBusyTime = async (req, res) => {
   const { date, reason, start, end } = req.body;

   const defaultDetails = {
      name: 'Busy Time',
      email: 'notprovided@example.com',
      address: 'Not Provided',
      city: 'Not Provided',
      service: reason,
      phone: '0000000000',
   };

   try {
      const formattedStart = DateTime.fromISO(`${date}T${start}`).toUTC().toISO(); // Ensure time is in UTC
      const formattedEnd = DateTime.fromISO(`${date}T${end}`).toUTC().toISO(); // Ensure time is in UTC

      console.log('Formatted Start:', formattedStart);
      console.log('Formatted End:', formattedEnd);

      let estimate = await Estimate.findOne({ date });

      if (estimate) {
         estimate.busyTimeRanges.push({
            start: formattedStart,
            end: formattedEnd,
            ...defaultDetails,
         });
         await estimate.save();
      } else {
         estimate = new Estimate({
            date,
            busyTimeRanges: [
               {
                  start: formattedStart,
                  end: formattedEnd,
                  ...defaultDetails,
               },
            ],
         });
         await estimate.save();
      }

      res.status(201).json({ success: true });
   } catch (error) {
      console.error('Error adding busy time:', error);
      res.status(500).json({ success: false, message: 'Failed to add busy time', error: error.message });
   }
};

/**
 * Removes a busy time from the Estimate collection.
 */
export const removeBusyTime = async (req, res) => {
   const { id } = req.params;

   try {
      const estimate = await Estimate.findOne({ 'busyTimeRanges._id': id });

      if (estimate) {
         estimate.busyTimeRanges.id(id).remove();
         await estimate.save();
      }

      res.status(200).json({ success: true });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to remove busy time' });
   }
};
