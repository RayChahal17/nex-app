import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
   start: Date,
   end: Date,
   service: String,
   isBusyTime: { type: Boolean, default: false }
});

const allAppointmentsCollectedSchema = new mongoose.Schema({
   date: String,
   appointments: [appointmentSchema],
}, { timestamps: true });

const AllAppointmentsCollected = mongoose.model('AllAppointmentsCollected', allAppointmentsCollectedSchema);

export default AllAppointmentsCollected;
