// routes/busyTimeUser.route.js
import express from 'express';
import { getAllBusyTimes } from '../controllers/busyTimeUser.controller.js';

const router = express.Router();

router.get('/', getAllBusyTimes);

export default router;
