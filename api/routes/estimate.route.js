import express from 'express';
import {
   getAllEstimates, createEstimate, confirmEstimate, deleteEstimate, permanentDeleteEstimate, sendConfirmationEmail, getBusyTimes,
   addBusyTime,
   removeBusyTime
} from '../controllers/estimate.controller.js';
import { getAllAppointmentsCollected } from '../controllers/appointment.controller.js';


const router = express.Router();

router.get('/', getAllEstimates);
router.post('/', createEstimate);
router.patch('/:id/confirm', confirmEstimate);
router.delete('/:id', deleteEstimate);
router.delete('/:id/permanent-delete', permanentDeleteEstimate);
router.post('/send-confirmation-email', sendConfirmationEmail);
router.get('/busy-times', getBusyTimes);
router.post('/add-busy-time', addBusyTime);
router.delete('/remove-busy-time/:id', removeBusyTime);
router.post('/estimate', createEstimate);
router.get('/estimate', getAllEstimates);
router.get('/all-appointments-collected', getAllAppointmentsCollected);


export default router;
