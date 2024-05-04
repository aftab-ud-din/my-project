import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { getAllBooking, createBooking, getBooking, getAllBookedSeats } from '../controllers/busBookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBooking);
router.get('/', verifyAdmin, getAllBooking);
router.get('/getAll/id', getAllBookedSeats);


export default router
