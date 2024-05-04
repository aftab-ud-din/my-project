import express from 'express';
import { 
    createBus,
    deleteBus, 
    getAllBus, 
    getSingleBus, 
    getBusBySearch,
    getBusCount, 
    updateBus 
} from './../controllers/busController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// create new Bus
router.post('/', verifyAdmin, createBus);

// update Bus
router.put('/:id', verifyAdmin, updateBus);

// delete new Bus
router.delete('/:id', verifyAdmin, deleteBus);

// getSingle new Bus
router.get('/:id', getSingleBus);

// getAll new Bus
router.get('/', getAllBus);

// get Bus by search
router.get("/search/getBusBySearch",getBusBySearch);
router.get("/search/getBusCount",getBusCount);

export default router;
