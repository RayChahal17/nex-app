import mongoose from 'mongoose';

const customerEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const CustomerEmail = mongoose.model('CustomerEmail', customerEmailSchema);

export default CustomerEmail;
