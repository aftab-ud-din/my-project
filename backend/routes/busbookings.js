import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { getAllBooking, createBooking, getBooking } from '../controllers/busBookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBooking);
router.get('/', verifyAdmin, getAllBooking);


export default router
