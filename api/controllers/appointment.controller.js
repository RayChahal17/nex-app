import { DateTime } from 'luxon';
import mongoose from 'mongoose';
import AllAppointmentsCollected from '../models/allApointmentsCollected.model.js';

// Fetch all busy times from AllAppointmentsCollected
export const getAllAppointments = async (req, res) => {
   try {
      const allAppointments = await AllAppointmentsCollected.find();
      res.status(200).json({ success: true, appointments: allAppointments });
   } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch appointments', error: error.message });
   }
};

// Fetch all appointments collected
export const getAllAppointmentsCollected = async (req, res) => {
   try {
       const allAppointments = await AllAppointmentsCollected.find();
       const processedAppointments = allAppointments.map(appointment => ({
           date: appointment.date,
           appointments: appointment.appointments.map(a => ({
               start: a.start,
               end: a.end,
               service: a.service,
               isBusyTime: a.isBusyTime
           }))
       }));
       res.json({ success: true, appointments: processedAppointments });
   } catch (error) {
       console.error('Error fetching all appointments collected:', error);
       res.status(500).json({ success: false, message: 'Failed to fetch all appointments collected', error: error.message });
   }
};

// Remove busy time from AllAppointmentsCollected
export const removeBusyTimeFromAllAppointments = async (req, res) => {
   const { id } = req.params;

   try {
      const appointmentDoc = await AllAppointmentsCollected.findOne({ 'appointments._id': id });

      if (appointmentDoc) {
         appointmentDoc.appointments.id(id).remove();
         await appointmentDoc.save();
         res.status(200).json({ success: true, message: 'Busy time removed successfully' });
      } else {
         res.status(404).json({ success: false, message: 'Appointment not found' });
      }
   } catch (error) {
      console.error('Error removing busy time:', error);
      res.status(500).json({ success: false, message: 'Failed to remove busy time', error: error.message });
   }
};

// Fetch user appointments
export const getUserAppointments = async (req, res) => {
   try {
      const userId = req.user._id; // Assuming you have user authentication and req.user is populated

      if (!mongoose.Types.ObjectId.isValid(userId)) {
         return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }

      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, appointments: user.appointments });
   } catch (error) {
      console.error('Error fetching user appointments:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user appointments', error: error.message });
   }
};

// Add busy time to AllAppointmentsCollected
export const addBusyTimeToAllAppointments = async (req, res) => {
   const { date, timeSlots, reason } = req.body;

   try {
      let appointmentDoc = await AllAppointmentsCollected.findOne({ date });

      const newBusyTimes = timeSlots.map(slot => ({
         start: slot.start,
         end: slot.end,
         service: reason,
         isBusyTime: true
      }));

      if (appointmentDoc) {
         appointmentDoc.appointments.push(...newBusyTimes);
      } else {
         appointmentDoc = new AllAppointmentsCollected({
            date,
            appointments: newBusyTimes
         });
      }

      await appointmentDoc.save();
      res.status(201).json({ success: true, message: 'Busy time added successfully' });
   } catch (error) {
      console.error('Error adding busy time:', error);
      res.status(500).json({ success: false, message: 'Failed to add busy time', error: error.message });
   }
};
