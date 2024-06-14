// controllers/busyTimeUser.controller.js
import BusyTime from '../models/busyTime.model.js';
import ConfirmedAppointment from '../models/confirmedAppointment.model.js';

export const getAllBusyTimes = async (req, res) => {
   try {
      const busyTimes = await BusyTime.find();
      const confirmedAppointments = await ConfirmedAppointment.find();

      const combinedBusyTimes = [
         ...busyTimes.map(time => ({
            date: time.date,
            start: time.start,
            end: time.end,
            reason: time.reason,
         })),
         ...confirmedAppointments.reduce((acc, app) => {
            const confirmedTimes = app.busyTimeRanges.map(range => ({
               date: app.date,
               start: range.start,
               end: range.end,
               reason: 'Confirmed Appointment',
            }));
            return acc.concat(confirmedTimes);
         }, [])
      ];

      res.json({ success: true, busyTimes: combinedBusyTimes });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch busy times' });
   }
};
