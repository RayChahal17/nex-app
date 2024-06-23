import express from 'express';
import {
    createCalcEstimate,
    getCalcEstimates,
    getCalcEstimateById,
    updateEstimateStatus,
    getCalcEstimatesByAddress,
    deleteCalcEstimate
} from '../controllers/calcEstimate.controller.js';

const router = express.Router();

router.post('/', createCalcEstimate);
router.get('/', getCalcEstimates);
router.get('/:id', getCalcEstimateById);
router.get('/address/:address', getCalcEstimatesByAddress); // Route for fetching estimates by address
router.put('/:id', updateEstimateStatus); // Route for updating estimate status
router.delete('/:id', deleteCalcEstimate); // Route for deleting an estimate

export default router;
