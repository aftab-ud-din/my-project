import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { 
    getAllBooking, 
    createBooking, 
    getBooking, 
    getUserBooking,
    deleteBooking 
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBooking);
router.get('/user/book', getUserBooking);
router.get('/', getAllBooking);
router.delete('/:id', deleteBooking);


export default router
