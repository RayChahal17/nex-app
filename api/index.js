import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import estimateRoutes from './routes/estimate.route.js';
import contactRoutes from './routes/contact.route.js';
import busyTimeRoutes from './routes/busyTime.route.js';
import calcEstimateRoutes from './routes/calcEstimate.route.js';
import appointmentRoutes from './routes/appointment.routes.js';
import currentJobRoutes from './routes/currentJob.route.js';
import { errorHandler } from './utils/error.js';

dotenv.config();

mongoose
   .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('MongoDB connected');
   })
   .catch((err) => {
      console.error('MongoDB connection error:', err);
   });

const __dirname = path.resolve();

const app = express();

// Increase payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Define API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/estimate', estimateRoutes);
app.use('/api/estimate', calcEstimateRoutes); // Ensure this path matches the frontend request
app.use('/api/contact', contactRoutes);
app.use('/api/busy-times', busyTimeRoutes);
app.use('/api/calc-estimate', calcEstimateRoutes);
app.use('/api/current-jobs', currentJobRoutes); // Add this line
app.use('/api', appointmentRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



// Error handling middleware
app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   console.error(`Error: ${statusCode} - ${message}`);
   res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
