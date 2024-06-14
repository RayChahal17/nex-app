import BusyTime from '../models/busyTime.model.js';
import Estimate from '../models/estimate.model.js';

export const getBusyTimes = async (req, res) => {
   try {
      const busyTimes = await BusyTime.find();
      res.json({ success: true, busyTimes });
   } catch (error) {
      console.error('Error fetching busy times:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch busy times' });
   }
};

export const addBusyTime = async (req, res) => {
   const { date, reason, start, end } = req.body;

   try {
      const newBusyTime = new BusyTime({
         date,
         start,
         end,
         reason,
      });

      await newBusyTime.save();

      const newEstimate = new Estimate({
         date,
         busyTimeRanges: [{
            start,
            end,
            name: "dummy_name", // Dummy value
            email: "dummy_email@example.com", // Dummy value
            address: "dummy_address", // Dummy value
            city: "dummy_city", // Dummy value
            service: reason, // Reason mapped to service
            phone: "000-000-0000", // Dummy value
            confirmed: false
         }],
         emailSent: false
      });

      await newEstimate.save();

      res.status(201).json({ success: true, busyTime: newBusyTime });
   } catch (error) {
      console.error('Error adding busy time and estimate:', error);
      res.status(500).json({ success: false, message: 'Failed to create estimate' });
   }
};

export const removeBusyTime = async (req, res) => {
   const { id } = req.params;

   try {
      await BusyTime.findByIdAndDelete(id);
      res.status(200).json({ success: true });
   } catch (error) {
      console.error('Error removing busy time:', error);
      res.status(500).json({ success: false, message: 'Failed to remove busy time' });
   }
};
