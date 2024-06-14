import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import estimateRoutes from './routes/estimate.route.js';
import contactRoutes from './routes/contact.route.js';  // <-- Include this line
import { errorHandler } from './utils/error.js';
import busyTimeRoutes from './routes/busyTime.route.js';
// import busyTimeUserRoutes from './routes/busyTimeUser.route.js';  // Comment out if not needed
// import confirmedAppointmentsRoutes from './routes/confirmedAppointmenets.route.js';  // Comment out if not needed
import appointmentRoutes from './routes/appointment.routes.js';  // Ensure this is included
import path from 'path';
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

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/estimate', estimateRoutes);
app.use('/api/contact', contactRoutes);  // <-- Include this line
app.use('/api/busy-times', busyTimeRoutes);
// app.use('/api/busy-time-user', busyTimeUserRoutes);  // Comment out if not needed
// app.use('/api/confirmed-appointments', confirmedAppointmentsRoutes);  // Comment out if not needed
app.use('/api', appointmentRoutes);  // Ensure this is included

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
 });

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

app.listen(3000, () => {
   console.log('Server running on port 3000');
});
