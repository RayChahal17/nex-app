import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
   id: Number,
   type: String,
   name: String,
   area: Number,
});
const checklistSchema = new mongoose.Schema({
   description: String,
   checked: Boolean,
});

const taskSchema = new mongoose.Schema({
   description: String,
   status: { type: String, enum: ['to be done', 'completed', 'cancelled'], default: 'to be done' },
});

const scheduleSchema = new mongoose.Schema({
   date: String,
   time: String,
   tasks: [taskSchema],
   notes: [String],
   checklists: [checklistSchema], // Add this line to include checklists

});

const paymentSchema = new mongoose.Schema({
   amount: Number,
   date: Date,
   method: String,
   status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
});

const currentJobSchema = new mongoose.Schema({
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
   status: { type: String, default: 'Job Pending' },
   date: { type: Date, default: Date.now },
   notes: [String],
   payments: [paymentSchema],
   progress: [taskSchema],
   schedule: [scheduleSchema],
   workers: [String],
});

const CurrentJob = mongoose.model('CurrentJob', currentJobSchema);

export default CurrentJob;
