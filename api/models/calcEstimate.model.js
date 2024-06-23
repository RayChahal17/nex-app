import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  id: Number,
  type: String,
  name: String,
  area: Number,
});

const calcEstimateSchema = new mongoose.Schema({
  sections: [sectionSchema],
  additionalCosts: {
    demolition: Number,
    bin: Number,
    labor: Number,
    ironMesh: Number,
    miscellaneous: Number,
  },
  stairs: {
    numberOfStairs: Number,
    costPerStair: Number,
    totalCost: Number,
  },
  costPerSqFeet: Number,
  discount: Number,
  discountType: String,
  customerInfo: {
    name: String,
    address: String,
    city: String,
    phone: String,
    email: String,
    note: String,
  },
  finalEstimate: Number,
  discountedEstimate: Number,
  serviceType: String,
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now },
});

const CalcEstimate = mongoose.model('CalcEstimate', calcEstimateSchema);

export default CalcEstimate;
