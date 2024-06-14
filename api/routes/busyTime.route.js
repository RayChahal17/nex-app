import express from 'express';
import { getBusyTimes, addBusyTime, removeBusyTime } from '../controllers/busyTime.controller.js';

const router = express.Router();

router.get('/', getBusyTimes);
router.post('/add', addBusyTime);
router.delete('/:id', removeBusyTime);

export default router;
