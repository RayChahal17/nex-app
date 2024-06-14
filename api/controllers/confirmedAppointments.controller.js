import ConfirmedAppointment from '../models/confirmedAppointment.model.js';

export const addConfirmedAppointment = async (req, res) => {
   const { date, busyTimeRanges, emailSent } = req.body;

   try {
      const newConfirmedAppointment = new ConfirmedAppointment({
         date,
         busyTimeRanges,
         emailSent
      });

      await newConfirmedAppointment.save();

      res.status(201).json({ success: true, confirmedAppointment: newConfirmedAppointment });
   } catch (error) {
      console.error('Error adding confirmed appointment:', error);
      res.status(500).json({ success: false, message: 'Failed to create confirmed appointment' });
   }
};
