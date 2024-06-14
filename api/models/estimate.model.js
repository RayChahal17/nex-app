import mongoose from 'mongoose';

const busyTimeRangeSchema = new mongoose.Schema({
   start: { type: Date, required: true },
   end: { type: Date, required: true },
   name: { type: String, required: true, default: 'Busy Time' },
   email: { type: String, required: true, default: 'notprovided@example.com' },
   address: { type: String, required: true, default: 'Not Provided' },
   city: { type: String, required: true, default: 'Not Provided' },
   service: { type: String, required: true },
   phone: { type: String, required: true, default: '0000000000' },
   confirmed: { type: Boolean, default: false },
});


const estimateSchema = new mongoose.Schema({
  date: { type: String, required: true },
  busyTimeRanges: [busyTimeRangeSchema],
  emailSent: { type: Boolean, default: false },
}, { timestamps: true });

const Estimate = mongoose.model('Estimate', estimateSchema);

export default Estimate;
