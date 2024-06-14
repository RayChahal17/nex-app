import mongoose from 'mongoose';

const lastAppointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  busyTimeRanges: [
    {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      service: { type: String, required: true },
      phone: { type: String, required: true },
      confirmed: { type: Boolean, default: false },
    },
  ],
  emailSent: { type: Boolean, default: false },
}, { timestamps: true });

const LastAppointment = mongoose.model('LastAppointment', lastAppointmentSchema);

export default LastAppointment;
