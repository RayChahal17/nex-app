import express from 'express';
import {
    createCurrentJob,
    getCurrentJobs,
    getCurrentJobById,
    updateCurrentJobStatus,
    addPaymentToJob,
    addNoteToJob,
    addScheduleToJob,
    updateCurrentJob,
    updateJobSchedule,
    deleteCurrentJob // Import the delete function
} from '../controllers/currentJob.controller.js';

const router = express.Router();

router.post('/', createCurrentJob);
router.get('/', getCurrentJobs);
router.get('/:id', getCurrentJobById);
router.put('/:id/status', updateCurrentJobStatus); // Correct route for updating job status
router.put('/:id', updateCurrentJob); // This route should match the PUT request for updating job details
router.delete('/:id', deleteCurrentJob); // Add the delete route
router.put('/:id/schedule', updateJobSchedule); // Separate route for updating job schedule
router.post('/:id/payment', addPaymentToJob);
router.post('/:id/note', addNoteToJob);
router.post('/:id/schedule', addScheduleToJob);

export default router;
