import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
  getUserAppointments,
  getAllBusyTimes
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { errorHandler } from '../utils/error.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);
router.get('/appointments', errorHandler, getUserAppointments);
router.get('/busy-times', getAllBusyTimes);  // Add the new route


export default router;