import express from 'express';
import { addConfirmedAppointment } from '../controllers/confirmedAppointments.controller.js';

const router = express.Router();

router.post('/add', addConfirmedAppointment);

export default router;
