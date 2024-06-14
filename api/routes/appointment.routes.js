import express from 'express';
import {addBusyTimeToAllAppointments, getUserAppointments, removeBusyTimeFromAllAppointments } from '../controllers/appointment.controller.js';


import { getAllAppointmentsCollected } from '../controllers/appointment.controller.js';
const router = express.Router();

router.get('/all-appointments-collected', getAllAppointmentsCollected);
router.post('/all-appointments-collected/add-busy-time', addBusyTimeToAllAppointments);
router.delete('/all-appointments-collected/remove-busy-time/:id', removeBusyTimeFromAllAppointments);
router.get('/appointments', getUserAppointments);



export default router;
