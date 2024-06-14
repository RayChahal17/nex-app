import mongoose from 'mongoose';

const busyTimeRangeSchema = new mongoose.Schema({
   start: Date,
   end: Date,
   name: String,
   email: String,
   address: String,
   city: String,
   service: String,
   phone: String,
   reason: String,
   confirmed: { type: Boolean, default: true }
});

const confirmedAppointmentSchema = new mongoose.Schema({
   date: String,
   busyTimeRanges: [busyTimeRangeSchema],
   emailSent: { type: Boolean, default: true }
}, { timestamps: true });

const ConfirmedAppointment = mongoose.model('ConfirmedAppointment', confirmedAppointmentSchema);

export default ConfirmedAppointment;
