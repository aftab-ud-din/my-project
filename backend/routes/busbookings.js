import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { 
    getAllBooking, 
    createBooking, 
    getBooking, 
    getUserBooking, 
    getAllBookedSeats,
    deleteBooking, 
} from '../controllers/busBookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBooking);
router.get('/user/book', getUserBooking);
router.get('/', verifyAdmin, getAllBooking);
router.get('/getAll/seats/:id', getAllBookedSeats);
router.delete('/:id', deleteBooking);


export default router
