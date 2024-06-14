import mongoose from 'mongoose';

const busyTimeSchema = new mongoose.Schema({
   date: {
      type: String,
      required: true,
   },
   start: {
      type: String,
      required: true,
   },
   end: {
      type: String,
      required: true,
   },
   reason: {
      type: String,
      required: true,
   },
}, { timestamps: true });

const BusyTime = mongoose.model('BusyTime', busyTimeSchema);

export default BusyTime;
